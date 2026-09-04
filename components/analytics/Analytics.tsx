'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import Script from 'next/script';

import { useConsent } from '@/components/consent/ConsentProvider';

/**
 * Consent-gated analytics loaders.
 *
 * Three optional sinks — each fires only when its env var is present AND the
 * user has granted the Analytics consent category:
 *
 *   - Google Analytics 4    (NEXT_PUBLIC_GA_MEASUREMENT_ID)
 *   - Plausible             (NEXT_PUBLIC_PLAUSIBLE_DOMAIN — first-party friendly)
 *   - Vercel Analytics      (auto-detected in Vercel; no ID needed)
 *
 * We still gate Vercel Analytics on consent even though it is first-party and
 * cookie-less — this keeps the site consistent with the banner promise.
 */
export function Analytics() {
  const { consent } = useConsent();
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const enabled = consent.analytics;

  return (
    <>
      {enabled && ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {enabled && plausible && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausible}
          strategy="afterInteractive"
        />
      )}

      {enabled && <VercelAnalytics />}
    </>
  );
}
