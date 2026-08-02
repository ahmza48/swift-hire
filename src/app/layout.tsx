import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Public_Sans } from "next/font/google";

import { CookieConsent } from "@/components/cookie-consent";
import { FloatingCta } from "@/components/floating-cta";
import { JsonLd } from "@/components/json-ld";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

import "./globals.css";

/**
 * Forces every route to render per request rather than at build time.
 *
 * `middleware.ts` mints a fresh CSP nonce on every request and stamps it onto
 * Next's own framework scripts. If a page is statically generated, that
 * stamping happens once at build time — baked into the HTML forever — while
 * the CSP response header keeps minting a new nonce on every real request.
 * The two stop matching, the browser blocks every script under
 * `script-src 'nonce-...'`, and the page ships with no working JavaScript at
 * all: no hydration, no event handlers, nothing. `force-dynamic` here is what
 * keeps the two in sync; it is a hard requirement of the nonce-based CSP, not
 * a performance choice. See README.md for detail and the trade-off it implies.
 */
export const dynamic = "force-dynamic";

/* Display face: variable weight *and* width, so the large statements can
   genuinely expand rather than just get heavier. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "outsourced business services",
    "business process outsourcing",
    "engineering recruitment agency",
    "outsourced software development",
    "outsourced customer support",
    "back office outsourcing",
    "HR and payroll administration",
    "business process consulting",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: "business",
  /*
   * Served from /public rather than the `app/icon.svg` convention: Next's
   * metadata-image loader interpolates the absolute project path into generated
   * source unescaped, which breaks on a path containing an apostrophe (as this
   * one does — see README). Declaring the icon here also stops browsers probing
   * /favicon.ico and logging a 404.
   */
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e9" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1524" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * `suppressHydrationWarning` covers attributes injected into <html> and
     * <body> by browser extensions (password managers, dark-mode add-ons, Grammarly)
     * before React hydrates. It suppresses one level only, so real mismatches
     * inside the tree are still reported.
     */
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${archivo.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-dvh bg-paper text-on-paper antialiased"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-sm focus:text-jade"
        >
          Skip to main content
        </a>

        <ScrollProgress />
        <SiteHeader />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          <PageTransition>{children}</PageTransition>
        </main>

        <SiteFooter />
        <FloatingCta />
        <CookieConsent />
      </body>
    </html>
  );
}
