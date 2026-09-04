/**
 * Sanity env — safe to import from client + server. Values default to empty
 * strings, and `isConfigured()` gates every read/write on presence of the
 * project id. This keeps the app buildable and runnable without Sanity set up.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = '2024-10-01';
export const studioBasePath = '/studio';

export function isConfigured(): boolean {
  return projectId.length > 0;
}
