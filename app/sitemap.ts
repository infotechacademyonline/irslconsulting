import type { MetadataRoute } from 'next';

import { site } from '@/lib/content/site';
import { solutionSlugs } from '@/lib/content/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;
  const routes = [
    '',
    '/about',
    '/about/leadership',
    '/solutions',
    '/engage',
    '/sectors',
    '/partners',
    '/case-studies',
    '/insights',
    '/book-a-call',
    '/careers',
  ];
  const solutionRoutes = solutionSlugs.map((slug) => `/solutions/${slug}`);
  return [...routes, ...solutionRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
