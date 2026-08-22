const applyToAll = (prices, fn) => {
    const withVat = [];
    for (const price of prices) {
        withVat.push(fn(price));
    }

    return withVat;
}

const calculateVat = price => price + (price * 0.15);

const prices = [120, 300, 230];
console.log(applyToAll(prices, calculateVat));