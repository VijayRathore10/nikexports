'use client';

import Image from 'next/image';

export default function Logo({ isWhite = false, className = "h-20 md:h-24 w-auto" }) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Colored Logo (User Uploaded logo.png) */}
      <div
        className={`transition-opacity duration-300 ${
          isWhite ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100 relative'
        }`}
      >
        <Image
          src="/logo.png"
          alt="SSG MOTORS"
          width={2816}
          height={1536}
          priority
          className="h-20 md:h-24 w-auto object-contain drop-shadow-sm"
        />
      </div>

      {/* White Logo (User Uploaded White logo.png) */}
      <div
        className={`transition-opacity duration-300 ${
          isWhite ? 'opacity-100 relative' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Image
          src="/white-logo.png"
          alt="SSG MOTORS"
          width={677}
          height={369}
          priority
          className="h-20 md:h-24 w-auto object-contain drop-shadow-md"
        />
      </div>
    </div>
  );
}
