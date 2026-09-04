export interface EngagementModel {
  n: string;
  icon: 'rapid' | 'flex' | 'upgrade' | 'managed';
  title: string;
  body: string;
  tag: string;
}

export const engagementModels: EngagementModel[] = [
  {
    n: 'Model 01',
    icon: 'rapid',
    title: 'Rapid Deployment',
    body: 'Packaged, time-boxed builds. From discovery workshop to go-live in weeks — not the months quoted by big-firm implementation partners.',
    tag: 'Fixed fee · 4–12 weeks',
  },
  {
    n: 'Model 02',
    icon: 'flex',
    title: 'Flexible Resourcing on Demand',
    body: 'Senior SME capacity by the day or week — for issue resolution, migration support, role-and-access work, or short-term capacity gaps.',
    tag: 'Day-rate · Named consultants',
  },
  {
    n: 'Model 03',
    icon: 'upgrade',
    title: 'GRC Upgrades',
    body: 'For organisations already live on a GRC platform: a version move, module extension, or refactor of a build that has drifted from good practice.',
    tag: 'Fixed fee · Milestone-based',
  },
  {
    n: 'Model 04',
    icon: 'managed',
    title: 'Managed GRC Operations',
    body: 'Long-term managed service. Access administration, continuous control monitoring, threat monitoring, and quarterly regulator-evidence packs.',
    tag: 'Annual · SLA-tied',
  },
];
