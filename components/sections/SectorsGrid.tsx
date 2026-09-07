import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { sectors } from '@/lib/content/sectors';

export function SectorsGrid() {
  return (
    <section id="sectors" className="relative overflow-hidden py-20">
      {/* Lagos skyline anchors the sectors block to Nigeria without
          shouting for attention — sits behind the copy at low opacity. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 opacity-25 md:h-56">
        <Image
          src="/assets/sectors/lagos-skyline.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          aria-hidden
        />
      </div>
      <Container className="relative z-10">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
          Sectors
        </span>
        <h2 className="mb-10 mt-3.5 max-w-[26ch] text-[26px] font-bold leading-tight tracking-tight text-ink text-balance md:text-4xl">
          Nigerian enterprises, mapped to their regulator.
        </h2>
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <div
              key={s.name}
              className="group relative overflow-hidden bg-white p-5 transition hover:bg-panel"
            >
              <span
                aria-hidden
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tint opacity-0 transition group-hover:opacity-100"
              />
              <div className="relative mb-2.5 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-tint text-brand transition group-hover:bg-white">
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-brand">
                  {s.regs}
                </span>
              </div>
              <h5 className="relative mb-2 text-[15.5px] font-bold tracking-tight text-ink">{s.name}</h5>
              <p className="relative mb-4 text-[13px] leading-relaxed text-muted">{s.desc}</p>
              <div className="relative flex flex-wrap gap-2">
                {s.recs.slice(0, 3).map((slug) => (
                  <Link
                    key={slug}
                    href={`/solutions/${slug}`}
                    className="rounded border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-tight text-muted-2 hover:border-brand hover:text-brand"
                  >
                    {slug}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

