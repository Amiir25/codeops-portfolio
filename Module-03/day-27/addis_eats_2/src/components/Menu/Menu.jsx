import React from "react";
import "./Menu.css";

const Menu = ({ menu, category }) => {
  const filteredMenu = menu.filter((dish) => dish.category === category);

  // if (filteredMenu.length === 0) {
  //   return (
      
  //   );
  // }

  return (
    <section>
      <h2>Filtered Menu:
        <span className="category"> {category}</span>
      </h2>
      {filteredMenu.length === 0
        ? (
          <p>🍽️ No dishes found for "{category}"</p>
        )
        : (
          <div className="filteredMenu">
            {filteredMenu.map((dish) => (
              <div key={dish.id}>
                <h3>{dish.name}</h3>
                <p>{dish.price} ETB</p>
              </div>
            ))}
          </div>
        )
      }
    </section>
  );
};

export default Menu;
