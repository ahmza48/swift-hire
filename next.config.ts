import type { NextConfig } from "next";

/**
 * Headers that are safe to set statically for every response.
 * The Content-Security-Policy is NOT here — it carries a per-request nonce and
 * is set in `src/middleware.ts` instead.
 */
const securityHeaders = [
  // Force HTTPS for two years, including subdomains. Only honoured over TLS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Block MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy clickjacking defence; `frame-ancestors` in the CSP covers modern browsers.
  { key: "X-Frame-Options", value: "DENY" },
  // Send the origin only on cross-origin requests, nothing on downgrade.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Drop access to hardware and ambient APIs the site never uses.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", "),
  },
  // Cross-origin isolation posture.
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework version to attackers.
  poweredByHeader: false,
  // Trailing-slash-free canonical URLs.
  trailingSlash: false,

  eslint: {
    dirs: ["src"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // No remote patterns are allowed: every image ships from /public.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Hashed font files are immutable.
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Never let a form endpoint be cached by a CDN.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  /**
   * The admin panel is a Vite/React SPA built into /public/admin.
   *
   * These rewrites run in the `afterFiles` phase, so real files in
   * /public/admin (index.html, hashed assets, favicon) are served directly
   * first. Only requests that don't match a file — deep client-side routes
   * like /admin/companies — fall through to /admin/index.html, letting
   * React Router pick up navigation from there.
   */
  async rewrites() {
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/:path*", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
