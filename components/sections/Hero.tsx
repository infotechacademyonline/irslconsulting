import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';

export function Hero() {
  return (
    <header className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      <HeroBg />
      <Container className="relative z-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-3.5 rounded-full border border-brand/25 bg-tint px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-brand-deep">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            {site.tagline}
          </span>
          <h1 className="mt-5 max-w-[24ch] text-[32px] font-bold leading-[1.08] tracking-tight text-ink text-balance sm:text-[38px] md:text-[48px] lg:text-[58px]">
            The business problems your regulator will not wait for you to solve.
          </h1>
          <p className="mt-4 text-[18px] font-medium leading-snug tracking-tight text-ink-3 sm:text-[20px]">
            Solved on the platform you already run.
          </p>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-relaxed text-muted sm:text-[17.5px]">
            <strong className="font-semibold text-ink">{site.name}</strong> — a practice of{' '}
            <strong className="font-semibold text-ink">{site.legalName}</strong> — is the Nigerian
            Governance, Risk &amp; Compliance advisory firm built for banks, oil &amp; gas operators,
            telcos, fintechs, and public-sector MDAs. We solve the risk, control, audit, and
            compliance problems Nigerian enterprises face — on whichever enterprise system holds
            your data. We are an <strong className="font-semibold text-ink">SAP Partner</strong>,
            and our technical bench extends well beyond it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/book-a-call"
              className="inline-flex items-center gap-2 rounded bg-brand px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-brand-deep"
            >
              Book a Consultation
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded border-2 border-brand px-5 py-3 text-[15px] font-semibold text-brand transition hover:bg-tint hover:text-brand-deep"
            >
              Explore what we solve
            </Link>
          </div>
        </div>

        <aside
          aria-label="The Nigerian regulatory perimeter"
          className="relative rounded-lg border border-border bg-panel p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] before:absolute before:left-0 before:top-0 before:h-[3px] before:w-11 before:bg-brand before:content-[''] sm:p-8"
        >
          <h4 className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-2">
            Nigerian Regulatory Perimeter
          </h4>
          <p className="mb-6 text-[17px] font-semibold leading-tight text-ink">
            The frameworks your controls are measured against.
          </p>
          <ul className="grid gap-3">
            {site.regulators.map((r) => (
              <li
                key={r.code}
                className="grid grid-cols-[76px_1fr] gap-3 border-b border-border pb-3 text-[13px] leading-relaxed text-ink-3 last:border-0 last:pb-0 sm:grid-cols-[92px_1fr] sm:gap-3.5"
              >
                <span className="pt-0.5 font-mono text-[11px] font-medium tracking-tight text-brand">
                  {r.code}
                </span>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </header>
  );
}

function HeroBg() {
  return (
    <>
      {/* Dot-grid wash across the whole hero — subtle texture, not focal. */}
      <svg
        aria-hidden
        focusable="false"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="hero-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#4B83FC" opacity="0.18" />
          </pattern>
          <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
        <rect width="100%" height="100%" fill="url(#hero-fade)" />
      </svg>

      {/* Layered emblem — nested shield rings evoking the "regulatory
          perimeter" motif that runs through the rest of the site. */}
      <svg
        aria-hidden
        focusable="false"
        className="pointer-events-none absolute -right-24 -top-8 z-0 h-[440px] w-[440px] opacity-70 md:-right-16 md:h-[520px] md:w-[520px] lg:-right-12"
        viewBox="0 0 500 500"
      >
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#4B83FC" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#4B83FC" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#4B83FC" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="230" fill="url(#hero-glow)" />
        {[220, 180, 140, 100, 60].map((r, i) => (
          <circle
            key={r}
            cx="250"
            cy="250"
            r={r}
            fill="none"
            stroke="#4B83FC"
            strokeWidth="0.75"
            opacity={0.15 + i * 0.08}
            strokeDasharray={i === 1 || i === 3 ? '2 6' : undefined}
          />
        ))}
        <g stroke="#2e5fcc" strokeWidth="1.25" fill="none" opacity="0.55">
          <path d="M250 50 L410 120 L410 260 Q410 350 250 430 Q90 350 90 260 L90 120 Z" />
          <path d="M250 110 L360 155 L360 250 Q360 315 250 370 Q140 315 140 250 L140 155 Z" opacity="0.9" />
        </g>
        {/* Orbit dots */}
        <g fill="#2e5fcc" opacity="0.7">
          <circle cx="250" cy="250" r="3.5" />
          <circle cx="410" cy="120" r="2.5" />
          <circle cx="90" cy="120" r="2.5" />
          <circle cx="250" cy="430" r="2.5" />
          <circle cx="470" cy="250" r="2" />
          <circle cx="30" cy="250" r="2" />
        </g>
        {/* Ticker marks around outer ring */}
        <g stroke="#2e5fcc" strokeWidth="1.5" opacity="0.5">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const x1 = 250 + Math.cos(a) * 232;
            const y1 = 250 + Math.sin(a) * 232;
            const x2 = 250 + Math.cos(a) * 244;
            const y2 = 250 + Math.sin(a) * 244;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </svg>
    </>
  );
}
