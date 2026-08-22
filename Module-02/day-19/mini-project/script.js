// Elements
const inputForm = document.querySelector(".input-form");
const nameInput = document.querySelector("#item-name");
const priceInput = document.querySelector("#item-price");
const submitBtn = document.querySelector(".submit");
const list = document.querySelector(".list");
const total = document.querySelector(".total");
let totalPrice = 0;

const calculatePrice = (type, price) => {
    if (type === "add") {
        totalPrice += Number(price);
    } else {
        totalPrice -= Number(price);
    }

    total.textContent = `${totalPrice} ETB`;
}

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check the form
    if (!nameInput.value || !priceInput.value) {
        alert("Enter both the name and price of the item");
        return;
    }
    
    // List item wrapper (li)
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");

    // Item name
    const item = document.createElement("span");
    item.classList.add("item");
    item.textContent = nameInput.value

    // Item price
    const price = document.createElement("span");
    price.classList.add("price");
    price.textContent = `${priceInput.value}`;

    // Buttons wrapper
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    // Bought button
    const boughtBtn = document.createElement("button");
    boughtBtn.classList.add("bought-btn");
    boughtBtn.textContent = "Bought";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    // Append
    buttons.append(boughtBtn, deleteBtn);
    listItem.append(item, price, buttons);
    list.append(listItem);

    // Add total price
    calculatePrice("add", priceInput.value);

     // Clear form
    nameInput.value = "";
    priceInput.value = "";
})



// const listItem = document.querySelector(".list-item")
list.addEventListener("click", (e) => {
    const selected = e.target;
    const selectedItem = selected.closest(".list-item");
    const selectedItemPrice = selectedItem.querySelector(".price").textContent;

    if (selected.classList.contains("bought-btn")) {
        selectedItem.classList.toggle("bought");

        const type = selectedItem.classList.contains("bought") ? "remove" : "add";
        calculatePrice(type, selectedItemPrice);

    } else if (selected.classList.contains("delete-btn")) {
        
        if (!selectedItem.classList.contains("bought")) {
            calculatePrice("remove", selectedItemPrice);
        }
        selectedItem.remove();
    }
})

