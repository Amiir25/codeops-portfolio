import React from "react";
import "./Dish.css";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import { useState } from "react";

const Dish = ({ dish, onCart, currency = "ETB" }) => {
  
  const [qty, setQty] = useState(0);

  const handleOrder = (price) => {
    setQty((prev) => prev + 1);
    onCart(price)
  };

  return (
    <Card>
      <div className="dish">
        <img src={dish.image} alt={name} />

        {/* Name & price */}
        <div className="dish-top">
          <h3>{dish.name}</h3>
          <p className="price">{dish.price} ETB</p>
        </div>

        {/* Description */}
        <p className="desc">{dish.description}</p>

        {/* Spicy */}
        {dish.spicy && <span className="spicy-badge">Spicy</span>}

        {/* Add to order */}
        <button className="add-to-order" onClick={() => handleOrder(dish.price)}>
          <span>Add to Order</span>
          <span className="qty">{qty > 0 && qty}</span>
        </button>
      </div>
    </Card>
  );
};

// PropTypes
Dish.PropTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
};

export default Dish;
