/**
 * NDPA-compliant consent state.
 *
 * Three categories:
 *   - essential  → always on, not consent-gated (site cannot function without them)
 *   - analytics  → GA4 / Vercel Analytics
 *   - marketing  → LinkedIn Insight, remarketing pixels
 *
 * State lives in a first-party cookie (`irsl-consent`). Server code can read
 * from `cookies()`; client code uses the ConsentProvider.
 */

export interface ConsentState {
  essential: true; // literal — cannot be false
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp when the user last saved a choice */
  savedAt: string;
  /** Bumped when we materially change categories */
  version: number;
}

export const CONSENT_COOKIE = 'irsl-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

export const CONSENT_UPDATED_EVENT = 'irsl:consent-updated';

export const defaultConsent: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  savedAt: '',
  version: CONSENT_VERSION,
};

export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>;
    if (typeof parsed !== 'object' || parsed === null) return null;
    if (parsed.version !== CONSENT_VERSION) return null; // force re-consent on bump
    return {
      essential: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : '',
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function serialiseConsent(state: ConsentState): string {
  return encodeURIComponent(JSON.stringify(state));
}
