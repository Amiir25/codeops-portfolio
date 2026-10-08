"use client"

import React, { useCallback, useEffect, useState } from "react";
import { getSpecials } from "@/api/dishes";

const useFetchSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch special dishes
  const fetchSpecials = useCallback((signal) => {
    setLoading(true);
    setError(null);

    return getSpecials(signal)
      .then(setSpecials)
      .catch((err) =>{
        if (err.name !== "AbortError") {
            setError(err.message || "Failed to load special dishes")
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    const controller = new AbortController();
    fetchSpecials(controller.signal);
    return () => controller.abort();
  }, []);

  return {
    specials,
    loading,
    error,
    refetchSpecials: () => fetchSpecials, // Manual refetch
  };
};

export default useFetchSpecials;