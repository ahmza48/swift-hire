/**
 * The screening funnel.
 *
 * PLACEHOLDER DATA — these counts are a representative engagement, not audited
 * figures. Replace `count` and `window` with real numbers from the ATS before
 * launch; the copy in `detail` describes the actual process and can stay.
 */
export type PipelineStage = {
  id: string;
  label: string;
  count: number;
  /** Bar width as a percentage. Tuned for legibility — the true ratio would
   *  render the final stage sub-pixel. Real counts are always shown as text. */
  width: number;
  window: string;
  owner: "Staffing Viro" | "You" | "Together";
  detail: string;
};

export const pipelineStages: readonly PipelineStage[] = [
  {
    id: "sourced",
    label: "Sourced",
    count: 240,
    width: 100,
    window: "Days 1–4",
    owner: "Staffing Viro",
    detail:
      "We search our network, partner platforms and our own database, then run outbound to passive engineers who aren't looking. Volume at this stage is the whole point — it is what makes the later cuts affordable.",
  },
  {
    id: "screened",
    label: "Screened",
    count: 68,
    width: 62,
    window: "Days 3–6",
    owner: "Staffing Viro",
    detail:
      "A recruiter who has shipped software reads every profile against your brief — stack, domain, team size, trajectory. Two thirds drop out here, and none of them reach your inbox.",
  },
  {
    id: "assessed",
    label: "Assessed",
    count: 19,
    width: 38,
    window: "Days 5–9",
    owner: "Staffing Viro",
    detail:
      "Technical pre-screen, matched to the role: an async take-home for mid-level, live pair-programming for senior, system design for staff and above. You get the transcript and our scoring, not just a verdict.",
  },
  {
    id: "shortlisted",
    label: "Shortlisted",
    count: 4,
    width: 20,
    window: "Days 8–12",
    owner: "Together",
    detail:
      "Three to five profiles land with you: assessment results, culture-fit notes, compensation expectations and notice period. Every one of them has already said yes to your role in principle.",
  },
  {
    id: "hired",
    label: "Hired",
    count: 1,
    width: 10,
    window: "Days 12–21",
    owner: "You",
    detail:
      "You run the final interviews and make the call. We schedule, facilitate debriefs, negotiate the offer and keep the candidate warm until the contract is signed — then check in at 30, 60 and 90 days.",
  },
] as const;
