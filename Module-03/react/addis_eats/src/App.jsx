import { useState } from "react";
import { menu } from "./assets/data.js";
import Cart from "./components/Cart/Cart.jsx";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import OrderForm from "./components/OrderForm/OrderForm.jsx";

function App() {
  const [cart, setCart] = useState(0);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState(false);

  // Cart
  const handleCart = (price) => {
    setCart((prev) => prev + 1);
    setPrice((prev) => prev + price);
  };

  return (
    <>
      <Cart cart={cart} price={price} onOrder={setOrder}/>
      <Header />
      <Menu onCart={handleCart} />

      {order && <OrderForm/>}
    </>
  );
}

export default App;
