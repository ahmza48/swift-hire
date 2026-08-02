import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { CalendlyEmbed } from "@/components/calendly-embed";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/page-hero";
import { ArrowRight } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — start hiring engineers",
  description:
    "Book a free 30-minute discovery call, or send a brief and we'll reply within one business day. Swift Hire recruits software engineers on behalf of client companies.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about the role"
        lead={siteConfig.responseCommitment}
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      {/* Engineer redirect — put high, so candidates don't fill the wrong form. */}
      <Section tone="sunken" size="sm">
        <Reveal className="flex flex-col items-start gap-4 rounded-md border border-jade-strong/40 bg-jade/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <p className="leading-relaxed">
            <strong className="font-semibold">Looking for a job?</strong> This
            form is for companies hiring. Engineers join our talent pool
            instead — it takes about three minutes.
          </p>
          <Link
            href="/for-engineers"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-xs font-medium text-jade-ink underline-offset-8 transition-all hover:underline"
          >
            Go to the engineer form
            <ArrowRight />
          </Link>
        </Reveal>
      </Section>

      {/* Booking */}
      <Section tone="paper" size="md" ariaLabelledBy="book-heading">
        <Reveal>
          <Eyebrow>Fastest route</Eyebrow>
          <h2
            id="book-heading"
            className="mt-5 text-[length:var(--text-h2)] leading-[1.05] font-bold"
          >
            Book a call
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <CalendlyEmbed />
        </Reveal>
      </Section>

      {/* Form + details */}
      <Section tone="sunken" size="lg" ariaLabelledBy="enquiry-heading">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>Or write to us</Eyebrow>
            <h2
              id="enquiry-heading"
              className="mt-5 text-[length:var(--text-h2)] leading-[1.05] font-bold"
            >
              Send a brief
            </h2>
            <p className="mt-5 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-on-paper-muted">
              The more you put in, the more useful our first reply is. Rough
              notes are fine — we will come back with the questions that matter.
            </p>

            <div className="mt-10">
              <Suspense
                fallback={
                  <p className="font-mono text-sm text-on-paper-muted">
                    Loading form…
                  </p>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:pt-4">
            <div className="flex flex-col gap-8 rounded-md border border-on-paper/15 bg-paper p-7 md:p-8">
              <div>
                <h3 className="eyebrow text-jade-ink">
                  <span aria-hidden="true" className="h-px w-5 bg-current" />
                  Direct
                </h3>
                <dl className="mt-4 flex flex-col gap-4 text-[0.9375rem]">
                  <div>
                    <dt className="text-on-paper-muted">Client enquiries</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="rounded-xs font-mono underline underline-offset-4 transition-colors hover:text-jade-ink"
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-on-paper-muted">Engineers</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${siteConfig.talentEmail}`}
                        className="rounded-xs font-mono underline underline-offset-4 transition-colors hover:text-jade-ink"
                      >
                        {siteConfig.talentEmail}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-on-paper-muted">LinkedIn</dt>
                    <dd className="mt-1">
                      <a
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-analytics="outbound_click"
                        className="rounded-xs font-mono underline underline-offset-4 transition-colors hover:text-jade-ink"
                      >
                        /company/swifthire
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-on-paper/15 pt-7">
                <h3 className="eyebrow text-jade-ink">
                  <span aria-hidden="true" className="h-px w-5 bg-current" />
                  Where we are
                </h3>
                <dl className="mt-4 flex flex-col gap-4 text-[0.9375rem]">
                  <div>
                    <dt className="text-on-paper-muted">Based in</dt>
                    <dd className="mt-1">{siteConfig.location}</dd>
                  </div>
                  <div>
                    <dt className="text-on-paper-muted">Working hours</dt>
                    <dd className="mt-1 leading-relaxed">
                      {siteConfig.timezone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-on-paper-muted">Markets served</dt>
                    <dd className="mt-1 leading-relaxed">
                      {siteConfig.markets}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
