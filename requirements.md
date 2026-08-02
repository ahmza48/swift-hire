# Agency Site — Product Requirements Document
**Project:** Engineering Recruitment Intermediary Agency Website  
**Version:** 1.0  
**Prepared for:** Swift Hire / Internal Use  
**Last Updated:** August 2026

---

## 1. Project Overview

### 1.1 What the Agency Does
This site represents a **recruitment intermediary agency** that partners with companies who need to hire software engineers but lack the internal capacity, network, or expertise to run the hiring process themselves. The agency acts as the hiring arm of client companies — sourcing, screening, interviewing, and shortlisting candidates on the client's behalf. The client company makes the final offer; the agency does everything before that.

**Key distinction from a job board:** The agency doesn't list open roles publicly for engineers to apply to. It works on a B2B model — client companies come to the agency with a hiring need, the agency does the full recruitment cycle, and delivers vetted candidates ready to hire.

### 1.2 Target Audiences
| Audience | Goal on the site |
|---|---|
| **Client companies** (primary) | Understand the service, build trust, and start an engagement |
| **Engineering candidates** (secondary) | Submit profile to the agency's talent pool |
| **Potential partners / investors** | Understand the business model and legitimacy |

### 1.3 Core Value Proposition
- Clients get engineers without the cost and distraction of running a full in-house hiring process
- The agency specialises in software/engineering roles — not a generalist recruiter
- Faster time-to-hire with pre-vetted, technically assessed candidates
- Flexible engagement models (per-hire, retainer, embedded recruiter)

---

## 2. Site Architecture (Pages & Sections)

### 2.1 Page Map
```
/                        → Home (landing page)
/how-it-works            → Process walkthrough for client companies
/services                → All 10 services as a card grid
/services/[slug]         → One page per service (10 total, prerendered)
/expertise               → Engineering domains & tech stacks covered
/for-engineers           → Candidate submission / talent pool registration
/case-studies            → (Future) Client success stories
/about                   → Team, mission, story
/contact                 → Get in touch / book a call
/privacy-policy          → Legal
/terms-of-service        → Legal
```

### 2.2 Navigation
- **Primary nav (desktop):** Logo | Services ▾ | How It Works | Expertise | For Engineers | About | [CTA: Get a Quote →]
- **Services mega-menu (desktop):** full-width panel on hover, 2-column grid of all 10 services with icon, name and one-line description. Also opens on click and via keyboard; Escape closes and returns focus to the trigger.
- **Mobile nav:** hamburger sheet; "Services" is a split row — the label navigates to `/services`, a separate chevron button expands the accordion of all 10. The sheet scrolls independently (`overscroll-contain`) because 10 services overflow a 375×667 screen.
- **Sticky header:** transparent over the hero, transitioning to frosted glass (`backdrop-blur` + translucent ink + shadow) past 40px, with reduced height.
- **Footer nav:** a Services column generated from the catalogue, plus all pages, LinkedIn, Privacy Policy and Terms.

---

## 3. Page-by-Page Requirements

### 3.1 Home Page (`/`)

#### Hero Section
- **Headline:** Clear, outcome-focused — e.g. *"Your engineering team, built for you."* or *"We hire engineers. You ship product."*
- **Sub-headline:** One sentence explaining the model (intermediary/on-behalf hiring)
- **Dual CTA:** Primary → "Start Hiring" (links to /contact), Secondary → "How It Works" (smooth scroll or link to /how-it-works)
- **Visual:** Abstract illustration, animated background, or high-quality photography — no stock photo clichés
- **Trust signals below fold:** Client logo strip OR "X engineers placed", "X clients served", "X avg. days to first shortlist"

#### Pain Points Section
- 3–4 cards or columns naming the problems client companies face:
  - In-house HR team not specialised in tech hiring
  - Too slow — open roles hurt product velocity
  - Technical interviews eating up eng team time
  - Cost of bad hires
- Each pain point paired with the agency's counter-solution (tooltip, flip card, or two-column layout)

