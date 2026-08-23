export const CATEGORIES_QUERY = `*[_type == "category" && !(_id in path("drafts.**"))] | order(order asc, _createdAt asc) {
  _id, title, "slug": slug.current, image, order
}`;

export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id, title, "slug": slug.current, image, order
}`;

export const PRODUCTS_QUERY = `*[_type == "product" && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc) {
  _id,
  "name": coalesce(name, title),
  "slug": coalesce(slug.current, _id),
  "cardImage": coalesce(cardImage, mainImage, image, images[0], gallery[0]),
  "gallery": coalesce(gallery, images, [cardImage, mainImage, image][defined(@)]),
  highlights,
  specifications,
  description,
  featured,
  availability,
  "category": category->{_id, title, "slug": slug.current}
}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && (category->slug.current == $slug || category._ref in *[_type == "category" && slug.current == $slug]._id)] | order(order asc, _createdAt desc) {
  _id,
  "name": coalesce(name, title),
  "slug": coalesce(slug.current, _id),
  "cardImage": coalesce(cardImage, mainImage, image, images[0], gallery[0]),
  "gallery": coalesce(gallery, images, [cardImage, mainImage, image][defined(@)]),
  highlights,
  specifications,
  description,
  featured,
  availability,
  "category": category->{_id, title, "slug": slug.current}
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && !(_id in path("drafts.**")) && (slug.current == $slug || _id == $slug)][0] {
  _id,
  "name": coalesce(name, title),
  "slug": coalesce(slug.current, _id),
  "cardImage": coalesce(cardImage, mainImage, image, images[0], gallery[0]),
  "gallery": coalesce(gallery, images, [cardImage, mainImage, image][defined(@)]),
  highlights,
  specifications,
  description,
  featured,
  availability,
  "category": category->{_id, title, "slug": slug.current}
}`;

export const TESTIMONIALS_QUERY = `*[_type in ["testimonial", "testimonials", "review"] && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc) {
  _id,
  "customerName": coalesce(customerName, name, clientName, author),
  "customerDetail": coalesce(customerDetail, detail, role, location, company),
  "photos": coalesce(photos, images, [photo, image][defined(@)]),
  "quote": coalesce(quote, testimonial, content, text, message)
}`;

export const SITE_SETTINGS_QUERY = `*[_type in ["siteSettings", "settings", "siteConfig"] && !(_id in path("drafts.**"))][0] {
  logo, heroImages, tagline, socialLinks, contactEmail, contactPhone, address, aboutText
}`;
