import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

/** Turns Sanity draft-mode off. Used by the "Exit preview" affordance. */
export async function GET() {
  const mode = await draftMode();
  mode.disable();
  return NextResponse.json({ ok: true, disabled: true });
}
