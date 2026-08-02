# Swift Hire — agency site

Outsourced business services agency site: ten services, each with its own
sub-page, plus the recruitment depth described in [requirements.md](requirements.md).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · Zod · React Hook Form

---

## Adding or changing a service

Everything comes from one array — [src/data/services.ts](src/data/services.ts).
Add an object to it and you automatically get:

- a card in the desktop mega-menu and the mobile accordion
- a card on the `/services` landing grid and on the home page
- a fully rendered `/services/<slug>` page, prerendered at build time
- a footer link, a sitemap entry, and `Service` structured data

Nothing else needs editing. The only extra step is if you want a new icon: add
one path set to [src/components/icons/service-icon.tsx](src/components/icons/service-icon.tsx)
and reference it by name.

---

## Motion

Framer Motion, wrapped in four primitives so pages stay declarative:

| Primitive | Used for |
|---|---|
| `Reveal` | Fade-up on scroll (opacity 0→1, y 30→0), once per element. `delay` is in **ms** |
| `Stagger` / `StaggerItem` | Card grids and lists — children cascade rather than each running its own observer |
| `HeroStagger` / `HeroItem` | Hero entrance on **mount**, 0.15s apart. A scroll trigger would never fire above the fold |
| `CountUp` | Stats counting from zero when scrolled into view |

`AmbientGlow` adds the slow drift behind the hero, and `PageTransition` fades
each route in over 300ms.

**Reduced motion is handled in two layers.** `usePrefersReducedMotion` starts
`false` so server and first client render agree (reading `matchMedia` during
render would trip a hydration mismatch), then reports the truth one tick later.
Covering that tick, `globals.css` force-shows every `[data-motion]` element
under `prefers-reduced-motion: reduce` with `!important`, which outranks the
inline `opacity: 0` Framer Motion writes. So a reduced-motion visitor sees
everything on the first paint — even if the JS never runs at all.

> **Trade-off worth knowing:** content now starts at `opacity: 0` and is
> revealed by JS, as specified. If the bundle fails to execute, a
> non-reduced-motion visitor sees a blank page. That is inherent to
> "nothing visible on load"; the reduced-motion CSS is the only escape hatch.

### A Tailwind v4 footgun this codebase hit twice

`translate-*` and `scale-*` utilities compile to the standalone CSS `translate`
and `scale` properties in Tailwind v4 — **not** `transform`. Pairing either with
a hand-written `transition-[transform,...]` list looks correct, typechecks,
lints clean, and silently does nothing: the property changes value but isn't in
the transitioned list, so it snaps instead of easing. Caught by checking
`getComputedStyle(el).translate` (not `.transform`) before and after a real
`pointermove`/hover — a screenshot alone won't show it, since the end state is
visually identical to an animated one. Both instances are fixed
(`SpotlightCard`, `FloatingCta`); if you add a new `hover:-translate-y-*` or
`hover:scale-*` anywhere, name the real property in `transition-[...]`.

---

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build          # production build
pnpm start          # serve the production build
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit
pnpm validate:html  # HTML validity + nesting, against a running server
pnpm e2e            # browser tests: navigation, hydration, reduced motion
```

`pnpm e2e` drives your locally-installed Chrome through `puppeteer-core` (no
browser download). It covers the mobile sheet and services accordion at
375×667, the desktop mega-menu, the frosted-header transition, and asserts
**zero console or hydration errors on every route**. Override the browser with
`CHROME_PATH` and the target with `E2E_BASE_URL`. `pnpm check:hydration` runs a
narrower, stricter check against `next dev` specifically — dev mode prints
React's actual attribute-level hydration diff, where production only shows the
generic summary, so it's the one to reach for when triaging a hydration report.

All three scripts (`validate:html`, `e2e`, `check:hydration`) import the same
route list from `scripts/routes.mjs` rather than each hardcoding its own —
previously they didn't, and it was starting to drift.

> **Both scripts need a running server** (`pnpm start -p 3742`), and the server
> must be started *after* the most recent `pnpm install` — installing rewrites
> `node_modules/.pnpm`, which invalidates the chunk paths baked into `.next` and
> produces `Cannot find module './787.js'` 500s. Rebuild after any install.

`validate:html` fetches every public route and parses it. It filters out
Next/React streaming artifacts (metadata streamed into `<body>` and hoisted on
the client, suspense-boundary ids like `B:0`) so anything it reports is our
markup. Expects a server on `:3742` — override with `VALIDATE_BASE_URL`.

> If you ever see `TypeError: a[d] is not a function` from `webpack-runtime`,
> that is a stale `.next` cache, usually from rebuilding while `next start` held
> the old chunks, or from running `next dev` and `next start` against the same
> `.next` directory back to back (they write incompatible output — `next dev`
> after a `next build` corrupts the production build). Delete `.next` and
> rebuild for the mode you actually want.
>
> `scripts/screenshot.mjs` is a standing visual-review tool, not a test — it
> captures full-page PNGs of the key routes to the OS temp dir so design work
> can be checked by looking at it rather than guessing from markup.

The site runs with **no environment variables at all**. In that state the forms
validate and accept submissions but only log them — they do not silently
pretend an email was sent. Copy `.env.example` to `.env.local` to switch on real
delivery, scheduling and analytics.

---

## Design

| | |
|---|---|
| **Surfaces** | Deep navy `#0b1524` alternating with warm paper `#f3f0e9` — the page is built from bands, not one flat background |
| **Accent** | Signal jade `#00c88b`, reserved for action, focus rings and "passed" states. A second, darker jade `#006b4a` exists solely because the bright one cannot hit 4.5:1 on paper |
| **Display** | Archivo (variable weight *and* width) |
| **Body** | Public Sans |
| **Utility** | JetBrains Mono — eyebrows, tech stacks, data, timings |
| **Signature** | The funnel on the home page: 240 sourced → 1 hired, each stage openable |
| **Icons** | One system — 24×24 grid, stroked paths only, uniform 1.5 weight, no fills |
| **Cards** | `SpotlightCard` — lifts on hover, carries a pointer-tracked radial highlight, one surface treatment everywhere (services, testimonials, team, audience blocks) |
| **Surface** | Every band gets film-grain texture and a soft directional gradient wash (`Section` in `ui/section.tsx`), under 5% opacity — texture, not colour, so contrast ratios are untouched |

