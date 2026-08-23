// Sample data so the site looks complete during preview, before real
// products are added in Sanity Studio. Once real content exists in
// Sanity, lib/data.js automatically prefers it over this file — nothing
// here needs to be wired up or removed manually.

export const mockCategories = [
  { _id: 'c1', title: 'Trucks', slug: 'trucks', image: 'https://picsum.photos/seed/trucks-cat/800/600' },
  { _id: 'c2', title: 'Buses', slug: 'buses', image: 'https://picsum.photos/seed/buses-cat/800/600' },
  { _id: 'c3', title: 'Equipments', slug: 'equipment', image: 'https://picsum.photos/seed/equip-cat/800/600' },
  { _id: 'c4', title: 'Agriculture', slug: 'agriculture', image: 'https://picsum.photos/seed/agri-cat/800/600' },
];

export const mockProducts = [
  // ==========================================
  // TRUCKS (8 items - 2 rows of 4)
  // ==========================================
  {
    _id: 'p1',
    name: 'Tata LPT 1613 Cargo Truck',
    slug: 'tata-lpt-1613-cargo-truck',
    cardImage: 'https://picsum.photos/seed/truck1/800/600',
    highlights: ['Year: 2022', 'Fuel: Diesel', 'Load: 10 Tonne', 'Condition: Used'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p2',
    name: 'Ashok Leyland 1616 Flatbed',
    slug: 'ashok-leyland-1616-flatbed',
    cardImage: 'https://picsum.photos/seed/truck2/800/600',
    highlights: ['Year: 2021', 'Fuel: Diesel', 'Load: 16 Tonne', 'Condition: Refurbished'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p3',
    name: 'Eicher Pro 3015 Heavy Tipper',
    slug: 'eicher-pro-3015-tipper',
    cardImage: 'https://picsum.photos/seed/truck3/800/600',
    highlights: ['Year: 2023', 'Fuel: Diesel', 'Load: 9 Tonne', 'Condition: Low Hours'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p10',
    name: 'BharatBenz 2823C Mining Tipper',
    slug: 'bharatbenz-2823c-heavy-tipper',
    cardImage: 'https://picsum.photos/seed/truck4/800/600',
    highlights: ['Year: 2022', 'Fuel: Diesel', 'Load: 28 Tonne', 'Condition: Refurbished'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p101',
    name: 'Volvo FMX 460 8x4 Mining Dumper',
    slug: 'volvo-fmx-460-8x4-dumper',
    cardImage: 'https://picsum.photos/seed/truck5/800/600',
    highlights: ['Year: 2023', 'Engine: 460 HP', 'Axles: 8x4 Heavy', 'Condition: Low Hours'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p102',
    name: 'MAN TGS 33.400 Prime Mover',
    slug: 'man-tgs-33-400-prime-mover',
    cardImage: 'https://picsum.photos/seed/truck6/800/600',
    highlights: ['Year: 2022', 'Capacity: 65 Ton', 'Engine: 400 HP', 'Condition: Inspected'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p103',
    name: 'Scania G460 Heavy Haulage 6x4',
    slug: 'scania-g460-heavy-haulage',
    cardImage: 'https://picsum.photos/seed/truck7/800/600',
    highlights: ['Year: 2023', 'Retarder: R4100D', 'Engine: 460 HP', 'Condition: Excellent'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p104',
    name: 'Isuzu GIGA 10m³ Concrete Mixer',
    slug: 'isuzu-giga-concrete-mixer',
    cardImage: 'https://picsum.photos/seed/truck8/800/600',
    highlights: ['Year: 2023', 'Drum: 10 m³', 'Drive: 8x4 Heavy', 'Condition: New/Export'],
    category: { title: 'Trucks', slug: 'trucks' },
  },

  // ==========================================
  // BUSES (8 items - 2 rows of 4)
  // ==========================================
  {
    _id: 'p4',
    name: 'Tata Starbus 40-Seater Deluxe',
    slug: 'tata-starbus-40-seater',
    cardImage: 'https://picsum.photos/seed/bus1/800/600',
    highlights: ['Year: 2022', 'Seating: 40', 'Fuel: Diesel', 'Condition: Used'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p5',
    name: 'Ashok Leyland Viking 52-Seater',
    slug: 'ashok-leyland-viking-52-seater',
    cardImage: 'https://picsum.photos/seed/bus2/800/600',
    highlights: ['Year: 2021', 'Seating: 52', 'AC: Yes', 'Condition: Good'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p11',
    name: 'Eicher Skyline Pro 32-Seater AC',
    slug: 'eicher-skyline-pro-32-seater',
    cardImage: 'https://picsum.photos/seed/bus3/800/600',
    highlights: ['Year: 2023', 'Seating: 32', 'Fuel: Diesel', 'Condition: Refurbished'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p12',
    name: 'Force Traveller 26-Seater Mini Bus',
    slug: 'force-traveller-26-seater',
    cardImage: 'https://picsum.photos/seed/bus4/800/600',
    highlights: ['Year: 2023', 'Seating: 26', 'Fuel: Diesel', 'Condition: Excellent'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p201',
    name: 'Volvo 9600 Luxury Intercity Coach',
    slug: 'volvo-9600-luxury-intercity-coach',
    cardImage: 'https://picsum.photos/seed/bus5/800/600',
    highlights: ['Year: 2024', 'Seats: 43 Recliner', 'Air Suspension', 'Condition: Like New'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p202',
    name: 'Mercedes-Benz Tourismo Deluxe',
    slug: 'mercedes-benz-tourismo-deluxe',
    cardImage: 'https://picsum.photos/seed/bus6/800/600',
    highlights: ['Year: 2023', 'Seats: 49 Luxury', 'Euro VI Diesel', 'Condition: Inspected'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p203',
    name: 'Scania Metrolink HD Tri-Axle',
    slug: 'scania-metrolink-hd-tri-axle',
    cardImage: 'https://picsum.photos/seed/bus7/800/600',
    highlights: ['Year: 2022', 'Seats: 53 Recliner', 'Engine: 410 HP', 'Condition: Low Miles'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p204',
    name: 'Isuzu Frontura Staff Transporter',
    slug: 'isuzu-frontura-staff-transporter',
    cardImage: 'https://picsum.photos/seed/bus8/800/600',
    highlights: ['Year: 2023', 'Seats: 30 Rugged', 'Engine: 5.2L Turbo', 'Condition: Certified'],
    category: { title: 'Buses', slug: 'buses' },
  },

  // ==========================================
  // EQUIPMENT (8 items - 2 rows of 4)
  // ==========================================
  {
    _id: 'p6',
    name: 'JCB 3DX Backhoe Loader',
    slug: 'jcb-3dx-backhoe-loader',
    cardImage: 'https://picsum.photos/seed/equip1/800/600',
    highlights: ['Year: 2022', 'Hours: 2,900', 'Engine: 76 HP', 'Condition: Inspected'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p7',
    name: 'CASE 770EX Backhoe Loader',
    slug: 'case-770ex-backhoe',
    cardImage: 'https://picsum.photos/seed/equip2/800/600',
    highlights: ['Year: 2021', 'Hours: 3,800', 'Bucket: 1.1 m³', 'Condition: Good'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p13',
    name: 'CAT 320D Hydraulic Excavator',
    slug: 'cat-320d-hydraulic-excavator',
    cardImage: 'https://picsum.photos/seed/equip3/800/600',
    highlights: ['Year: 2022', 'Hours: 2,400', 'Weight: 20 Ton', 'Condition: Certified'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p14',
    name: 'Komatsu PC210 Crawler Excavator',
    slug: 'komatsu-pc210-crawler-excavator',
    cardImage: 'https://picsum.photos/seed/equip4/800/600',
    highlights: ['Year: 2023', 'Hours: 1,850', 'Weight: 21 Ton', 'Condition: Like New'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p301',
    name: 'ACE TM 300 Mobile Telescopic Crane',
    slug: 'ace-tm-300-mobile-crane',
    cardImage: 'https://picsum.photos/seed/equip5/800/600',
    highlights: ['Year: 2023', 'Capacity: 30 Ton', 'Boom: 34.5m', 'Condition: Excellent'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p302',
    name: 'Volvo SD110BA 11-Ton Soil Compactor',
    slug: 'volvo-sd110ba-soil-compactor',
    cardImage: 'https://picsum.photos/seed/equip6/800/600',
    highlights: ['Year: 2022', 'Weight: 11.2 Ton', 'Drum: 2.13m', 'Condition: Inspected'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p303',
    name: 'Komatsu WA380 Heavy Wheel Loader',
    slug: 'komatsu-wa380-wheel-loader',
    cardImage: 'https://picsum.photos/seed/equip7/800/600',
    highlights: ['Year: 2023', 'Bucket: 3.4 m³', 'Power: 191 HP', 'Condition: Low Hours'],
    category: { title: 'Equipments', slug: 'equipment' },
  },
  {
    _id: 'p304',
    name: 'Hyundai R210 Smart Plus Crawler',
    slug: 'hyundai-r210-smart-plus',
    cardImage: 'https://picsum.photos/seed/equip8/800/600',
    highlights: ['Year: 2023', 'Bucket: 1.05 m³', 'Engine: Cummins 6BT', 'Condition: Certified'],
    category: { title: 'Equipments', slug: 'equipment' },
  },

  // ==========================================
  // AGRICULTURE (8 items - 2 rows of 4)
  // ==========================================
  {
    _id: 'p8',
    name: 'Mahindra Arjun 605 DI-i Tractor',
    slug: 'mahindra-arjun-605-di-tractor',
    cardImage: 'https://picsum.photos/seed/agri1/800/600',
    highlights: ['Year: 2023', 'HP: 60', 'Drive: 4WD', 'Condition: New/Export'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p9',
    name: 'Massey Ferguson 241 DYNATRACK',
    slug: 'massey-ferguson-241-tractor',
    cardImage: 'https://picsum.photos/seed/agri2/800/600',
    highlights: ['Year: 2022', 'HP: 42', 'Lift: 2,050 kg', 'Condition: Used'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p15',
    name: 'John Deere 5310 4WD Heavy Tractor',
    slug: 'john-deere-5310-4wd-tractor',
    cardImage: 'https://picsum.photos/seed/agri3/800/600',
    highlights: ['Year: 2023', 'HP: 55', 'Drive: 4WD Planetary', 'Condition: Refurbished'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p16',
    name: 'Sonalika Tiger DI 65 4WD Tractor',
    slug: 'sonalika-di-745-iii-tractor',
    cardImage: 'https://picsum.photos/seed/agri4/800/600',
    highlights: ['Year: 2023', 'HP: 65', 'Transmission: 12F+12R', 'Condition: Excellent'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p401',
    name: 'Kubota MU5502 4WD Utility Tractor',
    slug: 'kubota-mu5502-4wd-tractor',
    cardImage: 'https://picsum.photos/seed/agri5/800/600',
    highlights: ['Year: 2024', 'HP: 55', 'Japanese Tech', 'Condition: Brand New'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p402',
    name: 'Shaktiman Heavy Rotary Tiller 8ft',
    slug: 'shaktiman-rotavator-8ft',
    cardImage: 'https://picsum.photos/seed/agri6/800/600',
    highlights: ['Year: 2023', 'Blades: 60 L-Type', 'Width: 2.3m', 'Condition: Inspected'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p403',
    name: 'Case IH Austoft Sugarcane Harvester',
    slug: 'case-ih-austoft-sugarcane-harvester',
    cardImage: 'https://picsum.photos/seed/agri7/800/600',
    highlights: ['Year: 2022', 'Engine: 358 HP', 'Drive: Rubber Tracks', 'Condition: Certified'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p404',
    name: 'AgriStar Heavy Laser Land Leveler Pro',
    slug: 'agristar-laser-land-leveler',
    cardImage: 'https://picsum.photos/seed/agri8/800/600',
    highlights: ['Year: 2023', 'Laser: Dual Slope 800m', 'Blade: 7.5ft', 'Condition: Complete Kit'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
];

export const mockGallery = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `https://picsum.photos/seed/gallery${n}/1200/800`
);

export const mockSpecifications = [
  { label: 'Make / Model', value: 'Tata LPT 1613' },
  { label: 'Year of Manufacture', value: '2022' },
  { label: 'Fuel Type', value: 'Diesel' },
  { label: 'Load Capacity', value: '10 Tonne' },
  { label: 'Engine', value: '5.8L, 130 HP' },
  { label: 'Transmission', value: 'Manual, 6-Speed' },
  { label: 'Condition', value: 'Used — Good' },
  { label: 'Location', value: 'Delhi, India' },
];

export const mockTestimonials = [
  {
    _id: 't1',
    customerName: 'Ahmed Al-Farsi',
    customerDetail: 'Fleet Owner, Oman',
    photos: ['https://picsum.photos/seed/testi1a/600/700', 'https://picsum.photos/seed/testi1b/600/700'],
    quote:
      'Nik Exports handled our entire truck fleet order smoothly from inspection to shipping. Clear communication throughout and the vehicles matched exactly what was promised.',
  },
  {
    _id: 't2',
    customerName: 'Peter Achebe',
    customerDetail: 'Transport Operator, Nigeria',
    photos: ['https://picsum.photos/seed/testi2a/600/700'],
    quote:
      'We have imported buses through them twice now. Documentation and export paperwork was handled professionally, saving us significant time on our end.',
  },
  {
    _id: 't3',
    customerName: 'Ibrahim Diallo',
    customerDetail: 'Agri Cooperative, Senegal',
    photos: ['https://picsum.photos/seed/testi3a/600/700', 'https://picsum.photos/seed/testi3b/600/700'],
    quote:
      'Good condition tractors at fair pricing, and they were patient answering all our technical questions before we committed to the order.',
  },
];

export const mockSiteSettings = {
  tagline: 'Commercial Vehicles & Equipment, Exported Worldwide',
  contactEmail: 'info@ssgmotors.com',
  contactPhone: '+971 50 698 8527',
  address:
    'SevenSeas Global Trading FZ LLC, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
  aboutText:
    'Headquartered in the UAE, SSD Motors is your reliable gateway to the global automotive market. As premier exporters and traders, we supply worldwide clients with top-tier automotive products across all categories.',
  heroImages: [
    'https://picsum.photos/seed/hero1/1600/900',
    'https://picsum.photos/seed/hero2/1600/900',
    'https://picsum.photos/seed/hero3/1600/900',
  ],
  socialLinks: {
    facebook: 'https://www.facebook.com/profile.php?id=61592216920291',
    instagram: 'https://www.instagram.com/motorsssg?igsi=MXU2cm8yZG1rbTdiNg==',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/971506988527',
  },
};
