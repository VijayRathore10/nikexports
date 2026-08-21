import Link from 'next/link';
import { getCategories } from '@/lib/data';

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 bg-steel text-paper border-b border-black/20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-display text-2xl font-bold tracking-wide">
          NIK <span className="text-amber">EXPORTS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 mono-label text-xs uppercase text-paper/80">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="hover:text-amber transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="mono-label text-xs uppercase bg-amber text-steel px-4 py-2 hover:bg-amber-dark transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}
