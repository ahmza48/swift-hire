/**
 * Single source of truth for the recruitment service catalogue.
 *
 * Six specialist recruitment services, each with its own sub-page, mega-menu
 * entry, footer link, sitemap row and homepage card. Adding a seventh means
 * adding one object here and one glyph in `components/icons/service-icon.tsx`
 * — every downstream surface picks it up automatically.
 */

export type ServiceIcon =
  | "technical"
  | "executive"
  | "contract"
  | "permanent"
  | "corporate"
  | "consulting";

export type Service = {
  slug: string;
  name: string;
  icon: ServiceIcon;
  /** One line. Used on menu cards and grid cards — keep it under ~110 chars. */
  tagline: string;
  /** Two sentences. Used as the sub-page hero lead. */
  description: string;
  /** Search-engine description for the sub-page. */
  metaDescription: string;
  /** Capabilities we deliver inside this service. */
  included: readonly { title: string; body: string }[];
  /** Team-lead personas or business situations this service fits. */
  audience: readonly { title: string; body: string }[];
  /** Numbered engagement steps, specific to how this service is run. */
  process: readonly { title: string; body: string }[];
  /** Reasons buyers pick us for this service specifically. */
  why: readonly { title: string; body: string }[];
};

export const services: readonly Service[] = [
  /* ---------------------------------------------------------------- */
  /* 1. TECHNICAL TALENT ACQUISITION                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: "technical-talent-acquisition",
    name: "Technical Talent Acquisition",
    icon: "technical",
    tagline:
      "Focused hiring for software engineering, DevOps, platform, data, AI/ML, QA and infrastructure roles.",
    description:
      "Specialist recruitment for the disciplines where a keyword-matched CV is not enough. We source, screen and technically assess engineers so your team only spends time on candidates who could genuinely do the job.",
    metaDescription:
      "Technical recruitment and technology staffing — software engineering, DevOps, platform, data, AI/ML, QA and infrastructure hires evaluated by recruiters who can read the work.",

    included: [
      {
        title: "Full-stack, backend and frontend engineering",
        body: "Senior individual contributors through to engineering leadership across web, mobile, distributed systems and product engineering.",
      },
      {
        title: "DevOps, platform and infrastructure",
        body: "SREs, platform engineers, cloud architects and IaC specialists across AWS, GCP, Azure and Kubernetes ecosystems.",
      },
      {
        title: "Data, AI/ML and analytics",
        body: "Data engineers, analytics engineers, ML engineers and applied scientists — from pipeline builders to production-grade model owners.",
      },
      {
        title: "QA, security and reliability",
        body: "QA leads, test automation engineers, application-security engineers and reliability specialists — the roles that keep shipped software honest.",
      },
      {
        title: "Structured technical assessment",
        body: "Format follows the role: timeboxed async problem, live pair-programming, or system-design session. You see the rubric before we run it and the transcript after.",
      },
    ],

    audience: [
      {
        title: "Engineering leaders scaling a team",
        body: "You know the shape of the role you need, you just do not have another twenty hours a week to run the search yourself.",
      },
      {
        title: "In-house recruiters needing depth in one function",
        body: "Your talent team covers the whole business; you want a specialist partner for the engineering roles nobody internal has hired for before.",
      },
      {
        title: "Founders making a first senior technical hire",
        body: "The first staff-plus engineer, VP or CTO — where a poor match resets your roadmap by a year and you need the process taken seriously.",
      },
    ],

    process: [
      {
        title: "Kickoff and technical brief",
        body: "60-minute call with the hiring manager to pull the role, the stack, the team and the compensation band apart. If the brief cannot be filled at that number in this market, you hear it in the first hour.",
      },
      {
        title: "Sourcing and rubric-scored screen",
        body: "Outbound to the companies where the skills concentrate plus a walk of our own network. Every profile is scored against the rubric we agreed with you — engineers you would consider only.",
      },
      {
        title: "Technical assessment",
        body: "Async take-home, live pair-programming or system-design — whichever format fits the role and seniority. You receive the transcript and our scoring, not a single-word verdict.",
      },
      {
        title: "Shortlist and offer support",
        body: "Three to five profiles, each with the assessment evidence attached. We handle the negotiation and counter-offer risk to signature, then check in at 30, 60 and 90 days.",
      },
    ],

    why: [
      {
        title: "Recruiters who have shipped code",
        body: "Every profile is read by someone with an engineering background. No keyword filters standing in for judgement.",
      },
      {
        title: "Assessment evidence, not verdicts",
        body: "You receive the raw assessment output alongside the shortlist so you can judge our reasoning rather than trust our score.",
      },
      {
        title: "Confidential outreach",
        body: "We approach passive engineers with a message about your team and your problem, not a job-board blast under our name.",
      },
      {
        title: "90-day replacement guarantee",
        body: "If a placement leaves inside the first ninety days, we rerun the search at no additional fee.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 2. EXECUTIVE SEARCH & RECRUITMENT                                */
  /* ---------------------------------------------------------------- */
  {
    slug: "executive-search-recruitment",
    name: "Executive Search & Recruitment",
    icon: "executive",
    tagline:
      "Discreet search for leadership, director, VP, executive and C-suite appointments.",
    description:
      "Confidential search for the senior appointments that reset a company's trajectory. Structured competency interviews, careful referencing, and a shortlist you can put in front of a board.",
    metaDescription:
      "Executive recruitment and leadership search — director, VP and C-suite appointments across engineering, product, sales, finance, operations and technology.",

    included: [
      {
        title: "Director, VP and C-suite search",
        body: "Retained and exclusive search for senior appointments across functions — engineering, product, sales, finance, operations, technology and general management.",
      },
      {
        title: "Confidential mandate handling",
        body: "Replacement searches, board-level appointments and reorganisations run under strict NDA — including on the candidate side, so approaches are not traceable back to your business.",
      },
      {
        title: "Structured competency assessment",
        body: "Behavioural interviews built around the four or five decisions the role will actually have to make in the first year. Answers are captured verbatim so you evaluate real evidence.",
      },
      {
        title: "Reference and backchannel work",
        body: "Structured references from named prior colleagues, plus discreet backchannel checks where the profile calls for it — with full transparency about what we asked and heard.",
      },
      {
        title: "Board and stakeholder alignment",
        body: "Where a search involves a board, investor or executive committee, we manage the calibration and debrief cycles so decisions stay aligned across everyone with a vote.",
      },
    ],

    audience: [
      {
        title: "CEOs building or replacing an exec team",
        body: "You are hiring your first VP of Engineering, CRO or CFO, or replacing one — the appointment will define the next 24 months and warrants a real search rather than a network ping.",
      },
      {
        title: "Boards running a confidential mandate",
        body: "A search that cannot be advertised, cannot be handled internally, and needs the current incumbent left in place until the successor is in seat.",
      },
      {
        title: "Investors backing a portfolio company",
        body: "You need an experienced operator into one of your investments — quickly, confidentially, and with references you can trust because they are already in your circle.",
      },
    ],

    process: [
      {
        title: "Mandate scoping",
        body: "One to two working sessions with the sponsor to define the mandate, the success criteria, the profile shape and any absolute constraints. NDA and engagement letter signed before outreach starts.",
      },
      {
        title: "Long-list and initial interviews",
        body: "Targeted mapping and outreach across the sectors where the profile lives, followed by structured first interviews. Long-list report delivered inside three weeks.",
      },
      {
        title: "Shortlist and competency interviews",
        body: "Three to five candidates through structured competency interviews. You receive a written report per candidate: strengths, risks, evidence, references, package expectations.",
      },
      {
        title: "Sponsor interviews, references and offer",
        body: "We coordinate sponsor interviews, run references, support offer negotiation and manage counter-offer risk. Standard search timeline: eight to twelve weeks from mandate to signed offer.",
      },
    ],

    why: [
      {
        title: "Retained and exclusive",
        body: "We work retained on senior appointments because a contingent search on a critical role has the wrong incentive shape. Committed capacity, committed timeline.",
      },
      {
        title: "Discretion by default",
        body: "Every mandate is handled as if it were confidential — because most of them are, and the ones that are not lose nothing by being run to the same standard.",
      },
      {
        title: "Named search lead",
        body: "One senior consultant runs your search end-to-end. No handoffs to a delivery pool once the engagement letter is signed.",
      },
      {
        title: "Fixed-fee, no surprises",
        body: "Retainer structure is written into the engagement letter with milestones and deliverables attached — not a percentage that keeps climbing as base salaries move.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 3. CONTRACT STAFFING                                             */
  /* ---------------------------------------------------------------- */
  {
    slug: "contract-staffing",
    name: "Contract Staffing",
    icon: "contract",
    tagline:
      "Pre-vetted professionals for temporary, project-based, fixed-term and contract requirements.",
    description:
      "Interim specialists deployed into your team on fixed-term, day-rate or project engagements. Same vetting standard as our permanent placements — no CV-shuffling, no bench-warming.",
    metaDescription:
      "Contract staffing and temporary recruitment — pre-vetted specialists for project-based, fixed-term and day-rate engagements across technology and corporate functions.",

    included: [
      {
        title: "Day-rate and fixed-term contractors",
        body: "Independent contractors and PAYE consultants deployed on rolling or defined-length engagements. Onboarded in days, not weeks.",
      },
      {
        title: "Project and interim leadership",
        body: "Interim heads of function, transformation leads and programme managers for defined pieces of work with a clear end state.",
      },
      {
        title: "Compliance and payroll handled",
        body: "Right-to-work checks, contractor agreements, insurance verification and payroll processing all handled by us — you receive one clean invoice.",
      },
      {
        title: "Backfill and holiday cover",
        body: "Short-notice interim cover for maternity, sabbatical or unexpected departures — where the alternative is a role sitting open and the team absorbing the work.",
      },
      {
        title: "Contract-to-hire pipeline",
        body: "Where a contract-to-hire structure fits, we scope the conversion terms up front so the transition to a permanent offer at the end of an engagement is straightforward for both sides.",
      },
    ],

    audience: [
      {
        title: "Teams with a defined project",
        body: "A migration, a launch, a rebuild — a body of work that is real and finite, and does not justify adding permanent headcount you would then have to redeploy.",
      },
      {
        title: "Operations under sudden pressure",
        body: "Volume, absence or leadership departure has left a specific capability short — you need capable people billing by the day, starting inside two weeks.",
      },
      {
        title: "Companies testing a specialisation",
        body: "You are considering building an in-house function around a discipline you have never staffed — an interim specialist proves the shape before you commit to hiring permanent.",
      },
    ],

    process: [
      {
        title: "Requirements and rates",
        body: "Fifteen-minute call to scope the requirement: skills, seniority, day-rate range, expected duration, on-site vs remote. You approve the shortlist criteria before we start outreach.",
      },
      {
        title: "Talent-network activation",
        body: "First pass through our network of active contractors — most of whom we have placed before, and whose most recent references and rates we already hold on file.",
      },
      {
        title: "Screen and CV delivery",
        body: "Availability check, rate confirmation, right-to-work verification and a brief technical or competency screen. You typically see profiles inside 48 to 72 hours.",
      },
      {
        title: "Onboarding and management",
        body: "Contracts issued, insurance verified, timesheet and expenses tooling set up. We manage the commercial and compliance side — you focus on the deliverables.",
      },
    ],

    why: [
      {
        title: "Network of returning contractors",
        body: "A large fraction of the contractors we place are people we have placed before. Familiar work standards, faster onboarding, fewer surprises.",
      },
      {
        title: "Compliance carried by us",
        body: "IR35 assessments, right-to-work checks, insurance verification and contractor agreements are all handled inside our engagement — one route to a compliant workforce.",
      },
      {
        title: "One consolidated invoice",
        body: "Timesheet approvals, expense reconciliation and invoicing rolled into a single monthly line, priced against the day-rate you agreed.",
      },
      {
        title: "Replacement inside the contract",
        body: "If a contractor is not the right fit inside the first two weeks of engagement, we replace at no additional cost.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 4. PERMANENT PLACEMENTS                                          */
  /* ---------------------------------------------------------------- */
  {
    slug: "permanent-placements",
    name: "Permanent Placements",
    icon: "permanent",
    tagline:
      "End-to-end recruitment for candidates joining your permanent workforce, backed by a 90-day guarantee.",
    description:
      "Direct hires you carry on your own payroll. Sourced, screened and closed to signature with our documented process and a written 90-day replacement guarantee — for every role we run, not just the ones we like.",
    metaDescription:
      "Permanent recruitment and direct-hire staffing across technology, corporate and specialist functions. Structured screening and a 90-day replacement guarantee on every placement.",

    included: [
      {
        title: "End-to-end permanent search",
        body: "One brief, one search, one shortlist, one placement — from kickoff to signed offer, with the same team throughout.",
      },
      {
        title: "Discovery and role calibration",
        body: "Kickoff session to codify the requirements, the compensation band and the profile shape — plus a market reality check on all three.",
      },
      {
        title: "Structured screen and interview",
        body: "Every candidate assessed against the rubric agreed at kickoff. Screening artefacts (scoring, transcripts, references) delivered with the shortlist.",
      },
      {
        title: "Offer and onboarding support",
        body: "We manage the negotiation, references, counter-offer risk and candidate communication to signature — plus 30-60-90 day check-ins with both sides.",
      },
      {
        title: "90-day replacement guarantee",
        body: "If a placement leaves inside the first ninety days, we rerun the search at no additional fee. Written into the engagement letter, not the small print.",
      },
    ],

    audience: [
      {
        title: "Companies building permanent capability",
        body: "You are hiring for the long term — a role you expect to be filled by the same person in three years — and want the search run with that horizon in mind.",
      },
      {
        title: "Teams that have already run a bad search",
        body: "You have been through one or two agency shortlists that were long, plausible and wrong for the role. You want a structured process with evidence attached.",
      },
      {
        title: "HR teams with too much on",
        body: "Your talent team is stretched across too many roles at once. A partner takes one requisition off the queue and runs it properly.",
      },
    ],

    process: [
      {
        title: "Kickoff and brief",
        body: "60-minute session with the hiring manager and any second decision-maker to pull the role, the team and the offer band apart. Rubric agreed in writing before sourcing starts.",
      },
      {
        title: "Sourcing and screening",
        body: "Proactive outbound to the pools where the profile lives, plus a walk of our own network and the current applicant flow if any. Every profile is scored against the rubric.",
      },
      {
        title: "Assessment and shortlist",
        body: "Three to five profiles with assessment evidence, compensation expectations and notice period. Delivered as one document per candidate.",
      },
      {
        title: "Offer, close and post-placement",
        body: "Managed negotiation, references and counter-offer risk to signature, then 30-60-90 day check-ins. Replacement inside the guarantee window at no charge.",
      },
    ],

    why: [
      {
        title: "Same team, brief to signature",
        body: "The consultant who takes the brief runs the search to signature. No handoff between a business-development lead and a delivery pool.",
      },
      {
        title: "Evidence with every profile",
        body: "Assessment output, rubric score and reservations attached to every shortlist entry so you can evaluate our reasoning, not just our verdict.",
      },
      {
        title: "Written guarantee",
        body: "90-day replacement guarantee sits in the engagement letter — not in a marketing footer.",
      },
      {
        title: "One transparent fee",
        body: "Percentage of accepted base, agreed in writing, invoiced on offer signature. No shortlist fees, no retainer creep, no re-billing on the replacement.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 5. CORPORATE RECRUITMENT                                         */
  /* ---------------------------------------------------------------- */
  {
    slug: "corporate-recruitment",
    name: "Corporate Recruitment",
    icon: "corporate",
    tagline:
      "Recruitment across finance, operations, sales, marketing, legal, administration and other corporate functions.",
    description:
      "Recruitment for the roles that keep the business running: finance and accounting, sales and marketing, legal, operations, administration and general management. Structured, evidence-led and priced per hire.",
    metaDescription:
      "Corporate recruitment and professional staffing across finance, operations, sales, marketing, legal and administration — for scale-ups and established businesses.",

    included: [
      {
        title: "Finance, accounting and audit",
        body: "From qualified accountants and financial controllers through to finance directors and heads of FP&A — for scale-ups building the function and established teams filling a gap.",
      },
      {
        title: "Sales, marketing and revenue",
        body: "AEs, BDMs, sales leaders, marketing managers and revenue operations — with a screen for real quota history rather than resume claims.",
      },
      {
        title: "Legal, compliance and risk",
        body: "In-house counsel, commercial and contracts lawyers, compliance and regulatory specialists — for corporate legal teams building or extending capability.",
      },
      {
        title: "Operations and administration",
        body: "Office managers, operations leads, executive assistants and business support — the roles that quietly determine how a company actually runs.",
      },
      {
        title: "Human resources and people ops",
        body: "HR managers, people partners, talent acquisition leads and heads of people — recruiting for the function that recruits everyone else.",
      },
    ],

    audience: [
      {
        title: "Scale-ups building the corporate spine",
        body: "You have Series B money to spend on the roles that turn a startup into a company. You want the searches run structured — because these appointments will hire everyone who comes after.",
      },
      {
        title: "Established businesses replacing a leaver",
        body: "A senior corporate hire has moved on and the role has been open for two months. You want to compress the next search and shortlist people who could stay.",
      },
      {
        title: "Businesses standing up a new function",
        body: "You are hiring the first head of a function that did not previously exist internally — legal, HR, revenue ops — and want candidates who have done it before at a similar-stage business.",
      },
    ],

    process: [
      {
        title: "Kickoff and role brief",
        body: "60-minute session with the hiring manager to pull apart the role, the team and the offer band. Rubric agreed before sourcing begins.",
      },
      {
        title: "Sourcing and structured screen",
        body: "Proactive outbound and network activation. Every profile is scored against the rubric agreed at kickoff before any candidate is sent to you.",
      },
      {
        title: "Competency interview and shortlist",
        body: "Structured competency interview against the role's real decisions, then three to five profiles with evidence attached. Written report per candidate.",
      },
      {
        title: "Offer, close and post-placement",
        body: "Negotiation, references and counter-offer risk managed to signature. 30-60-90 day check-ins with both sides, and a written 90-day replacement guarantee.",
      },
    ],

    why: [
      {
        title: "Function specialists",
        body: "Our corporate desks are grouped by function — finance recruiters run finance searches, not sales searches this week and finance searches next.",
      },
      {
        title: "Real evidence over resume gloss",
        body: "We interview against the decisions the role will have to make in year one. Written answers are captured so you can evaluate the reasoning, not the wording.",
      },
      {
        title: "Transparent per-hire pricing",
        body: "One fee, agreed in writing, tied to the accepted offer. No shortlist fees, no retainer surprises.",
      },
      {
        title: "90-day guarantee",
        body: "If a placement leaves inside the first ninety days, we run the search again at no additional fee.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 6. HR CONSULTING                                                 */
  /* ---------------------------------------------------------------- */
  {
    slug: "hr-consulting",
    name: "HR Consulting",
    icon: "consulting",
    tagline:
      "Hiring strategy, process design, compensation benchmarking and recruitment optimisation — delivered as engagements, not decks.",
    description:
      "Advisory work for teams that want to fix hiring itself, not just take another role to market. Hiring plans, interview process design, compensation benchmarking, recruitment analytics and vendor management — delivered as time-boxed engagements with named deliverables.",
    metaDescription:
      "HR consulting and recruitment advisory: hiring plan design, interview process, compensation benchmarking, recruitment analytics and vendor management for growing teams.",

    included: [
      {
        title: "Hiring plan design",
        body: "A quarterly or annual hiring plan built off the business plan — roles, timing, compensation ranges, sequencing and named accountable owners for each seat.",
      },
      {
        title: "Interview process design",
        body: "A written interview process per role family: stages, scoring rubrics, interviewer training and calibration cadence. Deliverable is a working process, not a slide deck.",
      },
      {
        title: "Compensation benchmarking",
        body: "Data-backed compensation bands for the roles you are hiring and the ones you are retaining. Refreshed on a documented cadence so ranges do not drift.",
      },
      {
        title: "Recruitment analytics",
        body: "Basic funnel, time-to-hire, source-of-hire and offer-acceptance dashboards wired into your ATS. What gets measured actually improves.",
      },
      {
        title: "Vendor and agency management",
        body: "Selection, briefing, performance measurement and consolidation of the recruitment partners you already work with — because the average scale-up has too many.",
      },
    ],

    audience: [
      {
        title: "Scale-ups with hiring plans and no head of talent",
        body: "You have a plan for 40 hires this year and one part-time recruiter running everything. You want the plan pressure-tested and the process built before the hiring starts.",
      },
      {
        title: "Teams overpaying for outcomes",
        body: "The recruitment agency spend is too high, the average time-to-hire is too long and nobody can point to which channel actually works. You want the numbers surfaced.",
      },
      {
        title: "In-house talent teams needing a partner",
        body: "You have a capable talent function but a specific weakness — assessment design, compensation, analytics — and need a partner to fill it rather than a full-time hire.",
      },
    ],

    process: [
      {
        title: "Diagnostic",
        body: "Two-week diagnostic: interviews with hiring managers, review of the current process and metrics, and a written summary of what is working, what is not and what the ROI on fixing each looks like.",
      },
      {
        title: "Scoped engagement",
        body: "One or two focused workstreams — hiring plan, process redesign, compensation, analytics — with named deliverables, a timeline and a fixed fee.",
      },
      {
        title: "Delivery",
        body: "Working sessions with your team through the engagement, not slide-review meetings. Deliverables land as documents and running processes, not PDFs.",
      },
      {
        title: "Handover and measurement",
        body: "A written handover document and a follow-up 30 and 90 days after delivery to measure whether the changes moved the metric they were supposed to move.",
      },
    ],

    why: [
      {
        title: "Deliverables you can operate",
        body: "Every engagement lands as a running process — an interview kit your interviewers use, a comp framework your comp committee approves — not a slide deck that goes in a folder.",
      },
      {
        title: "Priced by scope, not by hour",
        body: "Fixed-fee engagements against named deliverables. No day-rate creep, no scope drift.",
      },
      {
        title: "Refreshed on a cadence",
        body: "Compensation benchmarks and hiring plans age. We run the refresh cycles as an annual or biannual engagement so you do not have to remember to schedule them.",
      },
      {
        title: "Independent of the search work",
        body: "Consulting engagements are priced and scoped separately from search work. If we recommend you hire less, we mean it — even when it means less search work for us.",
      },
    ],
  },
] as const;

/** Look up a service by slug. Returns undefined for unknown slugs. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
