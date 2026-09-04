import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';

export const metadata: Metadata = { title: 'NDPA Data Notice' };

export default function NDPAPage() {
  return (
    <section className="py-16">
      <Container>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Legal
        </span>
        <h1 className="mt-3.5 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          NDPA Data Notice
        </h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-tight text-muted-3">
          Draft — NDPC registration status to be confirmed.
        </p>
      </Container>
    </section>
  );
}
