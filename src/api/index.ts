import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5000/api" : "https://o2mart-backend.vercel.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (add token later)
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor (handle errors globally)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: logout
    }
    return Promise.reject(error);
  },
);
