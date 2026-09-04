import { NextResponse } from 'next/server';

import { site } from '@/lib/content/site';
import { sanityFetch } from '@/sanity/lib/client';
import { POSTS_QUERY, type PostCard } from '@/sanity/lib/queries';

export const revalidate = 300; // 5 min

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = (await sanityFetch<PostCard[]>(POSTS_QUERY)) ?? [];

  const items = posts
    .map((p) => {
      const url = `${site.url}/insights/${p.slug}`;
      return `
    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
      ${p.author ? `<author>${escape(p.author.name)}</author>` : ''}
      ${p.excerpt ? `<description>${escape(p.excerpt)}</description>` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Insights &amp; the Regulator Brief</title>
    <link>${site.url}/insights</link>
    <atom:link href="${site.url}/insights/rss.xml" rel="self" type="application/rss+xml" />
    <description>Analysis for the Nigerian GRC leader.</description>
    <language>en-NG</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600',
    },
  });
}
