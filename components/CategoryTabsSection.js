'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

export default function CategoryTabsSection({ categories = [], products = [] }) {
  const [selectedSlug, setSelectedSlug] = useState(null);

  const activeSlug =
    selectedSlug || (categories.length > 0 ? categories[0].slug : 'trucks');

  const activeCategory =
    categories.find(
      (c) => c.slug?.toLowerCase() === activeSlug?.toLowerCase()
    ) || categories[0];

  const filteredProducts = products.filter(
    (p) => p.category?.slug?.toLowerCase() === activeSlug?.toLowerCase()
  );


  return (
    <section id="catalog" className="mx-auto max-w-7xl px-5 md:px-8 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-steel">
            EXPLORE OUR CATALOGUE HERE
          </h2>
        </div>
      </div>

      {/* Horizontal Category Selector Tabs */}
      <div className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 p-1.5 bg-line/30 rounded-lg border border-line">
          {categories.map((cat, idx) => {
            const isActive = cat.slug === activeSlug;
            const count = products.filter((p) => p.category?.slug === cat.slug).length;
            const num = String(idx + 1).padStart(2, '0');

            return (
              <button
                key={cat._id || cat.slug}
                onClick={() => setSelectedSlug(cat.slug)}
                className={`flex items-center justify-center px-4 py-3.5 rounded transition-all duration-200 text-center cursor-pointer ${
                  isActive
                    ? 'bg-steel text-white shadow-md border-b-2 border-amber ring-1 ring-steel'
                    : 'bg-white/80 hover:bg-white text-steel/80 hover:text-steel border border-line/50'
                }`}
              >
                <span className="font-display text-base md:text-lg font-bold tracking-wide uppercase">
                  {cat.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Heading */}
      <div className="mb-6 px-1">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-steel uppercase">
          {activeCategory?.title || 'Selected'} Units
        </h3>
      </div>

      {/* Products Grid - 4 Column Layout */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-line p-12 text-center my-6">
          <p className="text-graphite font-display text-lg mb-2">
            No products listed in this category yet.
          </p>
          <p className="text-sm text-graphite/80 mb-5">
            Contact our export desk for custom sourcing and upcoming inventory.
          </p>
          <Link
            href="/contact"
            className="inline-block mono-label text-xs uppercase bg-amber text-steel px-5 py-2.5 font-bold hover:bg-amber-dark transition-colors"
          >
            Inquire For Availability
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
