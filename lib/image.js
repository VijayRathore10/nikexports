import { urlFor } from './sanity';

// Sanity images arrive as objects ({ asset: {...} }); mock/preview data
// uses plain URL strings. This lets every component call one function
// regardless of which source the image came from.
export function resolveImage(source, width) {
  if (!source) return 'https://picsum.photos/seed/placeholder/800/600';
  if (typeof source === 'string') {
    if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('/')) {
      return source;
    }
  }
  try {
    const builder = urlFor(source);
    if (!builder) return 'https://picsum.photos/seed/placeholder/800/600';
    return width ? builder.width(width).auto('format').fit('max').url() : builder.auto('format').url();
  } catch (err) {
    console.error('Image resolution error:', err?.message || err);
    return typeof source === 'string' ? source : 'https://picsum.photos/seed/placeholder/800/600';
  }
}

