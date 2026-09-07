import Image from 'next/image';
import Link from 'next/link';

import { ConsentPreferencesLink } from '@/components/consent/ConsentPreferencesLink';
import { Container } from '@/components/ui/Container';
import { solutions } from '@/lib/content/solutions';
import { site } from '@/lib/content/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-panel py-12 md:py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-ink">
              <Image
                src="/assets/brand/irsl-logo.png"
                alt={`${site.name} home`}
                width={52}
                height={52}
                className="h-12 w-12"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                {site.legalName} · Nigeria
              </span>
            </Link>
            <div className="mt-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-brand">
              {site.tagline}
            </div>
            <p className="mt-3 max-w-[42ch] text-[14px] text-muted">
              A Nigerian Governance, Risk &amp; Compliance advisory practice. SAP Partner.
              Platform-neutral on the business problem. One accountable partner.
            </p>

            <div className="mt-5">
              <span className="inline-flex items-center gap-2 rounded border border-border bg-white px-2.5 py-1.5">
                <span
                  aria-label="SAP"
                  className="inline-flex h-5 items-center justify-center rounded-sm bg-gradient-to-r from-[#003D82] to-[#0FAAFF] px-1.5 text-[10.5px] font-extrabold tracking-tight text-white"
                >
                  SAP
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-ink">
                  Partner
                </span>
              </span>
            </div>
          </div>

          <FooterCol title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/about/leadership">Leadership</FooterLink>
            <FooterLink href="/partners">Partners</FooterLink>
            <FooterLink href="/engage">Engage</FooterLink>
            <FooterLink href="/sectors">Sectors</FooterLink>
            <FooterLink href="/case-studies">Case studies</FooterLink>
            <FooterLink href="/insights">Insights &amp; Blog</FooterLink>
            <FooterLink href="/careers">Careers &amp; Talent</FooterLink>
          </FooterCol>

          <FooterCol title="Solutions">
            {solutions.map((s) => (
              <FooterLink key={s.slug} href={`/solutions/${s.slug}`}>
                {s.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Contact">
            <address className="not-italic text-[14px] leading-relaxed text-ink-3">
              <b className="mb-1 block font-semibold text-ink">Lagos Office</b>
              {site.address.street},<br />
              {site.address.city},<br />
              {site.address.country}
              <br />
              <a href={site.address.phoneHref} className="text-brand">
                {site.address.phone}
              </a>
              <br />
              <a href={`mailto:${site.email.info}`} className="text-brand">
                {site.email.info}
              </a>
              <br />
              <br />
              <b className="block font-semibold text-ink">{site.address.hours}</b>
            </address>
          </FooterCol>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-t border-border pt-7 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-2">
          <span>© {year} {site.legalName}. All rights reserved.</span>
          <span className="flex flex-wrap items-baseline gap-x-2">
            <FooterLink href="/terms">Terms</FooterLink>
            <span aria-hidden>·</span>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <span aria-hidden>·</span>
            <FooterLink href="/ndpa-notice">NDPA Notice</FooterLink>
            <span aria-hidden>·</span>
            <ConsentPreferencesLink />
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h6 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-2">
        {title}
      </h6>
      <ul className="grid gap-2.5 text-[14px]">{Array.isArray(children) ? children.map((c, i) => <li key={i}>{c}</li>) : <li>{children}</li>}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-ink-3 hover:text-brand">
      {children}
    </Link>
  );
}
