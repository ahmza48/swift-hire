import "server-only";

/**
 * Fixed-window rate limiter backed by an in-process Map.
 *
 * This is deliberately simple and has a known limitation: state is per-instance,
 * so on a multi-region serverless deployment each instance keeps its own window.
 * That is acceptable for form-spam mitigation (it still caps a single attacker's
 * throughput per instance) but is NOT a security boundary on its own — it sits
 * behind the honeypot, timing trap and payload validation.
 *
 * For a hard global limit, swap `hit()` for Upstash Redis or Vercel KV; the
 * signature is intentionally the same shape.
 */

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

/** Bound memory: evict expired windows whenever the map grows past this. */
const MAX_TRACKED_KEYS = 10_000;

function sweep(now: number): void {
  for (const [key, window] of buckets) {
    if (window.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Unix ms at which the current window resets. */
  resetAt: number;
  /** Seconds the caller should wait, for a Retry-After header. */
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_KEYS) sweep(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);

  return {
    success: existing.count <= limit,
    limit,
    remaining,
    resetAt: existing.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/**
 * Best-effort client identity for rate limiting.
 *
 * `x-forwarded-for` is client-controlled unless a trusted proxy overwrites it.
 * On Vercel it is rewritten at the edge, so the left-most entry is trustworthy;
 * behind another proxy, verify that assumption before relying on this.
 */
export function clientKey(headers: Headers, scope: string): string {
  const forwarded = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");

  const ip =
    forwarded?.split(",")[0]?.trim() ||
    realIp?.trim() ||
    "unknown";

  return `${scope}:${ip}`;
}
