import { transactions } from "./transactions.js";

// Filter credits
export const filterCredits = () => {
    const credits = transactions.filter(t => t.type === "credit");
    const totalCredit = credits.reduce((sum, c) => sum + c.amount, 0);

    return totalCredit;
}

// Filter debits
export const filterDebits = () => {
    const debits = transactions.filter(t => t.type === "debit");
    const totalDebit = debits.reduce((sum, c) => sum + c.amount, 0);

    return totalDebit;
}