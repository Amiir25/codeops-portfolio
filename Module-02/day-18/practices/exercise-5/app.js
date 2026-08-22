import { addVat, VAT } from "./money.js";


const prices = [467, 263, 912, 732, 1837, 418, 264, 183, 128, 704 ];

const withVat = prices.map(price => addVat(price));
console.log(withVat)