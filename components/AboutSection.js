'use client';

import { Award, Globe2, Truck } from 'lucide-react';

export default function AboutSection() {
  const cards = [
    {
      icon: Award,
      title: 'Extensive Expertise',
      description:
        'With years of experience in the field, we possess comprehensive knowledge and expertise in Automotive sector, ensuring that our clients receive the best value.',
    },
    {
      icon: Globe2,
      title: 'Global Reach',
      description:
        'Operating on a global scale, we have developed a robust network that enables us to deliver efficiently and promptly to clients worldwide.',
    },
    {
      icon: Truck,
      title: 'Wider Portfolio',
      description:
        'From transportation and agriculture to construction and specialized applications, we offer a diverse range of solutions tailored to meet specific business needs.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B69255]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header Section with Stacked Typography matching screenshot */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex flex-col items-center mb-6">
            <h2 className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#E5A91A] leading-none uppercase select-none">
              ABOUT
            </h2>
            <span className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#102035] -mt-3 sm:-mt-5 md:-mt-6 uppercase">
              NIK EXPORTS
            </span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#102035] tracking-tight mb-6">
            Delivering Excellence with Integrity and Accountability at Core
          </h3>

          <p className="text-base sm:text-lg text-[#3E4C59] leading-relaxed font-normal max-w-3xl mx-auto">
            NIK EXPORTS is India&apos;s leading Export house. We have extensive expertise in Automobile domain. With years of experience, we have developed strong relationship with all major Indian OEM&apos;s, Fabricators and Suppliers. Our unwavering commitment to innovation, quality, and client satisfaction has enabled us to become leading authority in the industry.
          </p>
        </div>

        {/* 3 Core Pillar Feature Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#F0F5FA] hover:bg-[#EAF2F9] rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(16,32,53,0.08)] hover:shadow-[0_20px_45px_-5px_rgba(16,32,53,0.14)] hover:-translate-y-1.5 border border-[#DCE7F2] group"
              >
                <div>
                  {/* Icon */}
                  <div className="text-[#102035] mb-8 group-hover:scale-110 transition-transform duration-300 origin-left">
                    <Icon className="w-12 h-12 stroke-[1.8]" />
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-[#102035] tracking-tight mb-5">
                    {card.title}
                  </h4>

                  {/* Horizontal Divider Line */}
                  <div className="w-full h-[1.5px] bg-[#102035]/20 mb-6" />

                  {/* Description */}
                  <p className="text-[#3E4C59] text-base leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
