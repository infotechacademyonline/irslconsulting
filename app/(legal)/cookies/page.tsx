import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';

export const metadata: Metadata = { title: 'Cookie Notice' };

export default function CookiesPage() {
  return (
    <section className="py-16">
      <Container className="max-w-[70ch]">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Legal
        </span>
        <h1 className="mt-3.5 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Cookie Notice
        </h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-tight text-muted-3">
          Draft — to be reviewed by counsel before publication.
        </p>

        <div className="prose mt-8 text-[15px] leading-relaxed text-ink-3">
          <p>
            IRSL Consulting Nigeria stores a small amount of information on your device to run this
            website and — with your consent — to understand how it is used. This notice explains
            what is stored, why, and how to change your mind.
          </p>

          <Section h="1. Essential cookies">
            A minimal set is required for the site to function — session integrity, form-submission
            protection, and remembering the choice you make in the consent banner. These are set
            without asking because the site cannot work without them.
          </Section>

          <Section h="2. Analytics cookies (with your consent)">
            When you grant the <em>Analytics</em> category, we load Google Analytics 4 with IP
            anonymisation. It tells us which pages and solution areas attract attention so we can
            improve them. Analytics identifiers are not used to target advertising.
          </Section>

          <Section h="3. Marketing cookies (off by default)">
            The <em>Marketing</em> category, when granted, enables LinkedIn Insight (or an
            equivalent) to measure the effectiveness of professional-audience campaigns. Off by
            default.
          </Section>

          <Section h="4. Changing your choice">
            You can withdraw or change your consent at any time through the{' '}
            <strong>Cookie preferences</strong> link at the bottom of every page, or by clearing
            cookies in your browser. Withdrawal does not affect processing that has already taken
            place.
          </Section>

          <Section h="5. NDPA">
            This notice sits alongside our <a href="/ndpa-notice">NDPA Data Notice</a> and{' '}
            <a href="/privacy">Privacy Notice</a>. For questions, contact{' '}
            <a href="mailto:dpo@irslconsulting.ng">dpo@irslconsulting.ng</a>.
          </Section>
        </div>
      </Container>
    </section>
  );
}

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="mt-8 text-[17px] font-bold text-ink">{h}</h2>
      <p className="mt-2">{children}</p>
    </>
  );
}
