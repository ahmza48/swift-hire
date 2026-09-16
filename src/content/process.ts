export type ProcessStep = {
  title: string;
  agency: string;
  client: string;
  timeframe: string;
  detail: string;
};

/**
 * The engagement, condensed to four beats.
 *
 * Each step is written so the split of responsibility is obvious at a glance:
 * `agency` is the sentence describing what our team does, `client` is the
 * sentence describing what yours does. `detail` fleshes it out on
 * /how-it-works. `timeframe` is the median from live engagements — not a
 * best case, not a promise.
 */
export const processSteps: readonly ProcessStep[] = [
  {
    title: "Post the job",
    timeframe: "Day 0–2",
    agency:
      "Runs the kickoff, writes the brief, agrees the scoring rubric and starts the search — proactive outbound plus our own network.",
    client:
      "Fills a short role brief and joins a 60-minute kickoff call. That is your entire lift for this stage.",
    detail:
      "We pull the role, the team, the reporting line and the pay band apart in one call — so the search runs against a real specification, not a job description. Sourcing starts inside 48 hours: partner platforms, our own database, and targeted outbound to people who are not applying to anything. If the brief cannot be filled at the pay band you have in that market, you hear it in the first hour.",
  },
  {
    title: "Review applications",
    timeframe: "Day 2–8",
    agency:
      "Screens every profile against the rubric, reads the resume and the evidence, and drops the ones that do not clear the bar — before they reach your inbox.",
    client:
      "Nothing required. You get a weekly summary of pipeline volume and any early signal.",
    detail:
      "A recruiter who knows the discipline reads every profile — CV, portfolio or code sample as appropriate — and scores it against the rubric we agreed with you. Two thirds of applicants drop out at this stage. You only see the ones who cleared it, with the scoring evidence attached so you can judge our reasoning rather than just our verdict.",
  },
  {
    title: "Take interviews",
    timeframe: "Day 8–14",
    agency:
      "Runs the technical or competency interview, writes it up, and delivers three to five shortlisted candidates with a written recommendation per person.",
    client:
      "Reviews the shortlist and runs your own final interviews with the candidates you want to meet.",
    detail:
      "Assessment format follows the role — technical exercise for engineers, competency interview for leadership hires, portfolio review for architecture and design. You receive the shortlist as one document per candidate: assessment result with evidence, culture-fit notes, compensation expectations, notice period and a plain statement of where we think the risk is. Then you interview only the people worth interviewing.",
  },
  {
    title: "Analyze and schedule",
    timeframe: "Day 14–21",
    agency:
      "Manages the offer, negotiation, references and counter-offer risk to signature — then plans the start date and onboarding cadence with both sides.",
    client:
      "Approves the offer and receives a scheduled start plan matched to your team's needs.",
    detail:
      "We know the candidate's number before you make an offer, because we asked in week one — so counter-offers rarely surprise anyone. Once an offer is signed, we work with your team on start date, onboarding cadence and any handover needed on their side. We then check in at 30, 60 and 90 days, and cover a replacement inside that window at no additional cost if the hire does not work out.",
  },
] as const;
