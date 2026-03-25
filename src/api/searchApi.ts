import { apiClient } from "./index"; // Your shared axios instance

// Exact SubPlants model type from your backend schema
export interface SubPlant {
  _id: string;
  name: string;
  title?: string;
  category: string;
  desc?: string; // Your description field
  image?: string;
  price?: number;
  // Add other fields like scientificName, features from your schema
}

// Core search method matching your route
export const searchApi = {
  searchPlants: (q: string) =>
    apiClient.get<SubPlant[]>("/search", {
      params: { q }, // Axios encodes: "snake plant" → q=snake%20plant
    }),
};
