'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles,
  Ship,
  Truck
} from 'lucide-react';
import { resolveImage } from '@/lib/image';

const DEFAULT_16_10_SLIDES = [
  {
    id: 1,
    url: 'https://picsum.photos/seed/ssg-heavy-haulage-1610/1920/1200',
    title: 'COMMERCIAL VEHICLES & FLEET EXPORT',
    subtitle: 'Prime movers, multi-axle cargo haulers, and heavy tippers certified for immediate worldwide port dispatch.',
    category: 'Commercial Trucks',
    badge: 'Worldwide Seaport Shipping',
  },
  {
    id: 2,
    url: 'https://picsum.photos/seed/ssg-machinery-1610/1920/1200',
    title: 'EARTHMOVING & HEAVY MACHINERY',
    subtitle: 'High-performance hydraulic excavators, wheel loaders, and road equipment inspected to international standards.',
    category: 'Construction Equipment',
    badge: '100% Pre-Shipment Tested',
  },
  {
    id: 3,
    url: 'https://picsum.photos/seed/ssg-transit-1610/1920/1200',
    title: 'PASSENGER BUSES & STAFF COACHES',
    subtitle: 'Transit fleets, intercity luxury coaches, and airport shuttles built for demanding climate and terrain.',
    category: 'Passenger Transit',
    badge: 'Certified Fleet Grade',
  },
  {
    id: 4,
    url: 'https://picsum.photos/seed/ssg-agricultural-1610/1920/1200',
    title: 'AGRICULTURAL TRACTORS & IMPLEMENTS',
    subtitle: 'Modern 4WD tractors from 45HP to 110HP with complete implement packages for large-scale farming.',
    category: 'Agricultural Machinery',
    badge: 'Turnkey Export Solutions',
  },
];

