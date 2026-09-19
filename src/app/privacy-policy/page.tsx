import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocument } from "@/components/legal-document";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Staffing Viro collects, uses, stores and deletes personal data for client companies and engineering candidates, including your rights under the UK GDPR and CCPA.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "What we collect" },
  { id: "why", title: "Why we process it" },
  { id: "lawful-basis", title: "Lawful basis" },
  { id: "sharing", title: "Who we share it with" },
  { id: "retention", title: "How long we keep it" },
  { id: "your-rights", title: "Your rights" },
  { id: "cookies", title: "Cookies" },
  { id: "security", title: "Security" },
  { id: "transfers", title: "International transfers" },
  { id: "california", title: "California residents" },
  { id: "contact", title: "Contact and complaints" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lead="What we collect, why, how long we keep it, and how to make us delete it."
        crumbs={[{ name: "Privacy policy", href: "/privacy-policy" }]}
      />

      <div className="bg-paper">
        <LegalDocument updated="1 August 2026" sections={sections}>
          <div className="mb-12 rounded-sm border border-on-paper/20 bg-paper-sunken px-5 py-4">
            <p className="mt-0 font-mono text-[0.75rem] leading-relaxed">
              <strong>Template — not yet legally reviewed.</strong> This
              document describes the intended practice accurately, but it must
              be reviewed by a qualified data-protection solicitor and matched
              against the systems actually in use before launch.
            </p>
          </div>

          <h2 id="who-we-are">1. Who we are</h2>
          <p>
            {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;,
            &ldquo;we&rdquo;) is a recruitment intermediary based in{" "}
            {siteConfig.location}. We are the data controller for the personal
            data described in this policy. You can reach our data protection
            contact at{" "}
            {siteConfig.privacyEmail ? (
              <a href={`mailto:${siteConfig.privacyEmail}`}>
                {siteConfig.privacyEmail}
              </a>
            ) : (
              <Link href="/contact">the Contact page</Link>
            )}
            .
          </p>

          <h2 id="what-we-collect">2. What we collect</h2>
          <h3>If you are a client company</h3>
          <ul>
            <li>Your name, work email, company name and job title</li>
            <li>The roles you are hiring for and the detail in your brief</li>
            <li>Correspondence with us, including call notes</li>
            <li>How you found us, if you tell us</li>
          </ul>

          <h3>If you are an engineer</h3>
          <ul>
            <li>Name, email address and current location</li>
            <li>LinkedIn profile, and optionally a GitHub or portfolio URL</li>
            <li>
              Current or target title, years of experience, primary technologies
            </li>
            <li>
              Employment-type preference, availability and working preferences
            </li>
            <li>Your CV, if you choose to upload one</li>
            <li>
              Anything you write in the free-text field, and notes we make during
              screening and assessment
            </li>
          </ul>

          <h3>Everyone</h3>
          <ul>
            <li>
              Standard server logs, including IP address, retained briefly for
              security and abuse prevention
            </li>
            <li>
              Analytics data, but <strong>only if you accept cookies</strong> —
              see section 8
            </li>
          </ul>

          <h2 id="why">3. Why we process it</h2>
          <ul>
            <li>To respond to your enquiry and provide recruitment services</li>
            <li>
              To assess whether an engineer is a fit for a client role, and to
              present them to that client with their agreement
            </li>
            <li>To keep records of who we have spoken to and about what</li>
            <li>To detect and prevent spam, fraud and abuse of our forms</li>
            <li>
              To understand which pages help companies find us, where analytics
              consent has been given
            </li>
          </ul>
          <p>
            We do not sell personal data. We do not use it to train machine
            learning models. We do not run automated decision-making that
            produces legal or similarly significant effects.
          </p>

          <h2 id="lawful-basis">4. Lawful basis</h2>
          <ul>
            <li>
              <strong>Consent</strong> — engineer profile submissions, and
              analytics cookies. You can withdraw consent at any time.
            </li>
            <li>
              <strong>Legitimate interests</strong> — responding to a business
              enquiry you initiated, securing our systems, and contacting
              engineers about roles matching preferences they gave us.
            </li>
            <li>
              <strong>Contract</strong> — delivering the recruitment services a
              client has engaged us for.
            </li>
            <li>
              <strong>Legal obligation</strong> — tax, accounting and
              right-to-work record keeping where applicable.
            </li>
          </ul>

          <h2 id="sharing">5. Who we share it with</h2>
          <p>
            An engineer&apos;s details are shared with a named client company{" "}
            <strong>only after that engineer has agreed to that specific
            role</strong>. We never circulate profiles speculatively.
          </p>
          <p>We also use these processors:</p>
          <ul>
            <li>
              <strong>Vercel</strong> — website hosting and server logs
            </li>
            <li>
              <strong>Resend</strong> — transactional email delivery
            </li>
            <li>
              <strong>Calendly</strong> — discovery call scheduling, loaded only
              when you press the button to open it
            </li>
            <li>
              <strong>Google Analytics 4</strong> — usage analytics, only with
              your consent, with IP anonymisation enabled
            </li>
          </ul>
          <p>
            Each is bound by a data processing agreement. We disclose data to
            law enforcement only where legally compelled.
          </p>

          <h2 id="retention">6. How long we keep it</h2>
          <ul>
            <li>
              <strong>Engineer profiles</strong> — 24 months from your last
              interaction with us, then deleted. We will email you before that
              point to ask whether you want to stay in the pool.
            </li>
            <li>
              <strong>CVs</strong> — deleted with the profile, or immediately on
              request.
            </li>
            <li>
              <strong>Client enquiries and engagement records</strong> — 6 years
              after the end of the engagement, for contractual and tax purposes.
            </li>
            <li>
              <strong>Server logs</strong> — 30 days.
            </li>
            <li>
              <strong>Analytics data</strong> — 14 months.
            </li>
          </ul>

          <h2 id="your-rights">7. Your rights</h2>
          <p>
            Under the UK GDPR and EU GDPR you have the right to access, rectify,
            erase, restrict processing of, and port your personal data, and to
            object to processing based on legitimate interests. Where processing
            relies on consent, you may withdraw it at any time without affecting
            processing already carried out.
          </p>
          <p>
            To exercise any of these, email{" "}
            {siteConfig.privacyEmail ? (
              <a href={`mailto:${siteConfig.privacyEmail}`}>
                {siteConfig.privacyEmail}
              </a>
            ) : (
              <Link href="/contact">the Contact page</Link>
            )}{" "}
            from the address you registered with. We respond within 30 days and
            do not charge a fee. There is no retention offer and no exit
            interview — deletion means deletion.
          </p>

          <h2 id="cookies">8. Cookies</h2>
          <p>
            The site sets no cookies at all until you make a choice in the
            banner. Rejecting means no analytics script is ever loaded, and no
            request is made to Google.
          </p>
          <ul>
            <li>
              <strong>Strictly necessary</strong> — a single browser local
              storage entry recording your cookie choice, so we do not ask
              again. No expiry; clear your site data to reset it.
            </li>
            <li>
              <strong>Analytics (optional)</strong> — Google Analytics 4, if you
              accept. Used to count page views and see which pages lead to
              enquiries.
            </li>
          </ul>
          <p>
            We do not use advertising or cross-site tracking cookies. To change
            your choice, clear this site&apos;s data in your browser and the
            banner will reappear.
          </p>

          <h2 id="security">9. Security</h2>
          <p>
            The site is served over HTTPS with HSTS, a strict Content Security
            Policy and standard hardening headers. Form endpoints are rate
            limited and validate all input server-side. Uploaded files are
            verified by content, not by the filename or the browser-supplied
            type. Access to candidate data is limited to the recruiters working
            the relevant search.
          </p>
          <p>
            No system is perfectly secure. If you believe you have found a
            vulnerability, please email{" "}
            {siteConfig.privacyEmail ? (
              <a href={`mailto:${siteConfig.privacyEmail}`}>
                {siteConfig.privacyEmail}
              </a>
            ) : (
              <Link href="/contact">the Contact page</Link>
            )}{" "}
            and we will acknowledge within two business days.
          </p>

          <h2 id="transfers">10. International transfers</h2>
          <p>
            Some processors are based in the United States. Where personal data
            leaves the UK or EEA, transfers are covered by the UK International
            Data Transfer Addendum or the EU Standard Contractual Clauses,
            together with a transfer risk assessment.
          </p>

          <h2 id="california">11. California residents</h2>
          <p>
            Under the CCPA/CPRA you may request disclosure of the categories and
            specific pieces of personal information we have collected, request
            deletion or correction, and opt out of &ldquo;sharing&rdquo; for
            cross-context behavioural advertising. We do not sell or share
            personal information as those terms are defined in the CCPA. We will
            not discriminate against you for exercising these rights. Send
            requests to{" "}
            {siteConfig.privacyEmail ? (
              <a href={`mailto:${siteConfig.privacyEmail}`}>
                {siteConfig.privacyEmail}
              </a>
            ) : (
              <Link href="/contact">the Contact page</Link>
            )}
            .
          </p>

          <h2 id="contact">12. Contact and complaints</h2>
          <p>
            Questions or complaints:{" "}
            {siteConfig.privacyEmail ? (
              <a href={`mailto:${siteConfig.privacyEmail}`}>
                {siteConfig.privacyEmail}
              </a>
            ) : (
              <Link href="/contact">the Contact page</Link>
            )}
            . If you are not satisfied with our response, you may complain to
            the UK Information Commissioner&apos;s Office at ico.org.uk, or to
            your local supervisory authority in the EEA.
          </p>
          <p>
            See also our{" "}
            <Link href="/terms-of-service">terms of service</Link>.
          </p>
        </LegalDocument>
      </div>
    </>
  );
}
