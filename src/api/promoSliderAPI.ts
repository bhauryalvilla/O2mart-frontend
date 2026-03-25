import { apiClient } from "./index"; // Your shared axios instance

// Input/Output Types (matches your seeded data + slider needs)
export interface PromoSlide {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  slug: string;
  price: string;
}

// API Service Layer
export const promoSliderApi = {
  // GET all promo slides (main endpoint for slider)
  getPromoSlides: () => apiClient.get<PromoSlide[]>("/promoSlider"),

  // GET single promo by slug (matches SubPlants pattern)
  getPromoSlideBySlug: (slug: string) =>
    apiClient.get<PromoSlide>(`/promoSlider/${slug}`),

  // Optional: Filter by category
  getPromoSlidesByCategory: (category: string) =>
    apiClient.get<PromoSlide[]>(`/promoSlider?category=${category}`),
};
