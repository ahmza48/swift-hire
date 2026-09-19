export type Stat = {
  /** Numeric so it can count up when it scrolls into view. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

/*
 * The numeric `stats` block that previously lived here (11-day shortlist,
 * 25% shortlist-to-hire, 94% 90-day retention) has been retired: those
 * figures were placeholder metrics with no verified source in the codebase,
 * and the site cannot publish precise performance numbers it cannot back up.
 * The homepage now uses a qualitative `commitments` strip instead — every
 * item below is a documented process commitment rather than a claimed
 * outcome, so nothing here relies on unverified data.
 *
 * If audited metrics become available, add them back as a `stats` export
 * alongside `commitments` and render them in a separate section — do not
 * conflate the two.
 */

export type Commitment = {
  title: string;
  note: string;
};

export const commitments: readonly Commitment[] = [
  {
    title: "Structured screen on every role",
    note: "Every candidate is scored against the rubric we agreed with you at kickoff. Verdict on its own is never enough.",
  },
  {
    title: "Evidence attached to every shortlist",
    note: "Assessment output, references and reservations delivered with each candidate — so you evaluate our reasoning, not our score.",
  },
  {
    title: "90-day replacement guarantee",
    note: "If a placement leaves inside the first ninety days, we rerun the search at no additional fee. Written into the engagement letter.",
  },
  {
    title: "One team, brief to signature",
    note: "The consultant who takes your brief runs the search through to a signed offer. No handoff to a delivery pool.",
  },
];

export type PainPoint = {
  problem: string;
  cost: string;
  answer: string;
};

export const painPoints: readonly PainPoint[] = [
  {
    problem: "Your team has never hired for this role",
    cost:
      "Generalist recruiters screen on keywords, so the shortlist is long, plausible and wrong for the actual job.",
    answer:
      "Every profile is read by a specialist who has recruited into this discipline before, against a rubric agreed with your hiring manager.",
  },
  {
    problem: "The role has been open for months",
    cost:
      "Projects slip, the team absorbs the work, and your strongest players start looking somewhere else too.",
    answer:
      "Sourcing starts the day after kickoff, not the day after we finish talking about it — so shortlists arrive in weeks, not months.",
  },
  {
    problem: "Interviews are eating your leadership's week",
    cost:
      "Hours of senior time per candidate, most of it spent on people who never should have reached the calendar.",
    answer:
      "We run the technical or competency screen and hand you the transcript. Your team only meets the final three to five.",
  },
  {
    problem: "The last hire did not work out",
    cost:
      "A mis-hire costs roughly six months of salary once you count ramp, exit and the rerun of the search.",
    answer:
      "Structured assessment with written evidence, plus a 90-day replacement guarantee we have to honour if the placement leaves.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

/*
 * The testimonials array is deliberately empty.
 *
 * The earlier placeholder quotes were representative of real feedback but
 * were not attributable to real, consenting clients — publishing them would
 * count as fabricated social proof, which the site actively guards against.
 * The homepage checks `testimonials.length` and hides the section entirely
 * when empty, so nothing renders until real, named, consented quotes land
 * here.
 *
 * TODO: replace with real, written-consent testimonials before publishing.
 */
export const testimonials: readonly Testimonial[] = [];
