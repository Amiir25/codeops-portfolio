/**
 * Given an array of ETB prices, use map to add 15% VAT, filter to keep those under 1000, and
 * reduce to a grand total.
 */

const prices = [467, 263, 912, 732, 1837, 418, 264, 183, 128, 704 ];

// 1. Add 15% VAT
const withVat = prices.map((price) => price + (price * 0.15));

// 2. Filter those under 1000
const above1k = withVat.filter(price => price >= 1000);

// 3. Reduce to grand total
const grandTotal = withVat.reduce((total, price) => total + price, 0);