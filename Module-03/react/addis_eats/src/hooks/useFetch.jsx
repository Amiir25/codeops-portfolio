import React, { useEffect, useState } from "react";

const useFetch = () => {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadMenu = async () => {
      try {
        const res = await fetch("/src/assets/menu.json", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Could not load the menu!");
        const data = await res.json();

        // Filtering by category
        const filteredCategory =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setDishes(filteredCategory);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();

    return () => controller.abort();
  }, [category]);

  return {
    category, setCategory,
    dishes, setDishes,
    loading,
    error,
    searchQuery, setSearchQuery
  };
};

export default useFetch;