#### How It Works (Summary)
- 3–4 step visual summary of the end-to-end process
- CTA: "See the full process →" → `/how-it-works`

#### Services Overview
- 3 service cards (see Section 3.3) with short descriptions and "Learn more" links
- Subtle icons or illustrations for each

#### Engineering Expertise Strip
- Visual tag cloud or icon grid of tech stacks and roles covered (React, Node, Python, Java, iOS, Android, DevOps, ML, etc.)
- CTA: "See all expertise →" → `/expertise`

#### Social Proof / Trust Section
- Testimonials (placeholder if early-stage; placeholders should be realistic and clearly marked as such in the code)
- Stats row: avg. time-to-shortlist, candidate pass rate, client retention
- Optional: Partner/client logo bar

#### Final CTA Section
- Full-width band: "Ready to stop struggling with engineering hires?" + "Book a Free Discovery Call" button

---

### 3.2 How It Works (`/how-it-works`)

**Purpose:** Build trust by making the process transparent. Client companies want to know exactly what they're paying for.

#### Sections:
1. **Brief & Kickoff**  
   Client fills a role brief. Agency schedules kickoff call to understand the role, team, tech stack, culture, and timeline.

2. **Talent Sourcing**  
   Agency searches its network, partner platforms, and proprietary database. Outbound headhunting for passive candidates.

3. **Technical Screening**  
   Agency runs technical pre-screens: async coding challenge, take-home problem, or live technical interview depending on role seniority.

4. **Behavioural & Culture Fit Interview**  
   Agency assesses soft skills, communication, working style, and alignment to client's team culture.

5. **Shortlist Delivery**  
   Client receives a structured shortlist (typically 3–5 candidates) with detailed profiles: summary, tech assessment result, cultural fit notes, compensation expectations, availability.

6. **Client Interviews**  
   Client runs their own final interviews with shortlisted candidates. Agency supports with scheduling, debrief facilitation.

7. **Offer & Closing**  
   Agency assists with offer negotiation, reference checks if needed, and candidate communication until signed.

8. **Post-Placement Support**  
   Agency checks in at 30/60/90 days. Replacement guarantee if hire doesn't work out within the guarantee window.

**Visual style:** Vertical timeline or numbered step-by-step layout. Each step has: step number, title, who does what (client vs agency), and expected timeframe.

**Sidebar or banner:** "Avg. time from brief to shortlist: X days"

---

### 3.3 Services (`/services`)

Three clear engagement models — clients need to self-identify which fits:

#### Tier 1 — Per-Hire (Contingency)
- Agency is paid only on successful placement
- Fee = % of first-year salary OR flat fee per role
- Best for: Companies with occasional or unpredictable hiring needs
- SLA: Shortlist delivered within X business days of signed brief

#### Tier 2 — Retained Search
- Client pays an upfront retainer; agency exclusively works their role
- Best for: Senior / hard-to-fill roles, CTO, Principal Engineer, etc.
- Dedicated recruiter, faster turnaround, deeper search effort
- Includes: replacement guarantee, weekly status updates

#### Tier 3 — Embedded Recruiter (RPO-lite)
- Agency places a recruiter inside the client's hiring workflow for a defined period
- Best for: Companies scaling a team rapidly (e.g. hiring 5–20 engineers in 3–6 months)
- Recruiter joins Slack, attends standups, works on ATS, delivers volume
- Priced as monthly retainer

**Each tier displayed as a pricing card (no actual prices required if not public — can say "Pricing on request"):**
- Feature list
- Best for use-case
- CTA: "Get a Quote" / "Book a Call"

**Add-on services row** (below tiers):
- Technical Interview-as-a-Service (agency runs structured technical interviews on behalf of client)
- Role Brief Consulting (agency helps client write a realistic, attractive JD)
- Salary Benchmarking Report

---

### 3.4 Expertise (`/expertise`)

**Purpose:** Convince technical buyers (CTOs, VPs Eng) that the agency actually understands what they're hiring for.

