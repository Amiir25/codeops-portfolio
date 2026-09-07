import { useContext, useState } from "react";
import { menu } from "./assets/data.js";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import OrderForm from "./components/OrderForm/OrderForm.jsx";
import { CartContext } from "./context/CartProvider.jsx";

function App() {

  const { order } = useContext(CartContext);
  
  return (
    <>
      <Cart />
      <Menu />

      {order && <OrderForm/>}
    </>
  );
}

export default App;
