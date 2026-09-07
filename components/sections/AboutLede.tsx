import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';

export function AboutLede() {
  return (
    <section id="about" className="relative overflow-hidden py-20">
      <AboutBg />
      <Container className="relative z-10 grid items-start gap-16 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            The firm
          </span>
          <h2 className="mt-3.5 max-w-[24ch] text-[28px] font-bold leading-[1.08] tracking-tight text-ink text-balance md:text-4xl">
            The Nigerian practice 100% dedicated to Risks, Compliance &amp; Audit.
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border">
            {site.stats.map((s) => (
              <div key={s.label} className="bg-white p-6">
                <div className="text-[40px] font-bold leading-none tracking-tight text-ink">
                  {s.num}
                </div>
                <div className="mt-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-8 overflow-hidden rounded-lg border border-border bg-panel">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/assets/brand/about-hero.svg"
                alt="IRSL Consulting — Lagos practice"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mb-4 text-[16.5px] leading-relaxed text-ink-3">
            We engineer secure, compliant, and resilient GRC environments — and stay long enough to
            sustain them. We are hired as advisors and stay as partners, embedded in the daily
            reality of running enterprise controls at scale.
          </p>
          <p className="mb-4 text-[16.5px] leading-relaxed text-ink-3">
            As an SAP Partner, our technical bench includes deep native SAP GRC capability
            alongside adjacent enterprise-GRC tooling and framework-led advisory. What is constant
            across every engagement is the outcome your board and your regulator can defend.
          </p>
          <p className="mb-7 text-[16.5px] leading-relaxed text-ink-3">
            Our consultants work in-country, on Nigerian delivery hours, against the specific
            circular your examiner will quote back to you.
          </p>
          <div className="mb-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-2">
            The eight risk categories we cover
          </div>
          <div className="flex flex-wrap gap-2">
            {site.riskCategories.map((c) => (
              <span
                key={c}
                className="whitespace-nowrap rounded border border-brand/25 bg-tint px-3 py-1.5 font-mono text-[11px] font-medium tracking-tight text-brand-deep"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function AboutBg() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute -left-10 top-16 z-0 h-[320px] w-[320px] opacity-40 md:h-[420px] md:w-[420px]"
      viewBox="0 0 400 400"
    >
      <defs>
        <pattern id="about-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2e5fcc" opacity="0.35" />
        </pattern>
        <radialGradient id="about-mask" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#about-dots)" mask="url(#about-mask)" />
      <rect width="400" height="400" fill="url(#about-mask)" />
    </svg>
  );
}
