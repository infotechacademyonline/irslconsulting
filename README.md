# IRSL Consulting Nigeria — Website

A production Next.js site for **IRSL Consulting Nigeria**, the Nigerian practice of **Infotech Risks Security**. Governance, Risk & Compliance advisory — nine anchor business problems delivered on any enterprise platform.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** strict
- **Tailwind CSS** with parent-brand tokens as CSS variables
- **Zod** shared client/server schemas · **React Hook Form** on the booking form
- **Resend** transactional email · **Cloudflare Turnstile** anti-spam
- **Vitest** unit tests · **Playwright** E2E + **@axe-core/playwright** a11y
- **Vercel**-ready deployment · CI via GitHub Actions

## Prerequisites

- Node 20+
- npm 10+

## Local development

```bash
npm install
cp .env.example .env.local     # fill in the values you have
npm run dev                    # http://localhost:3000
```

You can develop without secrets set:
- Booking submissions log to the server console instead of sending email.
- Turnstile verification is skipped in dev.
- Rate limiting runs in-process (no Redis needed).

## Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Production build                      |
| `npm run start`     | Run the production build              |
| `npm run typecheck` | `tsc --noEmit` on the whole tree      |
| `npm run lint`      | ESLint + Next + jsx-a11y              |
| `npm run format`    | Prettier                              |
| `npm run test`      | Vitest unit tests                     |
| `npm run test:e2e`  | Playwright E2E (Chromium + WebKit)    |

## Project structure

```
app/
├─ layout.tsx                     Root layout — fonts, nav, footer, sprite
├─ page.tsx                       Home
├─ solutions/
│  ├─ page.tsx                    Index
│  └─ [slug]/page.tsx             9 solution detail pages (static generation)
├─ about/                         About + /about/leadership
├─ engage/                        Engagement models
├─ sectors/                       Sector map
├─ partners/                      Partners & ecosystem
├─ insights/                      Insights (Sanity Phase 2)
├─ book-a-call/                   Consultation form
├─ careers/                       Careers & talent
├─ contact/                       Contact
├─ (legal)/                       Privacy · Terms · NDPA · Cookies (drafts)
├─ actions/book-consultation.ts   Server action for the booking form
├─ sitemap.ts · robots.ts         SEO
└─ not-found.tsx
components/
├─ layout/                        Nav · Footer · CtaBand
├─ sections/                      Hero, SolutionsGrid, EngageGrid, …
├─ ui/                            Container · Button
├─ forms/BookACallForm.tsx        RHF form (client)
└─ icons/                         SVG sprite (single request, colour via currentColor)
lib/
├─ content/                       Static content library (typed, versioned in git)
├─ schemas/                       Zod schemas shared across client / server
├─ email/                         Resend wrapper
├─ ratelimit.ts                   In-memory limiter (Upstash-ready)
└─ turnstile.ts                   Cloudflare verification
middleware.ts                     CSP + security headers
tests/{unit,e2e}/                 Vitest + Playwright
```

## Environment variables

See [`.env.example`](.env.example). All secrets are server-only; only variables prefixed `NEXT_PUBLIC_` are exposed to the browser.

| Variable                        | Purpose                                        |
| ------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical base URL for metadata + sitemap      |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 — loaded after consent                     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`| Cloudflare Turnstile public key                |
| `NEXT_PUBLIC_CAL_LINK`          | Cal.com booking link                           |
| `RESEND_API_KEY`                | Transactional email                            |
| `BOOKING_INBOX`                 | Where the booking form sends leads             |
| `TURNSTILE_SECRET_KEY`          | Cloudflare Turnstile server verification       |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`  | Plausible domain — optional, consent-gated     |
| `UPSTASH_REDIS_REST_URL`        | Optional — swap in for multi-region ratelimit  |
| `UPSTASH_REDIS_REST_TOKEN`      | Paired with the URL above                      |
| `SANITY_API_READ_TOKEN`         | Required for Presentation Tool preview drafts  |
| `SANITY_REVALIDATE_SECRET`      | Shared secret for the webhook + draft toggle   |

## Security posture

- **CSP** — strict, nonce-based. In production: no `unsafe-inline`, no `unsafe-eval`. In dev only, `unsafe-eval` is allowed so Next.js HMR works. Set in `middleware.ts`.
- **Security headers** — HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `frame-ancestors 'none'`.
- **Booking form**
  - Zod validation at the server-action boundary.
  - Honeypot field + Cloudflare Turnstile.
  - IP-scoped rate limit (5 submissions / 10 min).
  - Emails routed via Resend; no PII persisted at rest.
- **Dependencies** — `npm audit --audit-level=high` in CI; Dependabot recommended once the repo is on GitHub.
- **Analytics** — GA4 is loaded only after user consent (NDPA-compliant consent banner shipping in Phase 2).

## Accessibility

- Target: **WCAG 2.2 AA**.
- Semantic HTML first (`<details>` for FAQ, native form controls). ARIA only where semantics don't cover it.
- Skip link, visible focus rings, keyboard-navigable everywhere, `prefers-reduced-motion` respected.
- axe-core runs in Playwright — build fails on serious/critical violations.

## Sanity CMS

The Sanity integration is opt-in. Without env vars set, `/insights` shows a
graceful placeholder and `/studio` shows a "not configured" message — the
build and every other page still work.

