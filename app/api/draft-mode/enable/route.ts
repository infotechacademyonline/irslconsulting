import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Draft-mode enabler.
 *
 * Sanity Presentation Tool (and any manual "preview this" link) calls
 *   /api/draft-mode/enable?secret=<SANITY_REVALIDATE_SECRET>&slug=/some/path
 *
 * We verify the shared secret, then flip on `draftMode` and redirect. From
 * that point on `sanityFetch` uses the `previewDrafts` perspective — every
 * Sanity-backed page shows unpublished edits.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = request.nextUrl.searchParams.get('slug') || '/';
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json({ error: 'preview not configured' }, { status: 503 });
  }
  if (!secret || secret !== expected) {
    return NextResponse.json({ error: 'invalid secret' }, { status: 401 });
  }

  const mode = await draftMode();
  mode.enable();
  redirect(slug);
}
