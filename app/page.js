import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import CategoryTabsSection from '@/components/CategoryTabsSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { getCategories, getProducts, getTestimonials, getSiteSettings } from '@/lib/data';
import { ArrowRight, ShieldCheck, Globe2, Ship, Clock } from 'lucide-react';

export default async function HomePage() {
  const [categories, products, testimonials, settings] = await Promise.all([
    getCategories(),
    getProducts(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      {/* 16:10 Hero Slider Section with Transparent Navbar Overlay */}
      <HeroSlider images={settings?.heroImages} tagline={settings?.tagline} />

      {/* Category Tabs & Filtered Product Showcase */}
      <CategoryTabsSection categories={categories} products={products} />

      {/* Trust & Global Export Highlights Banner */}
      <section className="bg-[#102035] text-white py-12 border-y border-[#B69255]/30">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#B69255]/20 rounded text-[#D5B57A] border border-[#B69255]/40">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                100+ Ports
              </p>
              <p className="text-xs text-white/70 mono-label uppercase mt-0.5">
                Worldwide Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#B69255]/20 rounded text-[#D5B57A] border border-[#B69255]/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Certified
              </p>
              <p className="text-xs text-white/70 mono-label uppercase mt-0.5">
                Pre-Shipment QA
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#B69255]/20 rounded text-[#D5B57A] border border-[#B69255]/40">
              <Ship className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                FOB &amp; CIF
              </p>
              <p className="text-xs text-white/70 mono-label uppercase mt-0.5">
                Customs Cleared
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-[#B69255]/20 rounded text-[#D5B57A] border border-[#B69255]/40">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Fast Turnaround
              </p>
              <p className="text-xs text-white/70 mono-label uppercase mt-0.5">
                24h Quotation Desk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trust & Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      {/* About SSG Motors & Direct Export Inquiries */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B69255]/15 text-[#8E6F3A] mono-label text-xs uppercase font-bold tracking-widest mb-3 rounded">
            <span>●</span> About SSG Motors
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#102035] mb-4">
            Reliable Automotive &amp; Equipment Exporters
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-steel/90 max-w-2xl font-light">
            {settings?.aboutText ||
              'SSG MOTORS specializes in the export of heavy-duty commercial trucks, passenger transit buses, agricultural tractors, and construction machinery. With verified inspection protocols, secure sea freight logistics, and transparent CIF/FOB pricing, we connect buyers worldwide with top-tier commercial fleets.'}
          </p>
        </div>

        <div className="border border-line bg-white p-7 md:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden rounded-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#B69255]/20 to-transparent pointer-events-none" />
          <div>
            <span className="mono-label text-[11px] uppercase text-[#B69255] font-bold tracking-wider">
              Direct Export Inquiry
            </span>
            <p className="font-display text-2xl md:text-3xl font-bold uppercase mt-1.5 mb-3 text-[#102035]">
              Have a requirement?
            </p>
            <p className="text-sm text-graphite mb-6 leading-relaxed">
              Tell us what you&apos;re looking for — our automotive export team will provide technical specifications, seaport dispatch timelines, and competitive FOB/CIF quotations.
            </p>
          </div>
          <Link
            href="/contact"
            className="mono-label text-xs uppercase font-bold bg-[#B69255] hover:bg-[#9E7A3F] text-white px-6 py-3.5 text-center transition-all tracking-wider flex items-center justify-center gap-2 shadow-md rounded-sm group"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
