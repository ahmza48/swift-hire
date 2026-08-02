import type { Metadata } from "next";
import Link from "next/link";

import { LegalDocument } from "@/components/legal-document";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms governing Swift Hire's engineering recruitment services: scope, fees, payment terms, the replacement guarantee, confidentiality and limitation of liability.",
  alternates: { canonical: "/terms-of-service" },
};

const sections = [
  { id: "scope", title: "Scope of service" },
  { id: "engagement", title: "Engaging us" },
  { id: "your-obligations", title: "Your obligations" },
  { id: "fees", title: "Fees" },
  { id: "payment", title: "Payment terms" },
  { id: "guarantee", title: "Replacement guarantee" },
  { id: "candidate-ownership", title: "Candidate introductions" },
  { id: "non-solicit", title: "Non-solicitation" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "data", title: "Data protection" },
  { id: "liability", title: "Limitation of liability" },
  { id: "termination", title: "Termination" },
  { id: "law", title: "Governing law" },
];

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        lead="The commercial terms that apply when a company engages us to recruit on its behalf."
        crumbs={[{ name: "Terms of service", href: "/terms-of-service" }]}
      />

      <div className="bg-paper">
        <LegalDocument updated="1 August 2026" sections={sections}>
          <div className="mb-12 rounded-sm border border-on-paper/20 bg-paper-sunken px-5 py-4">
            <p className="mt-0 font-mono text-[0.75rem] leading-relaxed">
              <strong>Template — not yet legally reviewed.</strong> Fee
              percentages, notice periods and liability caps are placeholders
              marked <code>[…]</code>. A commercial solicitor must review and
              complete this before it governs a real engagement.
            </p>
          </div>

          <h2 id="scope">1. Scope of service</h2>
          <p>
            {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;,
            &ldquo;we&rdquo;) provides recruitment intermediary services: we
            source, screen, technically assess and shortlist candidates on
            behalf of a client company (&ldquo;you&rdquo;).
          </p>
          <p>
            <strong>
              We do not employ the candidates and we do not make offers of
              employment.
            </strong>{" "}
            The decision to interview, to offer and to hire is yours alone, as
            is the resulting employment or contractor relationship. We act as an
            employment agency within the meaning of the Employment Agencies Act
            1973.
          </p>

          <h2 id="engagement">2. Engaging us</h2>
          <p>
            An engagement begins when you sign a role brief or written
            engagement letter that identifies the role, the model (per-hire,
            retained or embedded) and the applicable fee. These terms apply to
            every engagement unless expressly varied in writing.
          </p>

          <h2 id="your-obligations">3. Your obligations</h2>
          <ul>
            <li>
              Provide accurate information about the role, the team, the
              compensation band and the interview process
            </li>
            <li>
              Give feedback on shortlisted candidates within 5 business days —
              delays here are the single largest cause of lost candidates
            </li>
            <li>
              Tell us promptly if the role is paused, cancelled or filled by
              another route
            </li>
            <li>
              Conduct your own right-to-work checks, referencing and any
              regulated background screening required for the role
            </li>
          </ul>

          <h2 id="fees">4. Fees</h2>
          <ul>
            <li>
              <strong>Per-hire (contingency)</strong> — <code>[…]</code>% of the
              candidate&apos;s gross first-year base salary, invoiced on the
              candidate&apos;s start date. Nothing is payable if no hire is
              made.
            </li>
            <li>
              <strong>Retained search</strong> — a retainer of <code>[…]</code>{" "}
              payable in three instalments (engagement, shortlist delivery,
              placement), offset in full against the total fee of{" "}
              <code>[…]</code>% of gross first-year base salary.
            </li>
            <li>
              <strong>Embedded recruiter</strong> — a monthly retainer of{" "}
              <code>[…]</code> with a three-month minimum term. No per-placement
              fee applies.
            </li>
          </ul>
          <p>
            &ldquo;Base salary&rdquo; excludes bonuses, equity, benefits and
            employer contributions unless stated otherwise. Fees are exclusive
            of VAT. For contract placements, fees are charged as an agreed
            margin on the contractor day rate.
          </p>

          <h2 id="payment">5. Payment terms</h2>
          <p>
            Invoices are payable within <code>[…]</code> days of the invoice
            date. Late payments accrue statutory interest under the Late Payment
            of Commercial Debts (Interest) Act 1998. Fees are not contingent on
            the candidate remaining in role except as set out in section 6.
          </p>

          <h2 id="guarantee">6. Replacement guarantee</h2>
          <p>
            If a placed candidate leaves or is dismissed for performance reasons
            within <strong>{siteConfig.guaranteeDays} calendar days</strong> of
            their start date, we will run the search again at no additional fee.
          </p>
          <p>The guarantee applies where:</p>
          <ul>
            <li>All invoices for the placement have been paid in full</li>
            <li>
              You notify us in writing within 14 days of the departure becoming
              known
            </li>
            <li>
              The role has not materially changed from the signed brief
            </li>
            <li>
              The departure is not due to redundancy, restructure, a change in
              the role, or your failure to meet the agreed terms of the offer
            </li>
          </ul>
          <p>
            The guarantee entitles you to a replacement search, not a cash
            refund, and may be exercised once per placement.
          </p>

          <h2 id="candidate-ownership">7. Candidate introductions</h2>
          <p>
            An introduction is the first occasion on which we send you a
            candidate&apos;s details. If you engage a candidate we introduced —
            in any role, directly or through another agency — within{" "}
            <code>[…]</code> months of the introduction, the applicable fee is
            payable.
          </p>
          <p>
            No fee is payable if you can show in writing that you were already
            in an active hiring process with that candidate before our
            introduction. Tell us as soon as you spot a duplicate and we will
            withdraw the candidate.
          </p>

          <h2 id="non-solicit">8. Non-solicitation</h2>
          <p>
            For the duration of an engagement and for 12 months afterwards, we
            will not approach any engineer we have placed with you, nor any
            member of your engineering team, in relation to a role at another
            company. This restriction is on us, not on you.
          </p>

          <h2 id="confidentiality">9. Confidentiality</h2>
          <p>
            Each party will keep the other&apos;s confidential information
            confidential and use it only for the engagement. This includes your
            unannounced products, compensation data and hiring plans, and our
            assessment rubrics, candidate data and fee arrangements. It does not
            apply to information that is public through no fault of the
            receiving party, or that must be disclosed by law.
          </p>
          <p>
            We will not name you as a client, publish a case study, or use your
            logo without your prior written consent.
          </p>

          <h2 id="data">10. Data protection</h2>
          <p>
            Each party acts as an independent data controller for the personal
            data it holds and will comply with applicable data protection law.
            Our handling of personal data is described in the{" "}
            <Link href="/privacy-policy">privacy policy</Link>. You agree to
            process candidate data we share with you only for the purpose of
            assessing that candidate for the role in question.
          </p>

          <h2 id="liability">11. Limitation of liability</h2>
          <p>
            Nothing in these terms limits liability for death or personal injury
            caused by negligence, for fraud or fraudulent misrepresentation, or
            for any liability that cannot lawfully be limited.
          </p>
          <p>
            Subject to that, our total aggregate liability arising out of an
            engagement is limited to the fees paid by you for that engagement in
            the <code>[…]</code> months preceding the claim. Neither party is
            liable for indirect or consequential loss, or for loss of profit,
            revenue, goodwill or anticipated savings.
          </p>
          <p>
            We screen candidates carefully and report our findings honestly, but
            we do not warrant a candidate&apos;s future performance, and the
            hiring decision remains yours.
          </p>

          <h2 id="termination">12. Termination</h2>
          <p>
            Either party may terminate a contingency engagement at any time on
            written notice. Retained and embedded engagements may be terminated
            on <code>[…]</code> days&apos; written notice; retainer instalments
            already invoiced remain payable, and any unearned portion is
            refunded on a pro-rata basis. Fees for candidates already introduced
            survive termination under section 7.
          </p>

          <h2 id="law">13. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales, and the
            courts of England and Wales have exclusive jurisdiction. We may
            update these terms; the version in force is the one published on the
            date your engagement letter is signed.
          </p>
          <p>
            Questions:{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </LegalDocument>
      </div>
    </>
  );
}
