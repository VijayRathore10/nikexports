export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id, title, "slug": slug.current, image, order
}`;

export const CATEGORY_BY_SLUG_QUERY = `*[_type == "category" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, image
}`;

export const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc) {
  _id, name, "slug": slug.current, cardImage, highlights, featured,
  "category": category->{title, "slug": slug.current}
}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && category->slug.current == $slug] | order(order asc) {
  _id, name, "slug": slug.current, cardImage, highlights,
  "category": category->{title, "slug": slug.current}
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id, name, description, gallery, specifications, highlights, availability,
  "category": category->{title, "slug": slug.current}
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id, customerName, customerDetail, photos, quote
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  logo, heroImages, tagline, socialLinks, contactEmail, contactPhone, address, aboutText
}`;
