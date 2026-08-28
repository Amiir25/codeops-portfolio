import React from "react";
import "./Menu.css";
import { useState } from "react";
import { menu } from "../../assets/data";
import CategoryBar from "../CategoryBar/CategoryBar";
import Dish from "../Dish/Dish";
import Cart from "../Cart/Cart";

const Menu = ({ onCart }) => {
  const [category, setCategory] = useState("All");

  const filteredMenu =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  return (
    <section>
      <CategoryBar selected={category} onSelect={setCategory} />

      <section className="menu-list">
        {filteredMenu.map((dish) => (
          <Dish key={dish.id} dish={dish} onCart={onCart} />
        ))}
      </section>
    </section>
  );
};

export default Menu;
