import Link from 'next/link';

import { Icon } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { engagementModels } from '@/lib/content/engagement';

export function EngageGrid() {
  return (
    <section id="engage" className="border-y border-border bg-panel py-20 mt-20">
      <Container>
        <div className="mb-9 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
              How you engage us
            </span>
            <h2 className="mt-3.5 max-w-[24ch] text-[26px] font-bold leading-tight tracking-tight text-ink text-balance md:text-4xl">
              Four ways to buy the work.
            </h2>
          </div>
          <Link href="/engage" className="border-b border-ink text-[14px] font-semibold text-ink hover:text-brand hover:border-brand">
            Compare the models →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engagementModels.map((m) => (
            <div
              key={m.title}
              className="flex flex-col rounded-lg border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="mb-3.5 text-brand">
                <Icon name={m.icon} size={30} />
              </span>
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-brand">
                {m.n}
              </div>
              <h5 className="my-2 text-[17px] font-bold tracking-tight text-ink">{m.title}</h5>
              <p className="text-[13.5px] leading-relaxed text-muted">{m.body}</p>
              <div className="mt-auto border-t border-dashed border-border pt-3 font-mono text-[10px] uppercase tracking-[0.06em] text-muted-2">
                {m.tag}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
