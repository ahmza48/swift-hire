export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
};

/**
 * PLACEHOLDER PEOPLE — names, bios and LinkedIn URLs are invented. Replace with
 * the real founding team before launch; do not publish invented biographies.
 */
export const team: readonly TeamMember[] = [
  {
    name: "Founder name",
    role: "Co-founder, Client Partnerships",
    bio: "Twelve years in technical recruitment, the last six leading engineering hiring at a Series C platform business. Started Staffing Viro after watching a fourth client be sent the same recycled shortlist by three different agencies.",
    linkedin: "https://www.linkedin.com/company/swifthire",
  },
  {
    name: "Founder name",
    role: "Co-founder, Technical Assessment",
    bio: "Backend engineer turned assessor. Nine years shipping Go and Python services, then four years designing hiring rubrics. Writes and runs every technical screen format we use.",
    linkedin: "https://www.linkedin.com/company/swifthire",
  },
  {
    name: "Recruiter name",
    role: "Senior Recruiter, Platform & Data",
    bio: "Specialises in infrastructure, SRE and data engineering searches. Previously in-house at two scale-ups, so knows what it feels like to be on the receiving end of a bad shortlist.",
    linkedin: "https://www.linkedin.com/company/swifthire",
  },
];

export type Value = {
  name: string;
  claim: string;
  evidence: string;
};

export const values: readonly Value[] = [
  {
    name: "Transparency",
    claim: "You see the process, the rubric and the reservations.",
    evidence:
      "Every shortlist profile includes what we think is weak about the candidate, not just the case for hiring them. The full eight-step process is published on this site with timings.",
  },
  {
    name: "Technical rigour",
    claim: "Someone who has written code reads every profile.",
    evidence:
      "No keyword matching, no CV parsing as a substitute for judgement. You get the assessment transcript, so you can check our reasoning rather than trust our score.",
  },
  {
    name: "Speed with a floor",
    claim: "Fast, until fast would mean lowering the bar.",
    evidence:
      "Median 11 days to first shortlist. If we cannot fill a role to standard, you hear that in week two — not a stream of near-misses for three months.",
  },
  {
    name: "Candidate respect",
    claim: "Engineers are people we will deal with again.",
    evidence:
      "Everyone who reaches assessment gets feedback, whatever the outcome. No weekend take-homes, no unpaid work, no ghosting. It costs us time and it is the reason people take our calls.",
  },
];
