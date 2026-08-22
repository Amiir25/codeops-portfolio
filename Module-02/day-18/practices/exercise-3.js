/**
 * Destructure name and city from a customer in one line, then write a function greet({ name })
 * that uses parameter destructuring.
 */

// Customer object
const customer = {
    name: "Almaz Abera",
    city: "Addis Ababa",
    balance: 123000,
}

// One line destructuring
const { name, city } = customer;

// greet function
const greet = ({ name }) => {
    console.log(`Hello, ${name}`);
}
greet(customer)