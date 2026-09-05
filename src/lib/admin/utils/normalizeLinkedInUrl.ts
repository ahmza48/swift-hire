/**
 * Normalize LinkedIn URLs before saving to improve duplicate detection.
 * Example: https://LinkedIn.com/in/Example/ → https://linkedin.com/in/example
 */
export function normalizeLinkedInUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return url as string;

  let normalized = url.trim();

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  try {
    const parsed = new URL(normalized);
    parsed.hostname = parsed.hostname.toLowerCase().replace(/^www\./, "");
    parsed.pathname = parsed.pathname.replace(/\/+$/, "").toLowerCase();
    parsed.hash = "";
    parsed.search = "";
    return parsed.toString();
  } catch {
    return normalized.toLowerCase();
  }
}
