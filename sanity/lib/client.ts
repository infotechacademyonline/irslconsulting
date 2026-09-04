import { draftMode } from 'next/headers';
import { createClient } from 'next-sanity';

import { apiVersion, dataset, isConfigured, projectId } from '@/sanity/env';

/**
 * Read-only Sanity client. Returns `null` when Sanity isn't configured so the
 * pages can fall back to placeholder content without crashing the build.
 *
 * When Next.js `draftMode` is on (Presentation Tool), `sanityFetch` swaps in
 * the `previewDrafts` perspective and disables the CDN so editors see their
 * unpublished edits.
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

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!sanityClient) return null;

  let preview = false;
  try {
    const mode = await draftMode();
    preview = mode.isEnabled;
  } catch {
    // draftMode() isn't callable from Route Handlers under some paths — safe default
  }

  if (preview && process.env.SANITY_API_READ_TOKEN) {
    return sanityClient
      .withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        useCdn: false,
        perspective: 'previewDrafts',
        stega: { studioUrl: '/studio' },
      })
      .fetch<T>(query, params, { cache: 'no-store' });
  }

  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ['sanity'] },
  });
}
