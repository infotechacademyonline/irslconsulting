import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { POSTS_QUERY, type PostCard } from '@/sanity/lib/queries';
import type { Image as SanityImage } from 'sanity';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'The IRSL Nigeria Regulator Brief — analysis of what the CBN, NDPC, and FRC have said and what it means for your GRC posture.',
};

export const revalidate = 60;

export default async function InsightsPage() {
  const posts = await sanityFetch<PostCard[]>(POSTS_QUERY);

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16">
        <Container>
          <Header />
          <p className="mt-8 rounded-lg border border-dashed border-border-2 bg-panel p-8 text-[15.5px] text-muted">
            No articles are published yet.{' '}
            {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? (
              <>Publish one from Studio and it will appear here within a minute.</>
            ) : (
              <>Configure Sanity and open <code className="rounded bg-white px-1.5">/studio</code> to add the first post.</>
            )}
          </p>
        </Container>
      </section>
    );
  }

  const [featured, ...rest] = posts;
  if (!featured) return null; // unreachable — length checked above

  return (
    <section className="py-16">
      <Container>
        <Header />

        <FeaturedCard post={featured} />

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ArticleCard key={p._id} post={p} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Header() {
  return (
    <>
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
        Insights &amp; the Regulator Brief
      </span>
      <h1 className="mt-3.5 max-w-[22ch] text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
        Analysis for the Nigerian GRC leader.
      </h1>
    </>
  );
}

function FeaturedCard({ post }: { post: PostCard }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="mt-10 grid overflow-hidden rounded-lg border border-border bg-white transition hover:border-brand md:grid-cols-[1.2fr_1fr]"
    >
      <div className="p-8 md:p-10">
        <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-brand">
          {post.category}
        </span>
        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-muted">{post.excerpt}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 border-b border-ink text-[14px] font-semibold text-ink">
          Read →
        </span>
      </div>
      {post.coverImage ? (
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image
            src={urlForImage(post.coverImage as SanityImage).width(1200).url()}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="grid place-items-center bg-ink-2 p-10 text-white/40">
          <span className="font-mono text-[10px] tracking-[0.14em]">FEATURED · 4:3</span>
        </div>
      )}
    </Link>
  );
}

function ArticleCard({ post }: { post: PostCard }) {
  return (
    <li>
      <Link
        href={`/insights/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition hover:border-brand"
      >
        {post.coverImage ? (
          <div className="relative aspect-[16/9]">
            <Image
              src={urlForImage(post.coverImage as SanityImage).width(800).url()}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-tint" />
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
            {post.category}
          </div>
          <h3 className="mt-2 text-[17px] font-bold tracking-tight text-ink">{post.title}</h3>
          {post.excerpt && (
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{post.excerpt}</p>
          )}
          <div className="mt-auto pt-4 font-mono text-[10.5px] text-muted-2">
            {post.author?.name ?? 'IRSL'} · {formatDate(post.publishedAt)}
            {post.readingTimeMinutes ? ` · ${post.readingTimeMinutes} min` : ''}
          </div>
        </div>
      </Link>
    </li>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NG', { year: 'numeric', month: 'short' });
}