### Enable it

1. Create a Sanity project at [sanity.io/manage](https://sanity.io/manage).
2. Add the CORS origin for your dev + production URLs.
3. Populate `.env.local`:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_REVALIDATE_SECRET=<random 32+ char string>
   ```

4. Visit `http://localhost:3000/studio` — the embedded Studio opens on the
   same origin, no extra deployment step.
5. In Sanity → API → Webhooks, add a webhook to
   `https://<your host>/api/revalidate` with the secret above.

### Schemas shipped

- **`post`** — Insights articles (title, slug, category, author ref, cover
  image, PortableText body, reading time).
- **`principal`** — Leadership profiles (name, title, portrait 4:5, focus
  areas, bio, LinkedIn, manual order).
- **`openRole`** — Careers listings (title, level, location, PortableText
  description, apply-to email, opened/closed dates).

## Consent & analytics

- Three-category NDPA-style consent banner appears on first visit (Essential /
  Analytics / Marketing).
- Choice persists in a first-party cookie (`irsl-consent`, 12-month expiry).
  Version-bumping the schema forces re-consent.
- Users reopen the panel any time via **Cookie preferences** in the footer.
- **GA4** loads only after Analytics consent is granted. No script is fetched
  and no measurement ID leaks to the network before then.

## Marketing plumbing (Phase 3)

- **OG images** — generated dynamically by `next/og` at the edge. Root OG at
  `app/opengraph-image.tsx`; per-solution OG at
  `app/solutions/[slug]/opengraph-image.tsx` (statically generated for the
  nine slugs).
- **JSON-LD** — `Organization` on every page (root layout), `Service` on each
  solution detail, `FAQPage` on any page with the FAQ section, `Article` on
  Insights posts. Helpers in `lib/jsonld.ts`.
- **RSS feed** — `/insights/rss.xml`, sourced from Sanity, cached for 5 min,
  auto-discovered via `<link rel="alternate">` in the root layout.
- **Cal.com** slot picker — embedded on the Book-a-Call page alongside the
  form. Set `NEXT_PUBLIC_CAL_LINK` to activate; renders a placeholder
  otherwise.
- **Leadership** and **Careers** pages read `principal` and `openRole`
  documents from Sanity, with graceful empty-states.

## Case studies + presentation tool + Upstash + first-party analytics (Phase 4)

- **Case studies** — new Sanity `caseStudy` schema with a
  `permissionsCleared` boolean guard. Every GROQ query and the home
  `FeaturedCaseStudy` block filter on that flag; Studio previews show a
  ⚠ prefix and *"NOT CLEARED — not visible on the site"* subtitle until it
  is ticked. Pages: `/case-studies` index and `/case-studies/[slug]`
  detail with metrics, Challenge / Approach / Outcome sections, and
  linked-solution back-references.
- **Upstash rate-limit** — `lib/ratelimit.ts` picks its backend at
  request time. When `UPSTASH_REDIS_REST_URL` + `_TOKEN` are set, limits
  are enforced through the Upstash sliding-window API (multi-region,
  durable). Otherwise it falls back to the in-memory limiter. API stays
  the same for callers.
- **Privacy-first analytics** — three optional sinks now live behind the
  Analytics consent category:
  - **GA4** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
  - **Plausible** (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) — first-party friendly,
    cookieless
  - **Vercel Analytics** — auto-detects the Vercel host

  Each sink loads only if its env var is present *and* the user has
  granted consent. CSP is pre-configured to allow all three origins.
- **Sanity Presentation Tool** — `presentationTool` plugin added to
  `sanity.config.ts`. Studio editors can toggle *"Presentation"* to see
  every Sanity-backed page render live with their unpublished edits, via
  a shared-secret preview URL. Two routes drive this:
  `/api/draft-mode/enable` (secret check → `draftMode.enable()`) and
  `/api/draft-mode/disable`. `sanityFetch` automatically switches to the
  `previewDrafts` perspective whenever `draftMode()` is on — no per-page
  changes needed to opt in.
  Auto-discoverable via `<link>` in the root layout.
- **Cal.com** slot picker — embedded on the Book-a-Call page next to the
  form. Set `NEXT_PUBLIC_CAL_LINK` (e.g. `irsl-nigeria/consultation`) to
  activate; the section renders a placeholder until it's set.
- **Leadership** and **Careers** pages read from Sanity (`principal` and
  `openRole` documents). Fall back gracefully to empty-state copy.

## Roadmap

### Phase 5 (optional, not yet delivered)
- **Search** — Sanity `defineLiveQuery` + a tiny client for `/insights`.
- **Comments / notes on case studies** — Sanity `document` references for
  internal engagement notes (auth-gated).
- **`next/dynamic` split** of the Sanity Studio bundle from the
  marketing bundle (currently already lazy — this would trim further).
- **Cross-language** — Igbo, Yoruba, Hausa marketing pages via
  `hreflang` sub-routes if the client wants them.

## Deploy

Recommended: **Vercel** — native Next.js support, preview deployments per PR, edge POP in Cape Town gives reasonable Nigerian latency.

```bash
vercel link
vercel env pull .env.local
vercel deploy --prebuilt
```

## Licence

Proprietary — © Infotech Risks Security, Nigeria Practice. All rights reserved.
# irslconsulting
