'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { ArrowRight, PhoneCall } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // scrollProgress ranges from 0 (at top of page) to 1 (at or past 50% scroll threshold)
  const [scrollProgress, setScrollProgress] = useState(isHomePage ? 0 : 1);
  const [isPast50Percent, setIsPast50Percent] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      const heroElement = document.getElementById('hero-section');
      const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight * 0.75;
      const scrollY = window.scrollY;

      // 50% of hero height threshold
      const halfHero = heroHeight * 0.5;

      // Calculate smooth gradient progress between 0 and 1
      const progress = Math.min(Math.max(scrollY / halfHero, 0), 1);
      setScrollProgress(progress);

      // Transition to colored logo and white navbar at 50% or more scroll
      setIsPast50Percent(scrollY >= halfHero);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHomePage]);

  const isWhiteNav = !isHomePage || isPast50Percent;
  const isTransparent = isHomePage && scrollProgress === 0;

  // Compute dynamic inline style for smooth gradient transition while scrolling
  const getHeaderStyle = () => {
    if (!isHomePage || isWhiteNav) {
      return {};
    }
    if (isTransparent) {
      return {
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderColor: 'transparent',
        boxShadow: 'none',
      };
    }
    // Gaining gradient as user scrolls slowly towards 50%
    const opacity = scrollProgress;
    return {
      background: `linear-gradient(180deg, rgba(19, 34, 56, ${0.85 * opacity}) 0%, rgba(19, 34, 56, ${0.45 * opacity}) 70%, rgba(255, 255, 255, ${0.15 * opacity}) 100%)`,
      backdropFilter: `blur(${Math.round(8 * opacity)}px)`,
      WebkitBackdropFilter: `blur(${Math.round(8 * opacity)}px)`,
      borderBottom: `1px solid rgba(255, 255, 255, ${0.15 * opacity})`,
      boxShadow: `0 4px 20px -2px rgba(0, 0, 0, ${0.15 * opacity})`,
    };
  };

  return (
    <header
      style={getHeaderStyle()}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isWhiteNav
          ? 'bg-white/80 backdrop-blur-md text-steel shadow-sm border-b border-gray-200/50 py-1'
          : isTransparent
          ? 'bg-transparent text-white border-b border-transparent py-1.5'
          : 'py-1 text-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo: White when transparent or <50% scroll; Colored when >=50% scroll */}
        <Link
          href="/"
          className="inline-flex items-center transition-transform duration-200 hover:scale-102"
          aria-label="SSG MOTORS Home"
        >
          <Logo
            isWhite={!isWhiteNav}
            className="h-14 md:h-16 w-auto"
          />
        </Link>

        {/* Action Button: "Request a Quote" */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`mono-label text-xs uppercase font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-sm transition-all duration-200 tracking-wider flex items-center gap-2 group cursor-pointer ${
              isWhiteNav
                ? 'bg-[#B69255] hover:bg-[#9E7A3F] text-white shadow-md hover:shadow-lg'
                : 'bg-white/15 backdrop-blur-md text-white border border-white/40 hover:bg-[#B69255] hover:border-[#B69255] hover:text-white shadow-lg'
            }`}
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
