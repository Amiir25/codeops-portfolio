// Use a closure to keep the points balance private — no outside code can read or change it directly.
const calculatePoints = () => {
    let points = 0;

    // Expose three operations:
    // earn(amount) - should add points (e.g. 1 point per 10 ETB spent)
    const earn = (amount) => {
        points += (amount / 10);
    }

    // redeem(amount) - should subtract, but refuse to go below zero.
    const redeem = (amount) => {
        if (points === 0) return;
        if (points - amount < 0) {
            points = 0;
            return;
        }
        points -= amount;
    }

    // balance() (a getter that returns the current points).
    const balance = () => points;

    return {earn, redeem, balance};
}

// Use a higher-order function to apply an "earn rule" passed in — so a holiday rule (double points) can be swapped in without changing the module.

const user1 = calculatePoints();
user1.earn(50);
user1.earn(500);
user1.redeem(600)
console.log(user1.balance())