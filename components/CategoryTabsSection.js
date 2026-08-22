'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

export default function CategoryTabsSection({ categories = [], products = [] }) {
  const [activeSlug, setActiveSlug] = useState(
    categories.length > 0 ? categories[0].slug : 'trucks'
  );

  const activeCategory = categories.find((c) => c.slug === activeSlug) || categories[0];
  const filteredProducts = products.filter((p) => p.category?.slug === activeSlug);

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-5 md:px-8 py-16 scroll-mt-20">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-line gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-dark mono-label text-xs uppercase font-bold tracking-wider mb-2">
            <span>■</span> Vehicle &amp; Machinery Inventory
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-steel">
            Export Categories
          </h2>
        </div>
        <p className="text-sm text-graphite max-w-md">
          Select a category below to explore verified vehicles and equipment available for worldwide export.
        </p>
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
                onClick={() => setActiveSlug(cat.slug)}
                className={`flex items-center justify-between px-4 py-3.5 rounded transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? 'bg-steel text-white shadow-md border-b-2 border-amber ring-1 ring-steel'
                    : 'bg-white/80 hover:bg-white text-steel/80 hover:text-steel border border-line/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`mono-label text-[11px] font-mono font-bold ${
                      isActive ? 'text-amber' : 'text-graphite'
                    }`}
                  >
                    {num}
                  </span>
                  <span className="font-display text-base md:text-lg font-bold tracking-wide uppercase">
                    {cat.title}
                  </span>
                </div>

                <span
                  className={`mono-label text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-amber text-steel font-bold'
                      : 'bg-line/60 text-graphite'
                  }`}
                >
                  {count} {count === 1 ? 'Item' : 'Items'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Status Banner */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-steel uppercase">
            {activeCategory?.title || 'Selected'} Units
          </h3>
          <span className="mono-label text-xs text-graphite uppercase">
            Showing {filteredProducts.length} available
          </span>
        </div>

        {activeCategory?.slug && (
          <Link
            href={`/category/${activeCategory.slug}`}
            className="mono-label text-xs uppercase font-bold text-freight hover:text-amber-dark flex items-center gap-1.5 transition-colors group"
          >
            <span>View Full {activeCategory.title} Catalog</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}
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
