import 'server-only';

import { Resend } from 'resend';

import type { BookingInput } from '@/lib/schemas/booking';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const INBOX = process.env.BOOKING_INBOX ?? 'advisory@irslconsulting.ng';

export async function sendBookingEmail(booking: BookingInput): Promise<void> {
  if (!resend) {
    console.info('[booking] Resend not configured; would send:', {
      to: INBOX,
      name: booking.name,
      email: booking.email,
      organisation: booking.organisation,
      challenge: booking.challenge,
    });
    return;
  }

  const subject = `New consultation — ${booking.organisation} · ${booking.challenge}`;
  const text = [
    `Name:          ${booking.name}`,
    `Email:         ${booking.email}`,
    `Organisation:  ${booking.organisation}`,
    `Role:          ${booking.role || '—'}`,
    `Sector:        ${booking.sector}`,
    `Challenge:     ${booking.challenge}`,
    `Model:         ${booking.model}`,
    `Platform:      ${booking.platform}`,
    '',
    'Message:',
    booking.message || '(none)',
  ].join('\n');

  await resend.emails.send({
    from: 'IRSL Website <no-reply@irslconsulting.ng>',
    to: INBOX,
    replyTo: booking.email,
    subject,
    text,
  });
}
