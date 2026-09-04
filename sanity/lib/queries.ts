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

/**
 * Case studies are ONLY returned when `permissionsCleared == true`. The
 * schema also warns editors; this second layer of defence keeps
 * unpublished stories off the site even if a schema check is bypassed.
 */
export const CASE_STUDIES_QUERY = /* groq */ `
  *[_type == "caseStudy" && permissionsCleared == true]
  | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
    _id,
    client,
    "slug": slug.current,
    sector,
    solution,
    headline,
    summary,
    metrics,
    coverImage,
    engagementYear,
    featured,
    publishedAt
  }
`;

export const FEATURED_CASE_STUDY_QUERY = /* groq */ `
  *[_type == "caseStudy" && permissionsCleared == true && featured == true]
  | order(coalesce(publishedAt, _createdAt) desc) [0]{
    _id,
    client,
    "slug": slug.current,
    sector,
    solution,
    headline,
    summary,
    quote,
    quoteAttribution,
    metrics,
    coverImage
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "caseStudy" && slug.current == $slug && permissionsCleared == true][0]{
    _id,
    client,
    sector,
    solution,
    headline,
    summary,
    challenge,
    approach,
    outcome,
    metrics,
    quote,
    quoteAttribution,
    engagementYear,
    coverImage,
    publishedAt
  }
`;

export interface CaseStudyCard {
  _id: string;
  client: string;
  slug: string;
  sector: string;
  solution?: string;
  headline: string;
  summary: string;
  metrics?: Array<{ value: string; label: string }>;
  coverImage?: unknown;
  engagementYear?: number;
  featured?: boolean;
  publishedAt?: string;
}
