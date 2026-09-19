import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { values } from "@/content/team";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Staffing Viro — a specialist recruitment and staffing partner. Six services across technical talent, executive search, contract, permanent, corporate recruitment and HR consulting, each with a documented process.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built for the searches that matter"
        lead={`${siteConfig.legalName} runs recruitment on behalf of the companies that hire us. Six specialist services across technical talent, executive search, contract, permanent, corporate recruitment and HR consulting — each with a documented process we publish rather than describe.`}
        crumbs={[{ name: "About", href: "/about" }]}
      />

      {/* Mission + origin */}
      <Section tone="paper" size="lg" ariaLabelledBy="mission-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="mission-heading"
              eyebrow="Mission"
              title="Fill the role in weeks, not quarters — without lowering the bar."
            />
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-6 text-[length:var(--text-lead)] leading-relaxed">
            <p>
              Most companies that need to hire cannot do it well at scale. Not
              because they are bad at it, but because doing hiring properly is
              a full-time specialist job and they already have one of those.
            </p>
            <p className="text-on-paper-muted">
              So the work gets handed to a generalist agency that screens on
              keywords and sends twelve plausible CVs. The hiring team burns a
              week interviewing, hires the least-bad option, and six months
              later starts again. We have been on both sides of that loop —
              and we built the company we would have wanted to work with.
            </p>
            <p className="text-on-paper-muted">
              Staffing Viro exists to close it. We act as the recruitment arm
              of the client: we source, we screen, we interview, and we hand
              over a short list of candidates with written evidence. The
              company still makes the decision and the offer. That boundary is
              deliberate — the hire joins their team, not ours.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="ink" size="lg" ariaLabelledBy="values-heading">
        <Reveal>
          <SectionHeading
            id="values-heading"
            tone="ink"
            eyebrow="How we operate"
            title="Four commitments, each with something you can hold us to"
            lead="A value you cannot check is a slogan. Each of these has evidence attached."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-2">
          {values.map((value, index) => (
            <Reveal
              key={value.name}
              as="li"
              delay={index * 80}
              className="bg-ink p-8 transition-colors duration-300 hover:bg-ink-raised md:p-9"
            >
              <h3 className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-jade">
                {value.name}
              </h3>
              <p className="mt-4 text-[length:var(--text-h3)] leading-tight font-bold">
                {value.claim}
              </p>
              <p className="mt-4 leading-relaxed text-on-ink-muted">
                {value.evidence}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/*
        Team section deliberately omitted for now.
        Prior versions of this page rendered placeholder "Founder name" and
        "Recruiter name" tiles with invented biographies alongside an internal
        note explaining they were placeholders — customer-facing fabricated
        social proof. The block is removed here; a real team section will
        return when the business supplies actual people, verified
        biographies and public LinkedIn URLs.
      */}

      {/* Operating model */}
      <Section tone="sunken" size="lg" ariaLabelledBy="operating-heading">
        <Reveal>
          <SectionHeading
            id="operating-heading"
            eyebrow="Operating model"
            title="Where we work"
          />
        </Reveal>

        <Reveal delay={80}>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-md bg-on-paper/12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "Headquarters", detail: siteConfig.location },
              { term: "Markets served", detail: siteConfig.markets },
              { term: "Working hours", detail: siteConfig.timezone },
              {
                term: "Entity",
                detail: `${siteConfig.legalName}, registered in the United States`,
              },
            ].map((item) => (
              <div key={item.term} className="bg-paper-sunken p-6">
                <dt className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade-ink">
                  {item.term}
                </dt>
                <dd className="mt-3 leading-relaxed">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/services" size="lg">
              Explore services
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary" size="lg">
              See the process
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
