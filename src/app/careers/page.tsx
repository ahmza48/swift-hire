import type { Metadata } from "next";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at Staffing Viro — join our internal team, or add your CV to the talent pool. Open roles across recruitment, BPO delivery and customer support, plus a permanent talent pool for the disciplines we place.",
  alternates: { canonical: "/careers" },
};

/**
 * "Why join us" pillars — internal-team culture, deliberately grounded so
 * every claim survives a first-week reality check. No stock photography, no
 * ping-pong-table language, no fabricated perks.
 */
const CULTURE = [
  {
    title: "Real ownership, from week one",
    body:
      "New hires run their own desk or delivery unit inside their first month. No shadow-year, no waiting to earn responsibility that was already implicit in the offer.",
  },
  {
    title: "Written processes, not tribal knowledge",
    body:
      "Every service we run has a documented playbook. You inherit a running system on day one instead of reverse-engineering how the last person did it.",
  },
  {
    title: "Commission that isn't a discount coupon",
    body:
      "Recruiter commission is transparent, published on the intranet and paid on invoice — not on collection. Delivery leads have a separate scheme tied to retention, not just placement.",
  },
  {
    title: "Direct progression tracks",
    body:
      "Recruiter → Senior → Team Lead → Practice Lead is a written ladder with criteria at each step. If we cannot tell you what the next promotion needs, we have not designed the role yet.",
  },
  {
    title: "Hybrid, not performative",
    body:
      "Two days a week in the office is the shared time; the rest is trusted work. If you deliver, we do not need to see you at your desk to believe it.",
  },
  {
    title: "Learning budget you actually spend",
    body:
      "A dedicated per-person annual learning budget with no sign-off drama and no 'talk to your manager first' loop. Books, courses, conferences and professional certification — whatever moves the craft.",
  },
] as const;

/**
 * The internal-team functions we recruit into. We do not publish individual
 * role postings on the marketing site — vacancies move too quickly — but a
 * candidate can read this and know whether their skill set fits before they
 * reach out. Retired teams (BPO delivery, customer support leadership) are
 * gone because the service pillars they supported are no longer part of the
 * business.
 */
const INTERNAL_TEAMS = [
  {
    title: "Technical recruitment",
    body:
      "Consultants and delivery recruiters running the software engineering, DevOps, platform, data, AI/ML and QA searches. You own your desk end-to-end — source, screen, assess, shortlist and close.",
  },
  {
    title: "Executive & corporate recruitment",
    body:
      "Retained search consultants and corporate desks running the senior and cross-functional searches — director, VP and C-suite as well as finance, sales, legal and operations.",
  },
  {
    title: "Contract staffing & operations",
    body:
      "Client-facing account managers and compliance/onboarding specialists running the contract book — day-rate placements, IR35 handling, timesheet operations and interim searches.",
  },
] as const;

/**
 * External talent pool — the disciplines we place ON BEHALF of client
 * companies. Someone reading this is looking for a job at one of our
 * clients, not at Staffing Viro. Kept separate from the internal-team
 * section above so the two are not conflated. The list mirrors the six
 * public service pillars.
 */
const TALENT_POOL_DISCIPLINES = [
  "Software Engineering",
  "DevOps & Platform",
  "Data, AI & Machine Learning",
  "QA, Security & Reliability",
  "Executive — Sales, Finance, Operations, Technology",
  "Finance & Accounting",
  "Sales, Marketing & Revenue",
  "Legal, Compliance & Risk",
  "Operations & Administration",
  "Human Resources & People Ops",
] as const;

