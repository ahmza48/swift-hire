export type ProcessStep = {
  title: string;
  agency: string;
  client: string;
  timeframe: string;
  detail: string;
};

/** The full eight-step engagement, in order. */
export const processSteps: readonly ProcessStep[] = [
  {
    title: "Brief and kickoff",
    timeframe: "Day 0–1",
    agency:
      "Runs a 60-minute kickoff, writes the brief, agrees the assessment bar and the scorecard.",
    client: "Fills a short role brief and joins the kickoff call.",
    detail:
      "We pull apart the role before we source for it: the stack, the team it joins, who it reports to, what the first 90 days look like, and the compensation band you can actually sign off. If the brief is unrealistic for the market, you hear it on this call and not six weeks later.",
  },
  {
    title: "Talent sourcing",
    timeframe: "Day 1–4",
    agency:
      "Searches its network, partner platforms and internal database, then runs targeted outbound.",
    client: "Nothing required.",
    detail:
      "Most of the engineers worth hiring are not applying to anything. We map the companies where your role's skills concentrate and approach people directly, with a message about your team rather than a job-board blast.",
  },
  {
    title: "Technical screening",
    timeframe: "Day 3–9",
    agency:
      "Runs the pre-screen — async take-home, live pair-programming, or system design by seniority.",
    client: "Nothing required. Receives the scoring rubric up front.",
    detail:
      "The format follows the role. Mid-level engineers get a timeboxed async problem. Senior engineers pair with one of our technical assessors on real code. Staff and above get a system-design session. You see the rubric before we run it, and the transcript after.",
  },
  {
    title: "Behavioural and culture-fit interview",
    timeframe: "Day 5–10",
    agency:
      "Assesses communication, working style, motivation and alignment to your team.",
    client: "Nothing required.",
    detail:
      "Culture fit is not vibes. We ask about how they handle disagreement in code review, what they do when a deadline is clearly slipping, and why they are leaving their current role — then write down the answers so you can judge them yourself.",
  },
  {
    title: "Shortlist delivery",
    timeframe: "Day 8–12",
    agency:
      "Delivers three to five candidates with assessment results, notes, comp expectations and availability.",
    client: "Reviews the shortlist and picks who to interview.",
    detail:
      "One document per candidate: summary, technical assessment result with evidence, culture-fit notes, salary expectation, notice period, and a plain statement of where we think the risk is. We include the reservations, not just the case for hiring.",
  },
  {
    title: "Client interviews",
    timeframe: "Day 12–18",
    agency:
      "Schedules, prepares candidates, facilitates debriefs, keeps momentum.",
    client: "Runs the final interviews and makes the decision.",
    detail:
      "This is the part we do not take from you. You interview, you decide. We handle the calendar tetris, brief the candidate so they arrive prepared, and run the debrief so a decision actually gets made instead of drifting for a fortnight.",
  },
  {
    title: "Offer and closing",
    timeframe: "Day 18–21",
    agency:
      "Handles negotiation, reference checks, counter-offer risk and candidate communication until signature.",
    client: "Approves the offer.",
    detail:
      "We know the candidate's number before you make an offer, because we asked in week one. If a counter-offer lands, we have already had that conversation with them. Most offers we take to signature close in under four days.",
  },
  {
    title: "Post-placement support",
    timeframe: "Day 30 / 60 / 90",
    agency:
      "Checks in with both sides at 30, 60 and 90 days. Replaces the hire free of charge inside the guarantee window.",
    client: "Onboards the engineer.",
    detail:
      "If the hire does not work out within 90 days, we run the search again at no cost. That guarantee is the reason we cut hard at the screening stage rather than sending you volume.",
  },
] as const;
