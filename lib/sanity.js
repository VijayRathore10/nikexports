import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  'a3wpvljs';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'production';

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to ensure immediate fresh data fetching from Sanity
  perspective: 'published',
  token:
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_API_WRITE_TOKEN ||
    undefined,
});

const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source);
}

