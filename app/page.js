import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import CategorySection from '@/components/CategorySection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { getCategories, getProducts, getTestimonials, getSiteSettings } from '@/lib/data';

export default async function HomePage() {
  const [categories, products, testimonials, settings] = await Promise.all([
    getCategories(),
    getProducts(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroSlider images={settings?.heroImages} tagline={settings?.tagline} />

      {/* Category jump nav */}
      <div className="border-b border-line bg-paper sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex gap-6 overflow-x-auto py-3 mono-label text-xs uppercase">
          {categories.map((c) => (
            <a key={c._id} href={`#${c.slug}`} className="whitespace-nowrap text-graphite hover:text-freight">
              {c.title}
            </a>
          ))}
        </div>
      </div>

      {categories.map((category, i) => (
        <CategorySection
          key={category._id}
          category={category}
          index={i}
          products={products.filter((p) => p.category?.slug === category.slug)}
        />
      ))}

      <TestimonialCarousel testimonials={testimonials} />

      {/* About / general section */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <p className="mono-label text-xs uppercase text-amber-dark mb-3">About Nik Exports</p>
          <p className="text-lg md:text-xl leading-relaxed text-steel/90 max-w-2xl">
            {settings?.aboutText}
          </p>
        </div>
        <div className="border border-line p-6 flex flex-col justify-between">
          <p className="font-display text-xl font-semibold mb-3">Have a requirement?</p>
          <p className="text-sm text-graphite mb-5">
            Tell us what you&apos;re looking for — we&apos;ll get back with availability and pricing.
          </p>
          <Link
            href="/contact"
            className="mono-label text-xs uppercase bg-amber text-steel px-5 py-3 text-center hover:bg-amber-dark transition-colors"
          >
            Connect With Us
          </Link>
        </div>
      </section>
    </>
  );
}
