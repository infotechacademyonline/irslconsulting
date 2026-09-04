import { site } from '@/lib/content/site';

/**
 * Cal.com booking iframe. Uses the plain iframe embed (no extra JS dep).
 * Users can pick a slot without hitting the form — the form and the slot
 * picker sit side by side so buyers self-serve either way.
 */
export function CalEmbed() {
  const link = process.env.NEXT_PUBLIC_CAL_LINK;
  if (!link) {
    return (
      <div className="rounded-lg border border-dashed border-border-2 bg-panel p-6 text-[14px] text-muted">
        Slot picker will appear here once <code className="rounded bg-white px-1.5">NEXT_PUBLIC_CAL_LINK</code>{' '}
        is set. In the meantime, use the form above or email{' '}
        <a href={`mailto:${site.email.advisory}`} className="text-brand">
          {site.email.advisory}
        </a>
        .
      </div>
    );
  }
  const src = `https://cal.com/${link}?embed=true&layout=month_view&hideEventTypeDetails=false`;
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <iframe
        src={src}
        title="Book a 30-minute consultation"
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        className="block h-[720px] w-full border-0"
      />
    </div>
  );
}
