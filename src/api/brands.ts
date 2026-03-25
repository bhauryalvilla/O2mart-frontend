import { apiClient } from "./index"; // Your shared axios instance

// Input/Output Types
export interface BrandCard {
  _id: string;
  image: string;
  brand: string;
  price: string;
  originalPrice?: string;
}

// API Service Layer
export const brandsApi = {
  // GET all brands
  getBrands: () => apiClient.get<BrandCard[]>("/brands"),

  // GET single brand by ID
  getBrandById: (id: string) => apiClient.get<BrandCard>(`/brands/${id}`),

  // Optional: Filter by category
  getBrandsByCategory: (category: string) =>
    apiClient.get<BrandCard[]>(`/brands?category=${category}`),
};
