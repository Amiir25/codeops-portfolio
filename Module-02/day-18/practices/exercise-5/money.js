/**
 * Split a tiny program into two files: a money.js module that exports addVat and VAT, and an
 * app.js that imports and uses them.
 */

export const VAT = 0.15;
export const addVat = (price) => price + (price * VAT);