import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { processSteps } from "@/content/process";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Our recruitment process in five steps: post the job, search and review, screen and interview, analyze and shortlist, profiles delivered. Timings, deliverables and a clear split of who does what at every stage.",
  alternates: { canonical: "/how-it-works" },
};

const ownerLabel = {
  agency: "We do this",
  you: "You do this",
} as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="The process"
        title="Five steps, and exactly who does it"
        lead="You are buying a process, so the process is published. Every stage below carries a clear split of who does what and a directional timeframe from real engagements."
        crumbs={[{ name: "How It Works", href: "/how-it-works" }]}
      >
        <ButtonLink href="/services" variant="onInk" size="lg">
          Compare services
          <ArrowRight />
        </ButtonLink>
      </PageHero>

      {/* Headline commitment */}
      <Section tone="sunken" size="sm">
        <Reveal className="grid gap-8 sm:grid-cols-3">
          {[
            {
              value: `${processSteps.length} steps`,
              label: "From signed brief to signed offer",
            },
            {
              value: `${processSteps.length - 3} of ${processSteps.length}`,
              label: "Steps that need your team's time",
            },
            {
              value: `${siteConfig.guaranteeDays} days`,
              label: "Replacement guarantee window",
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-display text-3xl font-bold tracking-tight text-jade-ink md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                {item.label}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* Timeline */}
      <Section tone="paper" size="lg" ariaLabelledBy="timeline-heading">
        <Reveal>
          <SectionHeading
            id="timeline-heading"
            eyebrow="Step by step"
            title="From signed brief to a hire who is still there at 90 days"
          />
        </Reveal>

        <ol className="mt-16">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 50}
              className="group relative grid gap-6 border-t border-on-paper/15 py-9 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-10 md:py-11 lg:grid-cols-[8rem_minmax(0,1fr)_18rem]"
            >
              {/* Step index + timeframe */}
              <div className="flex items-baseline gap-4 md:flex-col md:gap-3">
                <span className="font-mono text-sm tabular-nums text-jade-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                  {step.timeframe}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="text-[length:var(--text-h3)] leading-tight font-bold">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-on-paper-muted">
                  {step.detail}
                </p>
              </div>

              {/* Responsibility split */}
              <dl className="flex flex-col gap-4 rounded-sm border border-on-paper/15 bg-paper-sunken p-5 lg:self-start">
                <div>
                  <dt className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade-ink">
                    {ownerLabel.agency}
                  </dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-relaxed">
                    {step.agency}
                  </dd>
                </div>
                <div className="border-t border-on-paper/12 pt-4">
                  <dt className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                    {ownerLabel.you}
                  </dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-on-paper-muted">
                    {step.client}
                  </dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* What we don't do */}
      <Section tone="ink" size="lg" ariaLabelledBy="boundaries-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              id="boundaries-heading"
              tone="ink"
              eyebrow="Boundaries"
              title="What we deliberately do not do"
              lead="A recruitment partner that oversteps is worse than none at all. These lines stay where they are."
            />
          </Reveal>

          <Reveal delay={100}>
            <ul className="flex flex-col">
              {[
                {
                  title: "We do not make the offer",
                  body: "The hire joins your company, so the offer comes from you. We advise on the number and handle the conversation, but the decision and the contract are yours.",
                },
                {
                  title: "We do not send you volume",
                  body: "Three to five profiles, or we tell you the search is not working. A shortlist of twelve means we have pushed the screening job back onto you.",
                },
                {
                  title: "We do not post your role publicly",
                  body: "No job boards, no public listings under our name. Confidential searches stay confidential, including from the candidate's current employer.",
                },
                {
                  title: "We do not recruit from our own clients",
                  body: "Anyone we place, and anyone in your team, is off-limits for the life of the engagement plus twelve months.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="border-b border-ink-line py-6 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-on-ink-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="paper" size="md">
        <Reveal className="flex flex-col items-start gap-7 rounded-md border border-on-paper/15 bg-paper-raised p-9 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <Eyebrow>Ready when you are</Eyebrow>
            <h2 className="mt-5 text-[length:var(--text-h3)] leading-tight font-bold">
              Send us one role and see what the shortlist looks like.
            </h2>
            <p className="mt-3 leading-relaxed text-on-paper-muted">
              {siteConfig.responseCommitment}
            </p>
          </div>
          <ButtonLink href="/contact#book" size="lg" className="w-full shrink-0 md:w-auto">
            Book Appointment
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
