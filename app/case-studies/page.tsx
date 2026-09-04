import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { CtaBand } from '@/components/layout/CtaBand';
import { Container } from '@/components/ui/Container';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { CASE_STUDIES_QUERY, type CaseStudyCard } from '@/sanity/lib/queries';
import type { Image as SanityImage } from 'sanity';

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Named engagements at Nigerian enterprises. Published only with written client permission.',
};

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const studies = (await sanityFetch<CaseStudyCard[]>(CASE_STUDIES_QUERY)) ?? [];

  return (
    <>
      <section className="py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Case studies
          </span>
          <h1 className="mt-3.5 max-w-[26ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Named engagements, published only with written permission.
          </h1>
          <p className="mt-6 max-w-[68ch] text-[17px] leading-relaxed text-muted">
            Every case study on this page is on the record with the client's sign-off. If a
            reference is not here, it is either still under NDA or awaiting permission-to-publish.
          </p>

          {studies.length === 0 ? (
            <div className="mt-12 rounded-lg border border-dashed border-border-2 bg-panel p-8 text-[15.5px] text-muted">
              No case studies are published yet. Cleared studies from Sanity Studio will appear
              here within a minute.
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {studies.map((s) => (
                <li key={s._id}>
                  <Link
                    href={`/case-studies/${s.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition hover:border-brand"
                  >
                    {s.coverImage ? (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={urlForImage(s.coverImage as SanityImage).width(800).url()}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/10] bg-tint" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand">
                        <span>{s.client}</span>
                        <span aria-hidden className="text-muted-3">
                          ·
                        </span>
                        <span className="text-muted-2">{s.sector}</span>
                      </div>
                      <h2 className="mt-3 text-[20px] font-bold leading-tight tracking-tight text-ink">
                        {s.headline}
                      </h2>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted">{s.summary}</p>
                      {s.metrics && s.metrics.length > 0 && (
                        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                          {s.metrics.slice(0, 4).map((m) => (
                            <div key={m.label}>
                              <dt className="font-mono text-[9.5px] uppercase tracking-tight text-muted-2">
                                {m.label}
                              </dt>
                              <dd className="mt-0.5 text-[18px] font-bold tracking-tight text-ink">
                                {m.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      <span className="mt-auto pt-5 text-[13.5px] font-semibold text-brand">
                        Read the case →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
