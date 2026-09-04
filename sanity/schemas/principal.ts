import { defineField, defineType } from 'sanity';

export const principalType = defineType({
  name: 'principal',
  title: 'Principal',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'focusAreas',
      title: 'Focus areas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 5 }),
    defineField({
      name: 'portrait',
      title: 'Portrait (4:5)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'linkedIn', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  orderings: [
    { title: 'Manual order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'portrait' },
  },
});
