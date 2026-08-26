import { menu } from "./assets/data.js";
import Dish from "./components/Dish/Dish.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        {menu.map((item) => (
          <Dish
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </main>
    </>
  );
}

export default App;
