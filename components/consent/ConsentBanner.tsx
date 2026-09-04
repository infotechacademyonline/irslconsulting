'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useConsent } from './ConsentProvider';

export function ConsentBanner() {
  const { preferencesOpen, consent, acceptAll, rejectNonEssential, save, closePreferences } =
    useConsent();
  const [showDetail, setShowDetail] = useState(false);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  if (!preferencesOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-white/98 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur"
    >
      <div className="mx-auto grid w-full max-w-wrap gap-5 px-6 py-5 lg:grid-cols-[1.5fr_auto] lg:items-center">
        <div>
          <div id="consent-title" className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand">
            Your privacy
          </div>
          <p className="mt-1.5 max-w-[70ch] text-[14px] leading-relaxed text-ink-3">
            We use essential cookies to run the site, and — with your consent — analytics cookies to
            understand which pages help. No marketing cookies fire without your consent. See our{' '}
            <Link href="/cookies" className="text-brand hover:underline">
              Cookie Notice
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand hover:underline">
              Privacy Notice
            </Link>
            .
          </p>

          {showDetail && (
            <fieldset className="mt-4 grid gap-3 rounded-md border border-border bg-panel p-4">
              <legend className="px-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-2">
                Choose your categories
              </legend>
              <CategoryRow
                label="Essential"
                description="Required — session state, submitting forms, remembering your choice."
                checked
                disabled
              />
              <CategoryRow
                label="Analytics"
                description="Anonymised page-view analytics via Google Analytics 4."
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryRow
                label="Marketing"
                description="Off by default. Enables LinkedIn Insight for professional-audience measurement."
                checked={marketing}
                onChange={setMarketing}
              />
            </fieldset>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 justify-self-start lg:justify-self-end">
          {showDetail ? (
            <>
              <button
                type="button"
                onClick={() => save({ analytics, marketing })}
                className="rounded bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-brand-deep"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => setShowDetail(false)}
                className="rounded border border-border-2 px-4 py-2.5 text-[13.5px] font-semibold text-ink-2 hover:bg-panel"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowDetail(true)}
                className="rounded border border-border-2 px-4 py-2.5 text-[13.5px] font-semibold text-ink-2 hover:bg-panel"
              >
                Customise
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded border border-border-2 px-4 py-2.5 text-[13.5px] font-semibold text-ink-2 hover:bg-panel"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded bg-brand px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-brand-deep"
              >
                Accept all
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Close preferences"
          onClick={closePreferences}
          className="absolute right-3 top-3 rounded p-1 text-muted-2 hover:text-ink lg:hidden"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function CategoryRow({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  const id = `consent-${label.toLowerCase()}`;
  return (
    <div className="flex items-start gap-3 text-[13.5px]">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-brand"
      />
      <label htmlFor={id}>
        <span className="font-semibold text-ink">{label}</span>
        <span className="ml-2 text-muted">{description}</span>
      </label>
    </div>
  );
}
