import { filterCredits, filterDebits } from "./report.js";
import { transactions } from "./transactions.js";

transactions.map(({ customer, amount }) => {
    console.log(`${customer}: ${amount}`);
})

// Update one transaction
const updatedTransaction = {
    ...transactions[4],
    amount: 955
}

// Print credit and debit amounts
console.log("\n****************\n");
console.log(`Total credit amount: ${filterCredits()}`);
console.log(`Total debit amount: ${filterDebits()}`);