export type Stat = {
  /** Numeric so it can count up when it scrolls into view. */
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

/**
 * PLACEHOLDER METRICS — realistic early-stage figures, not audited results.
 * Replace with real numbers from the ATS before launch and remove this notice.
 */
export const stats: readonly Stat[] = [
  {
    value: 11,
    label: "days to first shortlist",
    note: "Median, from signed brief to profiles in your inbox.",
  },
  {
    value: 25,
    suffix: "%",
    label: "of shortlisted candidates hired",
    note: "Across per-hire and retained engagements in the last 12 months.",
  },
  {
    value: 94,
    suffix: "%",
    label: "placements past 90 days",
    note: "Hires still in role at the end of the guarantee window.",
  },
  {
    value: 90,
    label: "day replacement guarantee",
    note: "We rerun the search at no cost if a hire does not work out.",
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
      "Median 14 days from signed brief to shortlist, because sourcing starts the day after kickoff — not the day after we finish talking about it.",
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

/**
 * PLACEHOLDER TESTIMONIALS — written to be representative of real feedback,
 * but not attributable to real people. Do not publish without written consent
 * from a named client; replace or delete this array before launch.
 */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "We had the role open for five months with two other agencies. Staffing Viro sent four profiles, we interviewed three, and hired the second one. The difference was that they had actually read the code the candidates wrote.",
    name: "Placeholder name",
    role: "VP Engineering",
    company: "Series B fintech",
  },
  {
    quote:
      "The shortlist document included what they thought was wrong with each candidate. Nobody had ever done that before, and it made the decision take an afternoon instead of a fortnight.",
    name: "Placeholder name",
    role: "CTO",
    company: "Health-tech scale-up",
  },
  {
    quote:
      "We used the embedded model to go from 6 to 19 engineers. When the term ended they handed over the templates, the pipeline and the process, and we kept running it ourselves.",
    name: "Placeholder name",
    role: "Head of Talent",
    company: "B2B SaaS, Series A",
  },
];
