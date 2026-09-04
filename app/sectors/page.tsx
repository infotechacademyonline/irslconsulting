import type { Metadata } from 'next';

import { CtaBand } from '@/components/layout/CtaBand';
import { SectorsGrid } from '@/components/sections/SectorsGrid';

export const metadata: Metadata = {
  title: 'Sectors — Nigerian enterprises mapped to their regulator',
};

export default function SectorsPage() {
  return (
    <>
      <SectorsGrid />
      <CtaBand />
    </>
  );
}
