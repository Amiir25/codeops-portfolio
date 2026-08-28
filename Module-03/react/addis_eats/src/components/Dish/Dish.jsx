import React from "react";
import "./Dish.css";
import PropTypes from "prop-types";
import Card from "../Card/Card";

const Dish = ({
  image,
  name,
  price,
  description,
  spicy = false,
  currency = "ETB",
}) => {
  return (
    <Card>
      <div className="dish">
        <img src={image} alt={name} />

        {/* Name & price */}
        <div className="dish-top">
          <h3>{name}</h3>
          <p className="price">{price} ETB</p>
        </div>

        {/* Description */}
        <p className="desc">{description}</p>

        {/* Spicy */}
        {spicy && 
          <span className="spicy-badge">
            Spicy
          </span>}
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
