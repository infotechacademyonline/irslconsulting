import type { Metadata } from 'next';

import { CtaBand } from '@/components/layout/CtaBand';
import { EngageGrid } from '@/components/sections/EngageGrid';
import { SolutionsGrid } from '@/components/sections/SolutionsGrid';

export const metadata: Metadata = {
  title: 'Solutions — Nine of the problems we solve most often',
  description:
    'The nine anchor business problems IRSL Nigeria solves — from access risk to platform security — plus the adjacent risk, audit and compliance work we take on.',
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsGrid />
      <EngageGrid />
      <CtaBand />
    </>
  );
}
