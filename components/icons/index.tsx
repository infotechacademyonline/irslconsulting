/**
 * Icon set — inline SVG symbols rendered once at the app root, referenced by
 * <Icon name="…" /> throughout the site. One HTTP round-trip, colour via
 * `currentColor`, no external image request.
 */

export type IconName =
  // solutions
  | 'access-risk'
  | 'control-monitoring'
  | 'internal-audit'
  | 'enterprise-risk'
  | 'identity-governance'
  | 'third-party-integrity'
  | 'threat-detection'
  | 'data-governance'
  | 'platform-security'
  // sectors
  | 'bank'
  | 'fintech'
  | 'oil'
  | 'down'
  | 'telco'
  | 'power'
  | 'insure'
  | 'fmcg'
  | 'gov'
  // engagement models
  | 'rapid'
  | 'flex'
  | 'upgrade'
  | 'managed'
  // ui
  | 'quote'
  | 'info'
  | 'arrow';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function IconSprite() {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <svg width={0} height={0} className="absolute" aria-hidden="true">
      <defs>
        {/* Solutions */}
        <symbol id="i-access-risk" viewBox="0 0 24 24" {...stroke}>
          <circle cx="8" cy="12" r="4" />
          <path d="M12 12h9M17 12v4M21 12v3" />
        </symbol>
        <symbol id="i-control-monitoring" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="4" width="18" height="14" rx="1" />
          <path d="M7 14l3-4 3 2 4-4M3 21h18" />
        </symbol>
        <symbol id="i-internal-audit" viewBox="0 0 24 24" {...stroke}>
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <path d="M8 8l2 2 4-4M8 14l2 2 4-4M8 19h6" />
        </symbol>
        <symbol id="i-enterprise-risk" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3l8 3v7c0 4-4 7-8 8-4-1-8-4-8-8V6z" />
          <path d="M12 9v4" />
          <circle cx="12" cy="16" r=".7" fill="currentColor" />
        </symbol>
        <symbol id="i-identity-governance" viewBox="0 0 24 24" {...stroke}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8 7.5l2.5 9M16 7.5l-2.5 9M8.5 6h7" />
        </symbol>
        <symbol id="i-third-party-integrity" viewBox="0 0 24 24" {...stroke}>
          <circle cx="8" cy="12" r="5" />
          <circle cx="16" cy="12" r="5" />
        </symbol>
        <symbol id="i-threat-detection" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <path d="M12 3v3M21 12h-3" />
        </symbol>
        <symbol id="i-data-governance" viewBox="0 0 24 24" {...stroke}>
          <path d="M4 10a5 5 0 0110-2 5 5 0 016 5 4 4 0 01-3 7H7a4 4 0 01-3-7 4 4 0 010-3z" />
          <rect x="9" y="12" width="6" height="5" rx="1" />
          <path d="M11 12v-1.5a1.5 1.5 0 013 0V12" />
        </symbol>
        <symbol id="i-platform-security" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="4" width="18" height="5" rx="1" />
          <rect x="3" y="10.5" width="18" height="5" rx="1" />
          <rect x="3" y="17" width="18" height="4" rx="1" />
          <circle cx="6" cy="6.5" r=".7" fill="currentColor" />
          <circle cx="6" cy="13" r=".7" fill="currentColor" />
          <circle cx="6" cy="19" r=".7" fill="currentColor" />
        </symbol>

        {/* Sectors */}
        <symbol id="i-bank" viewBox="0 0 24 24" {...stroke}>
          <path d="M3 10l9-5 9 5M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18" />
        </symbol>
        <symbol id="i-fintech" viewBox="0 0 24 24" {...stroke}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </symbol>
        <symbol id="i-oil" viewBox="0 0 24 24" {...stroke}>
          <path d="M6 20V6h8l4 4v10M6 20h12M9 6l2-3 2 3" />
        </symbol>
        <symbol id="i-down" viewBox="0 0 24 24" {...stroke}>
          <rect x="4" y="9" width="12" height="10" />
          <path d="M16 13h4l0 6H4" />
          <circle cx="7" cy="21" r="1.5" />
          <circle cx="17" cy="21" r="1.5" />
        </symbol>
        <symbol id="i-telco" viewBox="0 0 24 24" {...stroke}>
          <path d="M10 20h4M12 20v-8M8 12h8M6 8q6-4 12 0M4 5q8-6 16 0" />
        </symbol>
        <symbol id="i-power" viewBox="0 0 24 24" {...stroke}>
          <path d="M13 2L4 14h5l-1 8 7-10h-5z" />
        </symbol>
        <symbol id="i-insure" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3l8 3v7c0 4-4 7-8 8-4-1-8-4-8-8V6z" />
        </symbol>
        <symbol id="i-fmcg" viewBox="0 0 24 24" {...stroke}>
          <path d="M4 20V8h16v12zM4 8l4-5h8l4 5M4 14h16" />
        </symbol>
        <symbol id="i-gov" viewBox="0 0 24 24" {...stroke}>
          <path d="M2 10h20M3 6h18M12 2l9 4M12 2L3 6M4 10v10M8 10v10M12 10v10M16 10v10M20 10v10M3 20h18" />
        </symbol>

        {/* Engagement models */}
        <symbol id="i-rapid" viewBox="0 0 24 24" {...stroke}>
          <path d="M13 2L5 14h6l-1 8 8-10h-6z" />
        </symbol>
        <symbol id="i-flex" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20a6 6 0 0112 0" />
          <path d="M4 10l2 2M20 10l-2 2" />
        </symbol>
        <symbol id="i-upgrade" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 4v16M6 10l6-6 6 6" />
          <rect x="4" y="16" width="16" height="5" rx="1" />
        </symbol>
        <symbol id="i-managed" viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3l8 3v6c0 4-4 8-8 9-4-1-8-5-8-9V6z" />
          <path d="M12 9v6M9 12h6" />
        </symbol>

        {/* UI */}
        <symbol id="i-quote" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 6c-3 0-5 3-5 6v6h5v-6H6.5c0-2 1-3.5 2.5-3.5zM18 6c-3 0-5 3-5 6v6h5v-6h-2.5c0-2 1-3.5 2.5-3.5z" />
        </symbol>
        <symbol id="i-info" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <circle cx="12" cy="8" r=".7" fill="currentColor" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24" {...stroke} strokeWidth={2}>
          <path d="M5 12h14M14 6l6 6-6 6" />
        </symbol>
      </defs>
    </svg>
  );
}
