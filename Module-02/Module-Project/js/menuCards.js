// import { menu } from "./data.js";

// Create the menu cards
export const createMenuCards = (menu) => {
    // Menu list (The container)
    const menuList = document.querySelector(".menu-list");

    // Create Menu Cards
    menu.map((food) => {

        // Food card
        const foodCard = document.createElement("div");
        foodCard.classList.add("food-card");

        // *********** Card top *********** //
        const cardTop = document.createElement("div");
        cardTop.classList.add("card-top");
        
        const foodImage = document.createElement("img");
        foodImage.classList.add("food-image");
        foodImage.setAttribute("src", food.image);
        foodImage.setAttribute("alt", food.name);

        const foodType = document.createElement("div");
        foodType.classList.add("food-type");

        const category = document.createElement("span")
        category.classList.add("category");
        category.textContent = food.category;

        const spicy = document.createElement("span")
        spicy.classList.add("spicy");
        food.spicy ? spicy.textContent = "Spicy" : "";

        foodType.append(category, spicy);
        cardTop.append(foodImage, foodType);

        // *********** Card Bottom *********** //
        const cardBottom = document.createElement("div");
        cardBottom.classList.add("card-bottom");

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const foodName = document.createElement("h3");
        foodName.classList.add("food-name");
        foodName.textContent = food.name;

        const foodPrice = document.createElement("h4");
        foodPrice.classList.add("food-price");
        foodPrice.textContent = `${food.price} ETB`;

        productInfo.append(foodName, foodPrice);

        const foodDesc = document.createElement("p");
        foodDesc.classList.add("food-description");
        foodDesc.textContent = food.description;

        const addToOrder = document.createElement("button");
        addToOrder.classList.add("add-to-order");
        addToOrder.textContent = "Add to Order";

        cardBottom.append(productInfo, foodDesc, addToOrder);

        foodCard.append(cardTop, cardBottom);
        menuList.append(foodCard);
    })

    return menuList;
}