Fonts are self-hosted by `next/font`, so no request ever leaves for Google Fonts
and no third-party origin is needed in the CSP.

---

## Security

| Control | Where |
|---|---|
| Nonce-based CSP with `strict-dynamic`, no `unsafe-inline` for scripts | [src/middleware.ts](src/middleware.ts) |
| HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP | [next.config.ts](next.config.ts) |
| Server-side revalidation with the same Zod schema the browser used | [src/lib/schemas.ts](src/lib/schemas.ts) |
| Rate limiting, per IP per endpoint | [src/lib/rate-limit.ts](src/lib/rate-limit.ts) |
| Honeypot + submission-timing trap, both silently accepted | [src/app/api/](src/app/api/) |
| PDF verified by magic bytes, not by the client's MIME type | [src/lib/schemas.ts](src/lib/schemas.ts) `isPdf` |
| HTML escaping on every value interpolated into an email | [src/lib/email.ts](src/lib/email.ts) |
| CRLF stripped from email header positions | [src/lib/email.ts](src/lib/email.ts) |
| `poweredByHeader: false`, no framework version advertised | [next.config.ts](next.config.ts) |

Verified against the running production build:

```
GET  /api/contact                          405
POST wrong content-type                    415
POST invalid payload                       400  (per-field messages)
POST disposable email domain               400
POST honeypot filled                       200  (silent — bot learns nothing)
POST submitted in 400 ms                   200  (silent)
POST 6th request in window                 429  + Retry-After
POST spoofed PDF (right MIME, wrong bytes) 415
POST 6 MB upload                           413
POST consent withheld                      400
```

HTML validity and nesting: clean across all 21 routes (`pnpm validate:html`).
Browser suite: 45/45 (`pnpm e2e`). `pnpm lint` and `pnpm typecheck` both exit 0.

---

## Hydration

Three classes of server/client divergence were found and fixed at the root
rather than papered over with `suppressHydrationWarning`. All three are easy to
reintroduce, so they are worth knowing:

**1. Never mutate the DOM before hydration.** An earlier scroll-reveal system
used an inline `<script>` in `<head>` to add a `js` class to `<html>`. That runs
*before* React hydrates, so the server's `class` attribute no longer matched —
the exact "attributes of the server rendered HTML didn't match" error. Framer
Motion replaced it entirely; there is no inline script and nothing for hydration
to disagree about. The same rule is why `usePrefersReducedMotion` starts `false`
rather than reading `matchMedia` during render.

**2. `nonce` on a `<script>` tag will always look mismatched to React, and that
is not a bug.** Once a browser parses `<script nonce="...">` from HTML text, it
immediately zeroes out the reflected *attribute* — a CSP mitigation called
nonce hiding, so the value can't be read back off the DOM — while the
underlying property keeps the real value. React's hydration check reads the
attribute, sees `""`, and flags a mismatch against what it expected to render.
It fired on every `JsonLd` script on every page. The fix wasn't to suppress it:
`application/ld+json` is not an executable script MIME type, so `script-src`
never gates it in any browser regardless of nonce — the nonce was doing nothing
except causing this. `JsonLd` now renders with none. See
[src/components/json-ld.tsx](src/components/json-ld.tsx).

