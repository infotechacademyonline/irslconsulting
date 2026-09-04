import { defineField, defineType } from 'sanity';

export const openRoleType = defineType({
  name: 'openRole',
  title: 'Open role',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: ['Associate', 'Consultant', 'Senior', 'Principal', 'Managing'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'applyEmail', title: 'Apply-to email', type: 'string' }),
    defineField({ name: 'openedAt', title: 'Opened at', type: 'datetime' }),
    defineField({ name: 'closedAt', title: 'Closed at', type: 'datetime' }),
  ],
});
