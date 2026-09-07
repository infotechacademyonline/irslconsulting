import { Container } from '@/components/ui/Container';
import { site } from '@/lib/content/site';

/**
 * Dark full-width band showcasing the four headline stats over an abstract
 * grid+arc SVG. Sits between the AboutLede and the SolutionsGrid on the home
 * page so the "who we are" story lands on a piece of visual proof.
 */
export function ImpactBand() {
  return (
    <section
      aria-labelledby="impact-title"
      className="relative overflow-hidden bg-ink-2 py-16 text-white md:py-20"
    >
      <ImpactBg />
      <Container className="relative z-10">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-light">
          Track record
        </span>
        <h2
          id="impact-title"
          className="mt-3 max-w-[28ch] text-[26px] font-bold leading-tight tracking-tight text-white text-balance md:text-[38px]"
        >
          A decade of Nigerian GRC delivery, measured in evidence packs.
        </h2>
        <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-white/70">
          Access-risk campaigns run, control monitors tuned, audit findings
          closed. Numbers our clients&rsquo; auditors have signed off on.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-px border border-white/15 bg-white/10 lg:grid-cols-4">
          {site.stats.map((s) => (
            <li
              key={s.label}
              className="relative bg-ink-2 p-6 md:p-8"
            >
              <div className="text-[44px] font-bold leading-none tracking-tight text-white md:text-[56px]">
                {s.num}
              </div>
              <div className="mt-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-brand-light">
                {s.label}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ImpactBg() {
  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="impact-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#89acfc" opacity="0.35" />
        </pattern>
        <radialGradient id="impact-glow" cx="80%" cy="10%" r="55%">
          <stop offset="0%" stopColor="#4B83FC" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4B83FC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="500" fill="url(#impact-dots)" />
      <rect width="1200" height="500" fill="url(#impact-glow)" />
      <g stroke="#4B83FC" strokeWidth="1" fill="none" opacity="0.35">
        <circle cx="1080" cy="80" r="280" />
        <circle cx="1080" cy="80" r="200" />
        <circle cx="1080" cy="80" r="120" />
      </g>
    </svg>
  );
}
