import type { Metadata } from "next";
import Link from "next/link";

import { ServiceIcon } from "@/components/icons/service-icon";
import { JsonLd } from "@/components/json-ld";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { Section, SectionHeading } from "@/components/ui/section";
import { services } from "@/data/services";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ten outsourced business services from Staffing Viro: recruitment and staffing, software development, customer support, data processing, finance and accounting, IT, digital marketing, back office, HR and payroll, and process consulting.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Ten services. One partner."
        lead="Each is run by a dedicated team with its own process, quality standard and reporting. Take one, or hand over the operations you would rather not build in-house."
        crumbs={[{ name: "Services", href: "/services" }]}
      >
        <ButtonLink href="/contact" size="lg">
          Get a quote
          <ArrowRight />
        </ButtonLink>
      </PageHero>

      <Section tone="paper" size="lg" ariaLabelledBy="all-services-heading">
        <Reveal>
          <SectionHeading
            id="all-services-heading"
            eyebrow="What we do"
            title="Pick the work you want off your plate"
            lead="Every engagement starts the same way: we look at how the work runs today before quoting to run it ourselves."
          />
        </Reveal>

        <Stagger
          as="ul"
          stagger={0.07}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => (
            <StaggerItem as="li" key={service.slug} className="h-full">
              <SpotlightCard as={Link} href={`/services/${service.slug}`} className="p-7 md:p-8">
                <IconTile size={52} className="group-hover:scale-110">
                  <ServiceIcon name={service.icon} />
                </IconTile>

                <h2 className="mt-6 text-[length:var(--text-h3)] leading-tight font-bold transition-colors group-hover:text-jade-ink">
                  {service.name}
                </h2>

                <p className="mt-3.5 flex-1 leading-relaxed text-on-paper-muted">
                  {service.tagline}
                </p>

                <span className="mt-6 inline-flex items-center gap-2.5 font-medium text-jade-ink">
                  Learn more
                  <span className="sr-only"> about {service.name}</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="ink" size="lg" ariaLabelledBy="services-cta-heading">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="services-cta-heading"
              className="text-[length:var(--text-h2)] leading-[1.03] font-bold"
            >
              Not sure which of these you actually need?
            </h2>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
              Most people arrive asking for one service and leave having scoped a
              different one. Tell us what is not working and we will say which of
              these fixes it — including when the answer is none of them.
            </p>
          </div>

          <ButtonLink href="/contact" size="lg" className="w-full shrink-0 sm:w-auto">
            Book a discovery call
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>

      <JsonLd
        data={serviceJsonLd(
          services.map((service) => ({
            name: service.name,
            description: service.tagline,
            slug: service.slug,
          })),
        )}
      />
    </>
  );
}
