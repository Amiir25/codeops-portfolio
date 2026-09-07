import React, { useEffect } from "react";
import "./Menu.css";
import { useState } from "react";
import CategoryBar from "../CategoryBar/CategoryBar";
import Dish from "../Dish/Dish";
import Cart from "../Cart/Cart";
import Header from "../Header/Header";
import useFetch from "../../hooks/useFetch";

const Menu = () => {

  const {
    category,
    setCategory,
    dishes,
    setDishes,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  } = useFetch();

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
          <Dish key={dish.id} dish={dish} />
        ))}
      </section>
    </section>
  );
};

export default Menu;
