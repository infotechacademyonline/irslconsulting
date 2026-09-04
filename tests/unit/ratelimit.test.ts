import { describe, expect, it } from 'vitest';

import { rateLimit } from '@/lib/ratelimit';

describe('rateLimit', () => {
  it('allows up to the configured limit inside the window', () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(rateLimit({ key, limit: 3, windowMs: 60_000 }).allowed).toBe(true);
    }
    expect(rateLimit({ key, limit: 3, windowMs: 60_000 }).allowed).toBe(false);
  });

  it('reports retry-after when blocked', () => {
    const key = `test:${Math.random()}`;
    rateLimit({ key, limit: 1, windowMs: 60_000 });
    const blocked = rateLimit({ key, limit: 1, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });
});