#### Engineering Domains Covered
Each domain gets: icon, title, 2-sentence description, example roles.
- Frontend Engineering (React, Vue, Angular, Next.js, TypeScript)
- Backend Engineering (Node.js, Python/Django/FastAPI, Java/Spring, Go, Ruby on Rails)
- Mobile Engineering (iOS/Swift, Android/Kotlin, React Native, Flutter)
- DevOps / Platform / SRE (AWS, GCP, Azure, Kubernetes, Terraform, CI/CD)
- Data Engineering & ML (Python, Spark, Airflow, TensorFlow, PyTorch, dbt)
- QA / Test Automation (Selenium, Cypress, Appium, Jest)
- Full-Stack / Generalist Engineers
- Security Engineers
- Engineering Leadership (Engineering Manager, VP Eng, CTO)

#### How We Assess
- Brief description of the technical screening methodology
- Assessment types: async take-home, live pair-programming session, system design interview
- Optional: mention of partnerships with platforms (HackerRank, Codility, etc.)

#### Seniority Levels Served
Junior / Mid / Senior / Staff / Principal / Engineering Manager / VP of Engineering / CTO

---

### 3.5 For Engineers (`/for-engineers`)

**Purpose:** Build the agency's talent pool. Engineers submit a profile; if a match arises, the agency reaches out.

**Important framing:** This is NOT a job board. Engineers don't apply to specific roles. They join a vetted pool, and the agency matches them to relevant opportunities.

#### Sections:
- **Why join the talent pool** — "We bring you opportunities; you focus on building."
  - Roles with vetted companies
  - Salary negotiation support
  - No spam — only relevant matches
  - No public profile (privacy-first)

- **What to expect**
  - Submit profile → Agency review → Quick intro call → Added to active pool → Matched to roles as they come in
  - Honest: matches aren't guaranteed; depends on market demand for their skills

- **Submission Form** (see Section 5 — Forms)

- **FAQ**
  - Is this free for engineers? (Yes)
  - Will my current employer find out? (No)
  - What types of roles? (Software engineering, permanent, contract, or hybrid)
  - How long until I hear back? (X business days if shortlisted for review)

---

### 3.6 About (`/about`)

- **Origin story:** Why this agency was started, what gap it fills
- **Mission statement:** One clear, honest sentence
- **Team section:** Founders + key recruiters. Photo, name, role, one-liner background. LinkedIn link.
- **Values:** 3–4 values — specific and evidenced, not "we care about quality"
  - Suggested: Transparency, Technical rigour, Speed, Candidate respect
- **Operating model:** Where the agency is based, what markets/geographies it serves
- **Press / mentions** (if any)

---

### 3.7 Contact (`/contact`)

- **Primary CTA:** "Book a Free 30-Minute Discovery Call" — embedded Calendly widget or link
- **Secondary:** Contact form for async enquiries (see Section 5 — Forms)
- **Response time commitment:** "We respond to all enquiries within 1 business day."
- **Info displayed:** Email address, LinkedIn, city/timezone
- **For engineers:** Redirect to `/for-engineers` with a note ("Looking to join our talent pool? Head here instead.")

---

## 4. Global UX & Design Requirements

### 4.1 Visual Identity Direction
- **Tone:** Professional but not corporate-stiff. Confident, direct, and competent.
- **Palette:** Not the generic tech-startup blues. Suggest exploring: deep navy + warm off-white + a single electric accent (amber, jade, or coral) — final call with designer.
- **Typography:** A strong geometric or humanist sans for headlines (not Inter, not Poppins — too default). Clean legible body font. Monospace font for any tech stack callouts.
- **Do not use:** Stock photography of people in suits shaking hands. Generic icons from FontAwesome with no visual system. Templated card layouts with identical shadows.
- **Illustration style (if used):** Consistent — either all line art, all flat colour, or all abstract shapes. Never mixed.

### 4.2 Responsive Design
- Mobile-first development
- Breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop), 1440px (wide)
- Touch targets minimum 44x44px
- Navigation collapses to hamburger below 768px
- All tables and multi-column layouts reflow on mobile

