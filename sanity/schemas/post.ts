import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Insights post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Access & Identity',
          'Controls & Audit',
          'Enterprise Risk',
          'Third-Party',
          'NDPA',
          'CBN',
          'ESG',
          'Careers',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'principal' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Reading time (minutes)',
      type: 'number',
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternative text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'coverImage' },
    prepare: ({ title, author, media }) => ({ title, subtitle: author, media }),
  },
});
