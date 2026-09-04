import type { SolutionSlug } from './solutions';

export interface Sector {
  icon: 'bank' | 'fintech' | 'oil' | 'down' | 'telco' | 'power' | 'insure' | 'fmcg' | 'gov';
  regs: string;
  name: string;
  desc: string;
  recs: SolutionSlug[];
}

export const sectors: Sector[] = [
  {
    icon: 'bank',
    regs: 'CBN · NDIC · NFIU',
    name: 'Commercial & Merchant Banks',
    desc: 'Risk-based supervision, cyber-resilience circulars, SoD in core financials, sanctions screening, NFIU reporting.',
    recs: ['access-risk', 'third-party-integrity', 'control-monitoring'],
  },
  {
    icon: 'fintech',
    regs: 'CBN · NIBSS',
    name: 'Payment & OFI Institutions',
    desc: 'PSP, PSSP, MMO licence obligations; ICT risk management; access certification.',
    recs: ['identity-governance', 'access-risk', 'threat-detection'],
  },
  {
    icon: 'oil',
    regs: 'NUPRC · NNPC',
    name: 'Upstream Oil & Gas',
    desc: 'Cost-recovery evidence, host-community reporting, JV partner segregation.',
    recs: ['access-risk', 'control-monitoring', 'internal-audit'],
  },
  {
    icon: 'down',
    regs: 'NMDPRA · PPPRA',
    name: 'Downstream & Marketing',
    desc: 'Product accounting integrity, retail-network controls, subsidy audit trails.',
    recs: ['control-monitoring', 'internal-audit', 'enterprise-risk'],
  },
  {
    icon: 'telco',
    regs: 'NCC · NDPC',
    name: 'Telecommunications (MNOs)',
    desc: 'Subscriber-data protection, revenue-assurance controls, licence-reporting evidence.',
    recs: ['data-governance', 'threat-detection', 'identity-governance'],
  },
  {
    icon: 'power',
    regs: 'NERC · NBET',
    name: 'Power — GenCos & DisCos',
    desc: 'Metering integrity, tariff-order compliance, market-participant reporting.',
    recs: ['control-monitoring', 'enterprise-risk', 'platform-security'],
  },
  {
    icon: 'insure',
    regs: 'NAICOM · PenCom',
    name: 'Insurance & PFAs',
    desc: 'Solvency-parity reporting, claims-fraud detection, RSA administrative controls.',
    recs: ['enterprise-risk', 'third-party-integrity', 'access-risk'],
  },
  {
    icon: 'fmcg',
    regs: 'SON · NAFDAC',
    name: 'FMCG & Manufacturing',
    desc: 'Batch traceability, procure-to-pay integrity, third-party integrity screening.',
    recs: ['third-party-integrity', 'control-monitoring', 'platform-security'],
  },
  {
    icon: 'gov',
    regs: 'OAGF · BPP · FRC',
    name: 'Federal MDAs & States',
    desc: 'IPPIS / GIFMIS integration hygiene, procurement controls, public-audit evidence.',
    recs: ['access-risk', 'internal-audit', 'data-governance'],
  },
];
