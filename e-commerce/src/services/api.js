import { products } from "../data/products";

// Helper to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (filters = {}) => {
  await delay(600); // 600ms network delay simulation

  let result = [...products];

  // Apply search query
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (filters.category && filters.category !== "All") {
    result = result.filter((p) => p.category === filters.category);
  }

  // Apply price filter
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sort (no-op or id-based)
        break;
    }
  }

  return result;
};

export const fetchProductById = async (id) => {
  await delay(500); // 500ms network delay simulation
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const fetchCategories = async () => {
  await delay(300); // 300ms network delay simulation
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  return categories;
};
