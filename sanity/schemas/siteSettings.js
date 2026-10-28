import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings & Branding',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Slider Background Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Registered Office Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutText',
      title: 'About Company Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'whatsapp', type: 'string', title: 'WhatsApp Link' },
        { name: 'facebook', type: 'string', title: 'Facebook Page' },
        { name: 'instagram', type: 'string', title: 'Instagram Profile' },
        { name: 'linkedin', type: 'string', title: 'LinkedIn Profile' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
      media: 'heroImages.0',
    },
  },
});
