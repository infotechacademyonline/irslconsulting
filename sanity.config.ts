import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId, studioBasePath } from '@/sanity/env';
import { schemaTypes } from '@/sanity/schemas';

/**
 * Sanity Studio configuration.
 *
 * Studio is embedded at /studio via `next-sanity/studio`. When SANITY env vars
 * are unset the config still loads (with an empty projectId) — the studio route
 * page handles that case with a friendly message rather than crashing.
 */
export default defineConfig({
  basePath: studioBasePath,
  name: 'irsl-nigeria-studio',
  title: 'IRSL Nigeria — Studio',
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
