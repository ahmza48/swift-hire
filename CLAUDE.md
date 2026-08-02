# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Swift Hire — an outsourced business services agency site (Next.js 15 App
Router, React 19, TypeScript strict, Tailwind CSS v4, Framer Motion, Zod,
React Hook Form). Ten services, each with a dedicated sub-page, plus deeper
recruitment-specific content (`/how-it-works`, `/expertise`, `/for-engineers`).
Product intent is documented in [requirements.md](requirements.md); everything
about *how* the codebase is built and why is in [README.md](README.md) — read
that first, it is extensive and hard-won (hydration bugs, a CSP/static-render
conflict, a Tailwind v4 footgun, all documented with root causes).

## Commands

```bash
pnpm install
pnpm dev                # dev server, http://localhost:3000

pnpm build               # production build
pnpm start -p 3742       # serve the production build (tests below expect :3742)
pnpm lint                # eslint . — must exit 0
pnpm typecheck            # tsc --noEmit — must exit 0

pnpm validate:html        # HTML validity/nesting across every route (needs a running server)
pnpm e2e                  # browser tests via puppeteer-core: nav, hydration, reduced motion (needs a running server)
pnpm check:hydration       # stricter hydration diff against `next dev` on :3743 (needs a running dev server)
pnpm check:overflow        # horizontal-overflow check at 375/768/1280/1440px (needs a running server)
```

There is no unit test runner — correctness is verified by `typecheck` + `lint`
+ the four browser/HTML scripts above, all of which must pass before treating
a change as done. `pnpm e2e` drives your locally-installed Chrome via
`puppeteer-core` (no browser download); override with `CHROME_PATH` and
`E2E_BASE_URL`/`VALIDATE_BASE_URL`. All four scripts import the same route
list from `scripts/routes.mjs` — add new routes there, not in each script.

**Critical gotcha, hit repeatedly in this repo's history:** `next dev` and
`next start` write incompatible output to the same `.next` directory. Running
one after the other corrupts it (`Cannot find module './787.js'` or
`TypeError: a[d] is not a function`). Delete `.next` and rebuild for whichever
mode you're about to run. Same applies after any `pnpm install` — it rewrites
`node_modules/.pnpm` and invalidates chunk paths baked into an existing
`.next`.

`scripts/screenshot.mjs` is a standing visual-review tool (not a test) —
captures full-page PNGs of key routes to the OS temp dir so design changes can
be checked by looking rather than guessing from markup.

## Architecture

### The services catalogue is the single source of truth

[src/data/services.ts](src/data/services.ts) is one array. Adding an object to
it is the *entire* change required to add a service — it automatically
produces: a card in the desktop mega-menu and mobile accordion
([site-header.tsx](src/components/site-header.tsx)), a card on the `/services`
grid and the home page, a fully rendered `/services/<slug>` page (rendered
per-request, not statically — see below), a footer link, a sitemap entry, and
`Service` JSON-LD. Don't hand-edit any of those downstream places. New icons go
in [service-icon.tsx](src/components/icons/service-icon.tsx) as one more path
set in the existing 24×24 stroked-line system.

### Every page renders dynamically, on purpose

`export const dynamic = "force-dynamic"` in [app/layout.tsx](src/app/layout.tsx)
forces every route to render per-request rather than being statically
generated. This is a hard requirement, not a performance default:
[middleware.ts](src/middleware.ts) mints a fresh CSP nonce every request and
Next stamps that nonce onto its own framework `<script>` tags — but only while
rendering per-request. If a page is statically generated, that stamping
happens once at build time and the baked-in nonce stops matching the
per-request CSP header on every subsequent real request; the browser then
blocks every script and the page ships with **zero working JavaScript** (no
hydration, no click handlers, nothing). This exact failure happened once
already (README "Hydration" §3) and `pnpm e2e` is what caught it. Do not add
`generateStaticParams` back to `/services/[slug]` or remove the `dynamic`
export without understanding this.

### Security headers split across two layers

