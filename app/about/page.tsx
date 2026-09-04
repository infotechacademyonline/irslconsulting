import type { Metadata } from 'next';

import { AboutLede } from '@/components/sections/AboutLede';
import { CtaBand } from '@/components/layout/CtaBand';
import { Faq } from '@/components/sections/Faq';

export const metadata: Metadata = {
  title: 'About',
  description:
    'IRSL Consulting Nigeria — a practice of Infotech Risks Security — is the Nigerian GRC advisory firm dedicated to Risks, Compliance & Audit.',
};

export default function AboutPage() {
  return (
    <>
      <AboutLede />
      <Faq />
      <CtaBand />
    </>
  );
}
