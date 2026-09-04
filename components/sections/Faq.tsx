import { JsonLd } from '@/components/JsonLd';
import { Container } from '@/components/ui/Container';
import { faqJsonLd } from '@/lib/jsonld';

/**
 * FAQ uses the native <details>/<summary> disclosure. Zero client JS,
 * keyboard-accessible for free, works without JS. Progressive enhancement
 * (animation) via CSS `details[open]`.
 */

interface FaqItem {
  q: string;
  a: string;
}

const items: FaqItem[] = [
  {
    q: 'What enterprise systems do you work on?',
    a: 'Any. We are an SAP Partner with deep native SAP GRC capability, and we work equally on adjacent enterprise-GRC and identity tooling, or advisory-led on whichever platform you already run — including environments where the control lives in a spreadsheet today.',
  },
  {
    q: 'The nine problems you list — is that everything you do?',
    a: 'No. Those are the challenges we see most often and where we have the deepest playbooks. We also take on ESG & sustainability reporting, SOX-parity readiness, ISO 27001 audit support, incident response, and adjacent risk, control, audit and compliance work.',
  },
  {
    q: 'How do you map controls to Nigerian regulation?',
    a: 'We maintain a control-to-obligation matrix per sector: each control is tied to the specific CBN circular, NDPA section, FRC principle, or sector rule it evidences. You get the matrix, not just the configuration.',
  },
  {
    q: 'Are your consultants based in Nigeria?',
    a: 'Yes. Delivery is led from Lagos on Nigerian hours, with access to the wider Infotech Risks Security bench for escalation and specialist review.',
  },
  {
    q: 'We are already live — where do we begin?',
    a: 'With an assessment. Two to four weeks, focused on access risk, control coverage, and audit evidence gaps, ending in a prioritised remediation plan with effort and sequence.',
  },
  {
    q: 'Do you provide long-term managed services?',
    a: 'Yes. Most clients move from project to managed operations: we run the access-review campaigns, monitor controls, and produce the quarterly evidence pack.',
  },
  {
    q: 'How is engagement pricing structured?',
    a: 'Naira-denominated for advisory and delivery, with FX-index protection on any vendor USD pass-throughs. Fixed-fee for assessments, milestone-based for implementation, retained for managed operations.',
  },
];

export function Faq() {
  return (
    <section className="py-20">
      <JsonLd data={faqJsonLd(items)} />
      <Container>
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Questions
        </span>
        <h2 className="mb-8 mt-3.5 max-w-[24ch] text-[26px] font-bold leading-tight tracking-tight text-ink text-balance md:text-4xl">
          What Nigerian buyers ask first.
        </h2>
        <div className="overflow-hidden rounded-lg border border-border">
          {items.map((f, i) => (
            <details
              key={f.q}
              className="group border-b border-border bg-white last:border-0 open:bg-panel/50"
              open={i === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-5 px-6 py-5 text-[16.5px] font-semibold tracking-tight text-ink marker:content-['']">
                {f.q}
                <span
                  aria-hidden
                  className="font-mono text-[18px] text-brand transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[82ch] px-6 pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
