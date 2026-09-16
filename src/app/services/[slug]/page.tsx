import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceIcon } from "@/components/icons/service-icon";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { Section, SectionHeading } from "@/components/ui/section";
import { getService, services } from "@/data/services";
import { siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Deliberately no `generateStaticParams` here.
 *
 * This route used to prerender all ten slugs at build time. That is
 * incompatible with the site's CSP: `middleware.ts` mints a fresh nonce per
 * request and stamps it onto Next's own script tags, but a statically
 * generated page bakes that stamp in once, forever, at build time. The two
 * stop matching and the browser blocks every script — no hydration, no event
 * handlers, a completely dead page. See the `dynamic` export in
 * `app/layout.tsx` for the full explanation; this page inherits it.
 *
 * The unknown-slug 404 that `dynamicParams = false` used to provide is handled
 * below anyway — `getService(slug)` plus `notFound()` — so nothing is lost by
 * removing the build-time machinery, only the bug it caused.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${siteConfig.name}`,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        lead={service.description}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/contact#book?service=${service.slug}`} size="lg">
            Book Appointment
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/services" variant="onInk" size="lg">
            All services
          </ButtonLink>
        </div>
      </PageHero>

      {/* ------------------------------------------------- What's included */}
      <Section tone="paper" size="lg" ariaLabelledBy="included-heading">
        <Reveal>
          <SectionHeading
            id="included-heading"
            eyebrow="What's included"
            title="What you actually get"
          />
        </Reveal>

        <Stagger
          as="ul"
          className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 md:grid-cols-2"
        >
          {service.included.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="bg-paper p-7 transition-colors duration-300 hover:bg-paper-raised md:p-8"
            >
              <div className="flex items-start gap-4">
                <IconTile size={40}>
                  <ServiceIcon name={service.icon} className="size-[18px]" />
                </IconTile>
                <div>
                  <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-on-paper-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------ Who it's for */}
      <Section tone="ink" size="lg" ariaLabelledBy="audience-heading">
        <Reveal>
          <SectionHeading
            id="audience-heading"
            tone="ink"
            eyebrow="Who it's for"
            title="You will recognise yourself in one of these"
            lead="If none of them describe you, this probably is not the service you need — and we would rather say so on the first call."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3">
          {service.audience.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <SpotlightCard tone="ink" className="p-7">
                <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-on-ink-muted">
                  {item.body}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* --------------------------------------------------------- Process */}
      <Section tone="sunken" size="lg" ariaLabelledBy="process-heading">
        <Reveal>
          <SectionHeading
            id="process-heading"
            eyebrow="Our process"
            title={`How we deliver ${service.name.toLowerCase()}`}
          />
        </Reveal>

        {/* Each step animates as it reaches the viewport, one after another. */}
        <ol className="mt-14">
          {service.process.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 60}
              className="grid gap-4 border-t border-on-paper/15 py-8 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              <span className="font-mono text-sm tabular-nums text-jade-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[length:var(--text-h3)] leading-tight font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-on-paper-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------- Why us */}
      <Section tone="paper" size="lg" ariaLabelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="why-heading"
              eyebrow="Why us"
              title="What makes this different"
              lead="Specific to this service, not the usual agency boilerplate."
            />
          </Reveal>

          <Stagger as="ul" className="flex flex-col">
            {service.why.map((item) => (
              <StaggerItem
                as="li"
                key={item.title}
                className="border-b border-on-paper/15 py-6 first:pt-0 last:border-b-0 last:pb-0"
              >
                <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
                <p className="mt-2.5 leading-relaxed text-on-paper-muted">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ------------------------------------------------- Related services */}
      <Section tone="sunken" size="md" ariaLabelledBy="related-heading">
        <Reveal>
          <h2
            id="related-heading"
            className="text-[length:var(--text-h3)] leading-tight font-bold"
          >
            Other services
          </h2>
        </Reveal>

        <Stagger as="ul" stagger={0.06} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <StaggerItem as="li" key={item.slug} className="h-full">
              <SpotlightCard
                as={Link}
                href={`/services/${item.slug}`}
                layout="row"
                className="items-start gap-3.5 p-5"
              >
                <IconTile size={36} tone="paper">
                  <ServiceIcon name={item.icon} className="size-4" />
                </IconTile>
                <span className="mt-1.5 font-medium transition-colors group-hover:text-jade-ink">
                  {item.name}
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* -------------------------------------------------------- CTA band */}
      <Section tone="ink" size="lg" ariaLabelledBy="service-cta-heading">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-jade">
              <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
              Next step
            </p>
            <h2
              id="service-cta-heading"
              className="mt-6 text-[length:var(--text-h2)] leading-[1.03] font-bold"
            >
              Ready to get started with {service.name}?
            </h2>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
              A 30-minute call, no pitch deck. We will tell you what this would
              cost, how long it would take, and whether it is the right service
              for the problem you described.
            </p>
          </div>

          <ButtonLink href="/contact#book" size="lg" className="w-full shrink-0 sm:w-auto">
            Book Appointment
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.metaDescription,
          serviceType: service.name,
          provider: { "@id": `${siteConfig.url}/#organization` },
          areaServed: siteConfig.markets,
          url: `${siteConfig.url}/services/${service.slug}`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} — what's included`,
            itemListElement: service.included.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item.title },
            })),
          },
        }}
      />
    </>
  );
}
