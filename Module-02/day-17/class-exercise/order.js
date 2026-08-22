"use strict";

/**
 * Write subtotal(...prices) using a reduce callback.
 * Use rest parameters to accept any number of prices [2, 3].
 */
const subtotal = (...prices) =>
  prices.reduce((total, price) => total + price, 0);

/**
 * Write discountBy(rate) as a factory returning an arrow function.
 * This is a Higher-Order Function (HOF) that creates a closure over the rate [2, 3].
 */
const discountBy = (rate) => {
  return n => n * (1 - rate);
};

/**
 * Add withVat as a small pure helper.
 * It should add 15% VAT to a given amount [2, 3].
 */
const withVat = n => n * 1.15;

/**
 * Add toETB as a small pure helper.
 * It should format a number to 2 decimal places followed by " ETB" [2, 3].
 */
const toETB = n => `${n.toFixed(2)} ETB`;

/**
 * Build makeReceiptMaker() with a private order number.
 * This function uses a closure to maintain the state of orderNo across calls [4, 5].
 * Inside, it should pre-build a 10% member discount function using discountBy(0.10) [5].
 */
function makeReceiptMaker() {
  let orderNo = 0; // Private state [4]
  const memberOff = discountBy(0.1);

  return function (...items) {
    // 1. Increment orderNo
    orderNo++;

    // 2. Calculate subtotal of items
    const beforeVat = subtotal(...items);

    // 3. Compose: apply discount, then VAT
    const total = withVat(memberOff(beforeVat));

    // 4. Format and return receipt string (e.g., "#1: 538.20 ETB")
    return `#${orderNo}: ${toETB(total)}`;
  };
}

// Export for run.js
if (typeof module !== "undefined") {
  module.exports = { subtotal, discountBy, withVat, toETB, makeReceiptMaker };
}
