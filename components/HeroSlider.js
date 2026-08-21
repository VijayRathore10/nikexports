'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { resolveImage } from '@/lib/image';

export default function HeroSlider({ images, tagline }) {
  const [index, setIndex] = useState(0);
  const slides = images && images.length ? images : [];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative bg-steel">
      <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        {slides.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={resolveImage(src, 1600)}
              alt=""
              fill
              priority={i === 0}
              className="object-cover opacity-70"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-steel via-steel/30 to-transparent" />

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? '28px' : '10px',
                backgroundColor: i === index ? '#E8A23D' : 'rgba(243,241,234,0.4)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Manifest-style panel */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 -mt-24 relative z-10 pb-14">
        <div className="bg-paper text-steel border border-line max-w-xl p-7 md:p-9 shadow-xl">
          <p className="mono-label text-xs uppercase text-freight mb-2">Export Catalog — All Categories</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-4">
            Commercial Vehicles &amp; Equipment, Ready for Export
          </h1>
          <p className="text-graphite text-sm md:text-base leading-relaxed">
            {tagline || 'Trucks, buses, agricultural machinery and special application vehicles, inspected and shipped worldwide.'}
          </p>
        </div>
      </div>
    </section>
  );
}
