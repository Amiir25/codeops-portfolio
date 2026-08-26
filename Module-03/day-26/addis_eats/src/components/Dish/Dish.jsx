import React from "react";
import './Dish.css'

const Dish = ({ image, name, price, description }) => {
  return (
    <div className="dish">
      
      <img src={image} alt={name} />

      <div className="dish-top">
        <h3>{name}</h3>
        <p className="price">{price} ETB</p>
      </div>
      
      <p className="desc">{description}</p>
    </div>
  );
};



export default Dish;