### 4.3 Accessibility (WCAG 2.1 AA)
- All images have descriptive alt text
- Colour contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- All interactive elements keyboard-navigable with visible focus ring
- Skip-to-main-content link
- ARIA labels on icon-only buttons
- Form fields have proper label associations
- Screen reader tested (VoiceOver / NVDA minimum)

### 4.4 Performance
- Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- Images served in WebP/AVIF with appropriate srcset
- Fonts loaded via `font-display: swap`
- No render-blocking scripts in `<head>`
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

### 4.5 Animations & Motion
- Subtle entrance animations on scroll (fade-up, not slide-in from left on every element)
- `prefers-reduced-motion` media query respected — all animations disabled for users who opt out
- Page transitions: optional subtle fade, not aggressive slide animations
- Hover states on all interactive elements (buttons, cards, links)

---

## 5. Forms

### 5.1 Client Enquiry Form (`/contact`)
Fields:
- Company name *
- Your name *
- Work email * (validated format)
- Role(s) you're hiring for * (text area — multiple OK)
- Approx. team size (dropdown: 1–10 / 11–50 / 51–200 / 200+)
- Urgency (dropdown: Exploring / Within 3 months / Within 1 month / ASAP)
- How did you hear about us? (dropdown: LinkedIn / Referral / Google / Other)
- Message / anything else (text area, optional)
- Submit: "Send enquiry"

Behaviour:
- Client-side validation with clear inline error messages
- Success state: "Got it! We'll be in touch within 1 business day."
- Form data POSTs to backend / email handler (integration TBD — Formspree / Resend / custom endpoint)
- No CAPTCHA friction — use honeypot field instead

### 5.2 Engineer Profile Submission Form (`/for-engineers`)
Fields:
- Full name *
- Email *
- LinkedIn profile URL *
- GitHub / portfolio URL (optional)
- Primary role / title * (e.g. "Senior Frontend Engineer")
- Years of experience * (dropdown: 0–2 / 3–5 / 6–10 / 10+)
- Primary tech stack * (multi-select or tag input: React, Node, Python, Java, iOS, Android, DevOps, etc.)
- Employment type preference * (Full-time / Contract / Open to both)
- Current availability * (Immediately / 2 weeks / 1 month / 3 months / Just exploring)
- Current location * (text field)
- Open to remote / relocation (checkbox: Remote only / Hybrid / On-site / Open to relocation)
- Brief intro (text area, max 500 chars, optional) — "Anything you want us to know?"
- Upload CV (PDF, max 5MB, optional)
- Consent checkbox: "I consent to my data being held by [Agency Name] for recruitment purposes."
- Submit: "Submit my profile"

Behaviour:
- Same validation and success-state UX as client form
- CV stored securely (S3 or equivalent — backend integration TBD)
- Auto-acknowledgement email to engineer after submission

---

## 6. SEO Requirements

### 6.1 On-Page SEO
- Each page has a unique, keyword-targeted `<title>` and `<meta description>`
- H1 present and unique on every page
- Heading hierarchy (H1 → H2 → H3) logical throughout
- Internal linking between related pages
- Canonical tags on all pages
- Sitemap.xml generated and submitted to Google Search Console
- robots.txt configured correctly

### 6.2 Target Keywords (starter list)
- "engineering recruitment agency"
- "hire software engineers for startups"
- "outsourced technical recruiting"
- "tech recruitment intermediary"
- "software developer headhunter"
- "[city/country]-specific variants" — to be defined based on target geography

### 6.3 Structured Data
- `Organization` schema on home page
- `Service` schema on services page
- `FAQPage` schema on for-engineers FAQ section
- `BreadcrumbList` on all inner pages

---

## 7. Integrations

