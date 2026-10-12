"use client"

import React, { useCallback, useEffect, useState } from "react";
import { getDishes } from "../api/dishes";

const useFetchDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dishes
  const fetchDishes = useCallback((signal) => {
    setLoading(true);
    setError(null);

    return getDishes(signal)
      .then(setDishes)
      .catch((err) => setError(err.message || "Faliled to load dishes"))
      .finally(() => setLoading(false));
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    const controller = new AbortController();
    fetchDishes(controller.signal)
    return () => controller.abort();
  }, []);

  return {
    dishes,
    loading,
    error,
    refetchDishes: () => fetchDishes(),  // Manula refetch
  };
};

export default useFetchDishes;