Static, non-nonce headers (HSTS, X-Frame-Options, Permissions-Policy, etc.)
live in [next.config.ts](next.config.ts). The CSP is *not* there — it carries
a per-request nonce and is set in [middleware.ts](src/middleware.ts) instead,
alongside `x-nonce` on the request (readable via `headers()` in Server
Components that need it — most don't). `JsonLd` deliberately does **not**
carry a nonce: `application/ld+json` isn't an executable script type so
`script-src` never gates it, and giving it one previously caused a hydration
mismatch via CSP nonce-hiding (README "Hydration" §2).

### Forms: shared Zod schemas, no-op by default

[lib/schemas.ts](src/lib/schemas.ts) defines the contract for both client
forms (contact, engineer profile); the browser and the API route handlers in
[app/api/](src/app/api/) parse the *same* schema, so client validation is UX
only, never the trust boundary. The site runs with zero environment variables
set — in that state, submissions validate and are accepted but only logged
([lib/email.ts](src/lib/email.ts) checks `emailEnabled` from
[lib/env.ts](src/lib/env.ts)), rather than silently pretending delivery
happened. Every endpoint has a honeypot field and a submission-timing trap,
both of which return a *silent* 200 rather than a distinguishing error, so a
bot can't learn what tripped it. Rate limiting
([lib/rate-limit.ts](src/lib/rate-limit.ts)) is a per-process in-memory `Map`
— fine for spam mitigation, not a hard global limit on multi-region
serverless.

### Motion primitives, not raw Framer Motion

Four wrappers in [components/motion/](src/components/motion/) keep pages
declarative: `Reveal` (fade-up on scroll, `delay` in **ms**), `Stagger`/
`StaggerItem` (cascading grids), `HeroStagger`/`HeroItem` (mount-triggered,
for above-the-fold content a scroll observer would never fire on), and
`CountUp`. `SpotlightCard` is the one shared card treatment (lift + pointer-
tracked radial highlight) used for every card grid on the site — don't
reintroduce a bespoke card style. `usePrefersReducedMotion()` starts `false`
(to keep SSR/first-client-render in agreement) and is backed by a CSS rule in
`globals.css` that force-shows `[data-motion]` elements under
`prefers-reduced-motion: reduce`, so nothing is ever stuck invisible even
before the hook's real value lands.

**Tailwind v4 footgun to know before touching hover animations:**
`translate-*`/`scale-*` utilities compile to the standalone CSS `translate`/
`scale` properties, not `transform`. A `transition-[transform,...]` list next
to `hover:-translate-y-*` or `hover:scale-*` typechecks and lints clean but
silently doesn't animate — name the real property. (Full account in README.)

### Design system

Navy (`#0b1524`) / paper (`#f3f0e9`) bands with a single jade accent
(`#00c88b`, plus a darker `#006b4a` for AA contrast on light backgrounds).
Archivo (variable weight+width) for display type, Public Sans for body,
JetBrains Mono for data/timings/eyebrows. Every `Section` band gets grain
texture + a directional gradient wash automatically
([ui/section.tsx](src/components/ui/section.tsx)) — don't add per-page
background treatments. The funnel visualization on the home page
(`components/pipeline.tsx`) is the deliberate signature element.

### The apostrophe in the project path

This repo lives at a path containing `'` (`atta's-agency`). Next's
metadata-route loader (`app/robots.ts`, `app/sitemap.ts`, `app/icon.svg`
conventions) interpolates the absolute project path into generated source
**unescaped** and fails to compile here. Robots and sitemap are therefore
plain route handlers ([app/robots.txt/route.ts](src/app/robots.txt/route.ts),
[app/sitemap.xml/route.ts](src/app/sitemap.xml/route.ts)); the favicon is
served from `/public` and declared via `metadata.icons` in the layout instead
of `app/icon.svg`. If the project ever moves to a path without an apostrophe,
the conventional forms work and these workarounds can be reverted — but don't
"fix" them back without checking the path first.

### Path alias

`@/*` → `src/*` (see `tsconfig.json`).
