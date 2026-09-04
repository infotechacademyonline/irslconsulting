import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { sanityFetch } from '@/sanity/lib/client';
import { FEATURED_CASE_STUDY_QUERY } from '@/sanity/lib/queries';

interface Featured {
  _id: string;
  client: string;
  slug: string;
  sector: string;
  solution?: string;
  headline: string;
  summary: string;
  quote?: string;
  quoteAttribution?: string;
  metrics?: Array<{ value: string; label: string }>;
  coverImage?: unknown;
}

/**
 * Home-page block. Renders nothing when there is no cleared featured study —
 * keeps the page tidy in the pre-content state. Server component; no client
 * cost.
 */
export async function FeaturedCaseStudy() {
  const study = await sanityFetch<Featured>(FEATURED_CASE_STUDY_QUERY);
  if (!study) return null;

  return (
    <section className="border-y border-border bg-panel py-20">
      <Container>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Featured engagement
        </span>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand">
              <span>{study.client}</span>
              <span aria-hidden className="text-muted-3">
                ·
              </span>
              <span className="text-muted-2">{study.sector}</span>
            </div>
            <h2 className="mt-3 max-w-[24ch] text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              {study.headline}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-muted">
              {study.summary}
            </p>
            <Link
              href={`/case-studies/${study.slug}`}
              className="mt-6 inline-flex items-center gap-2 border-b border-ink text-[14.5px] font-semibold text-ink hover:border-brand hover:text-brand"
            >
              Read the case →
            </Link>
          </div>

          <aside className="rounded-lg border border-border bg-white p-6">
            {study.quote && (
              <blockquote className="text-[16px] leading-relaxed text-ink">
                &ldquo;{study.quote}&rdquo;
                {study.quoteAttribution && (
                  <cite className="mt-3 block text-[12px] font-normal not-italic tracking-tight text-muted-2">
                    — {study.quoteAttribution}, {study.client}
                  </cite>
                )}
              </blockquote>
            )}
            {study.metrics && study.metrics.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
                {study.metrics.slice(0, 4).map((m) => (
                  <div key={m.label}>
                    <dt className="font-mono text-[9.5px] uppercase tracking-tight text-muted-2">
                      {m.label}
                    </dt>
                    <dd className="mt-0.5 text-[22px] font-bold tracking-tight text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>
        </div>
      </Container>
    </section>
  );
}
