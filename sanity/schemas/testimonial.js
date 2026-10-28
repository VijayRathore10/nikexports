import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Client Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer / Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerDetail',
      title: 'Customer Detail / Country (e.g. Fleet Owner, Oman)',
      type: 'string',
    }),
    defineField({
      name: 'photos',
      title: 'Customer Delivery Photos (Max 4)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'customerDetail',
      media: 'photos.0',
    },
  },
});
