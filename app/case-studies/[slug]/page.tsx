import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/layout/CtaBand';
import { Container } from '@/components/ui/Container';
import { getSolution } from '@/lib/content/solutions';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { CASE_STUDY_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import type { Image as SanityImage, PortableTextBlock } from 'sanity';

interface CaseStudy {
  _id: string;
  client: string;
  sector: string;
  solution?: string;
  headline: string;
  summary: string;
  challenge?: PortableTextBlock[];
  approach?: PortableTextBlock[];
  outcome?: PortableTextBlock[];
  metrics?: Array<{ value: string; label: string }>;
  quote?: string;
  quoteAttribution?: string;
  engagementYear?: number;
  coverImage?: SanityImage;
  publishedAt?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await sanityFetch<CaseStudy>(CASE_STUDY_BY_SLUG_QUERY, { slug });
  if (!study) return {};
  return {
    title: `${study.client} — ${study.headline}`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await sanityFetch<CaseStudy>(CASE_STUDY_BY_SLUG_QUERY, { slug });
  if (!study) notFound();

  const solution = study.solution ? getSolution(study.solution) : undefined;

  return (
    <>
      <article>
        <header className="border-b border-border py-16">
          <Container>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand">
              <span>{study.client}</span>
              <span aria-hidden className="text-muted-3">
                ·
              </span>
              <span className="text-muted-2">{study.sector}</span>
              {study.engagementYear && (
                <>
                  <span aria-hidden className="text-muted-3">
                    ·
                  </span>
                  <span className="text-muted-2">{study.engagementYear}</span>
                </>
              )}
            </div>
            <h1 className="mt-5 max-w-[28ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              {study.headline}
            </h1>
            <p className="mt-6 max-w-[70ch] text-[17.5px] leading-relaxed text-muted">
              {study.summary}
            </p>
          </Container>
        </header>

        {study.coverImage && (
          <div className="relative aspect-[16/7] w-full">
            <Image
              src={urlForImage(study.coverImage).width(1800).url()}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {study.metrics && study.metrics.length > 0 && (
          <section className="border-b border-border bg-panel py-10">
            <Container>
              <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {study.metrics.map((m) => (
                  <div key={m.label} className="bg-white p-6">
                    <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-2">
                      {m.label}
                    </dt>
                    <dd className="mt-2 text-[36px] font-bold tracking-tight text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>
        )}

        <div className="py-16">
          <Container className="grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="text-[14px] text-muted-2">
              {solution && (
                <>
                  <div className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand">
                    Solution
                  </div>
                  <Link href={`/solutions/${solution.slug}`} className="text-brand hover:underline">
                    {solution.name}
                  </Link>
                </>
              )}
            </aside>
            <div className="prose max-w-[72ch] text-[16.5px] leading-relaxed text-ink-3">
              <Section title="Challenge" body={study.challenge} />
              <Section title="Approach" body={study.approach} />
              <Section title="Outcome" body={study.outcome} />
              {study.quote && (
                <blockquote className="my-10 border-l-4 border-brand pl-6 text-[19px] leading-relaxed text-ink">
                  &ldquo;{study.quote}&rdquo;
                  {study.quoteAttribution && (
                    <cite className="mt-2 block text-[13.5px] font-normal not-italic text-muted-2">
                      — {study.quoteAttribution}, {study.client}
                    </cite>
                  )}
                </blockquote>
              )}
            </div>
          </Container>
        </div>
      </article>
      <CtaBand />
    </>
  );
}

function Section({
  title,
  body,
}: {
  title: string;
  body: PortableTextBlock[] | undefined;
}) {
  if (!body || body.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold tracking-tight text-ink">{title}</h2>
      <PortableText value={body} components={components} />
    </section>
  );
}

const components: PortableTextComponents = {};
