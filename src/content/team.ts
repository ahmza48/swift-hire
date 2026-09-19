/*
 * The `team` export previously listed placeholder founders and recruiters
 * (Founder name / Recruiter name / invented biographies). Presenting invented
 * people as the real Staffing Viro team is fabricated social proof, so the
 * array is removed entirely. When the business supplies real names, roles,
 * biographies and public LinkedIn URLs, re-export a `team` array of the
 * shape below and re-import it into /about's People section.
 *
 * export type TeamMember = {
 *   name: string;
 *   role: string;
 *   bio: string;
 *   linkedin: string; // full https:// URL, or empty string to hide the row
 * };
 * export const team: readonly TeamMember[] = [...];
 */

export type Value = {
  name: string;
  claim: string;
  evidence: string;
};

/*
 * How we operate — four commitments used by /about. Every claim below is
 * checkable against the site's documented process, so the copy stays free
 * of unsupported performance figures.
 */
export const values: readonly Value[] = [
  {
    name: "Transparency",
    claim: "You see the process, the rubric and the reservations.",
    evidence:
      "Every shortlist profile includes what we think is weak about the candidate, not just the case for hiring them. The full recruitment process is published on this site with the responsibility split written next to every step.",
  },
  {
    name: "Specialist depth",
    claim: "Someone who knows the discipline reads every profile.",
    evidence:
      "Technical searches are run by recruiters with engineering backgrounds; corporate searches by function specialists. No keyword matching, no CV parsing as a substitute for judgement.",
  },
  {
    name: "Speed with a floor",
    claim: "Fast, until fast would mean lowering the bar.",
    evidence:
      "Sourcing starts the day after kickoff. If we cannot fill a role to standard we say so in the second or third week — not after a stream of near-misses for three months.",
  },
  {
    name: "Candidate respect",
    claim: "Candidates are people we will deal with again.",
    evidence:
      "Everyone who reaches assessment gets feedback, whatever the outcome. No weekend take-homes, no unpaid work, no ghosting. It costs us time and it is the reason people take our calls.",
  },
];
