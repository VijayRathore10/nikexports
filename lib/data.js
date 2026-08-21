import { client } from './sanity';
import {
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  TESTIMONIALS_QUERY,
  SITE_SETTINGS_QUERY,
} from './queries';
import {
  mockCategories,
  mockProducts,
  mockGallery,
  mockSpecifications,
  mockTestimonials,
  mockSiteSettings,
} from './mockData';

// Every function below tries Sanity first. If the query returns nothing
// (e.g. no products added yet) or the request fails (e.g. Studio not
// deployed yet), it silently falls back to sample data so the site still
// renders correctly during preview/development.

async function safeFetch(query, params, fallback) {
  try {
    const result = await client.fetch(query, params);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return result;
  } catch (err) {
    return fallback;
  }
}

export async function getCategories() {
  return safeFetch(CATEGORIES_QUERY, {}, mockCategories);
}

export async function getCategoryBySlug(slug) {
  return safeFetch(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    mockCategories.find((c) => c.slug === slug)
  );
}

export async function getProducts() {
  return safeFetch(PRODUCTS_QUERY, {}, mockProducts);
}

export async function getProductsByCategory(slug) {
  return safeFetch(
    PRODUCTS_BY_CATEGORY_QUERY,
    { slug },
    mockProducts.filter((p) => p.category.slug === slug)
  );
}

export async function getProductBySlug(slug) {
  const fallback = {
    ...mockProducts.find((p) => p.slug === slug),
    gallery: mockGallery,
    specifications: mockSpecifications,
    description:
      'Well-maintained unit, inspected and export-ready. Full specifications and inspection report available on request.',
  };
  return safeFetch(PRODUCT_BY_SLUG_QUERY, { slug }, fallback);
}

export async function getTestimonials() {
  return safeFetch(TESTIMONIALS_QUERY, {}, mockTestimonials);
}

export async function getSiteSettings() {
  return safeFetch(SITE_SETTINGS_QUERY, {}, mockSiteSettings);
}