**3. That fix had a sharp edge: it silently made every page static, which broke
the site.** `JsonLd`'s `headers()` call was the thing forcing every route to
render dynamically. Removing it let pages fall back to static generation —
which sounds like a win, but Next bakes its own framework scripts' nonce in at
*build* time for a static page, while `middleware.ts` mints a fresh nonce on
*every request*. The two stop matching, the browser blocks every script under
CSP, and the page ships with **no working JavaScript at all** — no hydration,
no click handlers. `pnpm e2e` caught it immediately: the mobile menu stopped
opening, full stop. Fixed with an explicit `export const dynamic =
"force-dynamic"` in the root layout, and `generateStaticParams` was removed
from `/services/[slug]` entirely rather than fought — the unknown-slug 404 it
existed for is already handled at runtime by `getService(slug)` + `notFound()`,
so nothing was lost by deleting the machinery that also happened to cause the
bug. See `app/layout.tsx` and `app/services/[slug]/page.tsx`.

**2. `process.env.NEXT_PUBLIC_X` must use dot notation.** Next inlines public env
vars into the client bundle by literal text substitution on `process.env.NAME`.
`process.env["NAME"]` is **not** substituted, so it reads as defined on the
server and `undefined` in the browser — a guaranteed mismatch. Two components
had this.

**3. Anything a client component reads must be `NEXT_PUBLIC_`.** `siteConfig.url`
read `SITE_URL`, which is server-only, while `siteConfig` is imported by client
components. It is now `NEXT_PUBLIC_SITE_URL`.

`suppressHydrationWarning` is set on `<html>` and `<body>` only, to absorb
attributes injected by browser extensions (password managers, Grammarly). It
suppresses one level, so genuine mismatches inside the tree still surface.

### Two deliberate trade-offs

**Every page renders dynamically (`ƒ`), not statically — enforced explicitly,
not incidentally.** A per-request CSP nonce is the thing that lets us drop
`'unsafe-inline'` from `script-src`, and Next can only stamp that nonce onto its
scripts while rendering per request; static export and a strict nonce CSP are
mutually exclusive (see Hydration §2–3 above for what happens when a page
becomes static anyway). `export const dynamic = "force-dynamic"` in
`app/layout.tsx` is what guarantees this now, rather than it being a side
effect of some component happening to call `headers()`. The pages fetch no
data, so this is server render cost only — but if you would rather have static
pages, remove the nonce from `middleware.ts` and accept `'unsafe-inline'`.

**The rate limiter is in-process.** State lives in a `Map`, so on a multi-region
serverless deployment each instance keeps its own window. That is fine for
form-spam mitigation and is not the only defence, but it is not a hard global
limit. Swap `rateLimit()` for Upstash Redis or Vercel KV — the signature is
already the right shape.

---

## Before this goes live

Content marked as placeholder in the source, each with a note at the point of
use:

- [ ] **Testimonials** ([src/content/home.ts](src/content/home.ts)) — written to
      be representative, attributed to nobody. Replace with named,
      written-consent quotes or delete the section. Do not publish unattributed
      praise as if it were real.
- [ ] **Team** ([src/content/team.ts](src/content/team.ts)) — invented names and
      biographies. Replace with the real founders.
- [ ] **Stats** ([src/content/home.ts](src/content/home.ts)) and **funnel counts**
      ([src/content/pipeline.ts](src/content/pipeline.ts)) — plausible
      early-stage figures, not audited. Replace from the ATS.
- [ ] **Privacy policy** and **terms of service** — accurate descriptions of
      intended practice, but templates. Both carry a visible "not yet legally
      reviewed" banner and the terms have `[…]` placeholders for fee
      percentages, notice periods and the liability cap. A solicitor must
      complete and review them.

Not yet wired up:

- [ ] **CV object storage.** Uploads are validated then intentionally dropped —
      writing to the app filesystem is unsafe on serverless and would not
      survive a redeploy. Stream to S3 or R2 with a server-generated key (never
      the client's filename), server-side encryption and no public ACL. See the
      comment in [src/app/api/engineers/route.ts](src/app/api/engineers/route.ts).
- [ ] **Real Calendly URL** and **GA4 measurement id** in `.env.local`.
- [ ] **Open graph image** — add to `/public` and declare in the layout's
      metadata (not via `app/opengraph-image`, for the apostrophe reason below).
- [ ] **Service copy review** — all ten sub-pages are written and specific, but
      claims like accuracy targets, SLAs and guarantee windows are commitments.
      Someone who can honour them should read them.

---

## A note on the directory name

This project lives in a path containing an apostrophe (`atta's-agency`). Next's
metadata-route loader interpolates the absolute project path into generated
source **without escaping it**, so the conventional `app/robots.ts` and
`app/sitemap.ts` files fail to compile here with `Module parse failed`.

Both are therefore served as ordinary route handlers
([src/app/robots.txt/route.ts](src/app/robots.txt/route.ts),
[src/app/sitemap.xml/route.ts](src/app/sitemap.xml/route.ts)), which produce
identical output and bypass that loader. The favicon is served from `/public`
and declared in the layout's `metadata.icons` for the same reason — the
`app/icon.svg` convention goes through the equivalent image loader.

If the project is ever moved to a path without an apostrophe, all the
conventional forms work and these workarounds can be reverted.
