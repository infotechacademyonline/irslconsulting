import crypto from 'node:crypto';

import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sanity webhook receiver.
 *
 * Configure in Sanity → API → Webhooks:
 *   - URL:     https://<host>/api/revalidate
 *   - Trigger: on create/update/delete of `post`, `principal`, `openRole`
 *   - Secret:  matches SANITY_REVALIDATE_SECRET below
 *
 * We verify the HMAC signature with a constant-time comparison, then bump
 * the `sanity` cache tag — every Sanity-backed page re-renders on next hit.
 */

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }

  const signature = request.headers.get('sanity-webhook-signature');
  const body = await request.text();

  if (!signature || !isValidSignature(body, signature, secret)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 });
  }

  revalidateTag('sanity');
  return NextResponse.json({ ok: true, revalidated: 'sanity' });
}

/** Verifies the Sanity webhook signature. Sanity signs with sha256 HMAC. */
function isValidSignature(body: string, signature: string, secret: string): boolean {
  // Sanity uses the format `t=<timestamp>,v1=<hmac_hex>`
  const parts = Object.fromEntries(signature.split(',').map((p) => p.split('=')));
  const timestamp = parts.t;
  const provided = parts.v1;
  if (!timestamp || !provided) return false;

  const payload = `${timestamp}.${body}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
  } catch {
    return false;
  }
}
