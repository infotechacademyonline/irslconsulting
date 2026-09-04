import { Container } from '@/components/ui/Container';

const challenges = [
  { label: 'Access risk & SoD', action: 'talk to us' },
  { label: 'Audit & control evidence', action: 'talk to us' },
  { label: 'NDPA / privacy compliance', action: 'talk to us' },
  { label: 'Third-party integrity', action: 'talk to us' },
  { label: 'Something adjacent to these', action: 'still talk to us' },
];

export function PlatformBand() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-tint py-16">
      <Container className="relative z-10 grid items-start gap-14 lg:grid-cols-[1.4fr_.9fr]">
        <div>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-deep">
            Platform-agnostic
          </span>
          <h3 className="mt-3.5 max-w-[26ch] text-[26px] font-bold leading-tight tracking-tight text-ink text-balance md:text-[36px]">
            Business outcomes, on whichever system holds your data.
          </h3>
          <p className="mt-4 max-w-[64ch] text-[16.5px] leading-relaxed text-ink-3">
            Our engagements are shaped around the <strong className="font-semibold text-ink">
              business problem
            </strong>{' '}
            — not the software. As an{' '}
            <strong className="font-semibold text-ink">SAP Partner</strong>, we deliver deep native
            SAP GRC work; equally, we bring the same discipline to advisory-led control design,
            framework build, and evidence packs for organisations on any other enterprise stack.
            Bring the problem; we bring the outcome.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-brand/25 bg-white">
          <div className="border-b border-border px-5 py-3.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted-2">
            If your challenge is…
          </div>
          {challenges.map((c) => (
            <a
              key={c.label}
              href="/book-a-call"
              className="flex items-center justify-between gap-4 border-b border-[#F2F2F3] px-5 py-3.5 transition last:border-0 hover:bg-panel"
            >
              <span className="text-[14.5px] font-semibold text-ink">{c.label}</span>
              <span className="whitespace-nowrap font-mono text-[11px] tracking-tight text-brand">
                {c.action}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