| Integration | Purpose | Priority |
|---|---|---|
| Calendly (or Cal.com) | Discovery call booking on /contact | High |
| Email handler (Formspree / Resend / custom) | Form submissions → email alerts | High |
| Google Analytics 4 | Traffic and conversion tracking | High |
| LinkedIn Insight Tag | LinkedIn ad retargeting | Medium |
| CRM (HubSpot / Pipedrive) | Client lead pipeline | Medium |
| ATS (Workable / Breezy / Greenhouse) | Internal candidate management | Low (future) |
| Live chat (Crisp / Intercom) | Immediate client enquiry support | Low (future) |

---

## 8. Tech Stack Recommendations

The site requirements are marketable, relatively static, and conversion-focused — not a complex web app. Recommended:

- **Framework:** Next.js (React) — SSG/SSR hybrid, fast, great SEO
- **Styling:** Tailwind CSS + custom design tokens
- **Hosting:** Vercel (zero-config, CDN, preview deployments)
- **Forms:** Resend for transactional email + Formspree or custom API route
- **CMS (optional):** Sanity or Contentful for blog/case-studies if content will be updated frequently; otherwise hardcoded
- **File storage (CV uploads):** AWS S3 or Cloudflare R2
- **Analytics:** GA4 + Vercel Analytics
- **Domain & DNS:** Cloudflare (free DDoS protection + fast DNS)

---

## 9. Content Requirements

### 9.1 Content Needed Before Launch
- [ ] Agency name, logo (SVG), favicon
- [ ] Hero headline and sub-headline (finalised copy)
- [ ] Team bios and photos (minimum: 2 founders)
- [ ] Stats / proof points (even estimates are fine to start; update once real data exists)
- [ ] Services pricing decision (public vs "on request")
- [ ] Geography / markets served (which countries / timezones the agency serves)
- [ ] Testimonial policy (placeholder vs real quotes)
- [ ] Privacy Policy and Terms of Service (lawyer-reviewed)

### 9.2 Content That Can Be Placeholder at Launch
- Case studies (marked "coming soon" or hidden entirely)
- Blog / resources section (exclude from V1)
- Press / media mentions

---

## 10. Analytics & Conversion Tracking

### 10.1 Key Events to Track (GA4)
| Event | Trigger |
|---|---|
| `cta_click_start_hiring` | Hero CTA click |
| `form_submit_client` | Client enquiry form submission |
| `form_submit_engineer` | Engineer profile form submission |
| `calendly_open` | Discovery call booking widget opened |
| `calendly_booked` | Booking confirmed (Calendly webhook) |
| `page_view` | All pages |
| `scroll_depth_50` / `scroll_depth_90` | Scroll milestones on home |
| `outbound_click` | Clicks to LinkedIn / external links |

### 10.2 Primary Conversion Goals
1. Client enquiry form submission
2. Calendly discovery call booked
3. Engineer profile submission (secondary)

---

## 11. Legal & Compliance

- **GDPR compliance** required if serving EU clients or candidates
  - Cookie consent banner (Cookiebot or equivalent)
  - Privacy Policy linked in footer
  - Form consent checkboxes where personal data is collected
  - Data deletion request mechanism (email contact in privacy policy is sufficient for V1)
- **CCPA** if serving California-based clients
- **Terms of Service** covering: scope of service, payment terms, replacement guarantee policy, limitation of liability
- **No dark patterns:** Cookie banner must have a real "Reject" option, not just "Accept"

---

## 12. Launch Checklist

### Pre-Launch
- [ ] All pages complete and reviewed
- [ ] Forms tested end-to-end (submission → email alert received)
- [ ] Mobile tested on real devices (iOS Safari, Android Chrome)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Lighthouse audit run — all scores ≥ 90
- [ ] All images have alt text
- [ ] 404 page styled and in place
- [ ] sitemap.xml and robots.txt live
- [ ] Google Search Console verified
- [ ] GA4 tracking verified (real-time view)
- [ ] Privacy Policy and Terms reviewed
- [ ] Cookie consent banner working
- [ ] SSL certificate active (HTTPS)
- [ ] Redirect www → non-www (or vice versa)

