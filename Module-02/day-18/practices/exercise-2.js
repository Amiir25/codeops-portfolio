/**
 * Build a customer object with name, city and balance, then log every key and value using
 * Object.entries in a for...of loop.
 */

// Customer object
const customer = {
    name: "Almaz Abera",
    city: "Addis Ababa",
    balance: 123000,
}

// Loop with Object.entries
for (const [key, value] of Object.entries(customer)) {
    console.log(`- ${key}: ${value}`);
}