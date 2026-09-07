'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Container } from '@/components/ui/Container';
import { navItems, site } from '@/lib/content/site';

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <Container className="flex h-[68px] items-center justify-between gap-4 md:h-[76px] md:gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-ink md:gap-3"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-md bg-brand text-[15px] font-extrabold tracking-tight text-white"
          >
            IR
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[16px] font-extrabold tracking-tight text-ink md:text-[18px]">
              {site.name}
            </span>
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

        <div className="flex items-center gap-2">
          <Link
            href="/book-a-call"
            className="whitespace-nowrap rounded-md bg-brand px-3 py-2 text-[13px] font-semibold text-white hover:bg-brand-deep md:px-4 md:py-2.5 md:text-[14px]"
          >
            Book a Call <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-ink-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden focusable="false">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden focusable="false">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white md:hidden"
          role="dialog"
          aria-label="Site navigation"
        >
          <Container className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-[15.5px] font-medium text-ink-2 hover:bg-panel hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-md px-3 py-3 text-[15.5px] font-medium text-ink-2 hover:bg-panel hover:text-brand"
            >
              Contact
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
