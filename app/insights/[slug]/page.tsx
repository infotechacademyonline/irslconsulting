import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Container } from '@/components/ui/Container';
import { CtaBand } from '@/components/layout/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { articleJsonLd } from '@/lib/jsonld';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { POST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import type { Image as SanityImage, PortableTextBlock } from 'sanity';

interface Post {
  _id: string;
  title: string;
  category: string;
  excerpt?: string;
  author?: { name: string; title: string; portrait?: SanityImage; slug: string };
  coverImage?: SanityImage;
  publishedAt: string;
  readingTimeMinutes?: number;
  body?: PortableTextBlock[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post>(POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.excerpt ? { title: post.title, description: post.excerpt } : undefined,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post>(POST_BY_SLUG_QUERY, { slug });
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          slug,
          ...(post.excerpt ? { excerpt: post.excerpt } : {}),
          ...(post.author?.name ? { authorName: post.author.name } : {}),
          publishedAt: post.publishedAt,
          ...(post.coverImage
            ? { image: urlForImage(post.coverImage).width(1200).url() }
            : {}),
        })}
      />
      <article className="py-16">
        <Container className="max-w-[72ch]">
          <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            {post.category}
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 font-mono text-[11px] text-muted-2">
            {post.author?.name && <>{post.author.name} · </>}
            {new Date(post.publishedAt).toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {post.readingTimeMinutes ? ` · ${post.readingTimeMinutes} min read` : ''}
          </div>

          {post.coverImage && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={urlForImage(post.coverImage).width(1600).url()}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          {post.body && (
            <div className="prose prose-neutral mt-10 max-w-none text-[16.5px] leading-relaxed text-ink-3">
              <PortableText value={post.body} components={components} />
            </div>
          )}
        </Container>
      </article>
      <CtaBand />
    </>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as SanityImage & { alt?: string; caption?: string };
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md">
            <Image
              src={urlForImage(image).width(1200).url()}
              alt={image.alt ?? ''}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-2 text-[13px] text-muted-2">{image.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};
