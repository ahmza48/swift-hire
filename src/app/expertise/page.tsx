import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  assessmentMethods,
  domains,
  seniorityLevels,
} from "@/content/expertise";

export const metadata: Metadata = {
  title: "Engineering expertise and technical screening",
  description:
    "The engineering domains Staffing Viro recruits for — frontend, backend, mobile, platform, data and ML, QA, security and engineering leadership — and exactly how we technically assess candidates.",
  alternates: { canonical: "/expertise" },
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title="Recruiters who can read the code"
        lead="Every screen is run by someone with an engineering background. That is the whole reason a specialist agency beats a generalist one on technical roles."
        crumbs={[{ name: "Expertise", href: "/expertise" }]}
      >
        <ButtonLink href="/contact" size="lg">
          Discuss a role
          <ArrowRight />
        </ButtonLink>
      </PageHero>

      {/* Domains */}
      <Section tone="paper" size="lg" ariaLabelledBy="domains-heading">
        <Reveal>
          <SectionHeading
            id="domains-heading"
            eyebrow="Domains"
            title="Nine engineering domains, and nothing outside them"
            lead="We turn down sales, marketing and finance searches. Staying narrow is what keeps the technical screen worth anything."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, index) => (
            <Reveal
              key={domain.slug}
              as="li"
              delay={(index % 3) * 70}
              className="flex flex-col bg-paper p-7 transition-colors duration-300 hover:bg-paper-raised md:p-8"
            >
              <h3 className="text-[length:var(--text-h3)] leading-tight font-bold">
                {domain.title}
              </h3>

              <p className="mt-3.5 flex-1 leading-relaxed text-on-paper-muted">
                {domain.description}
              </p>

              <h4 className="mt-6 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade-ink">
                Stack
              </h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {domain.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-xs border border-on-paper/18 px-2.5 py-1 font-mono text-[0.75rem] text-on-paper-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                Typical titles
              </h4>
              <p className="mt-2 text-[0.875rem] leading-relaxed">
                {domain.roles.join(" · ")}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Assessment */}
      <Section tone="ink" size="lg" ariaLabelledBy="assess-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="assess-heading"
              tone="ink"
              eyebrow="How we assess"
              title="The screen matches the role, and you see the rubric first"
              lead="No trick questions, no whiteboard algorithms, no unpaid weekend projects. You approve the assessment format at kickoff and receive the raw output, not just a score."
            />
            <p className="mt-8 rounded-sm border border-ink-line bg-ink-raised/50 p-5 text-[0.9375rem] leading-relaxed text-on-ink-muted">
              We run assessments in-house rather than outsourcing to a platform.
              Where a client already uses HackerRank, Codility or their own
              take-home, we run yours instead and score against your rubric.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="flex flex-col">
              {assessmentMethods.map((method, index) => (
                <li
                  key={method.name}
                  className="grid gap-3 border-b border-ink-line py-6 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-5"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs tabular-nums text-jade"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-lg font-bold">{method.name}</h3>
                      <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-ink-muted">
                        {method.appliesTo}
                      </p>
                    </div>
                    <p className="mt-2.5 leading-relaxed text-on-ink-muted">
                      {method.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Seniority */}
      <Section tone="sunken" size="lg" ariaLabelledBy="seniority-heading">
        <Reveal>
          <SectionHeading
            id="seniority-heading"
            eyebrow="Seniority"
            title="Junior through CTO"
            lead="Below Staff, the constraint is usually assessment throughput. Above it, the constraint is network — and that is where a retained search earns its fee."
          />
        </Reveal>

        <Reveal delay={80}>
          <ol className="mt-12 flex flex-wrap items-stretch gap-2">
            {seniorityLevels.map((level, index) => (
              <li
                key={level}
                className="flex flex-1 basis-[9rem] flex-col gap-2 rounded-sm border border-on-paper/15 bg-paper p-4 transition-colors duration-300 hover:border-jade-strong"
              >
                <span className="font-mono text-[0.6875rem] tabular-nums text-jade-ink">
                  L{index + 1}
                </span>
                <span className="text-[0.9375rem] leading-snug font-medium">
                  {level}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg">
              Tell us what you need
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" size="lg">
              See the full process
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
