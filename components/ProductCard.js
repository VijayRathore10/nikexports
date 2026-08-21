import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/lib/image';

export default function ProductCard({ product }) {
  const highlights = (product.highlights || []).filter(Boolean).slice(0, 4);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white border border-line hover:border-freight transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-steel/5">
        <Image
          src={resolveImage(product.cardImage, 600)}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <p className="font-display text-lg font-semibold leading-tight mb-2 group-hover:text-freight transition-colors">
          {product.name}
        </p>
        {highlights.length > 0 && (
          <ul className="mono-label text-[11px] text-graphite grid grid-cols-2 gap-x-2 gap-y-1 uppercase">
            {highlights.map((h, i) => (
              <li key={i} className="truncate border-l-2 border-amber pl-2">
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
