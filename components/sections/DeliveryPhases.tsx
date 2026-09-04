import { Container } from '@/components/ui/Container';

const phases = [
  { n: 'Phase 01', title: 'Assess', body: 'Access risk, control coverage, and evidence gaps against your regulator.' },
  { n: 'Phase 02', title: 'Design', body: 'Ruleset, role architecture, and control framework fit to your process reality.' },
  { n: 'Phase 03', title: 'Implement', body: 'Configuration, migration, and testing with your own team in the room.' },
  { n: 'Phase 04', title: 'Operate', body: 'Campaigns, monitoring, and the quarterly evidence pack, run as a service.' },
  { n: 'Phase 05', title: 'Develop', body: 'Structured training so your people take the platform over.' },
];

export function DeliveryPhases() {
  return (
    <section className="border-y border-border bg-panel py-16">
      <Container>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Delivery framework
        </span>
        <h2 className="mb-10 mt-3.5 max-w-[24ch] text-[26px] font-bold leading-tight tracking-tight text-ink text-balance md:text-4xl">
          Five phases. One accountable team.
        </h2>
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {phases.map((p) => (
            <div key={p.title} className="bg-white p-6">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-light">
                {p.n}
              </div>
              <h4 className="mb-2 mt-3 text-[17px] font-bold tracking-tight text-ink">{p.title}</h4>
              <p className="text-[13px] leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
