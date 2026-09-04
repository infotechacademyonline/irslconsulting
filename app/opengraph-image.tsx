import { ImageResponse } from 'next/og';

import { site } from '@/lib/content/site';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — ${site.tagline}`;

export default function OG() {
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>{site.name}</div>
            <div style={{ fontSize: 13, color: '#75777C', letterSpacing: 3, textTransform: 'uppercase' }}>
              {site.legalName} · SAP Partner
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#2E5FCC',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            The business problems your regulator will not wait for you to solve.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 16,
            color: '#585A60',
            borderTop: '1px solid #E5E5E6',
            paddingTop: 24,
          }}
        >
          <span>Lagos · Nigeria · West Africa</span>
          <span style={{ color: '#000', fontWeight: 700 }}>irslconsulting.ng</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
