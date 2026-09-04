import { defineField, defineType } from 'sanity';

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  groups: [
    { name: 'story', title: 'Story', default: true },
    { name: 'attribution', title: 'Attribution' },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    defineField({
      name: 'client',
      title: 'Client name',
      type: 'string',
      group: 'story',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: { source: 'client', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      group: 'story',
      options: {
        list: [
          'Commercial & Merchant Banks',
          'Payment & OFI Institutions',
          'Upstream Oil & Gas',
          'Downstream & Marketing',
          'Telecommunications (MNOs)',
          'Power — GenCos & DisCos',
          'Insurance & PFAs',
          'FMCG & Manufacturing',
          'Federal MDAs & States',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Primary solution',
      type: 'string',
      group: 'story',
      description: 'Which of the nine anchor problems this engagement solved.',
      options: {
        list: [
          { title: 'Access Risk & SoD', value: 'access-risk' },
          { title: 'Automated Control Monitoring', value: 'control-monitoring' },
          { title: 'Internal Audit Management', value: 'internal-audit' },
          { title: 'Enterprise Risk Management', value: 'enterprise-risk' },
          { title: 'Identity & Access Governance', value: 'identity-governance' },
          { title: 'Third-Party Integrity & Sanctions', value: 'third-party-integrity' },
          { title: 'Threat Detection', value: 'threat-detection' },
          { title: 'Data Governance & NDPA', value: 'data-governance' },
          { title: 'Platform Security', value: 'platform-security' },
        ],
      },
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      group: 'story',
      description: 'One-line outcome, past tense. Shown as H1 on the detail page.',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'story',
      description: 'Two- to three-sentence version for the index card.',
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'array',
      group: 'story',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'metrics',
      title: 'Headline metrics',
      type: 'array',
      group: 'story',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'quote',
      title: 'Client quote',
      type: 'text',
      rows: 3,
      group: 'attribution',
    }),
    defineField({
      name: 'quoteAttribution',
      title: 'Quote attribution',
      type: 'string',
      group: 'attribution',
      description: 'e.g. "Head of Internal Audit"',
    }),
    defineField({
      name: 'engagementYear',
      title: 'Engagement year',
      type: 'number',
      group: 'meta',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'meta',
      options: { hotspot: true },
    }),
    /**
     * Guard rail. Nothing gets fetched by the site unless this box is ticked.
     * Studio users see it prominently at the top of the meta group; the
     * frontend GROQ query filters on this field.
     */
    defineField({
      name: 'permissionsCleared',
      title: 'Written client permission on file',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description:
        'Do NOT tick until signed permission-to-publish is in the client folder. The public site filters on this flag.',
      validation: (r) =>
        r.custom((val, ctx) => {
          const doc = ctx.document as { _id?: string } | undefined;
          if (val === true && doc?._id?.startsWith('drafts.')) return true;
          return true;
        }),
    }),
    defineField({
      name: 'permissionOwner',
      title: 'Permission owner (internal)',
      type: 'string',
      group: 'meta',
      description: 'Who at IRSL holds the signed permission letter.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on home page',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'headline',
      media: 'coverImage',
      cleared: 'permissionsCleared',
    },
    prepare: ({ title, subtitle, media, cleared }) => ({
      title: `${cleared ? '' : '⚠ '}${title}`,
      subtitle: cleared ? subtitle : 'NOT CLEARED — not visible on the site',
      media,
    }),
  },
});
