import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/layout/CtaBand';
import { Icon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { Container } from '@/components/ui/Container';
import { getSolution, solutions, solutionSlugs } from '@/lib/content/solutions';
import { serviceJsonLd } from '@/lib/jsonld';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: `${solution.name} in Nigeria`,
    description: solution.lead,
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(solution)} />
      {/* Hero */}
      <section className="border-b border-border py-16">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-tint text-brand">
                <Icon name={solution.icon} size={26} />
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                {solution.domain}
              </span>
            </div>
            <h1 className="max-w-[22ch] text-4xl font-bold leading-tight tracking-tight text-ink text-balance md:text-5xl">
              {solution.name}
            </h1>
            <p className="mt-6 max-w-[68ch] text-[17.5px] leading-relaxed text-muted">{solution.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-a-call"
                className="rounded bg-brand px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-deep"
              >
                {solution.cta}
              </Link>
            </div>
          </div>
          <aside className="rounded-lg border border-border bg-panel p-6">
            <FactRow label="The problem">{solution.problem}</FactRow>
            <FactRow label="Who it's for">{solution.audience}</FactRow>
            <FactRow label="Nigerian regulator hooks">
              <div className="flex flex-wrap gap-2">
                {solution.hooks.map((h) => (
                  <span
                    key={h}
                    className="rounded border border-border bg-white px-2 py-1 font-mono text-[10.5px] tracking-tight text-brand"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </FactRow>
          </aside>
        </Container>
      </section>

      {/* Sub-capabilities */}
      <section className="py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            What we cover
          </span>
          <h2 className="mb-8 mt-3 max-w-[24ch] text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Sub-capabilities across this domain.
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {solution.subs.map((sub, i) => (
              <li key={sub} className="bg-white p-5">
                <div className="font-mono text-[10.5px] text-brand">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-ink">{sub}</div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How we deliver */}
      <section className="border-y border-border bg-panel py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            How we deliver
          </span>
          <h2 className="mb-8 mt-3 max-w-[26ch] text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Two paths, one outcome your regulator accepts.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-white p-6">
              <div className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
                On an enterprise-GRC platform
              </div>
              <p className="text-[15px] leading-relaxed text-ink-3">{solution.deliverPlatform}</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-6">
              <div className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
                Framework-led advisory
              </div>
              <p className="text-[15px] leading-relaxed text-ink-3">{solution.deliverAdvisory}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Nigerian regulatory relevance */}
      <section className="bg-ink-2 py-16 text-white">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-light">
            Nigerian regulatory relevance
          </span>
          <h2 className="mb-6 mt-3 max-w-[26ch] text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            Why this matters in your evidence pack.
          </h2>
          <p className="max-w-[70ch] text-[17px] leading-relaxed text-white/75">{solution.regBody}</p>
        </Container>
      </section>

      {/* Related */}
      <section className="py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Related solutions
          </span>
          <h2 className="mb-8 mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Adjacent problems we solve.
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/solutions/${r.slug}`}
                className="rounded-lg border border-border bg-white p-5 transition hover:border-brand hover:bg-panel"
              >
                <Icon name={r.icon} size={24} className="mb-3 text-brand" />
                <div className="text-[16px] font-bold text-ink">{r.name}</div>
                <div className="mt-1 text-[13px] text-muted">{r.short}</div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

function FactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-4 first:pt-0 last:border-0 last:pb-0">
      <div className="mb-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted-2">
        {label}
      </div>
      <div className="text-[14px] leading-relaxed text-ink-3">{children}</div>
    </div>
  );
}
