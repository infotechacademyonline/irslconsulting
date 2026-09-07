import { AboutLede } from '@/components/sections/AboutLede';
import { CtaBand } from '@/components/layout/CtaBand';
import { DeliveryPhases } from '@/components/sections/DeliveryPhases';
import { EngageGrid } from '@/components/sections/EngageGrid';
import { Faq } from '@/components/sections/Faq';
import { FeaturedCaseStudy } from '@/components/sections/FeaturedCaseStudy';
import { Hero } from '@/components/sections/Hero';
import { ImpactBand } from '@/components/sections/ImpactBand';
import { PartnerStrip } from '@/components/sections/PartnerStrip';
import { PlatformBand } from '@/components/sections/PlatformBand';
import { SectorsGrid } from '@/components/sections/SectorsGrid';
import { SolutionsGrid } from '@/components/sections/SolutionsGrid';
import { TrustStrip } from '@/components/sections/TrustStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerStrip />
      <TrustStrip />
      <PlatformBand />
      <AboutLede />
      <ImpactBand />
      <SolutionsGrid />
      <FeaturedCaseStudy />
      <EngageGrid />
      <SectorsGrid />
      <DeliveryPhases />
      <Faq />
      <CtaBand />
    </>
  );
}
