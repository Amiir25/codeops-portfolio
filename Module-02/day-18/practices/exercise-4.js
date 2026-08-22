/**
 * Take a customer object and produce an updated copy with spread that changes the city and
 * adds a phone field — without mutating the original.
 */

// Customer object
const customer = {
    name: "Almaz Abera",
    city: "Addis Ababa",
    balance: 123000,
}

// Updated customer
const updatedCustomer = {
    ...customer,
    city: "Adama",
    phone: "+251912345678",
}
