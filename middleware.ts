import { NextResponse, type NextRequest } from 'next/server';

/**
 * Security-headers middleware.
 * CSP uses a per-request nonce so inline scripts (e.g. Next.js runtime) load
 * without `unsafe-inline`. All third-party origins are allowlisted explicitly.
 */
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  // Next.js dev mode uses eval() for HMR; production doesn't need it.
  const devEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '';

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${devEval} https://www.googletagmanager.com https://challenges.cloudflare.com`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://cdn.sanity.io https://www.google-analytics.com`,
    `font-src 'self' data:`,
    `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com`,
    `frame-src 'self' https://app.cal.com https://cal.com https://challenges.cloudflare.com`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `object-src 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), usb=(), payment=()',
  );
  return response;
}

export const config = {
  matcher: [
    /*
     * Skip:
     *   - static assets / image optimiser / favicons
     *   - `/studio` (Sanity Studio needs its own loose CSP)
     *   - `/api/revalidate` (webhook receiver, no browser context)
     */
    '/((?!_next/static|_next/image|favicon.ico|studio|api/revalidate|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico)$).*)',
  ],
};
