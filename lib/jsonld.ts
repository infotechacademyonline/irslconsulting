import { site } from '@/lib/content/site';
import type { Solution } from '@/lib/content/solutions';

/**
 * JSON-LD builders. Kept small and pure so each page renders its own.
 */

interface WithContext {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export function organizationJsonLd(): WithContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    legalName: site.legalName,
    slogan: site.tagline,
    url: site.url,
    email: site.email.info,
    telephone: site.address.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: 'NG',
    },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    sameAs: [`${site.url}`],
  };
}

export function serviceJsonLd(s: Solution): WithContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.domain,
    description: s.lead,
    provider: { '@type': 'ProfessionalService', name: site.name, url: site.url },
    areaServed: { '@type': 'Country', name: 'Nigeria' },
    audience: { '@type': 'Audience', audienceType: s.audience },
    url: `${site.url}/solutions/${s.slug}`,
    offers: { '@type': 'Offer', description: s.cta, url: `${site.url}/book-a-call` },
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>): WithContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  slug: string;
  excerpt?: string;
  authorName?: string;
  publishedAt: string;
  image?: string;
}): WithContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.excerpt,
    author: input.authorName ? { '@type': 'Person', name: input.authorName } : undefined,
    datePublished: input.publishedAt,
    image: input.image,
    url: `${site.url}/insights/${input.slug}`,
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.url,
    },
  };
}
