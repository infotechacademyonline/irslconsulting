import Link from 'next/link';

import { Icon } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { sectors } from '@/lib/content/sectors';

export function SectorsGrid() {
  return (
    <section id="sectors" className="py-20">
      <Container>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Sectors
        </span>
        <h2 className="mb-10 mt-3.5 max-w-[26ch] text-[26px] font-bold leading-tight tracking-tight text-ink text-balance md:text-4xl">
          Nigerian enterprises, mapped to their regulator.
        </h2>
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <div key={s.name} className="bg-white p-5">
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="text-brand">
                  <Icon name={s.icon} size={24} />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">
                  {s.regs}
                </span>
              </div>
              <h5 className="mb-2 text-[15.5px] font-bold tracking-tight text-ink">{s.name}</h5>
              <p className="mb-4 text-[13px] leading-relaxed text-muted">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.recs.slice(0, 3).map((slug) => (
                  <Link
                    key={slug}
                    href={`/solutions/${slug}`}
                    className="rounded border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-tight text-muted-2 hover:border-brand hover:text-brand"
                  >
                    {slug}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
