'use client';

import { useState } from 'react';
import Image from 'next/image';
import { resolveImage } from '@/lib/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

function TestimonialImageCarousel({ photos, customerName }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Maximum 4 pictures
  const displayPhotos = (photos && photos.length > 0 ? photos : ['https://picsum.photos/seed/customer/800/800']).slice(0, 4);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev === 0 ? displayPhotos.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev === displayPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] bg-steel/10 overflow-hidden flex flex-col justify-between group">
      {/* Active Photo */}
      <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]">
        <Image
          src={resolveImage(displayPhotos[photoIndex], 1000)}
          alt={`${customerName || 'Customer'} - photo ${photoIndex + 1}`}
          fill
          referrerPolicy="no-referrer"
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Prev / Next controls for photo carousel */}
      {displayPhotos.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
            <button
              onClick={prevPhoto}
              aria-label="Previous customer photo"
              className="pointer-events-auto w-9 h-9 rounded-full bg-steel/70 hover:bg-amber text-white hover:text-steel flex items-center justify-center backdrop-blur-sm transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <button
              onClick={nextPhoto}
              aria-label="Next customer photo"
              className="pointer-events-auto w-9 h-9 rounded-full bg-steel/70 hover:bg-amber text-white hover:text-steel flex items-center justify-center backdrop-blur-sm transition-all shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator for images */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10">
            {displayPhotos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIndex(i);
                }}
                aria-label={`View photo ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === photoIndex ? 'w-6 bg-amber' : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Picture Count Pill */}
      {displayPhotos.length > 1 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="mono-label text-[11px] uppercase font-bold tracking-wider px-3 py-1 bg-steel/80 backdrop-blur-sm text-paper border border-white/10 rounded-md">
            {photoIndex + 1} / {displayPhotos.length} Photos
          </span>
        </div>
      )}
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials?.length) return null;

  const total = testimonials.length;
  const current = testimonials[currentIndex];

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-freight text-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-paper/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber mono-label text-xs uppercase font-bold tracking-wider mb-2">
              <span>■</span> Global Client Trust
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
              What Our Customers Say
            </h2>
          </div>

          {/* Testimonial Nav Arrows and Counter */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="mono-label text-sm text-paper/70 font-semibold mr-2">
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-lg border border-paper/30 hover:bg-amber hover:text-steel hover:border-amber flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-lg border border-paper/30 hover:bg-amber hover:text-steel hover:border-amber flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Single Full-Width Testimonial Card */}
        <article className="w-full bg-paper text-steel rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[480px] border border-line">
          {/* Left Column: Image Carousel (up to 4 pictures - widened for 4:3 ratio without height loss) */}
          <div className="lg:col-span-6 xl:col-span-6 h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px]">
            <TestimonialImageCarousel
              key={`carousel-${current._id || currentIndex}`}
              photos={current.photos}
              customerName={current.customerName}
            />
          </div>

          {/* Right Column: Text & Quote */}
          <div className="lg:col-span-6 xl:col-span-6 p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between bg-paper">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber/15 text-amber-dark flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 fill-amber/30" />
              </div>

              <blockquote className="font-sans text-xl sm:text-2xl md:text-3xl text-steel leading-relaxed font-medium mb-8">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-line/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-bold text-steel">
                  {current.customerName}
                </p>
                {current.customerDetail && (
                  <p className="mono-label text-xs uppercase font-semibold text-amber-dark tracking-wider mt-1">
                    {current.customerDetail}
                  </p>
                )}
              </div>

              {/* Verified Export Badge */}
              <div className="flex items-center gap-2 bg-steel/5 px-3.5 py-1.5 rounded-lg border border-steel/10 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="mono-label text-[11px] uppercase font-bold text-steel tracking-wide">
                  Verified Client
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
