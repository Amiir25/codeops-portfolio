const formContainer = document.querySelector("#form-container");
const form = document.querySelector("#form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const phone = document.querySelector("#phone");
const submitBtn = document.querySelector("#submit");

const nameMsg = document.querySelector(".nameMsg");
const emailMsg = document.querySelector(".emailMsg");
const passwordMsg = document.querySelector(".passwordMsg");
const phoneMsg = document.querySelector(".phoneMsg");

const userCount = document.querySelector("#user-count");

// RegExp
const namePattern = /^[A-Za-z]{2,}$/;
const emailPattern = /^[\w.]+@[\w.]+\.\w+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
const phonePattern = /^(?:\+251|0)9\d{8}$/;

// On load, read storage and show how many people have signed up.
let registeredUsers = localStorage.getItem("registeredUsers")
    ? Number(localStorage.getItem("registeredUsers"))
    : 0;

registeredUsers
    ? userCount.textContent = `${registeredUsers} user(s) are registered sofar.`
    : "";

// On submit, preventDefault and read the trimmed field values.
const validate = (e) => {
    e.preventDefault();
    let isFormValid = true;

    

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const phoneValue = phone.value.trim();

    // Validate: name at least two characters; phone against the Ethiopian regex.
    // Show a clear, specific message for the first problem found.
    // if (!(namePattern.test(nameValue))) 
    if (nameValue < 2) {
        nameMsg.textContent = "Name must be at leat 2 characters";
        name.classList.add("error");
        nameMsg.classList.add("error");
        isFormValid = false;
    }

    if (!(emailPattern.test(emailValue))) {
        emailMsg.textContent = "Enter a valid email address";
        email.classList.add("error");
        emailMsg.classList.add("error");
        isFormValid = false;
    }

    if (!(passwordPattern.test(passwordValue))) {
        passwordMsg.textContent = "Password must be at leat 8 characters";
        password.classList.add("error");
        passwordMsg.classList.add("error");
        isFormValid = false;
    }

    if (!(phonePattern.test(phoneValue))) {
        phoneMsg.textContent = "Enter a valid phone number";
        phone.classList.add("error");
        phoneMsg.classList.add("error");
        isFormValid = false;
    }

    // On success, save the entry to localStorage as JSON.
    if (isFormValid) {
        registeredUsers++;
        const newUser= {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            phone: phoneValue,
        };

        localStorage.setItem("registeredUsers", registeredUsers);
        localStorage.setItem(nameValue, JSON.stringify(newUser));

        // clear the form
        name.value = "";
        email.vlaue = "";
        password.value = "";
        phone.value = "";
    }
}

form.addEventListener("submit", validate);
