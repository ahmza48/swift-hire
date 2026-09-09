import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Client engagement write-ups from Staffing Viro are in preparation. Each will be published only with the client's written consent.",
  alternates: { canonical: "/case-studies" },
  // Nothing of substance here yet — keep it out of the index until it has content.
  robots: { index: false, follow: true },
};

const planned = [
  {
    label: "Series B fintech",
    outcome: "4 backend engineers in 11 weeks",
    focus: "Retained search, Go and Kotlin, London hybrid",
  },
  {
    label: "Health-tech scale-up",
    outcome: "Platform lead after two failed searches",
    focus: "Retained search, Kubernetes and Terraform, remote EU",
  },
  {
    label: "B2B SaaS, Series A",
    outcome: "6 to 19 engineers over five months",
    focus: "Embedded recruiter, full-stack and data",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="In preparation"
        lead="We will not publish a client's hiring data until they have read the write-up and agreed to it in writing. Three are with clients for approval now."
        crumbs={[{ name: "Case studies", href: "/case-studies" }]}
      />

      <Section tone="paper" size="lg" ariaLabelledBy="planned-heading">
        <Reveal>
          <SectionHeading
            id="planned-heading"
            eyebrow="Coming"
            title="What is being written up"
            lead="Each will cover the brief, what we tried, what did not work, and the actual timings — not just the headline number."
          />
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-md bg-on-paper/12 md:grid-cols-3">
          {planned.map((item, index) => (
            <Reveal
              key={item.label}
              as="li"
              delay={index * 80}
              className="flex flex-col bg-paper p-8"
            >
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-on-paper-muted">
                {item.label}
              </p>
              <h3 className="mt-4 flex-1 text-[length:var(--text-h3)] leading-tight font-bold">
                {item.outcome}
              </h3>
              <p className="mt-5 border-t border-on-paper/12 pt-4 font-mono text-[0.75rem] leading-relaxed text-on-paper-muted">
                {item.focus}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={140}>
          <div className="mt-14 flex flex-col items-start gap-6 rounded-md border border-on-paper/15 bg-paper-sunken p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <h2 className="text-[length:var(--text-h3)] leading-tight font-bold">
                Want references before the write-ups land?
              </h2>
              <p className="mt-3 leading-relaxed text-on-paper-muted">
                Ask on the discovery call. We will put you in touch with a
                current client working on a search like yours.
              </p>
            </div>
            <ButtonLink href="/contact" size="lg" className="w-full shrink-0 md:w-auto">
              Book a call
              <ArrowRight />
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
