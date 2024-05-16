"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

export function useGeoCode(address: string) {
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch(
          `https://api.distancematrix.ai/maps/api/geocode/json?address=${address}&key=${apiKey}`
        );
        const data = await res.json();
        const location = data["result"][0]["geometry"]["location"];
        setLat(location["lat"]);
        setLng(location["lng"]);
      } catch (error) {
        toast.error("Error geocoding address");
        setLat(undefined);
        setLng(undefined);
      } finally {
        setLoading(false);
      }
    }
    if (address) {
      fetchLocation();
    }
  }, [address]);

  return { lat, lng, loading };
}