### Post-Launch (Week 1)
- [ ] Submit sitemap to Google Search Console
- [ ] Set up GA4 conversion goals
- [ ] LinkedIn Insight Tag verified
- [ ] Monitor form submissions for spam (add honeypot if needed)
- [ ] Calendly tested with real booking

---

## 13. Out of Scope (V1)

The following are explicitly excluded from the initial build and should be planned for a future phase:

- Client portal / login-protected dashboard
- Candidate portal / application tracking for engineers
- Public job board or role listings
- Blog / content marketing section
- Automated candidate matching algorithm
- Video content / webinars
- Multi-language support
- Payment processing / invoice generation

---

## 14. Open Questions

Resolved during the V1 build. Decisions marked **Assumed** were made to unblock
implementation and need founder sign-off — each is a single-file change.

| # | Question | Owner | Status | Decision |
|---|---|---|---|---|
| 1 | What is the agency name and brand? | Founder | **Assumed** | **Swift Hire** (from this document's header). Legal entity rendered as *Swift Hire Solutions Ltd.* Change in `src/lib/site.ts` |
| 2 | Which geographies does the agency serve? | Founder | **Assumed** | London HQ; UK, EU and Gulf markets, remote-first placements worldwide. `src/lib/site.ts` |
| 3 | Are service prices public or "on request"? | Founder | **Resolved** | "On request" on all three tiers, with the fee *basis* stated (% of first-year salary / retainer / monthly). Structure is public, numbers are not |
| 4 | Replacement guarantee window — how many days? | Founder | **Assumed** | **90 days**, used consistently across services, process and terms. Single constant: `siteConfig.guaranteeDays` |
| 5 | What CRM will be used for client leads? | Founder | **Open** | Not integrated. Enquiries go to email via Resend; add a CRM webhook in `src/app/api/contact/route.ts` when chosen |
| 6 | Will there be a blog at launch? | Founder | **Resolved** | No — out of scope per §13 |
| 7 | Calendly account set up? | Founder | **Open** | Wired but unconfigured. Set `NEXT_PUBLIC_CALENDLY_URL`; embed is click-to-load, so nothing reaches Calendly until the visitor asks |
| 8 | Who writes the final copy — founder or copywriter? | Founder | **Assumed** | Full copy written and shipped. Needs founder review for factual accuracy, particularly every number |
| 9 | Next.js or a simpler static site? | Dev | **Resolved** | **Next.js 15 App Router.** Justified by the two validated form endpoints and per-request CSP nonces, not by page count |
| 10 | Data residency requirements? | Legal | **Open** | Not determined. If EU residency is required, pin the Vercel function region and confirm Resend's processing location before launch |

### 14.1 Decisions taken beyond the brief

| Area | Brief said | Built | Why |
|---|---|---|---|
| Palette | "deep navy + warm off-white + a single electric accent (amber, jade, or coral)" | Navy `#0b1524`, paper `#f3f0e9`, **jade** `#00c88b` | Jade reads as *verified / passed*, which is what a screening agency actually sells. Amber and coral are the more predictable navy pairings |
| Typography | "not Inter, not Poppins" | **Archivo** display, **Public Sans** body, **JetBrains Mono** utility | Archivo is variable on both weight and width, so large statements can genuinely expand rather than only embolden |
| Home hero visual | "abstract illustration, animated background, or photography" | **Interactive funnel** — 240 sourced → 1 hired, each stage openable | Makes the document's central goal (process transparency) the first thing a visitor touches. Built as an ARIA tablist, so it is keyboard and screen-reader operable |
| Cookie banner | "Cookiebot or equivalent" | Built in-house | A third-party consent script is itself a tracker. ~90 lines, no vendor, and analytics genuinely does not load before consent |
| Calendly | "embedded widget" | **Click-to-load** embed | Keeps a third-party iframe off the critical path, and sends nothing to Calendly for visitors who only wanted the email address |
| CAPTCHA | "no CAPTCHA — honeypot instead" | Honeypot **+ timing trap + rate limit** | Honeypot alone stops naive bots only. All three fail *silently* so a caught bot cannot tell what tripped it |
| Team photos | "Photo, name, role" | Monogram tiles | §4.1 forbids stock photography of people; invented headshots would be worse. Swap in real photographs when they exist |

### 14.2 Scope change — v2 (August 2026)

The brief was extended after the v1 build. Two changes, both implemented:

**Positioning widened from recruitment-only to ten business services.** The
agency is now `Swift Hire`, an outsourced business services partner. Recruitment
& Staffing is the flagship service rather than the whole company, so the
existing depth (`/how-it-works`, `/expertise`, `/for-engineers`, the screening
funnel) is retained and sits underneath it. Copy that claimed a recruitment-only
remit was reconciled — the "we only recruit engineers" line now reads as a
deliberate constraint *on the recruitment practice*, which is still true and
still worth saying.

| | |
|---|---|
| **Data source** | `src/data/services.ts` — one array drives the mega-menu, mobile accordion, `/services` grid, all ten sub-pages, footer, sitemap and structured data |
| **Routing** | `app/services/[slug]/page.tsx` with `generateStaticParams` — all ten prerendered at build; `dynamicParams = false` so unknown slugs 404 rather than render empty |
| **Sub-page sections** | Hero + Get a Quote · What's included · Who it's for · Our process · Why us · Related services · CTA band |
| **Old engagement models** | The per-hire / retained / embedded tiers were recruitment-specific pricing, not services. Removed from `/services`; the recruitment sub-page describes the same models in prose |

**Animation layer added (Framer Motion).** Scroll-triggered fade-up on every
section and card with stagger on groups; hero entrance sequenced 0.15s apart on
mount; stats counting up on scroll; process steps arriving one by one;
transparent → frosted sticky header; CSS hover lift on buttons and cards;
route-change fade; a floating "Book a call" after 300px. All of it collapses to
static under `prefers-reduced-motion`, verified in a real browser.

Testing added alongside: `pnpm e2e` drives Chrome via `puppeteer-core` and
asserts the mobile sheet, the services accordion, the desktop mega-menu, the
header transition, reduced-motion behaviour, and zero console or hydration
errors on every route. 45 checks.

### 14.2.1 Hydration and CSP fix (August 2026)

A production hydration error ("attributes of the server rendered HTML didn't
match") traced to the JSON-LD script tags carrying an unnecessary CSP nonce —
browsers zero out a script's reflected `nonce` attribute immediately after
parsing it (a mitigation called nonce hiding), which React's hydration check
reads as a mismatch. `application/ld+json` isn't an executable script type, so
`script-src` never gated it anyway; the nonce was removed rather than
suppressed. That surfaced a second, more serious issue: the `headers()` call
tied to that nonce had been the thing forcing every page to render dynamically,
and removing it let pages fall back to static generation — which breaks this
site's CSP outright, since Next bakes its own script nonces in at build time
while `middleware.ts` mints a fresh one per request. The browser then blocks
every script and the page ships with no working JavaScript. Fixed by making the
dynamic-rendering requirement explicit (`export const dynamic =
"force-dynamic"`) instead of incidental, and by deleting `generateStaticParams`
from the service sub-page rather than fighting it — the 404 behaviour it
existed for is already provided at runtime by `getService(slug)` + `notFound()`.

Also cleaned up in the same pass: a dead CSS variable, an exported constant
nothing imported, `package.json` still named `axenity-site` from before the
rebrand, and three test scripts each hardcoding their own copy of the route
list. Full detail and the reasoning behind each fix is in README.md.

### 14.3 Known gaps at handover

Tracked in detail in [README.md](README.md):

- CV object storage is **not** wired up — uploads are validated, then dropped
- Testimonials, team biographies, stats and funnel counts are **placeholders**,
  each flagged in-source and, where visitor-facing, on the page itself
- Both legal documents are **unreviewed templates** with visible banners saying so
- Case studies page is deliberately `noindex` until it has real content
