import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(0);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState(false);

  // Cart
  const handleCart = (price) => {
    setCart((prev) => prev + 1);
    setPrice((prev) => prev + price);
  };

  return (
    <CartContext.Provider value={{ cart, price, order, setOrder, handleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
