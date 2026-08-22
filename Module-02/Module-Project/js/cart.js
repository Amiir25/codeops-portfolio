import { menu } from "./data.js";

export const addToCart = (selectedFoodName) => {
    const newFood = menu.find(food => food.name === selectedFoodName);

    const cartBottom = document.querySelector(".cart-bottom");

    // Cart Elements
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    /***/
    const cartItemLeft = document.createElement("div");
    cartItemLeft.classList.add("cart-item-left");

    const cartItemImageContainer = document.createElement("div");
    cartItemImageContainer.classList.add("cart-item-image-container");

    const cartItemImage = document.createElement("img");
    cartItemImage.classList.add("cart-item-image");
    cartItemImage.setAttribute("src", newFood.image);
    cartItemImage.setAttribute("alt", newFood.name);

    cartItemImageContainer.append(cartItemImage);

    /***/
    const cartItemInfo = document.createElement("div");
    cartItemInfo.classList.add("cart-item-info");

    const foodName = document.createElement("h3");
    foodName.classList.add("food-name");
    foodName.textContent = newFood.name;

    const category = document.createElement("span")
    category.classList.add("category");
    category.textContent = newFood.category;

    const foodPrice = document.createElement("h4");
    foodPrice.classList.add("food-price");
    foodPrice.textContent = `${newFood.price} ETB`;

    cartItemInfo.append(foodName, category, foodPrice);
    cartItemLeft.append(cartItemImageContainer, cartItemInfo);

    /***/
    const cartItemRight = document.createElement("div");
    cartItemRight.classList.add("cart-item-right");

    const removeFromCart = document.createElement("button");
    removeFromCart.classList.add("remove-from-cart");
    removeFromCart.textContent = "X";

    /***/
    const foodQty = document.createElement("div");
    foodQty.classList.add("food-qty");

    const minus = document.createElement("span");
    minus.classList.add("minus");
    minus.textContent = "-";

    const foodCount = document.createElement("span");
    foodCount.classList.add("food-count");
    foodCount.textContent = 1;

    const plus = document.createElement("span");
    plus.classList.add("plus");
    plus.textContent = "+";

    foodQty.append(minus, foodCount, plus);
    cartItemRight.append(removeFromCart, foodQty);
    cartItem.append(cartItemLeft, cartItemRight);
    cartBottom.before(cartItem);
}