import React from "react";
import "./CategoryBar.css";

const categoryList = ["All", "Main", "Vegetarian", "Side", "Breakfast"];

const CategoryBar = ({ selected, onSelect }) => {
  return (
    <section className="category-bar">
      <h2>Categories</h2>
      <div className="category-box">
        {categoryList.map((cat) => (
          <button
            key={cat}
            className={selected === cat ? "selected-cat" : "category-btn"}
            name={cat}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBar;
