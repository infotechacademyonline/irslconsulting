import type { Metadata } from 'next';

import { CtaBand } from '@/components/layout/CtaBand';
import { EngageGrid } from '@/components/sections/EngageGrid';

export const metadata: Metadata = { title: 'Engage — Four ways to buy the work' };

export default function EngagePage() {
  return (
    <>
      <EngageGrid />
      <CtaBand />
    </>
  );
}
