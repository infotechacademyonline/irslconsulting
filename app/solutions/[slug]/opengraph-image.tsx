import { ImageResponse } from 'next/og';

import { getSolution, solutionSlugs } from '@/lib/content/solutions';
import { site } from '@/lib/content/site';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'IRSL Consulting — solution';

export function generateImageMetadata() {
  return solutionSlugs.map((slug) => ({ id: slug }));
}

export default async function OG({ params }: { params: { slug: string } }) {
  const solution = getSolution(params.slug);
  const title = solution?.name ?? site.name;
  const domain = solution?.domain ?? site.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: 72,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          color: '#000',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              background: '#4B83FC',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: -1,
            }}
          >
            IR
          </div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
              padding: '8px 14px',
              borderRadius: 999,
              background: '#EBF2FE',
              color: '#2E5FCC',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {domain}
          </div>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
              color: '#000',
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 15,
            color: '#585A60',
            borderTop: '1px solid #E5E5E6',
            paddingTop: 22,
          }}
        >
          <span>{site.legalName} · SAP Partner</span>
          <span style={{ color: '#000', fontWeight: 700 }}>irslconsulting.ng/solutions</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
