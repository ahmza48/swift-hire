/**
 * Single source of truth for brand, contact and navigation data.
 * Safe to import from both server and client components — no secrets here.
 */

export const siteConfig = {
  name: "Swift Hire",
  legalName: "Swift Hire Solutions Ltd.",
  tagline: "Outsourced business services, run as your own team.",
  description:
    "Swift Hire runs the operations you would rather not build in-house — recruitment, software development, customer support, data, finance, IT, marketing, back office, HR and payroll, and process consulting.",
  /**
   * Canonical origin.
   *
   * Must be `NEXT_PUBLIC_`: client components import `siteConfig`, and a
   * server-only variable would resolve to the env value on the server and the
   * fallback in the browser — the two would disagree during hydration. The
   * site's own URL is not a secret, so exposing it costs nothing.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://swifthire.com",
  email: "hello@swifthire.com",
  talentEmail: "engineers@swifthire.com",
  privacyEmail: "privacy@swifthire.com",
  phoneDisplay: "+44 20 7946 0142",
  location: "London, UK",
  timezone: "GMT / BST — overlapping CET, EST and GST",
  markets: "UK, EU and the Gulf, with remote-first placements worldwide",
  linkedin: "https://www.linkedin.com/company/swifthire",
  /** Fallback Calendly link when NEXT_PUBLIC_CALENDLY_URL is unset. */
  calendly: "https://calendly.com/swifthire/discovery-call",
  responseCommitment: "We reply to every enquiry within one business day.",
  guaranteeDays: 90,
  /** Footer credit — the agency that built this site, not Swift Hire itself. */
  poweredBy: {
    name: "Axenity",
    url: "https://www.axenity.com/",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  description?: string;
  /** Opens the services mega-menu on desktop and an accordion on mobile. */
  hasMegaMenu?: boolean;
};

/** Primary header navigation. */
export const primaryNav: readonly NavItem[] = [
  { href: "/services", label: "Services", hasMegaMenu: true },
  { href: "/how-it-works", label: "How it works" },
  { href: "/expertise", label: "Expertise" },
  { href: "/for-engineers", label: "For engineers" },
  { href: "/about", label: "About" },
] as const;

/**
 * Footer link groups.
 *
 * The Services column is not here — it is generated from `data/services.ts` in
 * the footer component, so a new service appears there automatically.
 */
export const footerNav: readonly { title: string; items: readonly NavItem[] }[] = [
  {
    title: "For companies",
    items: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/expertise", label: "Expertise" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/contact", label: "Get a quote" },
    ],
  },
  {
    title: "For engineers",
    items: [
      { href: "/for-engineers", label: "Join the talent pool" },
      { href: "/for-engineers#what-to-expect", label: "What to expect" },
      { href: "/for-engineers#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/terms-of-service", label: "Terms of service" },
    ],
  },
] as const;
