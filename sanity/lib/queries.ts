/**
 * GROQ queries. Named so we can share types across list + detail pages and
 * keep the shape single-sourced. Fields intentionally minimal — expand only
 * when a page actually needs the data.
 */

export const POSTS_QUERY = /* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...50] {
    _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    "author": author->{ name, "slug": slug.current },
    coverImage,
    publishedAt,
    readingTimeMinutes
  }
`;

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    category,
    excerpt,
    "author": author->{ name, title, portrait, "slug": slug.current },
    coverImage,
    publishedAt,
    readingTimeMinutes,
    body
  }
`;

export const PRINCIPALS_QUERY = /* groq */ `
  *[_type == "principal"] | order(coalesce(order, 999) asc){
    _id,
    name,
    "slug": slug.current,
    title,
    focusAreas,
    bio,
    portrait,
    linkedIn
  }
`;

export const OPEN_ROLES_QUERY = /* groq */ `
  *[_type == "openRole" && (!defined(closedAt) || dateTime(closedAt) > now())]
  | order(coalesce(openedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    level,
    location,
    applyEmail
  }
`;

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  author?: { name: string; slug: string };
  coverImage?: unknown;
  publishedAt: string;
  readingTimeMinutes?: number;
}
