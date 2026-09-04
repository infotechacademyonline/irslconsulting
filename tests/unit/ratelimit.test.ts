import { describe, expect, it } from 'vitest';

import { rateLimitInMemory } from '@/lib/ratelimit';

describe('rateLimit (in-memory)', () => {
  it('allows up to the configured limit inside the window', () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(rateLimitInMemory({ key, limit: 3, windowMs: 60_000 }).allowed).toBe(true);
    }
    expect(rateLimitInMemory({ key, limit: 3, windowMs: 60_000 }).allowed).toBe(false);
  });

  it('reports retry-after when blocked', () => {
    const key = `test:${Math.random()}`;
    rateLimitInMemory({ key, limit: 1, windowMs: 60_000 });
    const blocked = rateLimitInMemory({ key, limit: 1, windowMs: 60_000 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });
});
