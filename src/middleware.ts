import { NextResponse, type NextRequest } from "next/server";

/**
 * Builds a nonce-based Content-Security-Policy for the public marketing site.
 *
 * Next.js reads this header off the incoming request and stamps the same nonce
 * onto every script tag it renders, so no `'unsafe-inline'` is needed for
 * scripts in production. `'strict-dynamic'` lets those trusted scripts load
 * their own chunks without us enumerating hashes.
 */
function buildCsp(nonce: string, isDev: boolean): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      // Next's dev overlay and React Refresh compile in the browser.
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    // Style nonces break Next's injected critical CSS, and inline styles cannot
    // execute code, so this is the accepted trade-off.
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": [
      "'self'",
      "blob:",
      "data:",
      // GA4 collection pixels — only ever requested after the visitor opts in.
      "https://*.google-analytics.com",
      "https://*.googletagmanager.com",
    ],
    // next/font self-hosts, so no third-party font origin is required.
    "font-src": ["'self'"],
    "connect-src": [
      "'self'",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://*.googletagmanager.com",
      "https://calendly.com",
      ...(isDev ? ["ws:", "wss:"] : []),
    ],
    // Calendly is embedded on /contact; nothing else may frame in.
    "frame-src": ["'self'", "https://calendly.com", "https://*.calendly.com"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
  };

  const serialised = Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");

  // `upgrade-insecure-requests` is pointless (and noisy) on a local http origin.
  return isDev
    ? serialised
    : `${serialised}; upgrade-insecure-requests`;
}

/**
 * Relaxed CSP for the admin panel SPA (Vite build served from /public/admin).
 *
 * The Vite build emits static <script> tags into index.html with no nonce, and
 * we cannot post-process them, so the strict-dynamic + nonce scheme used by
 * the marketing site would block every script and leave the panel dead. This
 * CSP still restricts network origins and blocks framing, but allows
 * self-hosted scripts (the Vite bundle) and inline styles (Tailwind/Vite
 * inject one at runtime). No third-party CDN is loaded by the panel.
 */
function buildAdminCsp(isDev: boolean): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      // React Refresh + Vite HMR compile in the browser during dev.
      ...(isDev ? ["'unsafe-inline'", "'unsafe-eval'"] : []),
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "blob:", "data:"],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", ...(isDev ? ["ws:", "wss:"] : [])],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
  };

  const serialised = Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");

  return isDev ? serialised : `${serialised}; upgrade-insecure-requests`;
}

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const { pathname } = request.nextUrl;

  // Admin panel + its API subtree get the relaxed CSP. No per-request nonce is
  // used because the Vite bundle's <script> tags are baked in at build time.
  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (isAdminPath) {
    const csp = buildAdminCsp(isDev);
    const response = NextResponse.next();
    response.headers.set("content-security-policy", csp);
    return response;
  }

  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csp = buildCsp(nonce, isDev);

  // Pass the nonce forward so server components can read it via `headers()`.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: [
    /**
     * Run on every path except static assets and image optimisation output —
     * those are immutable files that gain nothing from a per-request nonce.
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
