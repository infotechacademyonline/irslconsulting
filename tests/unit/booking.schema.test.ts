import { describe, expect, it } from 'vitest';

import { bookingSchema } from '@/lib/schemas/booking';

const valid = {
  name: 'Ada Adepoju',
  email: 'ada@example.ng',
  organisation: 'First Bank',
  role: 'Head of Internal Audit',
  sector: 'Commercial & Merchant Bank',
  challenge: 'Access Risk & Segregation of Duties',
  model: 'Not sure yet',
  platform: 'SAP S/4HANA',
  message: 'Preparing for a CBN examination in Q1.',
  turnstileToken: 'tok',
  website: '',
};

describe('bookingSchema', () => {
  it('accepts a fully populated valid submission', () => {
    const result = bookingSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects short names', () => {
    const result = bookingSchema.safeParse({ ...valid, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('rejects malformed emails', () => {
    const result = bookingSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('normalises email to lowercase', () => {
    const result = bookingSchema.safeParse({ ...valid, email: 'ADA@EXAMPLE.NG' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe('ada@example.ng');
  });

  it('rejects invalid sector', () => {
    const result = bookingSchema.safeParse({ ...valid, sector: 'Space Cadets' });
    expect(result.success).toBe(false);
  });

  it('trips on honeypot fill', () => {
    // Honeypot field allowed at most 0 chars — any value fails validation
    const result = bookingSchema.safeParse({ ...valid, website: 'https://spam.example' });
    expect(result.success).toBe(false);
  });
});
