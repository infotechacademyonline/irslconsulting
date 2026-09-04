import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { navItems, site } from '@/lib/content/site';

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-ink"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-md bg-brand text-[15px] font-extrabold tracking-tight text-white"
          >
            IR
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[18px] font-extrabold tracking-tight text-ink">{site.name}</span>
            <span className="mt-0.5 hidden font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted-2 sm:block">
              {site.legalName} · Risks · Compliance · Audit
            </span>
          </span>
        </Link>
        <nav className="hidden gap-7 text-[14.5px] font-medium md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink-2 hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/book-a-call"
          className="whitespace-nowrap rounded-md bg-brand px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-brand-deep"
        >
          Book a Call →
        </Link>
      </Container>
    </header>
  );
}
