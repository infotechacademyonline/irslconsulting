import type { Metadata } from 'next';

import { BookACallForm } from '@/components/forms/BookACallForm';
import { CalEmbed } from '@/components/booking/CalEmbed';
import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';
import { organizationJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book a 30-minute strategy call with an IRSL principal. A focused conversation about your specific business problem and the regulator on the other side of the table.',
};

const promises = [
  { label: 'Who you meet', body: 'A principal who has run the engagement, not an account manager.' },
  { label: 'What we prepare', body: "A read of your sector's regulatory perimeter before the call." },
  {
    label: 'What you leave with',
    body: 'Two or three concrete next actions, whether or not you engage us.',
  },
];

export default function BookACallPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <section className="py-16">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
              Ready to start
            </span>
            <h1 className="mt-3.5 max-w-[22ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Book a 30-minute strategy call.
            </h1>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-muted">
              No slideware. A focused conversation about the specific business problem you face and
              the regulator sitting across the table from you.
            </p>

            <ul className="mt-8 grid gap-5">
              {promises.map((p) => (
                <li key={p.label} className="rounded-lg border border-border p-4">
                  <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand-deep">
                    {p.label}
                  </div>
                  <div className="mt-1 text-[14.5px] leading-relaxed text-ink-3">{p.body}</div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg border border-border bg-panel p-5">
              <div className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-2">
                Prefer to email or call
              </div>
              <div className="grid gap-1.5 text-[14.5px] text-ink-3">
                <a href={site.address.phoneHref} className="text-brand">
                  {site.address.phone}
                </a>
                <a href={`mailto:${site.email.advisory}`} className="text-brand">
                  {site.email.advisory}
                </a>
                <span>{site.address.hours}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-10">
            <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
              <BookACallForm />
            </div>

            <div>
              <div className="mb-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand">
                Prefer to pick your own time?
              </div>
              <CalEmbed />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
