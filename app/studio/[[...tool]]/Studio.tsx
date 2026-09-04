'use client';

/**
 * Sanity Studio is rendered client-side by `next-sanity/studio`. It expects
 * the config from the project root.
 */
import { NextStudio } from 'next-sanity/studio';

import config from '@/sanity.config';

export function Studio() {
  return <NextStudio config={config} />;
}
