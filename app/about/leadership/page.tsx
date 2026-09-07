import type { Metadata } from 'next';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/layout/CtaBand';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { PRINCIPALS_QUERY } from '@/sanity/lib/queries';
import type { Image as SanityImage } from 'sanity';

export const metadata: Metadata = {
  title: 'Leadership',
  description: 'The principals accountable for your engagement at IRSL Consulting.',
};

export const revalidate = 60;

interface Principal {
  _id: string;
  name: string;
  slug: string;
  title: string;
  focusAreas?: string[];
  bio?: string;
  portrait?: SanityImage;
  linkedIn?: string;
}

export default async function LeadershipPage() {
  const principals = (await sanityFetch<Principal[]>(PRINCIPALS_QUERY)) ?? [];

  return (
    <>
      <section className="py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Leadership
          </span>
          <h1 className="mt-3.5 max-w-[24ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            The principals accountable for your engagement.
          </h1>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-muted">
            Every engagement is signed off, staffed, and stood behind by a named principal.
          </p>

          {principals.length === 0 ? (
            <div className="mt-10 rounded-lg border border-dashed border-border-2 bg-panel p-8 text-[15.5px] text-muted">
              Principal profiles will appear here once they are added in Studio.
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {principals.map((p) => (
                <li
                  key={p._id}
                  className="grid grid-cols-[180px_1fr] overflow-hidden rounded-lg border border-border bg-white"
                >
                  <div className="relative aspect-[4/5] bg-ink-2">
                    {p.portrait ? (
                      <Image
                        src={urlForImage(p.portrait).width(400).height(500).url()}
                        alt={`Portrait of ${p.name}`}
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center font-mono text-[10px] tracking-[0.14em] text-white/40">
                        PORTRAIT
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-[17px] font-bold tracking-tight text-ink">{p.name}</div>
                    <div className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">
                      {p.title}
                    </div>
                    {p.focusAreas && p.focusAreas.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.focusAreas.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="rounded border border-border bg-panel px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-tight text-muted-2"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                    {p.bio && <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{p.bio}</p>}
                    {p.linkedIn && (
                      <a
                        href={p.linkedIn}
                        target="_blank"
                        rel="noopener"
                        className="mt-4 inline-block text-[13px] font-semibold text-brand hover:underline"
                      >
                        LinkedIn →
                      </a>
                    )}
                  </div>
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
