import React from "react";
import "./Cart.css";

const Cart = ({ cart, price, onOrder }) => {
  return (
    <div className="cart">
      <h2>Cart</h2>

      <div className="cart-detail">
        <p className="items-count">
          Items:
          <span>{cart}</span>
        </p>

        <p className="total-price">
          Total Price:
          <span>{price} ETB</span>
        </p>

        <button
            className="order-btn"
            onClick={() => onOrder(true)}
            >
            Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
