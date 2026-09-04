import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/layout/CtaBand';
import { site } from '@/lib/content/site';
import { sanityFetch } from '@/sanity/lib/client';
import { OPEN_ROLES_QUERY } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Careers & Talent',
  description:
    'Build a career at the Nigerian GRC practice 100% dedicated to Risks, Compliance & Audit.',
};

export const revalidate = 60;

interface OpenRole {
  _id: string;
  title: string;
  slug: string;
  level: string;
  location?: string;
  applyEmail?: string;
}

export default async function CareersPage() {
  const roles = (await sanityFetch<OpenRole[]>(OPEN_ROLES_QUERY)) ?? [];

  return (
    <>
      <section className="py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Careers &amp; talent
          </span>
          <h1 className="mt-3.5 max-w-[24ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Build a career in Nigerian GRC.
          </h1>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-muted">
            Named principals, in-country delivery on Nigerian hours, and structured upskilling.
            Applications:{' '}
            <a href={`mailto:${site.email.careers}`} className="text-brand">
              {site.email.careers}
            </a>
            .
          </p>

          <h2 className="mt-14 text-2xl font-bold tracking-tight text-ink">Open roles</h2>
          {roles.length === 0 ? (
            <p className="mt-4 rounded-lg border border-dashed border-border-2 bg-panel p-6 text-[15px] text-muted">
              No open roles right now. Send an introduction and CV to{' '}
              <a href={`mailto:${site.email.careers}`} className="text-brand">
                {site.email.careers}
              </a>{' '}
              — we keep a live bench.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border">
              {roles.map((r) => (
                <li key={r._id} className="grid gap-3 bg-white p-5 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-center">
                  <div>
                    <div className="text-[16px] font-bold tracking-tight text-ink">{r.title}</div>
                    <div className="mt-1 font-mono text-[10.5px] uppercase tracking-tight text-muted-2">
                      {r.level}
                    </div>
                  </div>
                  <div className="text-[13.5px] text-muted">{r.location ?? '—'}</div>
                  <div className="text-[13.5px] text-muted">Nigeria</div>
                  <a
                    href={`mailto:${r.applyEmail ?? site.email.careers}?subject=${encodeURIComponent(
                      `Application: ${r.title}`,
                    )}`}
                    className="justify-self-start rounded bg-brand px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-deep sm:justify-self-end"
                  >
                    Apply →
                  </a>
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
