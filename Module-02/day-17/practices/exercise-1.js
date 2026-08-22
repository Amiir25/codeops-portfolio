// Function declaration
function vat(amount, rate=0.15) {
    return amount + (amount * rate);
}

// Arrow function
const vat = (amount, rate=0.15) => amount + (amount * rate);