import { z } from 'zod';

import { solutions } from '@/lib/content/solutions';

// The solutions array is a static const with ≥ 1 entry — assert the non-empty
// tuple shape so it can drive Zod enums.
const solutionNames = solutions.map((s) => s.name) as [string, ...string[]];
export const OTHER_CHALLENGE = 'Something adjacent (ESG, SOX, ISO 27001, IR)';
export const OTHER = 'Other';

export const sectorOptions = [
  'Commercial & Merchant Bank',
  'PSP / OFI / Fintech',
  'Upstream Oil & Gas',
  'Downstream & Marketing',
  'Telco / MNO',
  'Power (GenCo / DisCo)',
  'Insurance / PFA',
  'FMCG / Manufacturing',
  'Federal MDA / State Government',
  OTHER,
] as const;

export const modelOptions = [
  'Not sure yet',
  'Rapid Deployment',
  'Flexible Resourcing on Demand',
  'GRC Upgrades',
  'Managed GRC Operations',
] as const;

export const platformOptions = [
  'SAP S/4HANA',
  'SAP ECC',
  'Oracle',
  'Microsoft Dynamics',
  'Other enterprise platform',
  'No enterprise platform yet',
] as const;

export const challengeOptions = [...solutionNames, OTHER_CHALLENGE, OTHER] as const;

/**
 * z.enum needs a mutable [string, ...string[]] tuple. Our option arrays are
 * `readonly`; this helper widens them for Zod without losing the literal types
 * anywhere else in the app.
 */
function enumFrom<T extends readonly [string, ...string[]]>(values: T) {
  return z.enum([...values] as [T[number], ...T[number][]]);
}

export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please add your name.').max(100),
  email: z.string().trim().toLowerCase().email('Please add a valid work email.').max(254),
  organisation: z.string().trim().min(2, 'Please add your organisation.').max(200),
  role: z.string().trim().max(120).optional().default(''),
  sector: enumFrom(sectorOptions),
  challenge: enumFrom(challengeOptions),
  model: enumFrom(modelOptions).default('Not sure yet'),
  platform: enumFrom(platformOptions),
  message: z.string().trim().max(2000).optional().default(''),
  // Anti-spam
  turnstileToken: z.string().optional().default(''),
  // Honeypot — real users leave blank; bots often fill
  website: z.string().max(0, 'invalid').optional().default(''),
});

export type BookingInput = z.infer<typeof bookingSchema>;
