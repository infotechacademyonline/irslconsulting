import { createClient } from 'next-sanity';

import { apiVersion, dataset, isConfigured, projectId } from '@/sanity/env';

/**
 * Read-only Sanity client. Returns `null` when Sanity isn't configured so the
 * pages can fall back to placeholder content without crashing the build.
 */
export const sanityClient = isConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      perspective: 'published',
    })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ['sanity'] },
  });
}
