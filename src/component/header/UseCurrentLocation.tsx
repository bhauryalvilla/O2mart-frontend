import { useState } from "react";

interface LocationState {
  lat: number | null;
  lng: number | null;
  loading: boolean;
  error: string | null;
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lng: null,
    loading: false,
    error: null,
  });

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported in this browser.",
      }));
      return;
    }

    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return { ...location, getLocation };
}
