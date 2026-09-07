import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/content/site';

export function CtaBand() {
  return (
    <section id="contact" className="bg-ink-2 py-14 text-white md:py-20">
      <Container className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-light before:h-px before:w-5 before:bg-brand-light before:content-['']">
            Ready to start
          </span>
          <h2 className="mt-4 max-w-[24ch] text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
            Book a 30-minute strategy call with an IRSL principal.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[16px] text-white/75">
            No slideware, no discovery call disguised as a pitch. A focused conversation about the
            specific business problem you face and the regulator sitting across the table from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href={site.address.phoneHref} variant="primary">
              Call {site.address.phone}
              <span aria-hidden>→</span>
            </Button>
            <a
              href={`mailto:${site.email.advisory}`}
              className="inline-flex items-center gap-2 rounded border-2 border-brand-light px-5 py-3 text-[15px] font-semibold text-brand-light hover:bg-white/10"
            >
              Email the Advisory Desk
            </a>
          </div>
        </div>

        <aside className="rounded-lg border border-white/15 bg-white/5 p-6">
          <h5 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-light">
            Direct lines
          </h5>
          <div className="grid gap-3 text-[14.5px] text-white">
            <ContactRow label="Lagos office" href={site.address.phoneHref} value={site.address.phone} />
            <ContactRow label="General enquiries" href={`mailto:${site.email.info}`} value={site.email.info} />
            <ContactRow
              label="Advisory desk"
              href={`mailto:${site.email.advisory}`}
              value={site.email.advisory}
            />
            <ContactRow label="Careers & talent" href={`mailto:${site.email.careers}`} value={site.email.careers} />
          </div>
        </aside>
      </Container>
    </section>
  );
}

function ContactRow({ label, href, value }: { label: string; href: string; value: string }) {
  return (
    <a
      href={href}
      className="flex flex-col gap-0.5 border-b border-white/15 pb-2.5 font-medium last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
    >
      <span>{label}</span>
      <span className="break-all font-mono text-[12px] tracking-tight text-brand-light sm:break-normal">
        {value}
      </span>
    </a>
  );
}
