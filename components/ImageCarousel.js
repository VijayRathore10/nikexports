'use client';

import { useState } from 'react';
import Image from 'next/image';
import { resolveImage } from '@/lib/image';

export default function ImageCarousel({ images = [], alt }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/3] bg-steel/5 border border-line overflow-hidden">
        <Image
          src={resolveImage(images[index], 900)}
          alt={`${alt} — image ${index + 1}`}
          fill
          className="object-cover"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-paper/90 hover:bg-amber text-steel transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-paper/90 hover:bg-amber text-steel transition-colors"
            >
              →
            </button>
            <span className="absolute bottom-3 right-3 mono-label text-[11px] bg-steel/80 text-paper px-2 py-1">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className="relative aspect-square overflow-hidden border-2 transition-colors"
              style={{ borderColor: i === index ? '#E8A23D' : 'transparent' }}
            >
              <Image src={resolveImage(img, 150)} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
