/**
 * Single source of truth for brand, contact and navigation data.
 * Safe to import from both server and client components — no secrets here.
 */

export const siteConfig = {
  name: "Staffing Viro",
  legalName: "Staffing Viro LLC",
  tagline: "Recruitment solutions built around how you hire.",
  description:
    "Staffing Viro is a specialist recruitment and staffing partner: technical talent acquisition, executive search, contract staffing, permanent placements, corporate recruitment and HR consulting — each with a named team and a documented process.",
  /**
   * Canonical origin.
   *
   * Must be `NEXT_PUBLIC_`: client components import `siteConfig`, and a
   * server-only variable would resolve to the env value on the server and the
   * fallback in the browser — the two would disagree during hydration. The
   * site's own URL is not a secret, so exposing it costs nothing.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.staffingviro.com",
  /*
   * TODO: Contact addresses.
   *
   * The site's live production addresses are the fields below. When the
   * business supplies the official Staffing Viro mailboxes, set them via the
   * matching NEXT_PUBLIC_*_EMAIL environment variables so this fallback set
   * is never used in production. Displaying an @staffingviro.com address that
   * does not accept mail would be worse than displaying no address at all —
   * every place that reads `siteConfig.email` guards on `undefined` and
   * either hides the row or points the reader at the contact form instead.
   */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  talentEmail: process.env.NEXT_PUBLIC_CAREERS_EMAIL,
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL,
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE,
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
  /*
   * TODO: replace with Staffing Viro's LinkedIn company URL once available.
   * Guarded so the footer social row hides the entry rather than linking to
   * a placeholder that does not resolve.
   */
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  /** Fallback Calendly link when NEXT_PUBLIC_CALENDLY_URL is unset. */
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL,
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
 * Order matters — this is the visible order in the header on desktop and the
 * mobile drawer. "Book Appointment" is rendered separately as the primary
 * CTA button and always sits at the far right of the header. Home is not
 * an item because the logo already navigates there; adding it back would
 * make the row read as one item too long on a narrow desktop.
 */
export const primaryNav: readonly NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasMegaMenu: true },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
] as const;

/**
 * Footer link groups.
 *
 * The Services column is not here — it is generated from `data/services.ts` in
 * the footer component, so a new service appears there automatically.
 */
export const footerNav: readonly { title: string; items: readonly NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
] as const;
