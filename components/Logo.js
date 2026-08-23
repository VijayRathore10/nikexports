'use client';

import Image from 'next/image';

export default function Logo({ isWhite = false, className = "h-16 md:h-20 w-auto" }) {
  return (
    <div className={`relative inline-flex items-center select-none overflow-hidden ${className}`}>
      {/* Colored Logo (User Uploaded logo.png) */}
      <div
        className={`transition-opacity duration-300 flex items-center ${
          isWhite ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100 relative'
        }`}
      >
        <Image
          src="/logo.png"
          alt="SSG MOTORS"
          width={2816}
          height={1536}
          priority
          className="h-16 md:h-20 w-auto object-contain drop-shadow-sm scale-110"
        />
      </div>

      {/* White Logo (User Uploaded White logo.png) */}
      <div
        className={`transition-opacity duration-300 flex items-center ${
          isWhite ? 'opacity-100 relative' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Image
          src="/white-logo.png"
          alt="SSG MOTORS"
          width={677}
          height={369}
          priority
          className="h-16 md:h-20 w-auto object-contain drop-shadow-md scale-110"
        />
      </div>
    </div>
  );
}
