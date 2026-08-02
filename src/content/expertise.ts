export type Domain = {
  slug: string;
  title: string;
  description: string;
  stack: readonly string[];
  roles: readonly string[];
};

export const domains: readonly Domain[] = [
  {
    slug: "frontend",
    title: "Frontend",
    description:
      "Engineers who own the browser: rendering performance, state at scale, design-system work and accessibility that survives an audit.",
    stack: ["React", "Next.js", "Vue", "Angular", "TypeScript", "Svelte"],
    roles: ["Frontend Engineer", "UI Engineer", "Design Systems Engineer"],
  },
  {
    slug: "backend",
    title: "Backend",
    description:
      "Service and API builders. We screen for data modelling and failure handling, not for whether they can reverse a linked list.",
    stack: ["Node.js", "Python", "Go", "Java / Spring", "Rails", ".NET", "Rust"],
    roles: ["Backend Engineer", "API Engineer", "Distributed Systems Engineer"],
  },
  {
    slug: "mobile",
    title: "Mobile",
    description:
      "Native and cross-platform engineers who have actually shipped to the stores and dealt with what happens after release.",
    stack: ["Swift", "Kotlin", "React Native", "Flutter", "Jetpack Compose"],
    roles: ["iOS Engineer", "Android Engineer", "Mobile Lead"],
  },
  {
    slug: "platform",
    title: "DevOps, platform and SRE",
    description:
      "The people who keep it up. Assessed on incident reasoning and cost control as much as on tooling fluency.",
    stack: ["AWS", "GCP", "Azure", "Kubernetes", "Terraform", "CI/CD", "Datadog"],
    roles: ["Platform Engineer", "SRE", "DevOps Engineer", "Cloud Architect"],
  },
  {
    slug: "data-ml",
    title: "Data and ML",
    description:
      "Pipeline builders and applied ML engineers. We separate the people who ship models from the people who present slides about models.",
    stack: ["Python", "Spark", "Airflow", "dbt", "PyTorch", "TensorFlow", "Snowflake"],
    roles: ["Data Engineer", "ML Engineer", "Analytics Engineer", "MLOps"],
  },
  {
    slug: "qa",
    title: "QA and test automation",
    description:
      "Engineers who build test infrastructure rather than click through checklists. Screened on flake-rate thinking.",
    stack: ["Cypress", "Playwright", "Selenium", "Appium", "Jest", "k6"],
    roles: ["QA Engineer", "SDET", "Test Automation Lead"],
  },
  {
    slug: "fullstack",
    title: "Full-stack",
    description:
      "Genuine generalists for early-stage teams — people comfortable owning a feature from schema to CSS without hand-offs.",
    stack: ["TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL", "Prisma"],
    roles: ["Full-Stack Engineer", "Founding Engineer", "Product Engineer"],
  },
  {
    slug: "security",
    title: "Security",
    description:
      "AppSec and infrastructure security engineers. Assessed by practitioners, because a generalist recruiter cannot tell the difference here.",
    stack: ["AppSec", "Threat modelling", "IAM", "Pen testing", "SIEM", "Zero trust"],
    roles: ["Security Engineer", "AppSec Engineer", "Security Architect"],
  },
  {
    slug: "leadership",
    title: "Engineering leadership",
    description:
      "Managers and executives. Screened on how they have handled underperformance, reorgs and technical debt — with specifics.",
    stack: ["Team building", "Technical strategy", "Delivery", "Hiring", "Org design"],
    roles: ["Engineering Manager", "Head of Engineering", "VP Engineering", "CTO"],
  },
] as const;

export type AssessmentMethod = {
  name: string;
  appliesTo: string;
  description: string;
};

export const assessmentMethods: readonly AssessmentMethod[] = [
  {
    name: "Async take-home",
    appliesTo: "Junior to mid",
    description:
      "A timeboxed, realistic problem — usually two hours, never a weekend. Reviewed against a written rubric you receive in advance.",
  },
  {
    name: "Live pair-programming",
    appliesTo: "Mid to senior",
    description:
      "Sixty minutes with one of our technical assessors on real code. We score reasoning and collaboration, not recall.",
  },
  {
    name: "System design",
    appliesTo: "Senior to principal",
    description:
      "An open-ended design session on a problem close to your domain. Trade-off articulation matters more than the final diagram.",
  },
  {
    name: "Leadership structured interview",
    appliesTo: "EM and above",
    description:
      "Behavioural interview against a fixed competency set, run by someone who has managed engineers. Written up verbatim.",
  },
] as const;

export const seniorityLevels = [
  "Junior",
  "Mid",
  "Senior",
  "Staff",
  "Principal",
  "Engineering Manager",
  "VP Engineering",
  "CTO",
] as const;

/** Shown as the home-page expertise strip. */
export const techStrip = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  "Rust",
  "Java",
  "Kotlin",
  "Swift",
  "Ruby",
  ".NET",
  "PostgreSQL",
  "Kubernetes",
  "Terraform",
  "AWS",
  "GCP",
  "Spark",
  "Airflow",
  "PyTorch",
  "GraphQL",
  "Playwright",
] as const;
