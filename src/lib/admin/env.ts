/**
 * Read admin-panel environment variables lazily and centrally.
 *
 * We do not throw at import time — a missing MONGODB_URI or JWT_SECRET should
 * only fail the specific admin request that needs it, not the entire Next.js
 * build. The public marketing site runs fine without either.
 */
export function jwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_JWT_SECRET (or JWT_SECRET) is not set. Configure it in .env.local (dev) and Vercel Project Settings (prod).",
    );
  }
  return secret;
}

export function jwtExpiresIn(): string {
  return process.env.ADMIN_JWT_EXPIRES_IN || "7d";
}
