import { menu } from "./data.js";
import { createMenuCards } from "./menuCards.js";
import { addToCart } from "./cart.js";
import { calculatePrice } from "./price.js";

// Items on cart
export const foodsOnCart = [];
// const savedFoods = localStorage.getItem("savedFoods");
// export const foodsOnCart = JSON.parse(savedFoods);

// Event Listener (Menu)
createMenuCards(menu).addEventListener("click", (e) => {

    // console.log(savedFoods)

    // Get the clicked element
    const selectedElement = e.target;
    // Get the parent element (cart item)
    const card = e.target.closest(".food-card");
    const foodName = card.querySelector(".food-name").textContent;

    if (selectedElement.classList.contains("add-to-order")) {
        const selectedFood = menu.find(food => food.name === foodName);

        // Return if the item is already in the cart
        const checkFoodOnCart = foodsOnCart?.find(food => food.name === foodName);
        if (checkFoodOnCart) return;

        // Add item to cart
        addToCart(foodName);

        // Calculate the first price
        const qty = 1;
        calculatePrice("add", selectedFood, qty);
    }
})

// Event Listener (Cart)
const cart = document.querySelector(".cart");

cart.addEventListener("click", (e) => {
    const selectedElement = e.target;
    const cartItem = e.target.closest(".cart-item");
    const foodName = cartItem.querySelector(".food-name").textContent;
    const foodCount = cartItem.querySelector(".food-count");

    // Get the selected food from menu
    const selectedFood = menu.find(food => food.name === foodName);
    // Get the item quantity on cart
    let qty = Number(foodCount.textContent);

    // Add quantity
    if (selectedElement.classList.contains("plus")) {
        qty++;
        foodCount.textContent = qty;
        calculatePrice("add", selectedFood, qty);

    // Subtract quantity
    } else if (selectedElement.classList.contains("minus")) {
        if (qty > 0) {
            qty--;
            foodCount.textContent = qty;
            calculatePrice("minus", selectedFood, qty);
        } else foodCount.textContent = 0;

    // Remove from cart
    } else if (selectedElement.classList.contains("remove-from-cart")) {
        calculatePrice("remove", selectedFood, qty)
        cartItem.remove();
    }
})

// Event listener (Search)
const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", () => {
    const filteredCards = menu.filter(card => card.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    // Menu list (The container)
    const menuList = document.querySelector(".menu-list");
    menuList.innerHTML = '';
    createMenuCards(filteredCards);
})


const checkoutForm = document.querySelector(".checkout-form");

// Event listener (Checkout)
const checkout = document.querySelector(".checkout");

checkout.addEventListener("click", () => {
    if (foodsOnCart.length === 0) return;

    checkoutForm.classList.remove("hidden");
})

// Event listener (Pay)
const pay = document.querySelector(".pay");

const namePattern = /^[A-Za-z]$/;
const phonePattern = /^(?:\+251|0)9\d{8}$/;

let isFormValid = true;

pay.addEventListener("click", (e) => {
    e.preventDefault();
    
    const username = document.querySelector("#name");
    const userPhone = document.querySelector("#phone");
    const nameMsg = document.querySelector(".nameMsg");
    const phoneMsg = document.querySelector(".phoneMsg");

    if (!namePattern.test(username.value.trim())) {
        username.classList.toggle("error");
        nameMsg.textContent = "Enter a valid name!";
        isFormValid = false;
    } else isFormValid = true;

    if (!phonePattern.test(userPhone.value.trim())) {
        userPhone.classList.toggle("error");
        phoneMsg.textContent = "Enter a valid phone number";
        isFormValid = false;
    } else isFormValid = true;

    if (isFormValid) {
        checkoutForm.classList.add("hidden");
        alert("Thank you for your order! Your delicious food is now being prepared and it will arrive at your table very soon. Enjoy your meal!");
        
        // Remove saved foods
        localStorage.removeItem("savedFoods");
        // reload page
        window.location.reload()
    }
})