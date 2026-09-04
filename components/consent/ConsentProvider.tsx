'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_UPDATED_EVENT,
  CONSENT_VERSION,
  defaultConsent,
  parseConsent,
  serialiseConsent,
  type ConsentState,
} from '@/lib/consent';

interface Ctx {
  consent: ConsentState;
  hasChosen: boolean;
  save: (partial: Partial<Pick<ConsentState, 'analytics' | 'marketing'>>) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  /** Opens the preferences panel (banner). */
  openPreferences: () => void;
  preferencesOpen: boolean;
  closePreferences: () => void;
}

const ConsentContext = createContext<Ctx | null>(null);

function readCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  return match?.[1];
}

function writeCookie(value: string) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [hasChosen, setHasChosen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const parsed = parseConsent(readCookie());
    if (parsed) {
      setConsent(parsed);
      setHasChosen(true);
    } else {
      setPreferencesOpen(true);
    }
  }, []);

  const persist = useCallback((next: ConsentState) => {
    writeCookie(serialiseConsent(next));
    setConsent(next);
    setHasChosen(true);
    setPreferencesOpen(false);
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_UPDATED_EVENT, { detail: next }));
  }, []);

  const save = useCallback<Ctx['save']>(
    (partial) => {
      persist({
        essential: true,
        analytics: partial.analytics ?? consent.analytics,
        marketing: partial.marketing ?? consent.marketing,
        savedAt: new Date().toISOString(),
        version: CONSENT_VERSION,
      });
    },
    [consent, persist],
  );

  const acceptAll = useCallback(() => {
    persist({
      essential: true,
      analytics: true,
      marketing: true,
      savedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({
      essential: true,
      analytics: false,
      marketing: false,
      savedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }, [persist]);

  const value = useMemo<Ctx>(
    () => ({
      consent,
      hasChosen,
      save,
      acceptAll,
      rejectNonEssential,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      preferencesOpen,
    }),
    [consent, hasChosen, save, acceptAll, rejectNonEssential, preferencesOpen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): Ctx {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}
