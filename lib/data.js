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

// Every function below tries Sanity first with live un-cached queries.
// If Sanity returns no data (e.g. no products added yet in Studio),
// it gracefully falls back to mock sample data so the site remains functional.

async function safeFetch(query, params = {}, fallback = null) {
  try {
    const result = await client.fetch(query, params);
    if (result !== null && result !== undefined) {
      if (Array.isArray(result)) {
        if (result.length > 0) {
          return result;
        }
        return fallback !== null && fallback !== undefined ? fallback : [];
      }
      return result;
    }
    return fallback;
  } catch (err) {
    console.error(`[Sanity Fetch Error] query: ${query?.slice?.(0, 45)}...`, err?.message || err);
    return fallback;
  }
}

export async function getCategories() {
  return safeFetch(CATEGORIES_QUERY, {}, mockCategories);
}

export async function getCategoryBySlug(slug) {
  const fallback = mockCategories.find(
    (c) => c.slug?.toLowerCase() === slug?.toLowerCase()
  );
  return safeFetch(CATEGORY_BY_SLUG_QUERY, { slug }, fallback);
}

export async function getProducts() {
  return safeFetch(PRODUCTS_QUERY, {}, []);
}

export async function getProductsByCategory(slug) {
  return safeFetch(PRODUCTS_BY_CATEGORY_QUERY, { slug }, []);
}

export async function getProductBySlug(slug) {
  return safeFetch(PRODUCT_BY_SLUG_QUERY, { slug }, null);
}

export async function getTestimonials() {
  return safeFetch(TESTIMONIALS_QUERY, {}, mockTestimonials);
}

export async function getSiteSettings() {
  return safeFetch(SITE_SETTINGS_QUERY, {}, mockSiteSettings);
}