const HIRING_STEPS = [
  {
    title: "Intro call",
    body:
      "30 minutes with a hiring lead. We talk through your experience, what you want next and whether the desk we are recruiting into is actually the right fit — either way, you leave the call with clarity.",
  },
  {
    title: "Craft interview",
    body:
      "A working session on real problems from the desk: shortlist writing, brief triage, client push-back, candidate close. Not a whiteboard trivia round.",
  },
  {
    title: "Team round",
    body:
      "Two members of the team you would join, one hour each, back-to-back. You ask them anything about the job that a hiring manager would not answer honestly.",
  },
  {
    title: "Offer within a week",
    body:
      "You hear back within one business day of the team round. Offer letter with base, commission scheme, benefits and start date attached — no negotiation theatre.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the desk. Or join the pool."
        lead={`${siteConfig.name} hires for two audiences — people who want to work here on our internal team, and people who want to be placed at one of our client companies. This page is both, clearly separated so you land in the right conversation.`}
        crumbs={[{ name: "Careers", href: "/careers" }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#open-roles" size="lg">
            Work at {siteConfig.name}
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="#talent-pool" variant="onInk" size="lg">
            Join the talent pool
          </ButtonLink>
        </div>
      </PageHero>

      {/* -------------------------------------------------- Why join us */}
      <Section tone="paper" size="lg" ariaLabelledBy="culture-heading">
        <Reveal>
          <SectionHeading
            id="culture-heading"
            eyebrow="Why work here"
            title="Six things we can back up in your first month"
            lead="Every claim below is checkable inside week one. If any of them turn out to be false in practice, we would rather hear about it directly than have you leave over it."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CULTURE.map((item) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <SpotlightCard className="p-7">
                <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-on-paper-muted">
                  {item.body}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* -------------------------------------------- Internal open roles */}
      <Section tone="ink" size="lg" ariaLabelledBy="open-roles-heading">
        <Reveal className="max-w-3xl">
          <SectionHeading
            id="open-roles-heading"
            tone="ink"
            eyebrow="Work at Staffing Viro"
            title="Three teams we hire into"
            lead="We do not publish individual role postings on the marketing site — vacancies move too quickly. Read the team descriptions below, then send us a note through Contact if any of them match."
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:grid-cols-3">
          {INTERNAL_TEAMS.map((team) => (
            <StaggerItem as="li" key={team.title} className="h-full">
              <SpotlightCard tone="ink" className="p-7">
                <h3 className="text-lg leading-snug font-bold">{team.title}</h3>
                <p className="mt-3 leading-relaxed text-on-ink-muted">
                  {team.body}
                </p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={120} className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/contact" size="lg">
            Send us your CV
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact" variant="onInk" size="lg">
            Talk to a hiring lead
          </ButtonLink>
        </Reveal>
      </Section>

      {/* --------------------------------------- Hiring process */}
      <Section tone="sunken" size="lg" ariaLabelledBy="hiring-heading">
        <Reveal>
          <SectionHeading
            id="hiring-heading"
            eyebrow="How we hire"
            title="Four steps, ten business days from intro to offer"
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 sm:grid-cols-2 lg:grid-cols-4">
          {HIRING_STEPS.map((step, index) => (
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
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-on-paper-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ----------------------------------------------- Talent pool */}
      <Section tone="paper" size="lg" ariaLabelledBy="talent-pool-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="talent-pool-heading"
              eyebrow="Join the talent pool"
              title="For candidates being placed at our client companies"
              lead="If you want us to place you at one of the companies we recruit for — not to work at Staffing Viro — this is the entry point. We keep your profile private, and we only contact you when a role genuinely matches."
            />
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-8">
            <div>
              <p className="eyebrow">
                <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
                Disciplines we accept profiles for
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {TALENT_POOL_DISCIPLINES.map((discipline) => (
                  <li
                    key={discipline}
                    className="rounded-xs border border-on-paper/20 bg-paper-sunken px-3 py-1.5 text-[0.8125rem] leading-tight text-on-paper"
                  >
                    {discipline}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-on-paper/15 pt-8">
              <p className="text-[length:var(--text-lead)] leading-relaxed">
                Send your CV and a two-line note on what you are looking for
                next through the{" "}
                <Link
                  href="/contact"
                  className="font-medium text-jade-ink underline-offset-4 hover:underline"
                >
                  contact form
                </Link>
                . A recruiter reads every submission personally.
              </p>
              <p className="mt-4 leading-relaxed text-on-paper-muted">
                Free for candidates, always. We are paid by the hiring
                company, not by you — so if we ever ask you for money, that
                is not us.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Send us your CV
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Ask a question first
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------- CTA band */}
      <Section tone="ink" size="lg" ariaLabelledBy="careers-cta-heading">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="ink">Next step</Eyebrow>
            <h2
              id="careers-cta-heading"
              className="mt-6 text-[length:var(--text-h2)] leading-[1.03] font-bold"
            >
              Either conversation starts the same way — with a call.
            </h2>
            <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-on-ink-muted">
              30 minutes, no pitch deck. We will tell you which team is the
              right fit, what the current market looks like for your
              discipline, and what a realistic offer would be.
            </p>
          </div>

          <ButtonLink href="/contact#book" size="lg" className="w-full shrink-0 sm:w-auto">
            Book Appointment
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
