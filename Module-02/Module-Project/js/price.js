import { foodsOnCart } from "./script.js";

const subtotal = document.querySelector(".subtotal-price");
const vat = document.querySelector(".vat-price");
const total = document.querySelector(".total-price");
let subtotalPrice = 0;
let VAT_RATE = 0.15;
let totalPrice = 0;

export const calculatePrice = (type, selectedFood, qty) => {

    // Get the selected from cart
    const checkFoodOnCart = foodsOnCart.find(food => food.name === selectedFood.name);

    if (type === "add") {

        if (checkFoodOnCart) {
            // Add quantity by 1
            foodsOnCart.forEach(food => {
                if (food.name === checkFoodOnCart.name) {
                    food.qty += 1;
                }
            })
        } else {
            // Create new cart item
            const newItem = {
                ...selectedFood,
                qty: qty,
            }

            foodsOnCart.push(newItem);

            // Save foods
            localStorage.removeItem("savedFoods");
            localStorage.setItem("savedFoods", JSON.stringify(foodsOnCart));
        }

    } else if (type === "minus") {
        // Subtract quantity by 1
        foodsOnCart.forEach(food => {
                if (food.name === checkFoodOnCart.name) {
                    food.qty -= 1;
                }
            })

    } else if (type === "remove") {
        // Get the index of the item
        const index = foodsOnCart.findIndex(food => food.name === selectedFood.name);
        if (index !== -1) {
            foodsOnCart.splice(index, 1);
        }
    }

    subtotalPrice = foodsOnCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vatPrice = subtotalPrice * VAT_RATE;
    totalPrice = subtotalPrice + vatPrice;

    subtotal.textContent = subtotalPrice;
    vat.textContent = vatPrice;
    total.textContent = totalPrice;
}

// Remove from cart
// export const removeFromCart = (cartItem, foodName) => {
//     const index = foodsOnCart.findIndex(food => food.name === foodName);
//     if (index !== -1) {
//         foodsOnCart.splice(index, 1);
//     }
//     cartItem.remove();
// }