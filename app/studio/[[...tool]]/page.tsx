import type { Metadata, Viewport } from 'next';

import { isConfigured } from '@/sanity/env';

import { Studio } from './Studio';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#1B1D21' };

export default function StudioPage() {
  if (!isConfigured()) {
    return (
      <main className="mx-auto max-w-[60ch] px-6 py-24 text-center">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          Studio
        </div>
        <h1 className="mt-4 text-3xl font-bold text-ink">Sanity not configured</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          Set <code className="rounded bg-panel px-1.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
          <code className="rounded bg-panel px-1.5">NEXT_PUBLIC_SANITY_DATASET</code> in your
          environment, then reload this page. See the README for the full setup.
        </p>
      </main>
    );
  }
  return <Studio />;
}
