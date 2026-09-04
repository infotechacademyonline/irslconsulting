import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';

export function Hero() {
  return (
    <header className="relative overflow-hidden py-16 md:py-20 lg:py-24">
      <HeroBg />
      <Container className="relative z-10 grid gap-16 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-3.5 rounded-full border border-brand/25 bg-tint px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-brand-deep">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
            {site.tagline}
          </span>
          <h1 className="mt-5 max-w-[24ch] text-[38px] font-bold leading-[1.05] tracking-tight text-ink text-balance md:text-[48px] lg:text-[58px]">
            The business problems your regulator will not wait for you to solve.
          </h1>
          <p className="mt-4 text-[20px] font-medium leading-snug tracking-tight text-ink-3">
            Solved on the platform you already run.
          </p>
          <p className="mt-6 max-w-[64ch] text-[17.5px] leading-relaxed text-muted">
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
          className="relative rounded-lg border border-border bg-panel p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] before:absolute before:left-0 before:top-0 before:h-[3px] before:w-11 before:bg-brand before:content-['']"
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
                className="grid grid-cols-[92px_1fr] gap-3.5 border-b border-border pb-3 text-[13px] leading-relaxed text-ink-3 last:border-0 last:pb-0"
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
    <svg
      className="pointer-events-none absolute -right-20 -top-10 z-0 h-[520px] w-[520px] opacity-50 md:h-[360px] md:w-[360px]"
      viewBox="0 0 400 400"
      aria-hidden="true"
    >
      {[180, 140, 100, 60].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#4B83FC" strokeWidth="0.5" opacity="0.4" />
      ))}
      <g stroke="#4B83FC" strokeWidth="1" fill="none">
        <path
          d="M200 40 L340 100 L340 220 Q340 300 200 360 Q60 300 60 220 L60 100 Z"
          opacity="0.6"
        />
        <path
          d="M200 90 L290 130 L290 210 Q290 260 200 300 Q110 260 110 210 L110 130 Z"
          opacity="0.7"
        />
      </g>
      <g fill="#4B83FC" opacity="0.5">
        <circle cx="200" cy="200" r="3" />
        <circle cx="340" cy="100" r="2" />
        <circle cx="60" cy="100" r="2" />
        <circle cx="200" cy="360" r="2" />
      </g>
    </svg>
  );
}
