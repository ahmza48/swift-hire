import type { Metadata } from "next";

import { EngineerForm } from "@/components/forms/engineer-form";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { FaqList } from "@/components/ui/faq-list";
import { Section, SectionHeading } from "@/components/ui/section";
import { engineerFaqs } from "@/content/faq";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "For engineers — join the talent pool",
  description:
    "Join Staffing Viro's vetted talent pool. Not a job board: submit a profile once, stay private, and hear from us only when a role genuinely matches. Free for engineers, always.",
  alternates: { canonical: "/for-engineers" },
};

const benefits = [
  {
    title: "Roles at companies we have actually met",
    body: "Every client has been through a kickoff call with us. We know the team, the stack, the manager and why the last person left — and we tell you before you interview.",
  },
  {
    title: "Your profile stays private",
    body: "Nothing is published, nothing is searchable, and your details go to a named company only after you have agreed to that specific role.",
  },
  {
    title: "We negotiate for you",
    body: "We know the band before the offer exists, because we agreed it with the client in week one. You are not guessing, and you are not negotiating alone.",
  },
  {
    title: "No spam, ever",
    body: "We contact you when something matches your stack, seniority and location. Not monthly. Not with a newsletter. Not with roles in a language you do not write.",
  },
];

const expectations = [
  {
    title: "Submit your profile",
    body: "Three minutes. Stack, seniority, location, what you want next.",
  },
  {
    title: "We review it",
    body: "Within five business days, by a recruiter with an engineering background.",
  },
  {
    title: "Quick intro call",
    body: "Twenty minutes, if there is a plausible match. No technical test at this stage.",
  },
  {
    title: "You join the active pool",
    body: "We hold your preferences and check every incoming brief against them.",
  },
  {
    title: "We come to you",
    body: "When a role fits, you get the full picture up front and decide whether to proceed.",
  },
];

export default function ForEngineersPage() {
  return (
    <>
      <PageHero
        eyebrow="For engineers"
        title="Not a job board. A shortlist you are already on."
        lead="You do not apply to roles here. You submit a profile once, and we come to you when a client is hiring for what you actually do."
        crumbs={[{ name: "For engineers", href: "/for-engineers" }]}
      />

      {/* Framing */}
      <Section tone="paper" size="lg" ariaLabelledBy="why-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="why-heading"
              eyebrow="Why join"
              title="What you get out of it"
              lead="We are paid by the companies hiring, which means we have every reason to place you well and none to place you badly."
            />
          </Reveal>

          <Reveal delay={100}>
            <ul className="flex flex-col">
              {benefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="border-b border-on-paper/15 py-6 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <h3 className="text-lg leading-snug font-bold">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-on-paper-muted">
                    {benefit.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* What to expect */}
      <Section
        tone="ink"
        size="lg"
        id="what-to-expect"
        ariaLabelledBy="expect-heading"
      >
        <Reveal>
          <SectionHeading
            id="expect-heading"
            tone="ink"
            eyebrow="What to expect"
            title="Five steps, and one honest caveat"
          />
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-md bg-ink-line sm:grid-cols-2 lg:grid-cols-5">
          {expectations.map((step, index) => (
            <Reveal
              key={step.title}
              as="li"
              delay={index * 70}
              className="bg-ink p-6 transition-colors duration-300 hover:bg-ink-raised"
            >
              <span className="font-mono text-xs tabular-nums text-jade">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3.5 leading-snug font-bold">{step.title}</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-on-ink-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl rounded-sm border border-ink-line bg-ink-raised/50 px-5 py-4 leading-relaxed text-on-ink-muted">
            <strong className="font-semibold text-on-ink">
              The caveat, stated plainly:
            </strong>{" "}
            a match is not guaranteed. Whether we can place you depends on what
            our clients are hiring for, not on how good you are. Some profiles
            get a call in a week. Some wait months. We would rather say that now
            than imply otherwise.
          </p>
        </Reveal>
      </Section>

      {/* Form */}
      <Section
        tone="sunken"
        size="lg"
        id="submit"
        ariaLabelledBy="form-heading"
      >
        <Reveal>
          <SectionHeading
            id="form-heading"
            eyebrow="Submit"
            title="Join the talent pool"
            lead="About three minutes. Everything marked optional genuinely is."
          />
        </Reveal>

        <Reveal delay={80} className="mt-12 max-w-3xl">
          <div className="rounded-md border border-on-paper/15 bg-paper p-7 md:p-10">
            <EngineerForm />
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section tone="paper" size="lg" id="faq" ariaLabelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="faq-heading"
              eyebrow="FAQ"
              title="Questions engineers actually ask"
            />
          </Reveal>

          <Reveal delay={100}>
            <FaqList items={engineerFaqs} />
          </Reveal>
        </div>
      </Section>

      <JsonLd data={faqJsonLd(engineerFaqs)} />
    </>
  );
}
