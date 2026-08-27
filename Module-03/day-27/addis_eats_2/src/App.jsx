import { menu } from "./assets/data.js";
import Dish from "./components/Dish/Dish.jsx";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";

function App() {
  return (
    <>
      <Header />
      <Menu
        menu={menu}
        category="Breakfast"
      />
      <main>
        {menu.map((item) => (
          <Dish
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            spicy={item.spicy}
          />
        ))}
      </main>
    </>
  );
}

export default App;
