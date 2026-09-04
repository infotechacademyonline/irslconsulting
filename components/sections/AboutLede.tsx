import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';

export function AboutLede() {
  return (
    <section id="about" className="py-20">
      <Container className="grid items-start gap-16 lg:grid-cols-[1fr_1.05fr]">
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
