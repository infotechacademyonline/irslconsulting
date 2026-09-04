'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { bookConsultation, type BookingState } from '@/app/actions/book-consultation';
import {
  challengeOptions,
  modelOptions,
  platformOptions,
  sectorOptions,
} from '@/lib/schemas/booking';

const initialState: BookingState = { ok: false };

export function BookACallForm() {
  const [state, action] = useActionState(bookConsultation, initialState);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-lg border border-brand/25 bg-tint p-6 text-[15px] text-ink"
      >
        <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-deep">
          Received
        </div>
        <p className="leading-relaxed">{state.message}</p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form action={action} className="grid gap-4">
      {/* Honeypot — hidden from users, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={err.name?.[0]}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field"
          />
        </Field>
        <Field id="email" label="Work email" required error={err.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="organisation" label="Organisation" required error={err.organisation?.[0]}>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            required
            className="field"
          />
        </Field>
        <Field id="role" label="Role" error={err.role?.[0]}>
          <input
            id="role"
            name="role"
            type="text"
            autoComplete="organization-title"
            className="field"
          />
        </Field>
      </div>

      <Field id="sector" label="Sector" required error={err.sector?.[0]}>
        <select id="sector" name="sector" required className="field">
          {sectorOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field id="challenge" label="Business challenge" required error={err.challenge?.[0]}>
        <select id="challenge" name="challenge" required className="field">
          {challengeOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="model" label="Preferred engagement model" error={err.model?.[0]}>
          <select id="model" name="model" className="field" defaultValue="Not sure yet">
            {modelOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="platform" label="Enterprise platform" required error={err.platform?.[0]}>
          <select id="platform" name="platform" required className="field">
            {platformOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message (optional)" error={err.message?.[0]}>
        <textarea id="message" name="message" rows={4} className="field resize-y" />
      </Field>

      {state.message && (
        <div role="alert" className="text-[13.5px] text-red-700">
          {state.message}
        </div>
      )}

      <SubmitButton />
      <p className="text-[12px] text-muted-2">
        We reply within one business day, Mon–Fri 08:30–17:30 WAT. Data used only for this enquiry
        (see our{' '}
        <a href="/privacy" className="text-brand">
          Privacy Notice
        </a>
        ).
      </p>

      <style>{`
        .field {
          width: 100%;
          padding: 12px 14px;
          font-size: 15px;
          background: var(--white);
          border: 1px solid var(--border-2);
          border-radius: 6px;
          color: var(--ink);
        }
        .field:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: 1px;
          border-color: var(--blue);
        }
      `}</style>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-brand">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <div id={`${id}-error`} className="mt-1 text-[12.5px] text-red-700" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex items-center gap-2 self-start rounded bg-brand px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-brand-deep disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Book my consultation'}
      {!pending && <span aria-hidden>→</span>}
    </button>
  );
}