export default function HeroSlider({ images, tagline }) {
  const [slides, setSlides] = useState(() => {
    if (images && images.length > 0) {
      return images.map((img, idx) => ({
        id: idx + 1,
        url: resolveImage(img, 1920),
        title: DEFAULT_16_10_SLIDES[idx % DEFAULT_16_10_SLIDES.length].title,
        subtitle: tagline || DEFAULT_16_10_SLIDES[idx % DEFAULT_16_10_SLIDES.length].subtitle,
        category: DEFAULT_16_10_SLIDES[idx % DEFAULT_16_10_SLIDES.length].category,
        badge: DEFAULT_16_10_SLIDES[idx % DEFAULT_16_10_SLIDES.length].badge,
      }));
    }
    return DEFAULT_16_10_SLIDES;
  });

  const [index, setIndex] = useState(0);
  const [seedCount, setSeedCount] = useState(1);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = setInterval(next, 6500);
    return () => clearInterval(interval);
  }, [next, slides.length]);

  // Shuffle & Generate new random 16:10 images on demand
  const handleGenerateRandomImages = () => {
    const newSeed = Date.now();
    setSeedCount((c) => c + 1);
    const randomized = [
      {
        id: 1,
        url: `https://picsum.photos/seed/truck_1610_${newSeed}/1920/1200`,
        title: 'COMMERCIAL VEHICLES & FLEET EXPORT',
        subtitle: '16:10 High-Definition Fleet Showcase (1920 × 1200px) — Heavy duty commercial haulage.',
        category: 'Commercial Trucks',
        badge: '16:10 Aspect Ratio',
      },
      {
        id: 2,
        url: `https://picsum.photos/seed/machinery_1610_${newSeed}/1920/1200`,
        title: 'EARTHMOVING & HEAVY MACHINERY',
        subtitle: '16:10 High-Definition Fleet Showcase (1920 × 1200px) — Construction and mining machinery.',
        category: 'Heavy Equipment',
        badge: '16:10 Aspect Ratio',
      },
      {
        id: 3,
        url: `https://picsum.photos/seed/bus_1610_${newSeed}/1920/1200`,
        title: 'PASSENGER BUSES & STAFF COACHES',
        subtitle: '16:10 High-Definition Fleet Showcase (1920 × 1200px) — Transit and luxury coaches.',
        category: 'Passenger Transit',
        badge: '16:10 Aspect Ratio',
      },
      {
        id: 4,
        url: `https://picsum.photos/seed/agri_1610_${newSeed}/1920/1200`,
        title: 'AGRICULTURAL TRACTORS & IMPLEMENTS',
        subtitle: '16:10 High-Definition Fleet Showcase (1920 × 1200px) — 4WD farm tractors and implements.',
        category: 'Agriculture',
        badge: '16:10 Aspect Ratio',
      },
    ];
    setSlides(randomized);
    setIndex(0);
  };

  const currentSlide = slides[index] || slides[0];

  return (
    <section
      id="hero-section"
      className="relative w-full aspect-[16/10] min-h-[520px] max-h-[88vh] overflow-hidden bg-[#0e1724] select-none"
    >
      {/* 16:10 Aspect Ratio Photography Slides */}
      {slides.map((slide, i) => (
        <div
          key={`${slide.id}-${i}-${seedCount}`}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.url}
            alt={slide.title}
            fill
            priority={i === 0}
            className="object-cover object-center transform scale-102 transition-transform duration-10000 ease-out"
            sizes="100vw"
          />

          {/* Luxury Gradient Overlays: Navy and Gold undertones */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1827]/90 via-[#0d1827]/60 to-[#0d1827]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1827]/95 via-transparent to-[#0d1827]/40" />
        </div>
      ))}

      {/* 16:10 Badge & Random Image Generator Trigger (Top Right) */}
      <div className="absolute top-20 md:top-24 right-5 md:right-8 z-20 flex items-center gap-2.5 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#B69255] animate-pulse" />
        <span className="mono-label text-[11px] uppercase tracking-wider text-white/90">
          16:10 Ratio View
        </span>
        <button
          onClick={handleGenerateRandomImages}
          title="Click to generate fresh random 16:10 images"
          className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 bg-[#B69255] hover:bg-[#A07E44] text-white font-bold text-[10px] uppercase rounded-full transition-all shadow-sm cursor-pointer mono-label"
        >
          <Sparkles className="w-3 h-3" />
          <span>New 16:10</span>
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl h-full px-5 md:px-8 flex flex-col justify-center pt-20 md:pt-24 pb-12">
        <div className="max-w-3xl">
          {/* Top Pill / Badge with Gold Accents */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#B69255]/90 backdrop-blur-md text-white font-bold mono-label text-xs uppercase tracking-widest rounded-sm mb-4 md:mb-5 shadow-lg border border-white/20">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{currentSlide?.badge || 'SSG MOTORS GLOBAL EXPORT'}</span>
          </div>

          {/* Main Headline with Gold Highlights */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.02] drop-shadow-xl">
            {currentSlide?.title?.split('&')[0]}{' '}
            {currentSlide?.title?.includes('&') && (
              <span className="text-[#D5B57A] drop-shadow">
                &amp; {currentSlide?.title?.split('&').slice(1).join('&')}
              </span>
            )}
          </h1>

          {/* Subtitle Description */}
          <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl text-[#F3F1EA]/95 font-light leading-relaxed max-w-2xl drop-shadow-md">
            {currentSlide?.subtitle ||
              tagline ||
              'Supplying commercial trucks, passenger buses, agricultural machinery, and heavy equipment to over 100+ countries.'}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="mono-label text-xs uppercase bg-[#B69255] hover:bg-[#9E7A3F] text-white font-bold px-7 py-3.5 rounded-sm transition-all duration-200 shadow-xl tracking-wider flex items-center gap-2 group cursor-pointer border border-[#D5B57A]/40"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href="#catalog"
              className="mono-label text-xs uppercase bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold px-7 py-3.5 rounded-sm transition-all duration-200 tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Fleet Catalog</span>
            </a>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/40 hover:bg-[#B69255] hover:border-[#B69255] text-white border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer hidden md:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/40 hover:bg-[#B69255] hover:border-[#B69255] text-white border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer hidden md:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Slider Indicators with Slide Numbers */}
      <div className="absolute bottom-6 md:bottom-8 right-5 md:right-8 z-20 flex items-center gap-3 bg-[#0d1827]/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-xl">
        <span className="mono-label text-xs font-bold text-[#D5B57A]">
          0{index + 1}
        </span>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === index ? '26px' : '6px',
                backgroundColor: i === index ? '#B69255' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
        <span className="mono-label text-xs text-white/50">
          0{slides.length}
        </span>
      </div>

      {/* Bottom Trust Strip Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-15 hidden lg:block bg-gradient-to-t from-black/80 to-transparent py-3">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between text-white/80 text-xs mono-label uppercase">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#D5B57A]" />
            <span>100+ Global Ports</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D5B57A]" />
            <span>Verified Pre-Shipment Inspection</span>
          </div>
          <div className="flex items-center gap-2">
            <Ship className="w-4 h-4 text-[#D5B57A]" />
            <span>Direct Ro-Ro &amp; Container Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#D5B57A]" />
            <span>Multi-Brand Commercial Fleet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
