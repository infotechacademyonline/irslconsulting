'use server';

import { headers } from 'next/headers';

import { sendBookingEmail } from '@/lib/email/booking';
import { getClientIp, rateLimit } from '@/lib/ratelimit';
import { bookingSchema } from '@/lib/schemas/booking';
import { verifyTurnstile } from '@/lib/turnstile';

export interface BookingState {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function bookConsultation(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);

  // Rate limit — 5 submissions per 10 minutes per IP
  const rl = await rateLimit({
    key: `booking:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!rl.allowed) {
    return {
      ok: false,
      message: `Too many attempts. Try again in ${Math.ceil(rl.retryAfterMs / 60_000)} minutes.`,
    };
  }

  // Parse & validate
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Please fix the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot triggered
  if (parsed.data.website) {
    // Silently succeed — never tell the bot it's blocked
    return { ok: true, message: 'Thanks — we will reply within one business day.' };
  }

  // Turnstile
  const tsOk = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!tsOk) {
    return { ok: false, message: 'Human check failed. Please refresh and try again.' };
  }

  // Send email
  try {
    await sendBookingEmail(parsed.data);
  } catch (err) {
    console.error('[booking] send failed', err);
    return {
      ok: false,
      message:
        'We could not send your enquiry just now. Please email advisory@irslconsulting.ng directly.',
    };
  }

  return {
    ok: true,
    message: 'Thanks — a principal will reply within one business day, Mon–Fri, 08:30–17:30 WAT.',
  };
}
