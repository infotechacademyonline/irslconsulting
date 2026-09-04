export type SolutionSlug =
  | 'access-risk'
  | 'control-monitoring'
  | 'internal-audit'
  | 'enterprise-risk'
  | 'identity-governance'
  | 'third-party-integrity'
  | 'threat-detection'
  | 'data-governance'
  | 'platform-security';

export interface Solution {
  slug: SolutionSlug;
  icon: SolutionSlug;
  domain: string;
  name: string;
  short: string;
  lead: string;
  subs: string[];
  deliverPlatform: string;
  deliverAdvisory: string;
  audience: string;
  problem: string;
  hooks: string[];
  regBody: string;
  cta: string;
}

export const solutions: Solution[] = [
  {
    slug: 'access-risk',
    icon: 'access-risk',
    domain: 'Access & Identity Risk',
    name: 'Access Risk & Segregation of Duties',
    short: 'Conflicting access, cut back and recertified.',
    lead: 'Users accumulate conflicting or unnecessary access that enables fraud, error, or unauthorised activity. We identify the conflicts, cut stale access, and stand up the recertification programme your CBN examiner and Internal Audit team expect.',
    subs: [
      'SoD analysis',
      'Access recertification',
      'Firefighter / emergency access',
      'Business role design',
      'Least-privilege review',
    ],
    deliverPlatform:
      'SAP Partner — native SAP GRC Access Control build, or the adjacent enterprise-GRC tooling you already licence: ruleset, mitigating-control register, firefighter logging, and scheduled review campaigns.',
    deliverAdvisory:
      'Role-model design, SoD ruleset, access-review programme, and the evidence pack — delivered as framework and playbook on any other stack, including spreadsheet-and-workflow environments.',
    audience:
      'CISOs, Heads of Internal Audit, and SAP/ERP security leads in CBN-, NAICOM-, and PenCom-regulated firms.',
    problem:
      'Users accumulate conflicting or unnecessary access that enables fraud, error, or unauthorised activity; manual access processes cannot produce audit-ready evidence at examination pace.',
    hooks: ['CBN RBS', 'CBN Cyber Framework', 'FRC NCCG', 'NAICOM', 'PenCom'],
    regBody:
      'Access evidence is the first artefact a CBN examiner requests. We produce the SoD ruleset, the mitigating-control register, the emergency-access log, and the signed access-review campaign — in the format the examiner already reads.',
    cta: 'Book an Access-Risk & SoD Health Check',
  },
  {
    slug: 'control-monitoring',
    icon: 'control-monitoring',
    domain: 'Control Assurance',
    name: 'Automated Control Monitoring',
    short: 'Spreadsheet attestation replaced with live monitoring.',
    lead: 'Controls performed through email and spreadsheets get missed, done inconsistently, or evidenced poorly. We replace that with automated, continuous monitoring across finance, procurement, and revenue — with a defensible, real-time performance dashboard.',
    subs: [
      'Manual control monitoring',
      'Control testing',
      'Continuous control monitoring',
      'Compliance surveys',
      'Control reporting',
    ],
    deliverPlatform:
      'SAP Partner — native SAP Process Control or adjacent tooling: control catalogue, automated test rules, survey campaigns, and an exception dashboard wired to real owners.',
    deliverAdvisory:
      'Control library, accountability model, CCM rule specification, and dashboard spec — implementable on any platform, including the BI tooling you already run.',
    audience: 'CFOs, Financial Controllers, Heads of Internal Control, and audit-committee secretaries.',
    problem:
      'Controls performed through email and spreadsheets are missed, inconsistent, or poorly evidenced; management cannot reliably prove that key controls work.',
    hooks: ['FRC NCCG', 'CBN internal controls', 'IFRS controls', 'Sector inspections'],
    regBody:
      'The FRC NCCG asks the board to assert that internal controls operate effectively. Continuous monitoring turns that assertion into a dated, evidenced record rather than a management representation.',
    cta: 'Book a Control-Automation & Monitoring Assessment',
  },
  {
    slug: 'internal-audit',
    icon: 'internal-audit',
    domain: 'Internal Audit',
    name: 'Internal Audit Management',
    short: 'Risk-based audit universe, executed and evidenced.',
    lead: 'Audit teams direct resources by habit rather than risk, and close findings without sufficient evidence. We design the risk-based audit universe, streamline execution and follow-up, and produce audit-committee reporting fit for FRC and IIA scrutiny.',
    subs: [
      'Audit planning',
      'Audit preparation',
      'Audit execution',
      'Audit reporting',
      'Audit follow-up',
    ],
    deliverPlatform:
      'SAP Partner — native SAP Audit Management or adjacent audit-management platforms: audit universe, workpapers, findings workflow, and follow-up tracking in one system of record.',
    deliverAdvisory:
      'Audit-universe design, workpaper templates, quality-review checklist, and the audit-committee reporting pack — delivered in any workflow tool your team already uses.',
    audience: 'Chief Audit Executives, audit managers, and audit-committee chairs.',
    problem:
      'Audit resources are directed by habit rather than risk; findings are closed without sufficient evidence; management reporting is slow and inconsistent.',
    hooks: ['FRC NCCG', 'IIA Standards', 'CBN examiners', 'OAGF'],
    regBody:
      'Audit-committee reporting under the NCCG has to show risk-based coverage and evidenced closure. We ship the reporting pack Chief Audit Executives table each quarter.',
    cta: 'Book an Audit Operating-Model Maturity Review',
  },
  {
    slug: 'enterprise-risk',
    icon: 'enterprise-risk',
    domain: 'Enterprise Risk',
    name: 'Enterprise Risk Management',
    short: 'One scored register the board can actually use.',
    lead: "Risk activities are fragmented, inconsistently scored, and disconnected from strategy. We build the risk taxonomy, appetite, KRIs, and treatment tracking that sit under your board's oversight mandate.",
    subs: ['Risk planning', 'Risk identification', 'Risk analysis', 'Risk response', 'Risk monitoring'],
    deliverPlatform:
      'SAP Partner — native SAP Risk Management or adjacent ERM tooling: taxonomy, scoring model, KRI thresholds, treatment plans, and board dashboards.',
    deliverAdvisory:
      'Risk-appetite framework, KRI library, heat-mapping method, and board-reporting pack — on any GRC or workflow platform.',
    audience: 'Chief Risk Officers, board risk committees, and strategy functions.',
    problem:
      'Risk activities are fragmented, inconsistently scored, and disconnected from strategic priorities; leaders cannot compare risks across the enterprise.',
    hooks: ['FRC NCCG', 'CBN ERM Guidance', 'NAICOM ORSA', 'PenCom'],
    regBody:
      'Board risk oversight under the NCCG, CBN ERM guidance, and NAICOM ORSA-parity filings all need one scored, dated register — not four spreadsheets that disagree.',
    cta: 'Book an Enterprise-Risk Maturity Assessment',
  },
  {
    slug: 'identity-governance',
    icon: 'identity-governance',
    domain: 'Identity Governance',
    name: 'Identity & Access Governance',
    short: 'Cross-application access risk, made visible.',
    lead: 'Access risk is invisible when identities and permissions are spread across many applications. We build the cross-application access-governance layer your CISO can defend.',
    subs: [
      'Cross-app access analysis',
      'Access request',
      'Role management',
      'Privileged access management',
      'Access certification',
    ],
    deliverPlatform:
      'SAP Partner — native SAP IAG / Cloud IAG, or adjacent IAM platforms (SailPoint, Okta, Microsoft Entra): connectors, certification campaigns, and PAM controls.',
    deliverAdvisory:
      'IAM operating model, certification-campaign playbook, and PAM architecture — designed for the identity stack you already own.',
    audience: 'CISOs, identity architects, and IT risk leads across multi-application estates.',
    problem:
      'Access risk is invisible when identities and permissions are spread across many applications; access accumulates because managers lack a consistent recertification process.',
    hooks: ['NDPA 2023', 'CBN Cyber Framework', 'NDPC'],
    regBody:
      'NDPA accountability expects you to show who can reach personal data across every system — not only in your ERP. Cross-application certification is how that answer stays true next quarter.',
    cta: 'Book an Identity-Governance Maturity Assessment',
  },
  {
    slug: 'third-party-integrity',
    icon: 'third-party-integrity',
    domain: 'Third-Party Integrity',
    name: 'Third-Party Integrity & Sanctions Screening',
    short: 'Screening and due diligence you can replay.',
    lead: 'Firms onboard suppliers, agents, and customers linked to fraud, corruption, or sanctions exposure — and cannot prove otherwise. We stand up screening, due diligence, and continuous monitoring for OFAC, EU, UN, and EFCC PEP regimes.',
    subs: [
      'Third-party screening',
      'Sanctions & watchlist',
      'Due diligence',
      'Risk assessment',
      'Alert & investigation',
      'Continuous monitoring',
      'Compliance reporting',
    ],
    deliverPlatform:
      'SAP Partner — native SAP Business Integrity Screening or adjacent screening platforms: list management, match rules, alert queues, and investigation records.',
    deliverAdvisory:
      'Third-party risk framework, ruleset design, and alert-investigation playbook — vendor-neutral, usable with whichever screening service you buy.',
    audience: 'Heads of Compliance, AML officers, procurement leads, and forensic teams.',
    problem:
      'Firms onboard parties linked to fraud, corruption, sanctions, or reputational harm; alerts are missed or closed inconsistently.',
    hooks: ['EFCC / NFIU', 'CBN AML', 'NDPC', 'OFAC / EU / UN'],
    regBody:
      'NFIU reporting and CBN AML regulations both turn on screening you can replay: which list, which version, which date, and who cleared the alert.',
    cta: 'Book a Third-Party Screening Readiness Review',
  },
  {
    slug: 'threat-detection',
    icon: 'threat-detection',
    domain: 'Threat Detection',
    name: 'Threat Detection for Business Systems',
    short: 'SIEM-grade detection at the ERP layer.',
    lead: 'Proactive, not reactive. Enterprise SOCs cannot natively read business-system telemetry, so malicious activity there goes unnoticed until damage occurs. We stand up SIEM-grade detection at the ERP layer.',
    subs: [
      'Security event collection',
      'Threat detection',
      'Pattern-based detection',
      'Investigation',
      'Monitoring',
      'Reporting & audit',
    ],
    deliverPlatform:
      'SAP Partner — native SAP Enterprise Threat Detection or adjacent ERP-layer tooling (Onapsis, custom SIEM integrations): log collection, detection patterns, and investigation timelines.',
    deliverAdvisory:
      'Detection ruleset, log-forwarding architecture, and SOC-integration playbook — written for whichever SIEM your security team runs.',
    audience: 'CISOs, SOC managers, and ERP platform owners.',
    problem:
      'Security evidence is fragmented across business-system components; malicious activity goes unnoticed until financial, operational, or data damage occurs.',
    hooks: ['CBN Cyber Framework', 'NDPA 72h breach', 'NCC Consumer Data'],
    regBody:
      'NDPA breach notification runs on a 72-hour clock. Detection at the application layer is what makes that clock start when the incident happens, not when the auditor finds it.',
    cta: 'Book an ERP Threat-Detection Coverage Assessment',
  },
  {
    slug: 'data-governance',
    icon: 'data-governance',
    domain: 'Data Governance',
    name: 'Cloud Data Governance & NDPA Compliance',
    short: 'Residency, classification and privacy, evidenced.',
    lead: 'Cloud data can be accessible to more people, and cross-border, than policy or NDPA 2023 allows. We build the data classification, access governance, residency, and privacy controls that make your cloud adoption defensible to the NDPC.',
    subs: [
      'Data access governance',
      'Privacy & protection',
      'Classification',
      'Residency & sovereignty',
      'Security & encryption',
      'Compliance, risk & audit',
    ],
    deliverPlatform:
      'SAP Partner — native SAP Data Custodian or adjacent cloud data-governance platforms: key control, provider-access logging, residency policy, and audit evidence.',
    deliverAdvisory:
      'Data-classification taxonomy, DPIA methodology, cross-border transfer register, and an NDPA-aligned control library — for any cloud stack.',
    audience: 'Data Protection Officers, CIOs, and cloud programme leads.',
    problem:
      'Cloud data may be accessible to more people or provider personnel than policy allows; cross-border processing may violate contractual or national sovereignty rules.',
    hooks: ['NDPA 2023', 'NDPC filings', 'CBN localisation', 'NCC'],
    regBody:
      'The cloud-migration conversation in Nigeria is a data-residency conversation. We document where data sits, who at the provider can reach it, and what the NDPC filing says about both.',
    cta: 'Book a Cloud-Data Governance & NDPA Assessment',
  },
  {
    slug: 'platform-security',
    icon: 'platform-security',
    domain: 'Platform Security',
    name: 'ERP & Cloud Platform Security',
    short: 'Roles, SSO, APIs and logging, designed once.',
    lead: 'Unauthorised access exposes business processes and data; weak APIs open paths into critical systems. We deliver the role architecture, SSO / MFA, API and integration security, and audit logging that underpin every enterprise-platform rollout.',
    subs: [
      'Identity & access management',
      'Authentication & SSO',
      'Authorisation & role design',
      'Privileged access',
      'Logging & monitoring',
      'Data & application security',
      'API & integration security',
      'Compliance & audit',
    ],
    deliverPlatform:
      'SAP Partner — native S/4HANA & BTP security or adjacent ERP-security stacks: role architecture, SSO/MFA, API security, and audit logging built into the rollout.',
    deliverAdvisory:
      'Platform-security architecture review, role-model design, SSO/MFA rollout plan, and API-security assessment — for any ERP or cloud stack.',
    audience: 'ERP programme directors, security architects, and integration leads.',
    problem:
      'Unauthorised or excessive access exposes business processes and data; weak API and integration security opens paths into critical business systems.',
    hooks: ['CBN Cyber Framework', 'NDPA 2023', 'NCC', 'NUPRC'],
    regBody:
      'Migration is the cheapest moment to get authorisation design right. Afterwards, every fix is a change request with a regression test attached.',
    cta: 'Book a Platform-Security Assessment',
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export const solutionSlugs = solutions.map((s) => s.slug);
