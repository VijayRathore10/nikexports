import ImageCarousel from '@/components/ImageCarousel';
import InquiryForm from '@/components/InquiryForm';
import { getProductBySlug, getProducts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}


export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.name) return notFound();

  const specs = product.specifications || [];
  const highlights = (product.highlights || []).filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 pt-28 pb-16">
      <nav className="mono-label text-[11px] uppercase text-graphite mb-6">
        <Link href="/" className="hover:text-freight">Home</Link>
        {' / '}
        <Link href={`/category/${product.category?.slug}`} className="hover:text-freight">
          {product.category?.title}
        </Link>
        {' / '}
        <span className="text-steel">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <ImageCarousel images={product.gallery} alt={product.name} />
        </div>

        <div className="lg:col-span-2">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight">
            {product.name}
          </h1>

          {highlights.length > 0 && (
            <div className="rivet-plate p-4 mb-6 grid grid-cols-2 gap-x-4 gap-y-2 mono-label text-[11px] uppercase text-graphite">
              {highlights.map((h, i) => (
                <span key={i}>{h}</span>
              ))}
            </div>
          )}

          {product.description && (
            <p className="text-sm leading-relaxed text-steel/90 mb-6">{product.description}</p>
          )}

          {specs.length > 0 && (
            <div className="mb-8">
              <p className="mono-label text-xs uppercase text-amber-dark mb-2">Specifications</p>
              <table className="w-full text-sm border-t border-line">
                <tbody>
                  {specs.map((s, i) => (
                    <tr key={i} className="border-b border-line">
                      <td className="py-2 pr-4 text-graphite w-2/5">{s.label}</td>
                      <td className="py-2 font-medium">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <InquiryForm productName={product.name} />
        </div>
      </div>
    </section>
  );
}
