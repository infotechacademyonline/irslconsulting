import Link from 'next/link';

import { Icon } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { solutions } from '@/lib/content/solutions';

export function SolutionsGrid({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section id="solutions" className="py-20">
      <Container>
        {withHeader && (
          <div className="flex flex-wrap items-end justify-between gap-10">
            <div>
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
                Core solutions
              </span>
              <h2 className="mt-3.5 max-w-[24ch] text-[28px] font-bold leading-tight tracking-tight text-ink text-balance md:text-4xl">
                Nine of the problems we solve most often.
              </h2>
            </div>
            <p className="max-w-[62ch] text-[16.5px] leading-relaxed text-muted">
              These are the problems we see most frequently in Nigerian enterprises. They are the
              core of what we do — but not the limit. If your challenge sits alongside these, still
              talk to us.
            </p>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="flex flex-col bg-white p-7 transition hover:bg-panel"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-tint text-brand">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="pt-1.5 text-right font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted-3">
                  {s.domain}
                </span>
              </div>
              <h3 className="mb-3 text-[19px] font-bold leading-tight tracking-tight text-ink text-balance">
                {s.name}
              </h3>
              <p className="mb-5 text-[13.5px] leading-relaxed text-muted">{s.lead}</p>
              <span className="mt-auto self-start border-b border-ink text-[13.5px] font-semibold text-ink">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-8 rounded-lg border border-brand/25 bg-tint px-6 py-6">
          <div className="max-w-[78ch]">
            <div className="mb-1.5 text-[16px] font-bold tracking-tight text-ink">Not on the list?</div>
            <p className="text-[14.5px] leading-relaxed text-ink-3">
              These nine are the challenges we see most often — but IRSL Consulting also takes on ESG
              &amp; sustainability reporting (FRC NSRS, NGX Sustainability Guidelines), SOX-parity
              readiness, ISO 27001 audit support, incident response programmes, and other adjacent
              risk-and-compliance work. If the problem lives in the risk, controls, audit or
              compliance space, start the conversation.
            </p>
          </div>
          <Link
            href="/book-a-call"
            className="whitespace-nowrap rounded bg-brand px-5 py-3 text-[14.5px] font-semibold text-white hover:bg-brand-deep"
          >
            Talk to us →
          </Link>
        </div>
      </Container>
    </section>
  );
}
