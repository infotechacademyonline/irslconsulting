import type { Metadata } from 'next';

import { CtaBand } from '@/components/layout/CtaBand';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return <CtaBand />;
}
