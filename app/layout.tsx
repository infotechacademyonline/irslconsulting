import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { Analytics } from '@/components/analytics/Analytics';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { ConsentProvider } from '@/components/consent/ConsentProvider';
import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { IconSprite } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import { organizationJsonLd } from '@/lib/jsonld';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Risks, Compliance & Audit Consulting in Nigeria | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    'Nigerian GRC advisory practice. SAP Partner. Nine anchor business problems plus adjacent risk, audit and compliance work — delivered on whichever enterprise system holds your data.',
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
  },
  twitter: { card: 'summary_large_image' },
  other: {
    'application/rss+xml': `${site.url}/insights/rss.xml`,
  },
  alternates: {
    canonical: '/',
    languages: { 'en-NG': '/', 'en-US': 'https://irslconsulting.com' },
  },
};

export const viewport: Viewport = {
  themeColor: '#4b83fc',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ConsentProvider>
          <JsonLd data={organizationJsonLd()} />
          <IconSprite />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <ConsentBanner />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
