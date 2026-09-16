import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

/**
 * Sitemap served as a route handler rather than via Next's `sitemap.ts`
 * metadata convention.
 *
 * The metadata loader interpolates the absolute project path into generated
 * source without escaping it, which fails to compile when that path contains an
 * apostrophe (as this one does). A plain route handler produces identical
 * output and does not go through that loader.
 */

/** Public routes only — /case-studies is noindex until it has real content. */
const routes: readonly {
  path: string;
  priority: string;
  changeFrequency: string;
}[] = [
  { path: "/", priority: "1.0", changeFrequency: "weekly" },
  { path: "/how-it-works", priority: "0.9", changeFrequency: "monthly" },
  { path: "/services", priority: "0.9", changeFrequency: "monthly" },
  // Every service sub-page, generated from the catalogue.
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: "0.8",
    changeFrequency: "monthly",
  })),
  { path: "/careers", priority: "0.8", changeFrequency: "weekly" },
  { path: "/about", priority: "0.6", changeFrequency: "yearly" },
  { path: "/contact", priority: "0.9", changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: "0.2", changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: "0.2", changeFrequency: "yearly" },
];

export const dynamic = "force-static";

export function GET() {
  const lastModified = new Date().toISOString();

  const urls = routes
    .map(
      (route) =>
        `  <url>
    <loc>${siteConfig.url}${route.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
