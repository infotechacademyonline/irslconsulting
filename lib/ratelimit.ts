import 'server-only';

/**
 * Rate limiter with two backends:
 *
 *   1. Upstash Redis (multi-region, durable) — enabled automatically when
 *      UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
 *   2. In-memory sliding-window — the fallback. Fine for a single-instance
 *      dev environment or a small Vercel serverless deployment; state is
 *      per-instance so limits are approximate under concurrent invocations.
 *
 * The API (`rateLimit`) is the same either way, so call sites don't change.
 */

export interface RateLimitOptions {
  key: string;
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}

// ─── In-memory backend ──────────────────────────────────────────────
interface Bucket {
  count: number;
  windowStart: number;
}
const buckets = new Map<string, Bucket>();

function inMemoryLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, retryAfterMs: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterMs: bucket.windowStart + windowMs - now };
  }
  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count, retryAfterMs: 0 };
}

// ─── Upstash backend (lazy) ─────────────────────────────────────────
type UpstashLimiter = { limit: (key: string) => Promise<{ success: boolean; remaining: number; reset: number }> };
const upstashCache = new Map<string, UpstashLimiter>();

async function getUpstashLimiter(limit: number, windowMs: number): Promise<UpstashLimiter | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const cacheKey = `${limit}:${windowMs}`;
  const cached = upstashCache.get(cacheKey);
  if (cached) return cached;

  const [{ Ratelimit }, { Redis }] = await Promise.all([
    import('@upstash/ratelimit'),
    import('@upstash/redis'),
  ]);
  const limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${Math.round(windowMs / 1000)} s`),
    analytics: false,
    prefix: 'irsl-rl',
  });
  const shaped: UpstashLimiter = {
    limit: async (key) => limiter.limit(key),
  };
  upstashCache.set(cacheKey, shaped);
  return shaped;
}

/**
 * Enforces the given limit for `key`. Returns synchronously with the in-memory
 * backend; async when Upstash is configured.
 */
export async function rateLimit(opts: RateLimitOptions): Promise<RateLimitResult> {
  const upstash = await getUpstashLimiter(opts.limit, opts.windowMs);
  if (upstash) {
    const r = await upstash.limit(opts.key);
    return {
      allowed: r.success,
      remaining: r.remaining,
      retryAfterMs: Math.max(0, r.reset - Date.now()),
    };
  }
  return inMemoryLimit(opts);
}

/** Sync-only variant, useful in tests where we don't want the async overhead. */
export function rateLimitInMemory(opts: RateLimitOptions): RateLimitResult {
  return inMemoryLimit(opts);
}

/** Extract the client IP from Next.js request headers. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return headers.get('x-real-ip') ?? 'unknown';
}
