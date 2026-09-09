/**
 * Single source of truth for the service catalogue.
 *
 * Everything downstream is derived from this array: the header mega-menu, the
 * mobile accordion, the /services grid, every /services/[slug] page, the footer
 * column, the sitemap and `generateStaticParams`. Adding a service means adding
 * one object here and nothing else.
 */

export type ServiceIcon =
  | "recruitment"
  | "development"
  | "support"
  | "data"
  | "finance"
  | "it"
  | "marketing"
  | "backoffice"
  | "payroll"
  | "consulting";

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
  included: readonly { title: string; body: string }[];
  audience: readonly { title: string; body: string }[];
  process: readonly { title: string; body: string }[];
  why: readonly { title: string; body: string }[];
};

export const services: readonly Service[] = [
  {
    slug: "recruitment-staffing",
    name: "Recruitment & Staffing",
    icon: "recruitment",
    tagline: "We run your hiring process end to end and hand you a shortlist worth interviewing.",
    description:
      "We act as your hiring arm: sourcing, screening and assessing candidates on your behalf, then delivering three to five people ready to interview. You run the final conversation and make the offer.",
    metaDescription:
      "Staffing Viro runs recruitment on your behalf — sourcing, screening and technical assessment, delivered as a shortlist ready to interview. Per-hire, retained and embedded models.",
    included: [
      {
        title: "Role brief and market reality check",
        body: "A kickoff call that pulls apart the role, the team and the pay band. If the brief cannot be filled at that number, you hear it on the call rather than six weeks later.",
      },
      {
        title: "Proactive sourcing and outbound",
        body: "We map the companies where your role's skills concentrate and approach people directly. Most of the people worth hiring are not applying to anything.",
      },
      {
        title: "Structured screening",
        body: "Every profile is read against a rubric agreed with your team, not matched on keywords. Two thirds drop out here and none of them reach your inbox.",
      },
      {
        title: "Technical and competency assessment",
        body: "Format follows the role: async exercise, live pair-programming, system design, or a structured competency interview for leadership hires.",
      },
      {
        title: "Written shortlist",
        body: "One document per candidate: assessment evidence, culture-fit notes, compensation expectations, notice period, and a plain statement of where we think the risk is.",
      },
      {
        title: "Offer management and 90-day guarantee",
        body: "We handle negotiation, counter-offer risk and candidate communication to signature, then check in at 30, 60 and 90 days. Free replacement inside the window.",
      },
    ],
    audience: [
      {
        title: "Teams with no in-house recruiter",
        body: "You need to hire but nobody owns it, so it lands on whoever has the least full calendar that week.",
      },
      {
        title: "Roles that have gone stale",
        body: "Open for months, plenty of applicants, nobody you would actually hire. Usually a screening problem, not a sourcing one.",
      },
      {
        title: "Fast-scaling teams",
        body: "You need five to twenty people this half and your current process cannot absorb the interview load.",
      },
    ],
    process: [
      { title: "Brief and kickoff", body: "We agree the role, the assessment bar and the scorecard. Day 0 to 1." },
      { title: "Source", body: "Network, database and direct outbound to passive candidates. Day 1 to 4." },
      { title: "Screen and assess", body: "Rubric-based screening, then the technical or competency assessment. Day 3 to 9." },
      { title: "Shortlist", body: "Three to five written profiles land with you. Day 8 to 12." },
      { title: "Close", body: "You interview and decide; we schedule, negotiate and keep the candidate warm. Day 12 to 21." },
    ],
    why: [
      {
        title: "The screen is run by practitioners",
        body: "The person assessing a backend engineer has shipped backend code. That is the difference between a plausible shortlist and a good one.",
      },
      {
        title: "You get the evidence, not a score",
        body: "Assessment transcripts and rubrics come with the shortlist, so you can check our reasoning instead of trusting it.",
      },
      {
        title: "We tell you when it is not working",
        body: "If a search cannot be filled to standard, you hear that in week two — not a drip of near-misses for three months.",
      },
    ],
  },
  {
    slug: "software-development",
    name: "Software Development",
    icon: "development",
    tagline: "Dedicated engineering squads that ship into your codebase, on your process.",
    description:
      "We stand up a delivery team — engineers, a lead, and QA — that works inside your repositories, your ticket tracker and your release process. You get shipped software, not a status deck.",
    metaDescription:
      "Dedicated software development teams from Staffing Viro. Full-stack, mobile, platform and QA engineers working in your codebase, your sprint cadence and your release process.",
    included: [
      {
        title: "A team, not a pile of contractors",
        body: "Engineers, a technical lead and QA who have worked together before, with one point of accountability for delivery.",
      },
      {
        title: "Discovery and technical scoping",
        body: "We break the work down, flag what is underspecified, and give you an estimate with the assumptions written next to it.",
      },
      {
        title: "Delivery in your process",
        body: "Your repo, your board, your definition of done. We adopt your conventions rather than asking you to adopt ours.",
      },
      {
        title: "Code review and test coverage",
        body: "Every change is reviewed before merge and lands with tests. Coverage thresholds are agreed at kickoff and reported weekly.",
      },
      {
        title: "Documented handover",
        body: "Architecture decisions, runbooks and onboarding notes are written as we go, so the team can be stood down without stranding you.",
      },
    ],
    audience: [
      {
        title: "Roadmaps outrunning capacity",
        body: "The plan is agreed and funded, and the constraint is simply that there are not enough engineers to build it.",
      },
      {
        title: "A defined project alongside BAU",
        body: "A migration, a rebuild or a new product line that would stall if it competed with day-to-day work for the same people.",
      },
      {
        title: "Teams that need a capability they lack",
        body: "Mobile, data engineering or platform work where hiring permanently is not justified yet.",
      },
    ],
    process: [
      { title: "Scope", body: "Technical discovery, breakdown and a written estimate with assumptions stated." },
      { title: "Assemble", body: "We put the squad together and agree the working model, cadence and reporting." },
      { title: "Build", body: "Two-week iterations, demo at the end of each, working software rather than progress reports." },
      { title: "Harden", body: "Test coverage, performance and security review before anything reaches production." },
      { title: "Hand over", body: "Documentation, runbooks and a transition plan — including to your own hires if you make them." },
    ],
    why: [
      {
        title: "We estimate with the assumptions attached",
        body: "An estimate without stated assumptions is a guess you cannot audit. Ours tells you what would have to be true.",
      },
      {
        title: "The team can become your team",
        body: "Where you want to convert contractors to permanent staff, we support it rather than penalise it. That is a recruitment conversation, and we do that too.",
      },
    ],
  },
  {
    slug: "customer-support",
    name: "Customer Support",
    icon: "support",
    tagline: "Trained support teams answering your customers in your voice, on your tooling.",
    description:
      "We recruit, train and manage support agents who work inside your helpdesk and follow your escalation paths. You set the standards; we own the staffing, coverage and quality assurance behind them.",
    metaDescription:
      "Outsourced customer support from Staffing Viro. Trained agents working in your helpdesk across email, chat and phone, with QA, coverage management and reporting against your SLAs.",
    included: [
      {
        title: "Multi-channel coverage",
        body: "Email, live chat, phone and in-app messaging, staffed to the hours and volumes you actually see rather than a generic shift pattern.",
      },
      {
        title: "Product and tone training",
        body: "Agents are trained on your product and your voice before they take a single ticket. Sign-off is yours, not ours.",
      },
      {
        title: "Your tooling",
        body: "Zendesk, Intercom, Freshdesk, HubSpot or your own system. We work in your instance so history and reporting stay in one place.",
      },
      {
        title: "Quality assurance",
        body: "A sampled review of conversations every week against a scorecard you approve, with coaching that follows the findings.",
      },
      {
        title: "Escalation that respects your engineers",
        body: "Clear tiers, so only genuinely technical issues reach your product team — with the reproduction steps already attached.",
      },
      {
        title: "Reporting against your SLAs",
        body: "First response, resolution time, CSAT and backlog, reported weekly against the targets you set.",
      },
    ],
    audience: [
      {
        title: "Support handled by whoever is free",
        body: "Tickets are being answered by engineers and founders, badly and expensively, because nobody owns the queue.",
      },
      {
        title: "Growth outpacing the queue",
        body: "Volume has doubled, response times have slipped, and hiring a full in-house team is months away.",
      },
      {
        title: "Coverage gaps",
        body: "You need evenings, weekends or another timezone answered without asking your existing team to work them.",
      },
    ],
    process: [
      { title: "Audit", body: "We review your ticket history to find the real volume drivers and the top repeat contacts." },
      { title: "Design", body: "Staffing model, shift pattern, escalation tiers and the QA scorecard, agreed in writing." },
      { title: "Train", body: "Product, tone and tooling training, with your sign-off before anyone goes live." },
      { title: "Run and improve", body: "Weekly QA, coaching, and macro or help-centre changes that reduce contact volume." },
    ],
    why: [
      {
        title: "We work to reduce your ticket volume",
        body: "Every review flags the repeat contacts worth fixing at the source. A support partner paid per seat has no reason to do that.",
      },
      {
        title: "Agents are recruited, not allocated",
        body: "We hire for your account against your brief — the same screening rigour as our recruitment practice — instead of assigning whoever is on the bench.",
      },
    ],
  },
  {
    slug: "data-entry-processing",
    name: "Data Entry & Processing",
    icon: "data",
    tagline: "Accurate, checked data work with an error rate you can hold us to.",
    description:
      "We handle high-volume data entry, migration, cleansing and enrichment with a documented quality process and a stated accuracy target. Every batch is verified before it reaches your systems.",
    metaDescription:
      "Data entry, migration, cleansing and enrichment services from Staffing Viro. Documented QA, double-key verification on critical fields, and a contractual accuracy target.",
    included: [
      {
        title: "Data entry and digitisation",
        body: "Structured capture from paper, PDFs, scans and forms into your systems, in the schema you specify.",
      },
      {
        title: "Migration and transformation",
        body: "Moving records between systems with field mapping agreed and validated up front, and a reconciliation report at the end.",
      },
      {
        title: "Cleansing and de-duplication",
        body: "Standardising formats, merging duplicates and fixing the accumulated inconsistencies that break reporting.",
      },
      {
        title: "Enrichment and validation",
        body: "Filling gaps from approved sources and verifying against them, with provenance recorded per field.",
      },
      {
        title: "Verified quality control",
        body: "Double-key entry on critical fields and sampled review on the rest, reported against the accuracy target in your contract.",
      },
    ],
    audience: [
      {
        title: "Systems migrations",
        body: "You are moving to a new CRM, ERP or practice management system and the data has to arrive clean.",
      },
      {
        title: "Reporting nobody trusts",
        body: "Dashboards disagree with each other because the underlying records are inconsistent, duplicated or half-empty.",
      },
      {
        title: "Backlogs consuming skilled people",
        body: "Qualified staff are spending hours a week on keying and reconciliation that does not need their expertise.",
      },
    ],
    process: [
      { title: "Sample and scope", body: "We process a representative sample to find the real edge cases before quoting." },
      { title: "Define the rules", body: "Field mapping, validation rules and exception handling, documented and signed off." },
      { title: "Process in batches", body: "Work runs in verifiable batches so problems surface early, not at the end." },
      { title: "Verify and reconcile", body: "QA against the agreed target, plus a reconciliation report you can check independently." },
    ],
    why: [
      {
        title: "The accuracy target is contractual",
        body: "We commit to a specific error rate and report against it every batch. Rework inside that target is ours to absorb.",
      },
      {
        title: "Exceptions come back to you",
        body: "Ambiguous records are queued for your decision rather than guessed at. A confident wrong answer is worse than a flagged one.",
      },
    ],
  },
  {
    slug: "finance-accounting",
    name: "Finance & Accounting",
    icon: "finance",
    tagline: "Bookkeeping, reconciliations and management accounts, closed on a schedule.",
    description:
      "We run your day-to-day finance operations — ledgers, reconciliations, payables, receivables and month-end close — to a fixed calendar. Your accountant and board get clean numbers on time.",
    metaDescription:
      "Outsourced finance and accounting from Staffing Viro: bookkeeping, reconciliations, accounts payable and receivable, month-end close and management reporting on a fixed calendar.",
    included: [
      {
        title: "Bookkeeping and ledger maintenance",
        body: "Transactions coded consistently against a chart of accounts that stays stable enough to compare periods.",
      },
      {
        title: "Bank and account reconciliation",
        body: "Reconciled on a set schedule, with unmatched items chased rather than carried forward indefinitely.",
      },
      {
        title: "Accounts payable and receivable",
        body: "Supplier invoices processed and scheduled, customer invoices raised and chased, ageing reported weekly.",
      },
      {
        title: "Month-end close",
        body: "Accruals, prepayments and a close pack delivered to a fixed date each month, not whenever it happens to be ready.",
      },
      {
        title: "Management reporting",
        body: "P&L, balance sheet and cash flow with variance commentary — what moved and why, in plain language.",
      },
      {
        title: "Audit and year-end support",
        body: "Working papers prepared so your auditor or accountant is not billing you to reconstruct the year.",
      },
    ],
    audience: [
      {
        title: "Founders doing the books",
        body: "Finance admin is being done late at night by someone whose time is worth considerably more.",
      },
      {
        title: "Numbers that arrive too late to act on",
        body: "Management accounts land six weeks after month end, by which point the decisions have already been made.",
      },
      {
        title: "Growth outpacing the finance function",
        body: "Transaction volume has outgrown a part-time bookkeeper but does not yet justify a full finance team.",
      },
    ],
    process: [
      { title: "Review", body: "We examine the current ledger, chart of accounts and close process, and report what is actually broken." },
      { title: "Stabilise", body: "Clear the backlog, fix the coding, reconcile the accounts, and agree the close calendar." },
      { title: "Run", body: "Daily processing, weekly reporting, monthly close to the agreed date." },
      { title: "Improve", body: "Automate what should not be manual and tighten controls as volume grows." },
    ],
    why: [
      {
        title: "The close date is a commitment",
        body: "We agree a fixed working day for month-end and hit it. Numbers that arrive predictably are worth more than numbers that arrive perfect.",
      },
      {
        title: "Segregation of duties from day one",
        body: "The person entering payments is never the person approving them, even on a small engagement. That control usually appears far too late.",
      },
    ],
  },
  {
    slug: "it-services",
    name: "IT Services",
    icon: "it",
    tagline: "Managed IT, helpdesk and infrastructure support without an in-house IT department.",
    description:
      "We manage your endpoints, identity, networks and cloud infrastructure, and staff the helpdesk your team actually contacts. Proactive maintenance and monitoring rather than waiting for something to break.",
    metaDescription:
      "Managed IT services from Staffing Viro: helpdesk, endpoint and identity management, cloud infrastructure, backup and disaster recovery, and security baseline hardening.",
    included: [
      {
        title: "Helpdesk and end-user support",
        body: "A real queue with response targets, staffed for your working hours, for everything from access requests to broken laptops.",
      },
      {
        title: "Endpoint and device management",
        body: "Provisioning, patching, encryption and remote wipe across the fleet, with joiners and leavers handled to a checklist.",
      },
      {
        title: "Identity and access management",
        body: "SSO, MFA and least-privilege access reviewed on a schedule — and access actually removed when someone leaves.",
      },
      {
        title: "Cloud and network operations",
        body: "AWS, Azure or GCP administration, monitoring and cost management, plus office network and connectivity.",
      },
      {
        title: "Backup and disaster recovery",
        body: "Backups configured, monitored and — critically — test-restored on a schedule, because an untested backup is a hope.",
      },
      {
        title: "Security baseline",
        body: "Hardening, vulnerability patching and the evidence trail needed for Cyber Essentials, SOC 2 or ISO 27001.",
      },
    ],
    audience: [
      {
        title: "No IT function",
        body: "IT is handled by whichever employee is most technically confident, on top of their actual job.",
      },
      {
        title: "Compliance deadlines approaching",
        body: "A customer or certification requires controls, evidence and documented process that do not currently exist.",
      },
      {
        title: "Distributed teams",
        body: "Remote and hybrid staff need consistent provisioning, access and support regardless of where they sit.",
      },
    ],
    process: [
      { title: "Audit", body: "Full inventory of devices, accounts, licences and infrastructure, plus the gaps and risks found." },
      { title: "Stabilise", body: "Close the urgent security gaps, get backups working, document what exists." },
      { title: "Operate", body: "Helpdesk live, monitoring in place, patching and access reviews on a schedule." },
      { title: "Mature", body: "Quarterly reviews covering cost, risk and capacity, with recommendations you can decline." },
    ],
    why: [
      {
        title: "We test the restores",
        body: "Most providers monitor that backups ran. We periodically restore from them, because that is the only proof they work.",
      },
      {
        title: "The audit is yours to keep",
        body: "Asset inventory and documentation are handed over in a portable format, so leaving us is not an act of self-harm.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "marketing",
    tagline: "Campaigns measured against pipeline, not impressions.",
    description:
      "We run search, paid, content and lifecycle marketing with tracking wired to your CRM, so every channel is judged on the revenue it produces. Reporting shows cost per qualified opportunity, not vanity metrics.",
    metaDescription:
      "Digital marketing from Staffing Viro: SEO, paid search and social, content, email lifecycle and conversion optimisation — measured against pipeline and revenue, with attribution wired to your CRM.",
    included: [
      {
        title: "Search engine optimisation",
        body: "Technical fixes, content built around real search intent, and the internal linking that makes it compound.",
      },
      {
        title: "Paid search and paid social",
        body: "Google, LinkedIn and Meta campaigns managed to a cost-per-opportunity target rather than a cost-per-click one.",
      },
      {
        title: "Content and editorial",
        body: "Articles, case studies and landing pages written by people who research your category instead of paraphrasing competitors.",
      },
      {
        title: "Email and lifecycle",
        body: "Onboarding, nurture and reactivation sequences that move people toward a decision instead of filling an inbox.",
      },
      {
        title: "Conversion optimisation",
        body: "Landing page and funnel testing where the sample sizes are large enough for the result to mean something.",
      },
      {
        title: "Attribution and reporting",
        body: "Analytics and CRM wired together so you can see which spend became pipeline, and which quietly did not.",
      },
    ],
    audience: [
      {
        title: "Spending without visibility",
        body: "Budget is going out monthly and nobody can say with confidence which part of it produced revenue.",
      },
      {
        title: "Growth entirely on referral",
        body: "The business works but has no repeatable acquisition channel, so growth is capped by the founder's network.",
      },
      {
        title: "Teams without a marketing lead",
        body: "You need strategy and execution, not a freelancer who needs someone experienced to direct them.",
      },
    ],
    process: [
      { title: "Baseline", body: "Audit current channels, fix tracking, and establish what the numbers actually are today." },
      { title: "Prioritise", body: "Agree the two or three channels worth real investment, and explicitly stop the rest." },
      { title: "Execute", body: "Monthly campaign cycles with a written plan and a stated hypothesis for each test." },
      { title: "Report and reallocate", body: "Monthly review of cost per opportunity by channel, with budget moved accordingly." },
    ],
    why: [
      {
        title: "We fix attribution before spending",
        body: "Running campaigns on broken tracking generates activity you cannot evaluate. Baseline first, spend second.",
      },
      {
        title: "We recommend stopping things",
        body: "Most reviews end with a channel being cut. An agency paid a percentage of spend rarely suggests spending less.",
      },
    ],
  },
  {
    slug: "back-office-operations",
    name: "Back Office Operations",
    icon: "backoffice",
    tagline: "The administrative engine room, documented and run to a standard.",
    description:
      "We take on order processing, document management, scheduling, procurement support and the recurring administration that keeps a business running. Each process is documented before we run it, so it stops depending on one person's memory.",
    metaDescription:
      "Back office operations outsourcing from Staffing Viro: order processing, document management, scheduling, procurement support and vendor administration, documented and run to agreed SLAs.",
    included: [
      {
        title: "Order and transaction processing",
        body: "Orders, returns, claims and requests handled to a documented workflow with turnaround times you can hold us to.",
      },
      {
        title: "Document management",
        body: "Filing, indexing, retention and retrieval, so records can be found without asking the person who filed them.",
      },
      {
        title: "Scheduling and coordination",
        body: "Diary management, resource scheduling and the logistics coordination that quietly consumes senior time.",
      },
      {
        title: "Procurement and vendor administration",
        body: "Purchase orders, supplier onboarding, contract renewal tracking and the diary reminders nobody sets.",
      },
      {
        title: "Process documentation",
        body: "Every workflow we run is written down and handed to you. If we go, the knowledge stays.",
      },
    ],
    audience: [
      {
        title: "Admin absorbing senior time",
        body: "People hired to do skilled work are spending a third of their week on coordination and paperwork.",
      },
      {
        title: "Processes living in one head",
        body: "Critical workflows exist only as one long-serving employee's habits, and their annual leave is a genuine risk.",
      },
      {
        title: "Seasonal volume swings",
        body: "Peaks that justify neither permanent hiring nor the chaos of coping without it.",
      },
    ],
    process: [
      { title: "Map", body: "We shadow the current process and document what actually happens, not what the manual claims." },
      { title: "Standardise", body: "Remove the redundant steps, agree SLAs, and write the runbook." },
      { title: "Transition", body: "Run in parallel until output matches, then take over fully." },
      { title: "Operate and report", body: "Volume, turnaround and exceptions reported monthly against the agreed SLAs." },
    ],
    why: [
      {
        title: "Documentation is a deliverable",
        body: "You receive the runbook whether or not you keep us. Process knowledge is yours; we are just currently the ones executing it.",
      },
      {
        title: "We remove steps before we staff them",
        body: "Mapping usually finds work that exists only out of habit. Cutting it is cheaper for you than us doing it efficiently.",
      },
    ],
  },
  {
    slug: "hr-payroll-administration",
    name: "HR & Payroll Administration",
    icon: "payroll",
    tagline: "Payroll run correctly and on time, with the HR admin and compliance behind it.",
    description:
      "We administer payroll, benefits, onboarding, offboarding and employee records, and keep the statutory filings on schedule. Your people get paid correctly; your records stand up to inspection.",
    metaDescription:
      "HR and payroll administration from Staffing Viro: payroll processing, statutory filings, benefits administration, onboarding and offboarding, employee records and HR compliance support.",
    included: [
      {
        title: "Payroll processing",
        body: "Salaried, hourly and contractor payroll run to a fixed calendar, with a checked variance report before anything is paid.",
      },
      {
        title: "Statutory filings and deductions",
        body: "Tax, social contributions and pension submissions filed on time, with the confirmations kept where you can find them.",
      },
      {
        title: "Benefits administration",
        body: "Enrolment, changes and leavers processed with providers, and invoices reconciled against headcount.",
      },
      {
        title: "Onboarding and offboarding",
        body: "Contracts, right-to-work checks, equipment and access requests on the way in; a complete checklist on the way out.",
      },
      {
        title: "Employee records and leave",
        body: "A single accurate record per employee, with absence and leave balances that reconcile to payroll.",
      },
      {
        title: "Policy and compliance support",
        body: "Handbook and policy maintenance, plus the documentation trail that matters when something is disputed.",
      },
    ],
    audience: [
      {
        title: "Payroll run by someone with another job",
        body: "It works until that person is ill or on holiday during payroll week, and then it very much does not.",
      },
      {
        title: "Growing headcount and complexity",
        body: "Multiple contract types, locations or currencies have outgrown a spreadsheet and goodwill.",
      },
      {
        title: "Records that would not survive scrutiny",
        body: "Right-to-work documents, contracts and leave balances are scattered, incomplete or contradictory.",
      },
    ],
    process: [
      { title: "Data audit", body: "Reconcile the employee record against payroll and contracts, and report every discrepancy found." },
      { title: "Parallel run", body: "We run a full cycle alongside your current process and compare, before anything changes." },
      { title: "Cut over", body: "We take over on an agreed date with a documented calendar and named approvers." },
      { title: "Run and review", body: "Monthly payroll and filings, quarterly review of records, policy and compliance." },
    ],
    why: [
      {
        title: "Nobody cuts over without a parallel run",
        body: "A payroll error is not a bug you fix next sprint — it is a person's rent. We prove the new process matches before switching.",
      },
      {
        title: "Approval stays with you",
        body: "We prepare and check; a named person on your side approves before payment. That boundary is not negotiable.",
      },
    ],
  },
  {
    slug: "business-process-consulting",
    name: "Business Process Consulting",
    icon: "consulting",
    tagline: "Find the bottleneck, fix it, and leave you able to run it without us.",
    description:
      "We map how work actually moves through your business, quantify where it stalls, and redesign the processes that cost you the most. The deliverable is an implemented change, not a slide deck.",
    metaDescription:
      "Business process consulting from Staffing Viro: process mapping, bottleneck analysis, automation assessment and operational redesign — delivered as implemented change with measured results.",
    included: [
      {
        title: "Process mapping",
        body: "We follow real work items end to end and record what happens, including the workarounds nobody documents.",
      },
      {
        title: "Bottleneck and cost analysis",
        body: "Where work waits, how long, and what that costs — quantified, so prioritisation is an arithmetic exercise.",
      },
      {
        title: "Redesign",
        body: "Fewer steps, clearer ownership, explicit handoffs. Usually removal before addition.",
      },
      {
        title: "Automation assessment",
        body: "An honest view of what should be automated, what should be deleted, and what is fine done by a person.",
      },
      {
        title: "Implementation support",
        body: "We stay through the change, because a recommendation nobody adopts has produced nothing.",
      },
      {
        title: "Measurement",
        body: "Baseline before, measurement after, against metrics agreed at the start rather than chosen once results are in.",
      },
    ],
    audience: [
      {
        title: "Growth that made things worse",
        body: "Headcount went up and throughput did not. Usually a process problem wearing a staffing costume.",
      },
      {
        title: "Before automating or outsourcing",
        body: "You are about to buy software or hand a process to a vendor, and automating a broken process just breaks it faster.",
      },
      {
        title: "Persistent, unexplained delays",
        body: "Everyone is busy, nothing is obviously wrong, and things still take three times longer than they should.",
      },
    ],
    process: [
      { title: "Observe", body: "We follow real work through the business and map what genuinely happens." },
      { title: "Quantify", body: "Measure where time and money are lost, and rank the opportunities by size." },
      { title: "Redesign", body: "Rework the highest-cost processes with the people who actually run them." },
      { title: "Implement", body: "Roll out with training and documentation, and stay through the transition." },
      { title: "Measure", body: "Report the actual result against the baseline — including where the change underperformed." },
    ],
    why: [
      {
        title: "We report what did not work",
        body: "Every engagement closes with measured results against the baseline, including the changes that disappointed. That is how you learn what to try next.",
      },
      {
        title: "We will tell you not to buy the software",
        body: "A good number of process problems are solved by deleting steps, not licensing a tool. We have no reseller margin riding on the answer.",
      },
      {
        title: "The team keeps the capability",
        body: "Your people are in the redesign, so the next bottleneck does not require another engagement.",
      },
    ],
  },
] as const;

/** Fast lookup for the dynamic route. */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
