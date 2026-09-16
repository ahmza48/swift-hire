/**
 * Single source of truth for the service catalogue.
 *
 * The site is a specialist staffing agency: three core service pillars, each
 * with its own sub-page, mega-menu card, footer link and sitemap entry. Add a
 * fourth service by adding an object here — every downstream surface picks it
 * up automatically.
 */

export type ServiceIcon =
  | "recruitment"
  | "backoffice"
  | "support";

export type Service = {
  slug: string;
  name: string;
  icon: ServiceIcon;
  /** One line. Used on menu cards and grid cards — keep it under ~90 chars. */
  tagline: string;
  /** Two sentences. Used as the sub-page hero lead. */
  description: string;
  /** Search-engine description for the sub-page. */
  metaDescription: string;
  /** "What's included" — the capabilities we offer inside this service. */
  included: readonly { title: string; body: string }[];
  /** "Who it's for" — team-lead personas or role families this service fits. */
  audience: readonly { title: string; body: string }[];
  /** Numbered engagement steps. */
  process: readonly { title: string; body: string }[];
  /** Why buyers pick us for this service specifically. */
  why: readonly { title: string; body: string }[];
};

export const services: readonly Service[] = [
  /* ---------------------------------------------------------------- */
  /* 1. RECRUITMENT & STAFFING                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: "recruitment-staffing",
    name: "Recruitment & Staffing",
    icon: "recruitment",
    tagline:
      "Specialist recruitment across engineering, legal, executive and skilled trades.",
    description:
      "We run the hiring process end-to-end and hand you a shortlist worth interviewing. Permanent, contract and executive placements across engineering, legal, real estate and corporate functions.",
    metaDescription:
      "Recruitment & staffing agency — permanent placement, executive search, contract and temporary staff. Specialist hiring for engineering, legal, real estate and corporate roles.",

    // "What we do" — capability inventory
    included: [
      {
        title: "Technical Talent Acquisition",
        body: "Software engineers, DevOps, platform, data, and QA hires — sourced, screened and technically assessed by recruiters who can read a code sample and not just a CV.",
      },
      {
        title: "Executive Search",
        body: "Senior appointments across Sales, Finance, Operations and Technology — director, VP and C-suite. Discreet outreach, structured competency interviews, and evidence-backed shortlists.",
      },
      {
        title: "HR Consulting",
        body: "Compensation benchmarking, hiring-plan design, interview training and offer-management support. Delivered as an engagement, not a document.",
      },
      {
        title: "Contract & Temporary Staffing",
        body: "Interim specialists deployed inside your team on fixed-term or day-rate contracts. Same vetting standard as permanent — no CV-shuffling.",
      },
    ],

    // "Placement Services" — role families / domains we place into
    audience: [
      {
        title: "Permanent Placement",
        body: "Direct hires you carry on your own payroll. Sourced, screened and closed under our 90-day replacement guarantee.",
      },
      {
        title: "Corporate & Legal Attorneys",
        body: "In-house counsel, commercial and contracts lawyers, compliance and regulatory specialists — for corporate legal teams and law firms.",
      },
      {
        title: "Architecture & Real Estate",
        body: "Architects, project managers, quantity surveyors, real-estate development and property-management professionals — for consultancies and developers.",
      },
      {
        title: "Civil, Mechanical & Electrical Engineers",
        body: "Chartered and graduate engineers across civil, structural, mechanical, MEP and electrical disciplines — for contractors, EPCs and manufacturing plants.",
      },
    ],

    process: [
      {
        title: "Brief and market reality check",
        body: "Kickoff call to pull the role, team and pay band apart. If the brief can't be filled at that number in that market, you hear it in the first hour rather than six weeks in.",
      },
      {
        title: "Sourcing and structured screening",
        body: "Proactive outbound plus a scored screen against the rubric we agreed. Only candidates who clear the rubric — with evidence attached — reach your inbox.",
      },
      {
        title: "Assessment and shortlist",
        body: "Format follows the role: technical exercise, competency interview, or portfolio review. You receive three to five candidates with an assessment write-up per person.",
      },
      {
        title: "Offer, close and 90-day support",
        body: "We manage negotiation, counter-offer risk and candidate communication to signature, then check in at 30, 60 and 90 days — with a free replacement inside that window if needed.",
      },
    ],

    why: [
      {
        title: "Specialists in the roles we run",
        body: "Recruiters are grouped by discipline, not by client. The person running your civil-engineering search doesn't also cover corporate legal — they run civil-engineering searches all day.",
      },
      {
        title: "Written shortlist, evidence attached",
        body: "One document per candidate: rubric score, assessment transcript, compensation, notice period, and a plain statement of where we think the risk is. No pitch decks masquerading as profiles.",
      },
      {
        title: "Transparent per-hire pricing",
        body: "One fee, agreed in writing, tied to the accepted offer. No monthly retainer creep, no shortlist fees, no re-billing for the replacement.",
      },
      {
        title: "90-day replacement guarantee",
        body: "If a placement leaves inside the first ninety days, we run the search again at no additional fee. Written into the engagement letter, not the small print.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 2. BPO — BUSINESS PROCESS OUTSOURCING                            */
  /* ---------------------------------------------------------------- */
  {
    slug: "bpo",
    name: "BPO",
    icon: "backoffice",
    tagline:
      "Back-office and finance operations run as an extension of your team, to your SLAs.",
    description:
      "Business process outsourcing for the operational work you would rather not staff internally: back-office administration, data processing, finance and accounting, HR and payroll, and process consulting — delivered to your SLAs, on your systems.",
    metaDescription:
      "BPO services — outsourced back-office operations, data processing, finance and accounting, HR and payroll administration, and business process consulting. Delivered to SLAs on your systems.",

    included: [
      {
        title: "Back-office administration",
        body: "Order processing, document management, scheduling, vendor administration and procurement support — documented processes running to agreed SLAs on your ERP or ours.",
      },
      {
        title: "Data processing and management",
        body: "Data entry, migration, cleansing and enrichment. QA gates on every batch, double-key verification on critical fields, and a written accuracy target in the SoW.",
      },
      {
        title: "Finance and accounting",
        body: "Bookkeeping, reconciliations, AR/AP, month-end close and management reporting on a fixed calendar. Delivered by qualified accountants, not just processors.",
      },
      {
        title: "HR and payroll administration",
        body: "End-to-end payroll processing, statutory filings, benefits administration, onboarding and offboarding, employee records and HR compliance support.",
      },
      {
        title: "Process consulting and automation",
        body: "Process mapping, bottleneck analysis and automation assessment — delivered as implemented change with measured before/after, not as a slide deck.",
      },
    ],

    audience: [
      {
        title: "Scale-ups outgrowing spreadsheets",
        body: "Operations that used to fit in a founder's inbox now need real process. You need a functioning back office by next quarter, not a hire funnel that takes six months.",
      },
      {
        title: "Established teams cutting cost-to-serve",
        body: "You have a working operation but the per-transaction cost is climbing. Move the standardised work off your senior hires without dropping quality.",
      },
      {
        title: "Founders who never wanted to run ops",
        body: "You want the accounting done, the payroll filed and the invoices out — with a named point of contact and no hand-holding needed.",
      },
    ],

    process: [
      {
        title: "Scope, SLAs and success metrics",
        body: "We agree the exact processes in scope, the SLAs each carries, and what 'done well' looks like — in numbers, in the SoW.",
      },
      {
        title: "Transition and shadow-run",
        body: "Two to four weeks of parallel running: we shadow your current team, document the actual process (not the written one), and correct as we go.",
      },
      {
        title: "Steady-state delivery",
        body: "The service runs to your SLAs on your systems (or ours), with a named account manager and weekly performance reporting against the agreed metrics.",
      },
      {
        title: "Continuous improvement",
        body: "Every quarter, one process gets automated, streamlined or removed. Small improvements compound — this is the reason the per-transaction cost keeps falling.",
      },
    ],

    why: [
      {
        title: "SLAs written in numbers",
        body: "Turnaround, accuracy, first-time-right — each SLA sits in the contract with a target and a remedy. No 'commercially reasonable efforts' language.",
      },
      {
        title: "Named team, not a call centre",
        body: "You work with the same three or four people every week. They know your business, your systems and your quirks — and you know theirs.",
      },
      {
        title: "Documented, portable processes",
        body: "Every process we run for you is documented in your workspace, not ours. If the day comes to bring it back in-house, you inherit a running playbook.",
      },
      {
        title: "Fixed monthly pricing",
        body: "Priced per process bundle, not per keystroke. Predictable to budget against, and immune to end-of-month over-billing.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 3. CUSTOMER SUPPORT                                              */
  /* ---------------------------------------------------------------- */
  {
    slug: "customer-support",
    name: "Customer Support",
    icon: "support",
    tagline:
      "Trained support agents working in your helpdesk, hitting your SLA targets.",
    description:
      "Outsourced customer support delivered as a named team inside your existing helpdesk. Email, chat and phone across product, billing and technical queries — with QA, coverage management and SLA reporting.",
    metaDescription:
      "Outsourced customer support — trained agents working in your helpdesk across email, chat and phone, with QA scoring, coverage management and reporting against your SLAs.",

    included: [
      {
        title: "Multi-channel support",
        body: "Email, live chat, and phone coverage across the ticket types you serve — product, billing, account and technical. One team, all channels, consistent voice.",
      },
      {
        title: "Product and process training",
        body: "Two-week structured onboarding on your product, your CRM, your tone and your exception cases. Refreshers every quarter when the product changes.",
      },
      {
        title: "Tier 1 triage plus Tier 2 handling",
        body: "Front-line agents for volume, plus a senior tier for the complex tickets that need judgement — technical debugging, account escalations, billing disputes.",
      },
      {
        title: "QA scoring and calibration",
        body: "Randomised sampling of tickets, scored against your rubric weekly, with calibration sessions so scoring stays aligned with your standards over time.",
      },
      {
        title: "Coverage and workforce management",
        body: "Volume forecasting, shift design, backup coverage and holiday planning — so SLAs hold on the Monday after a launch, not just on average.",
      },
    ],

    audience: [
      {
        title: "Post-launch product teams",
        body: "Ticket volume just went from 20/day to 400/day and the founding team is answering them at 11pm. You need a real support function by next month.",
      },
      {
        title: "Growth-stage SaaS",
        body: "You have a support team but backlogs keep spiking and you're missing SLA on the last mile. Add capacity without adding managers.",
      },
      {
        title: "Consumer brands with seasonality",
        body: "Support volume swings 5x during peak and half your permanent staff is idle in the trough. Flex the team without hiring and firing.",
      },
    ],

    process: [
      {
        title: "Discovery, tooling and rubric",
        body: "We audit your current tickets, agree the SLA targets by channel and severity, and lock the QA rubric your existing team is already scored against.",
      },
      {
        title: "Onboarding and shadow tickets",
        body: "Two weeks of product, CRM and process training, then shadow handling on real tickets with 100% review before agents go live independently.",
      },
      {
        title: "Go-live, calibrated for SLA",
        body: "Agents pick up a target ticket share on day one and ramp to full volume across the first month. Daily SLA and QA reporting from the start.",
      },
      {
        title: "Steady state with quarterly review",
        body: "Weekly performance snapshot, monthly QA calibration and a quarterly review of ticket patterns — because the fastest way to reduce ticket volume is to feed the causes back to product.",
      },
    ],

    why: [
      {
        title: "Agents in your helpdesk",
        body: "We work inside your Zendesk / Intercom / Freshdesk — not a parallel system. Your reporting stays in one place and your product team still sees the raw tickets.",
      },
      {
        title: "One team, not a rotating pool",
        body: "The same faces, week after week. Institutional knowledge accumulates instead of leaking with every shift change.",
      },
      {
        title: "SLA and CSAT reporting from day one",
        body: "You see first-reply time, resolution time, SLA hit-rate, backlog and CSAT in a shared dashboard from the day agents go live. No two-month blackout window.",
      },
      {
        title: "Product feedback loop",
        body: "Ticket-driver analysis every quarter: the three product changes that would remove the most support volume, ranked by impact. Support quietly becomes your best QA channel.",
      },
    ],
  },
] as const;

/** Look up a service by slug. Returns undefined for unknown slugs. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
