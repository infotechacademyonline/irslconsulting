import { Container } from '@/components/ui/Container';

const items = [
  'Federal MDAs',
  'Commercial banks',
  'Upstream & downstream',
  'Telcos',
  'Fintech & PSPs',
  'Power (GenCos / DisCos)',
  'FMCG conglomerates',
];

export function TrustStrip() {
  return (
    <div className="border-b border-border bg-white py-5">
      <Container className="flex flex-wrap items-center justify-between gap-8">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-2">
          Serving Nigerian &amp; West-African enterprises across
        </span>
        <div className="flex flex-wrap gap-6 text-[14px] font-medium text-ink-3">
          {items.map((s, i) => (
            <span key={s} className="relative pl-6 first:pl-0">
              {i > 0 && (
                <span aria-hidden className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-3">
                  ·
                </span>
              )}
              {s}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
