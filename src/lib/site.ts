/**
 * Single source of truth for brand, contact and navigation data.
 * Safe to import from both server and client components — no secrets here.
 */

export const siteConfig = {
  name: "Staffing Viro",
  legalName: "Staffing Viro LLC",
  tagline: "Recruitment, BPO and customer support — run as your own team.",
  description:
    "Staffing Viro is a specialist staffing agency: recruitment and staffing (permanent, executive and contract), business process outsourcing, and outsourced customer support — each with a named team and documented process.",
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
  talentEmail: "careers@swifthire.com",
  privacyEmail: "privacy@swifthire.com",
  phoneDisplay: "+1 (505) 555-0142",
  /**
   * Registered US business address.
   *
   * Individual parts are exposed for structured-data emitters (schema.org
   * PostalAddress) that need them broken out; `location` is the one-line
   * display string used in footers and about copy.
   */
  address: {
    street: "1209 Mountain Road Pl NE, Ste R",
    locality: "Albuquerque",
    region: "NM",
    postalCode: "87110",
    country: "US",
  },
  location: "Albuquerque, NM",
  timezone: "MST / MDT — overlapping CST, EST and PST business hours",
  markets: "United States, with remote-first placements nationwide",
  linkedin: "https://www.linkedin.com/company/staffingviro",
  /** Fallback Calendly link when NEXT_PUBLIC_CALENDLY_URL is unset. */
  calendly: "https://calendly.com/staffingviro/discovery-call",
  responseCommitment: "We reply to every enquiry within one business day.",
  guaranteeDays: 90,
  /** Footer credit — the agency that built this site, not Staffing Viro itself. */
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

/** Primary header navigation.
 *
 * Order matters — this is the visible order in the header on desktop and in the
 * mobile drawer. "Book Appointment" is the primary CTA button (not a link),
 * so it isn't in this array; it is rendered separately by the header component
 * and always sits at the far right.
 */
export const primaryNav: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasMegaMenu: true },
  { href: "/how-it-works", label: "How it works" },
  { href: "/contact", label: "Contact Us" },
  { href: "/careers", label: "Careers" },
] as const;

/**
 * Footer link groups.
 *
 * The Services column is not here — it is generated from `data/services.ts` in
 * the footer component, so a new service appears there automatically.
 */
export const footerNav: readonly { title: string; items: readonly NavItem[] }[] = [
  {
    title: "Clients",
    items: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/contact", label: "Contact us" },
      { href: "/contact#book", label: "Schedule appointment" },
    ],
  },
  {
    title: "Candidates",
    items: [
      { href: "/careers", label: "Careers" },
      { href: "/careers#roles", label: "Open roles" },
      { href: "/careers#talent-pool", label: "Join the talent pool" },
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
