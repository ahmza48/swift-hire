export type Faq = { question: string; answer: string };

export const engineerFaqs: readonly Faq[] = [
  {
    question: "Is this free for engineers?",
    answer:
      "Yes, entirely. Our fees are paid by the companies hiring. You will never be asked to pay us, and we will never take a cut of your salary.",
  },
  {
    question: "Will my current employer find out?",
    answer:
      "No. Your profile is not published anywhere and is never searchable. We only share your details with a specific company after you have said yes to that specific role, by name, in writing.",
  },
  {
    question: "What kind of roles do you actually have?",
    answer:
      "Software engineering roles at companies that have hired us to fill them — permanent and contract, junior through CTO, across frontend, backend, mobile, platform, data and ML, QA, security and engineering leadership. We do not recruit outside engineering.",
  },
  {
    question: "How long until I hear back?",
    answer:
      "We review every profile within five business days. If your skills match something live, a recruiter emails you to arrange a 20-minute intro call. If nothing matches, we hold your profile and contact you when it does.",
  },
  {
    question: "Am I guaranteed to be matched?",
    answer:
      "No, and anyone who promises otherwise is selling something. Matches depend entirely on what our clients are hiring for at the time. Some profiles get a call within a week; some sit for months because nothing relevant comes in.",
  },
  {
    question: "Do I have to interview if you contact me?",
    answer:
      "No. We tell you the company, the role, the stack, the team and the compensation band before you decide anything. If it is not interesting, say so and it goes no further.",
  },
  {
    question: "Will you spam me with irrelevant roles?",
    answer:
      "No. We contact you when something genuinely matches your stated stack, seniority and location preferences. If we get that wrong, tell us and we will recalibrate — or remove you entirely, no hard feelings.",
  },
  {
    question: "How do I get my data deleted?",
    answer:
      "Email privacy@swifthire.com from the address you registered with, and we delete everything we hold within 30 days. No exit interview, no retention offer.",
  },
];
