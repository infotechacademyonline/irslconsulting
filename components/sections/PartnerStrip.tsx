import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';

export function PartnerStrip() {
  return (
    <div className="border-y border-border bg-panel py-5">
      <Container className="flex flex-wrap items-center justify-between gap-9">
        <span className="whitespace-nowrap font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-2">
          Technology partners &amp; ecosystem
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded border border-border bg-white px-3 py-2">
            <span
              aria-label="SAP"
              className="inline-flex h-6 items-center justify-center rounded-sm bg-gradient-to-r from-[#003D82] to-[#0FAAFF] px-2 text-[12px] font-extrabold tracking-tight text-white shadow-sm"
            >
              SAP
            </span>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink">
              Partner
            </span>
          </span>
          {site.partners.map((p) => (
            <span
              key={p}
              className="rounded border border-border bg-white px-3 py-2 text-[14px] font-semibold text-muted-3 transition hover:text-ink-2"
            >
              {p}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
