import type { Metadata } from "next";
import Link from "next/link";

import { ServiceIcon } from "@/components/icons/service-icon";
import {
  AmbientGlow,
  HeroItem,
  HeroStagger,
  HeroUnderline,
} from "@/components/motion/hero-stagger";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { commitments, painPoints, testimonials } from "@/content/home";
import { processSteps } from "@/content/process";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Recruitment, BPO and Customer Support`,
  description:
    "Staffing Viro is a specialist staffing agency across three pillars: recruitment & staffing (permanent, executive and contract), business process outsourcing, and outsourced customer support — each with a named team and documented process.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="on-ink grain surface-wash-ink relative overflow-hidden bg-ink text-on-ink">
        {/* Slow ambient drift, purely decorative and dropped under reduced motion. */}
        <AmbientGlow className="pointer-events-none absolute -top-48 -right-32 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_68%)] blur-3xl" />
        <AmbientGlow className="pointer-events-none absolute top-1/2 -left-56 -z-10 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] blur-3xl" />

        {/* Top padding clears the fixed header, transparent over this section. */}
        <div className="container-page pt-32 pb-20 md:pt-44 md:pb-28">
          <HeroStagger className="max-w-4xl">
            <HeroItem>
              <Eyebrow tone="ink">
                Recruitment solutions built around how you hire
              </Eyebrow>
            </HeroItem>

            <HeroItem>
              <h1 className="mt-7 text-[length:var(--text-display)] leading-[0.88] font-bold">
                We run the search.
                <span className="relative mt-1 block w-fit text-jade">
                  You make the hire.
                  {/* Rule wipes out from under the accent line once the hero
                      has settled — the last beat of the entrance sequence. */}
                  <HeroUnderline />
                </span>
              </h1>
            </HeroItem>

            <HeroItem>
              <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
                {siteConfig.name} is a specialist recruitment and staffing
                partner across six services — technical talent, executive
                search, contract staffing, permanent placements, corporate
                recruitment and HR consulting. Each is run by a named team
                with a documented process.
              </p>
            </HeroItem>

            <HeroItem>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink
                  href="/services"
                  size="lg"
                  data-analytics="cta_explore_services"
                >
                  Explore Services
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="onInk" size="lg">
                  How It Works
                </ButtonLink>
              </div>
            </HeroItem>
          </HeroStagger>
        </div>

        {/* Commitments strip — qualitative pillars in place of the previous
            numeric count-ups, which relied on metrics we could not verify. */}
        <div className="border-t border-ink-line">
          <div className="container-page">
            <dl className="grid grid-cols-1 divide-ink-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
              {commitments.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 70}
                  className="border-b border-ink-line px-1 py-7 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:pr-0"
                >
                  <dt className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade">
                    0{index + 1}
                  </dt>
                  <dd>
                    <span className="mt-3 block text-[1rem] font-semibold text-on-ink md:text-[1.0625rem]">
                      {item.title}
                    </span>
                    <span className="mt-2 block max-w-[34ch] text-[0.8125rem] leading-relaxed text-on-ink-muted">
                      {item.note}
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
            title="Four reasons roles stay open longer than they should"
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
            title="Five steps, and you only appear in two of them"
            lead="The recruitment process is published because it is the thing you are buying. Nothing here is a black box."
          />
        </Reveal>

        {/* Five steps stack cleanly at two, three and five columns across the
            small/medium/large breakpoints — the cramped four-column-on-mobile
            layout of the previous four-step version is gone. */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 70}
              className="bg-paper-sunken p-6 md:p-7"
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
            See all five steps, with detail
            <ArrowRight />
          </Link>
        </Reveal>
      </Section>

      {/*
        Services — deliberately the one dark band in the middle of the page.
        Six recruitment services stack as 1 / 2 / 3 columns across small,
        medium and large screens so every card gets enough width to read
        without the row dropping to fewer items on desktop.
      */}
      <Section tone="ink" size="lg" ariaLabelledBy="services-heading">
        <Reveal>
          <SectionHeading
            id="services-heading"
            index={3}
            tone="ink"
            eyebrow="Services"
            title="Six recruitment services, one partner"
            lead="Each is a standalone engagement with its own team and process. Most clients start with one service and expand into a second inside a year."
          />
        </Reveal>

        <Stagger
          as="ul"
          stagger={0.06}
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

      {/*
        Testimonials render only if real, named, consented quotes are in
        content/home.ts. The placeholder array is empty on purpose — we do
        not publish fabricated social proof, so nothing appears until the
        business supplies quotes with written consent.
      */}
      {testimonials.length > 0 ? (
        <Section tone="sunken" size="lg" ariaLabelledBy="proof-heading">
          <Reveal>
            <SectionHeading
              id="proof-heading"
              index={4}
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
        </Section>
      ) : null}

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
            href="/contact#book"
            size="lg"
            className="w-full shrink-0 sm:w-auto"
            data-analytics="cta_book_appointment"
          >
            Book Appointment
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
