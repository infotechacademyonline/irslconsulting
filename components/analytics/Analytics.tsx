'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

import { useConsent } from '@/components/consent/ConsentProvider';

/**
 * Google Analytics 4 loader — mounts only when the user has granted the
 * `analytics` consent category. No script is fetched, no ID is exposed to the
 * network, before consent lands.
 */
export function Analytics() {
  const { consent } = useConsent();
  const [enabled, setEnabled] = useState(false);
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    setEnabled(consent.analytics);
  }, [consent.analytics]);

  if (!id || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
