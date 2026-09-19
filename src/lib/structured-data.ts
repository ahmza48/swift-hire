import { siteConfig } from "./site";

/**
 * JSON-LD builders. Every value is drawn from `siteConfig` or a typed argument,
 * so nothing user-supplied is ever serialised into a <script> tag.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    /*
     * Optional fields are omitted when the underlying env-driven config is
     * empty rather than emitted as empty strings — a JSON-LD field with an
     * empty value is a validator warning and, in the case of `email` and
     * `sameAs`, harms the entity record we are trying to build.
     */
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.linkedin ? { sameAs: [siteConfig.linkedin] } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: ["US"],
    knowsAbout: [
      "Technical talent acquisition",
      "Executive search and recruitment",
      "Contract staffing",
      "Permanent placements",
      "Corporate recruitment",
      "HR consulting",
    ],
    contactPoint: [
      ...(siteConfig.email
        ? [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              email: siteConfig.email,
              availableLanguage: ["English"],
            } as const,
          ]
        : []),
      ...(siteConfig.talentEmail
        ? [
            {
              "@type": "ContactPoint",
              contactType: "candidate enquiries",
              email: siteConfig.talentEmail,
              availableLanguage: ["English"],
            } as const,
          ]
        : []),
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function serviceJsonLd(
  services: readonly { name: string; description: string; slug: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        serviceType: "Recruitment and staffing",
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: siteConfig.markets,
        url: `${siteConfig.url}/services/${service.slug}`,
      },
    })),
  };
}

export function faqJsonLd(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: readonly { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: `${siteConfig.url}${crumb.href}`,
      })),
    ],
  };
}
