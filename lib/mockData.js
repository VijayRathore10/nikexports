// Sample data so the site looks complete during preview, before real
// products are added in Sanity Studio. Once real content exists in
// Sanity, lib/data.js automatically prefers it over this file — nothing
// here needs to be wired up or removed manually.

export const mockCategories = [
  { _id: 'c1', title: 'Trucks', slug: 'trucks', image: 'https://picsum.photos/seed/trucks-cat/800/600' },
  { _id: 'c2', title: 'Buses', slug: 'buses', image: 'https://picsum.photos/seed/buses-cat/800/600' },
  { _id: 'c3', title: 'Equipment', slug: 'equipment', image: 'https://picsum.photos/seed/equip-cat/800/600' },
  { _id: 'c4', title: 'Agriculture', slug: 'agriculture', image: 'https://picsum.photos/seed/agri-cat/800/600' },
];

export const mockProducts = [
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
    name: 'Eicher Pro 3015 Tipper',
    slug: 'eicher-pro-3015-tipper',
    cardImage: 'https://picsum.photos/seed/truck3/800/600',
    highlights: ['Year: 2023', 'Fuel: Diesel', 'Load: 9 Tonne'],
    category: { title: 'Trucks', slug: 'trucks' },
  },
  {
    _id: 'p4',
    name: 'Tata Starbus 40-Seater',
    slug: 'tata-starbus-40-seater',
    cardImage: 'https://picsum.photos/seed/bus1/800/600',
    highlights: ['Year: 2020', 'Seating: 40', 'Fuel: Diesel', 'Condition: Used'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p5',
    name: 'Ashok Leyland Viking 52-Seater',
    slug: 'ashok-leyland-viking-52-seater',
    cardImage: 'https://picsum.photos/seed/bus2/800/600',
    highlights: ['Year: 2019', 'Seating: 52', 'AC: Yes'],
    category: { title: 'Buses', slug: 'buses' },
  },
  {
    _id: 'p6',
    name: 'JCB 3DX Backhoe Loader',
    slug: 'jcb-3dx-backhoe-loader',
    cardImage: 'https://picsum.photos/seed/equip1/800/600',
    highlights: ['Year: 2021', 'Hours: 3,200', 'Condition: Used'],
    category: { title: 'Equipment', slug: 'equipment' },
  },
  {
    _id: 'p7',
    name: 'CASE 770EX Backhoe',
    slug: 'case-770ex-backhoe',
    cardImage: 'https://picsum.photos/seed/equip2/800/600',
    highlights: ['Year: 2020', 'Hours: 4,100'],
    category: { title: 'Equipment', slug: 'equipment' },
  },
  {
    _id: 'p8',
    name: 'Mahindra Arjun 605 DI Tractor',
    slug: 'mahindra-arjun-605-di-tractor',
    cardImage: 'https://picsum.photos/seed/agri1/800/600',
    highlights: ['Year: 2022', 'HP: 60', 'Condition: New'],
    category: { title: 'Agriculture', slug: 'agriculture' },
  },
  {
    _id: 'p9',
    name: 'Massey Ferguson 241 Tractor',
    slug: 'massey-ferguson-241-tractor',
    cardImage: 'https://picsum.photos/seed/agri2/800/600',
    highlights: ['Year: 2021', 'HP: 42', 'Condition: Used'],
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
  contactEmail: 'sales@nikexports.com',
  contactPhone: '+91 98XXXXXXXX',
  address: 'Delhi, India',
  aboutText:
    'Nik Exports is a Delhi-based export house dealing in commercial vehicles, buses, trailers, agricultural machinery, and special application equipment, serving customers across multiple export markets.',
  heroImages: [
    'https://picsum.photos/seed/hero1/1600/900',
    'https://picsum.photos/seed/hero2/1600/900',
    'https://picsum.photos/seed/hero3/1600/900',
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/919800000000',
  },
};
