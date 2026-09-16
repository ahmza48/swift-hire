import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { team, values } from "@/content/team";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Staffing Viro exists, how we operate, and who runs it. A specialist staffing agency based in Albuquerque, New Mexico — serving companies across the United States with remote-first placements nationwide.",
  alternates: { canonical: "/about" },
};

/** Derives a monogram for the team tiles — no stock photography anywhere. */
function monogram(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by people who got tired of bad shortlists"
        lead={`${siteConfig.legalName} runs recruitment and outsourced operations on behalf of the companies that hire us. Three service pillars — recruitment & staffing, BPO and customer support — each with a documented process we publish rather than describe.`}
        crumbs={[{ name: "About", href: "/about" }]}
      />

      {/* Mission + origin */}
      <Section tone="paper" size="lg" ariaLabelledBy="mission-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="mission-heading"
              eyebrow="Mission"
              title="Make hiring an engineer take weeks, not quarters — without lowering the bar."
            />
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-6 text-[length:var(--text-lead)] leading-relaxed">
            <p>
              Most companies that need engineers cannot hire them well. Not
              because they are bad at hiring, but because doing it properly is a
              full-time specialist job and they already have one of those.
            </p>
            <p className="text-on-paper-muted">
              So they hand it to a generalist agency, which screens on keywords
              and sends twelve plausible CVs. The engineering team burns a week
              interviewing, hires the least-bad option, and six months later
              starts again. We have been on both sides of that loop.
            </p>
            <p className="text-on-paper-muted">
              Staffing Viro exists to close it. We act as the hiring arm of the client
              — we source, we screen, we run the technical assessment, and we
              hand over four candidates with written evidence. The company still
              makes the decision and the offer. That boundary is deliberate: the
              hire joins their team, not ours.
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

      {/* Team */}
      <Section tone="paper" size="lg" ariaLabelledBy="team-heading">
        <Reveal>
          <SectionHeading
            id="team-heading"
            eyebrow="Team"
            title="Who you will actually be dealing with"
            lead="Small on purpose. The person who takes your brief is the person who runs your search."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <StaggerItem as="li" key={member.role} className="h-full">
              <SpotlightCard className="p-7">
                <span
                  aria-hidden="true"
                  className="grid size-14 place-items-center rounded-sm bg-ink font-display text-lg font-bold tracking-tight text-jade"
                >
                  {monogram(member.name)}
                </span>

                <h3 className="mt-6 text-lg font-bold">{member.name}</h3>
                <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-jade-ink">
                  {member.role}
                </p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-on-paper-muted">
                  {member.bio}
                </p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics="outbound_click"
                  className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-xs text-[0.9375rem] underline-offset-8 transition-all hover:text-jade-ink hover:underline"
                >
                  LinkedIn
                  <span className="sr-only">
                    {" "}
                    profile for {member.name} (opens in a new tab)
                  </span>
                  <ArrowRight />
                </a>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={140}>
          <p className="mt-8 max-w-3xl rounded-sm border border-on-paper/15 bg-paper-sunken px-5 py-4 font-mono text-[0.75rem] leading-relaxed text-on-paper-muted">
            Note for launch: names, biographies and LinkedIn URLs above are
            placeholders. Replace with the real founding team and photographs
            before this page goes live.
          </p>
        </Reveal>
      </Section>

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
                detail: `${siteConfig.legalName}, registered in England & Wales`,
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
            <ButtonLink href="/contact" size="lg">
              Work with us
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
