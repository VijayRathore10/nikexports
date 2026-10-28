import { defineField, defineType } from 'sanity';
import { SpecificationsGridInput } from '../components/SpecificationsGridInput';

export const product = defineType({
  name: 'product',
  title: 'Vehicles & Equipment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vehicle / Machine Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL identifier)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Primary Thumbnail / Card Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Vehicle Photo Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights (Badges)',
      description: 'Quick tags displayed on cards, e.g. "Year: 2023", "Engine: 410 HP", "Certified"',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Detailed Specifications (2 Columns, Max 20 Rows)',
      description: 'Add or copy-paste up to 20 specification rows directly from Excel or Google Sheets. Any blank rows are automatically excluded on the website.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specification',
          title: 'Specification Row',
          fields: [
            { name: 'label', type: 'string', title: 'Specification Label' },
            { name: 'value', type: 'string', title: 'Value / Details' },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      components: {
        input: SpecificationsGridInput,
      },
    }),
    defineField({
      name: 'description',
      title: 'Overview & Inspection Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ready for Export', value: 'Ready for Export' },
          { title: 'In Stock', value: 'In Stock' },
          { title: 'Certified Used', value: 'Certified Used' },
          { title: 'Low Hours / Inspected', value: 'Low Hours / Inspected' },
          { title: 'Reserved', value: 'Reserved' },
        ],
      },
      initialValue: 'Ready for Export',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      media: 'cardImage',
    },
  },
});
