'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { resolveImage } from '@/lib/image';

export default function TestimonialCarousel({ testimonials }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * trackRef.current.clientWidth * 0.9, behavior: 'smooth' });
  };

  if (!testimonials?.length) return null;

  return (
    <section className="bg-freight text-paper py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous testimonials"
              className="w-10 h-10 border border-paper/30 hover:bg-amber hover:text-steel hover:border-amber transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next testimonials"
              className="w-10 h-10 border border-paper/30 hover:bg-amber hover:text-steel hover:border-amber transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <article
              key={t._id}
              className="snap-start shrink-0 w-full sm:w-[520px] bg-paper text-steel grid grid-cols-2"
            >
              <div className="relative min-h-[220px]">
                {t.photos?.[0] && (
                  <Image src={resolveImage(t.photos[0], 400)} alt={t.customerName} fill className="object-cover" />
                )}
              </div>
              <div className="p-6 flex flex-col justify-center">
                <p className="text-sm leading-relaxed mb-4 text-graphite">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-display font-semibold">{t.customerName}</p>
                {t.customerDetail && (
                  <p className="mono-label text-[11px] uppercase text-amber-dark">{t.customerDetail}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
