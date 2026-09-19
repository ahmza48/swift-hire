export type ProcessStep = {
  title: string;
  agency: string;
  client: string;
  timeframe: string;
  detail: string;
};

/**
 * The recruitment engagement, in five beats.
 *
 * Each step is written so the split of responsibility is obvious at a glance:
 * `agency` describes what our team does, `client` describes what yours does.
 * `detail` is the /how-it-works long form. `timeframe` is a directional
 * range from a typical engagement — not a headline promise; the homepage and
 * /how-it-works both read from these fields, so wording that appears there
 * is edited here.
 */
export const processSteps: readonly ProcessStep[] = [
  {
    title: "Post Your Job",
    timeframe: "Kickoff",
    agency:
      "Turns your brief into a hiring specification: responsibilities, required skills, seniority, compensation band and hiring timeline — captured in writing before sourcing starts.",
    client:
      "Shares the role, the team it joins, the budget it sits inside and the timeline you are working to. One 60-minute kickoff call.",
    detail:
      "The brief we agree in this session is the reference every later step scores against — so it is worth taking seriously. We pull apart the role, the team, the reporting line, the pay band and the first-90-days plan; if the brief is unrealistic for the market at that number, you hear it before sourcing begins.",
  },
  {
    title: "Search & Review",
    timeframe: "Weeks 1–2",
    agency:
      "Reviews our existing talent network first, then runs targeted outbound and reviews any new applicant flow — so the candidate pool includes people you would never have surfaced yourself.",
    client:
      "Nothing required. Receives a weekly summary of pipeline volume and any early signal.",
    detail:
      "We start with the candidates we already know — the placements we have made before, the people we have interviewed recently — because that is the fastest and most reliable source of hire. Alongside that we run targeted outbound to the companies where the profile lives, and review any live applicant flow you have. The volume at this stage is the whole point; it is what makes the later cuts affordable.",
  },
  {
    title: "Screen & Interview",
    timeframe: "Weeks 2–3",
    agency:
      "Screens every candidate against the rubric agreed at kickoff and runs the initial interview or assessment — so unsuitable candidates never reach your calendar.",
    client:
      "Nothing required. Receives the scoring rubric up front so nothing about the process is a surprise.",
    detail:
      "A specialist recruiter runs the initial screen and interview against the rubric we agreed with you — technical exercise for engineers, competency interview for corporate and leadership roles. Two thirds of the pool drops out at this stage; you do not lose an hour of your team's time to any of them. The transcript and scoring for the ones who advance goes into the shortlist so you can judge our reasoning.",
  },
  {
    title: "Analyze & Shortlist",
    timeframe: "Weeks 3–4",
    agency:
      "Evaluates every advanced candidate against the agreed criteria — relevant experience, skills, interview evidence, availability, compensation — and shortlists only the strongest three to five.",
    client:
      "Nothing required at this stage. The shortlist arrives as one document per candidate.",
    detail:
      "Every candidate who cleared the screen is evaluated against the criteria that came out of kickoff. Only the ones who genuinely fit the specification are shortlisted; the ones who nearly fit are declined with feedback rather than sent forward as filler. Each shortlisted profile carries the assessment evidence, the compensation expectations, the notice period and a plain statement of where we think the risk is.",
  },
  {
    title: "Profiles Delivered",
    timeframe: "Weeks 4+",
    agency:
      "Presents three to five shortlisted profiles with the screening and interview evidence attached — then manages the offer, negotiation and post-placement check-ins.",
    client:
      "Reviews the shortlist, runs your own final interviews with the candidates you want to meet, makes the hire.",
    detail:
      "You receive one written document per candidate — assessment result, culture-fit notes, compensation expectations and notice period — so you can decide who to interview from the summary rather than a stack of resumes. Once you pick, we handle the calendar, negotiate the offer to signature and check in at 30, 60 and 90 days. Every placement is covered by our written 90-day replacement guarantee.",
  },
] as const;
