import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId, studioBasePath } from '@/sanity/env';
import { schemaTypes } from '@/sanity/schemas';

/**
 * Sanity Studio configuration.
 *
 * Embedded at /studio via `next-sanity/studio`. When SANITY env vars are unset
 * the config still loads (with an empty projectId) — the studio route page
 * handles that case with a friendly message rather than crashing.
 *
 * The Presentation Tool enables live preview inside the Studio: editors see
 * the front-end update as they type, with document-linked overlays.
 */
export default defineConfig({
  basePath: studioBasePath,
  name: 'irsl-nigeria-studio',
  title: 'IRSL Nigeria — Studio',
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        ...(typeof window !== 'undefined' ? { origin: window.location.origin } : {}),
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
