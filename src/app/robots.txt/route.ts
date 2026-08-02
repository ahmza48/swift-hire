import { siteConfig } from "@/lib/site";

/**
 * Served as a route handler for the same reason as the sitemap: Next's
 * `robots.ts` metadata convention cannot compile from a project path containing
 * an apostrophe.
 */

export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /case-studies

Sitemap: ${siteConfig.url}/sitemap.xml
Host: ${siteConfig.url}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
