import { urlFor } from './sanity';

// Sanity images arrive as objects ({ asset: {...} }); mock/preview data
// uses plain URL strings. This lets every component call one function
// regardless of which source the image came from.
export function resolveImage(source, width) {
  if (!source) return null;
  if (typeof source === 'string') return source;
  try {
    const builder = urlFor(source);
    return width ? builder.width(width).url() : builder.url();
  } catch (err) {
    return null;
  }
}
