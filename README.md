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
| `UPSTASH_REDIS_REST_*`          | Optional — swap in for multi-region ratelimit  |

## Security posture

- **CSP** — strict, nonce-based, no `unsafe-inline`, no `unsafe-eval`. Set in `middleware.ts`.
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
- **RSS feed** — `/insights/rss.xml`, sourced from Sanity, cached for 5 min.
  Auto-discoverable via `<link>` in the root layout.
- **Cal.com** slot picker — embedded on the Book-a-Call page next to the
  form. Set `NEXT_PUBLIC_CAL_LINK` (e.g. `irsl-nigeria/consultation`) to
  activate; the section renders a placeholder until it's set.
- **Leadership** and **Careers** pages read from Sanity (`principal` and
  `openRole` documents). Fall back gracefully to empty-state copy.

## Roadmap

### Phase 4 (optional)
- **Case studies** page once written client permissions are in.
- **Multi-region rate limiting** — swap the in-memory limiter for Upstash.
- **Vercel Analytics** or **Plausible** as a privacy-first first-party
  alternative to GA4.
- **Sanity Presentation Tool** — live preview inside Studio.

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
