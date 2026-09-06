import React, { useEffect } from "react";
import "./Menu.css";
import { useState } from "react";
import CategoryBar from "../CategoryBar/CategoryBar";
import Dish from "../Dish/Dish";
import Cart from "../Cart/Cart";
import Header from "../Header/Header";

const Menu = ({ onCart }) => {
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

  // Handle search
  const handleSearch = (e) => {
    const searchedMenu = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchQuery(e.target.value);
    setDishes(searchedMenu);
  };

  // States
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
      <CategoryBar selected={category} onSelect={setCategory} />

      <section className="menu-list">
        {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} onCart={onCart} />
        ))}
      </section>
    </section>
  );
};

export default Menu;
