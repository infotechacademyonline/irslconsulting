function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return 'https://irslconsulting.ng';
}

export const site = {
  name: 'IRSL Consulting',
  legalName: 'Infotech Risks Security',
  tagline: 'Risks · Compliance · Audit Consulting',
  // Fall back through: an empty-string env var (Vercel's default for
  // unset public vars at build time) must NOT reach `new URL('')`.
  url: resolveSiteUrl(),
  address: {
    street: '24 Mabinuori Street, Shangisha',
    city: 'Magodo, Lagos',
    country: 'Nigeria',
    phone: '+234 812 871 6874',
    phoneHref: 'tel:+2348128716874',
    hours: 'Mon–Fri · 08:30–17:30 WAT',
  },
  email: {
    info: 'info@irslconsulting.ng',
    advisory: 'advisory@irslconsulting.ng',
    careers: 'careers@irslconsulting.ng',
    dpo: 'dpo@irslconsulting.ng',
  },
  partners: ['SailPoint', 'Okta', 'Microsoft', 'ServiceNow', 'CyberArk', 'Onapsis'],
  regulators: [
    { code: 'NDPA · 2023', text: 'Nigeria Data Protection Act. Lawful processing, DPIAs, cross-border transfer, 72-hour breach notice.' },
    { code: 'CBN · RBS', text: 'Risk-Based Supervision & Cyber Framework. DMBs, PSBs, OFIs, PSPs — ICT risk, IAM, SoD, audit logging.' },
    { code: 'NCC · 2019', text: 'Registration of Telephone Subscribers & Data Protection. MNOs and licensees.' },
    { code: 'NUPRC · PIA', text: 'Petroleum Industry Act obligations. Cost-recovery evidence, host-community reporting.' },
    { code: 'FRC · NCCG', text: 'Nigerian Code of Corporate Governance. Board risk oversight, financial-reporting integrity.' },
    { code: 'NITDA', text: 'Sector implementation frameworks & audit filings for controllers of consequence.' },
  ],
  riskCategories: [
    'Operational',
    'Financial',
    'Compliance',
    'Reputation',
    'Human',
    'Trade',
    'Technology',
    'Security',
  ],
  stats: [
    { num: '13+', label: 'Sectors served' },
    { num: '95+', label: 'Implementations' },
    { num: '10+', label: 'Years in practice' },
    { num: '80+', label: 'Trainings delivered' },
  ],
} as const;

export const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Engage', href: '/engage' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Insights', href: '/insights' },
] as const;
