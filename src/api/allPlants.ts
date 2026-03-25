// api/plants.ts - Exact same structure as brandsApi
import { apiClient } from "./index"; // Your shared axios instance

// Input/Output Types (match your backend response)
export interface PlantCard {
  _id: string;
  image: string;
  name: string;
  scientificName: string;
  description: string;
  features: {
    rawMaterial: string[];
    temperature: string;
    sunlight: string;
    waterFrequency: string;
    oxygenEmission: string;
    difficulty: string;
  };
  price: string;
  originalPrice?: string;
  deliveryBy: string;
  offers: string[];
  category: string;
}

// API Response wrapper (your backend format)
export interface PlantsResponse {
  success: boolean;
  count: number;
  data: PlantCard[];
}

// API Service Layer - IDENTICAL pattern
export const allPlantsApi = {
  // GET all plants
  getPlants: () => apiClient.get<PlantsResponse>("/subplants"),

  // GET plants by category
  getPlantsByCategory: (category: string) =>
    apiClient.get<PlantsResponse>(
      `/subplants?category=${encodeURIComponent(category)}`,
    ),

  // GET single plant by ID
  getPlantById: (id: string) => apiClient.get<PlantCard>(`/subplants/${id}`),
};
