import Link from 'next/link';
import Image from 'next/image';
import { resolveImage } from '@/lib/image';

export default function ProductCard({ product }) {
  const highlights = (product.highlights || []).filter(Boolean).slice(0, 4);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col bg-white border border-line hover:border-amber hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel/5">
        <Image
          src={resolveImage(product.cardImage, 600)}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 right-2.5">
          <span className="mono-label text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-steel/80 backdrop-blur-sm text-paper border border-white/10">
            Export Ready
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <p className="font-display text-lg font-bold leading-tight mb-3 text-steel group-hover:text-freight transition-colors">
            {product.name}
          </p>

          {highlights.length > 0 && (
            <ul className="mono-label text-[11px] text-graphite grid grid-cols-2 gap-x-2 gap-y-1.5 uppercase mb-4">
              {highlights.map((h, i) => (
                <li key={i} className="truncate border-l-2 border-amber pl-1.5 text-steel/80">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-3 border-t border-line/60 flex items-center justify-between mono-label text-xs">
          <span className="text-freight font-semibold group-hover:text-amber-dark transition-colors">
            View Details →
          </span>
          <span className="text-[11px] text-graphite uppercase">
            Inquire Now
          </span>
        </div>
      </div>
    </Link>
  );
}

