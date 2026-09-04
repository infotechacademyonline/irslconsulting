import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/layout/CtaBand';
import { PartnerStrip } from '@/components/sections/PartnerStrip';

export const metadata: Metadata = { title: 'Partners & ecosystem' };

export default function PartnersPage() {
  return (
    <>
      <section className="py-16">
        <Container>
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Partners &amp; ecosystem
          </span>
          <h1 className="mt-3.5 max-w-[24ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            The ecosystem behind our delivery.
          </h1>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-muted">
            SAP Partner leads. The wider technology and delivery partners we work with in-country
            follow below. Vendor logos will replace the text badges once display permissions are
            confirmed.
          </p>
        </Container>
      </section>
      <PartnerStrip />
      <CtaBand />
    </>
  );
}
