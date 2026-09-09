import type { Metadata } from "next";
import Link from "next/link";

import { ServiceIcon } from "@/components/icons/service-icon";
import { CountUp } from "@/components/motion/count-up";
import {
  AmbientGlow,
  HeroItem,
  HeroStagger,
  HeroUnderline,
} from "@/components/motion/hero-stagger";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Pipeline } from "@/components/pipeline";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { techStrip } from "@/content/expertise";
import { painPoints, stats, testimonials } from "@/content/home";
import { processSteps } from "@/content/process";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — We run the work. You run the business.`,
  description:
    "Staffing Viro delivers ten outsourced business services — recruitment, software development, customer support, data, finance, IT, marketing, back office, HR and payroll, and process consulting — each with a named team and documented process.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="on-ink grain surface-wash-ink relative overflow-hidden bg-ink text-on-ink">
        {/* Slow ambient drift, purely decorative and dropped under reduced motion. */}
        <AmbientGlow className="pointer-events-none absolute -top-48 -right-32 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(198,157,94,0.20),transparent_68%)] blur-3xl" />
        <AmbientGlow className="pointer-events-none absolute top-1/2 -left-56 -z-10 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(166,127,66,0.12),transparent_70%)] blur-3xl" />

        {/* Top padding clears the fixed header, transparent over this section. */}
        <div className="container-page pt-32 pb-20 md:pt-44 md:pb-28">
          <HeroStagger className="max-w-4xl">
            <HeroItem>
              <Eyebrow tone="ink">
                Outsourced business services, run as your own team
              </Eyebrow>
            </HeroItem>

            <HeroItem>
              <h1 className="mt-7 text-[length:var(--text-display)] leading-[0.88] font-bold">
                We run the work.
                <span className="relative mt-1 block w-fit text-jade">
                  You run the business.
                  {/* Rule wipes out from under the accent line once the hero
                      has settled — the last beat of the entrance sequence. */}
                  <HeroUnderline />
                </span>
              </h1>
            </HeroItem>

            <HeroItem>
              <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
                {siteConfig.name} takes on the operations you would rather not
                build in-house — recruitment, engineering, support, finance, IT
                and more. Ten services, each with a named team, a documented
                process and reporting you can hold us to.
              </p>
            </HeroItem>

            <HeroItem>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  data-analytics="cta_click_start_hiring"
                >
                  Get a quote
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/services" variant="onInk" size="lg">
                  Explore services
                </ButtonLink>
              </div>
            </HeroItem>
          </HeroStagger>

          {/* The funnel is the thesis: a wide pool cut down to one hire. */}
          <Reveal delay={120} className="mt-20 md:mt-24">
            <div className="mb-8 flex flex-col gap-2 border-t border-ink-line pt-8 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-[length:var(--text-h3)] font-bold">
                What 240 candidates look like by the time they reach you
              </h2>
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-ink-muted">
                Select a stage
              </p>
            </div>
            <Pipeline />
          </Reveal>
        </div>

        {/* Trust strip */}
        <div className="border-t border-ink-line">
          <div className="container-page">
            <dl className="grid grid-cols-2 divide-ink-line md:grid-cols-4 md:divide-x">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 70}
                  className="border-b border-ink-line px-1 py-7 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-bold tracking-tight text-jade tabular-nums drop-shadow-[0_0_18px_rgba(198,157,94,0.30)] md:text-5xl">
                      <CountUp
                        value={stat.value}
                        {...(stat.prefix ? { prefix: stat.prefix } : {})}
                        {...(stat.suffix ? { suffix: stat.suffix } : {})}
                      />
                    </span>
                    <span className="mt-2 block font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-ink">
                      {stat.label}
                    </span>
                    <span className="mt-2 block max-w-[26ch] text-[0.8125rem] leading-relaxed text-on-ink-muted">
                      {stat.note}
                    </span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Pain points */}
      <Section tone="paper" size="lg" ariaLabelledBy="pain-heading">
        <Reveal>
          <SectionHeading
            id="pain-heading"
            index={1}
            eyebrow="Why companies call us"
            title="Four reasons engineering roles stay open"
            lead="Each one has a cost you are already paying, whether or not it appears on a budget line."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 md:grid-cols-2">
          {painPoints.map((point, index) => (
            <Reveal
              key={point.problem}
              as="li"
              delay={index * 80}
              className="group bg-paper p-7 transition-colors duration-300 hover:bg-paper-raised md:p-9"
            >
              <h3 className="text-[length:var(--text-h3)] leading-tight font-bold">
                {point.problem}
              </h3>

              <p className="mt-4 leading-relaxed text-on-paper-muted">
                {point.cost}
              </p>

              <div className="mt-6 flex gap-3.5 border-t border-on-paper/12 pt-5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade-ink"
                >
                  Fix
                </span>
                <p className="text-[0.9375rem] leading-relaxed">
                  {point.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- How it works */}
      <Section tone="sunken" size="lg" ariaLabelledBy="process-heading">
        <Reveal>
          <SectionHeading
            id="process-heading"
            index={2}
            eyebrow="The engagement"
            title="Eight steps, and you only appear in three of them"
            lead="The full process is published because it is the thing you are buying. Nothing here is a black box."
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.slice(0, 4).map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 70}
              className="bg-paper-sunken p-7"
            >
              <span className="font-mono text-xs tabular-nums text-jade-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg leading-snug font-bold">
                {step.title}
              </h3>
              <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                {step.timeframe}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-paper-muted">
                {step.agency}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <Link
            href="/how-it-works"
            className="mt-10 inline-flex min-h-[44px] items-center gap-2.5 rounded-xs font-medium text-jade-ink underline-offset-8 transition-all hover:underline"
          >
            See all eight steps, with timings
            <ArrowRight />
          </Link>
        </Reveal>
      </Section>

      {/*
        Services — deliberately the one dark band in the middle of the page.
        Three light bands ran consecutively before this, which flattened the
        whole middle of the document; inverting the section the site is
        actually selling gives the scroll a rhythm and makes this the thing
        you remember. Three columns, not five: ten tiny tiles read as a
        footer, not a offering.
      */}
      <Section tone="ink" size="lg" ariaLabelledBy="services-heading">
        <Reveal>
          <SectionHeading
            id="services-heading"
            index={3}
            tone="ink"
            eyebrow="Services"
            title="Ten things you can stop doing yourself"
            lead="Each is a standalone engagement with its own team and process. Most clients start with one and add a second within a year."
          />
        </Reveal>

        <Stagger
          as="ul"
          stagger={0.055}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <StaggerItem as="li" key={service.slug} className="h-full">
              <SpotlightCard
                as={Link}
                tone="ink"
                href={`/services/${service.slug}`}
                className="p-7"
              >
                <IconTile tone="ink" size={48} className="group-hover:scale-110">
                  <ServiceIcon name={service.icon} className="size-5" />
                </IconTile>
                <h3 className="mt-6 text-[1.0625rem] leading-snug font-bold transition-colors group-hover:text-jade">
                  {service.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-on-ink-muted">
                  {service.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-jade">
                  Learn more
                  <span className="sr-only"> about {service.name}</span>
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Expertise — light, following the dark services band. */}
      <Section tone="paper" size="lg" ariaLabelledBy="expertise-heading">
        <Reveal className="max-w-3xl">
          <SectionHeading
            id="expertise-heading"
            index={4}
            eyebrow="Expertise"
            title="Our recruitment practice only does engineers"
            lead="Ten services, but the hiring one stays narrow on purpose. A technical screen is only worth something when the person running it has written the code."
          />
          <ButtonLink href="/expertise" variant="secondary" size="lg" className="mt-9">
            See every domain we cover
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>

      {/*
        Full-bleed ticker. The stack list was a static wrapped block of tags
        that sat there; as a moving strip it becomes the one piece of ambient
        life on the page and separates the two light bands around it.
      */}
      <div className="on-ink grain surface-wash-ink border-y border-ink-line bg-ink py-10">
        <Marquee
          items={techStrip}
          durationSeconds={52}
          renderItem={(tech) => (
            <span className="inline-flex items-center rounded-xs border border-ink-line bg-ink-raised/60 px-4 py-2.5 font-mono text-[0.8125rem] whitespace-nowrap text-on-ink-muted transition-colors duration-200 hover:border-jade hover:text-jade">
              {tech}
            </span>
          )}
        />
      </div>

      {/* -------------------------------------------------------- Social proof */}
      <Section tone="sunken" size="lg" ariaLabelledBy="proof-heading">
        <Reveal>
          <SectionHeading
            id="proof-heading"
            index={5}
            eyebrow="What clients say"
            title="Feedback from engagements"
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem as="li" key={testimonial.quote} className="h-full">
              <SpotlightCard className="p-8">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 24"
                  className="size-8 text-jade-strong/30"
                >
                  <path
                    fill="currentColor"
                    d="M13.6 0 8 12.2v11.4H0V10.8L5.4 0h8.2Zm18.4 0-5.6 12.2v11.4h-8V10.8L24 0h8Z"
                  />
                </svg>
                <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <footer className="mt-7 border-t border-on-paper/12 pt-5">
                  <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </footer>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl rounded-sm border border-on-paper/15 bg-paper-sunken px-5 py-4 font-mono text-[0.75rem] leading-relaxed text-on-paper-muted">
            Note for launch: these quotes are illustrative placeholders. Replace
            them with named, written-consent testimonials, or remove the section
            entirely — do not publish unattributed praise as if it were real.
          </p>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- Final CTA */}
      <Section tone="ink" size="lg" ariaLabelledBy="cta-heading">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="ink">Next step</Eyebrow>
            <h2
              id="cta-heading"
              className="mt-6 text-[length:var(--text-h2)] leading-[1.03] font-bold"
            >
              Tell us the role. We will tell you honestly whether we can fill
              it.
            </h2>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
              A 30-minute call, no pitch deck. If the brief is unrealistic for
              the market you will hear that on the call, not after you have
              signed something.
            </p>
          </div>

          <ButtonLink
            href="/contact"
            size="lg"
            className="w-full shrink-0 sm:w-auto"
            data-analytics="cta_click_start_hiring"
          >
            Book a discovery call
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
