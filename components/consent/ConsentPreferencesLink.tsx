'use client';

import { useConsent } from './ConsentProvider';

/** Footer link that reopens the consent panel. Renders nothing while consent
 *  hasn't been chosen (the banner is already visible in that case). */
export function ConsentPreferencesLink() {
  const { openPreferences, hasChosen } = useConsent();
  if (!hasChosen) return null;
  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-muted-2 underline-offset-2 hover:text-brand hover:underline"
    >
      Cookie preferences
    </button>
  );
}
