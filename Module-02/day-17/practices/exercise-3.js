function discountBy(rate) {
    rate = (rate / 100);

    return price => {
        return price -= (price * rate);
    }
}

const memberPrice = discountBy(10);
const salesPrice = discountBy(30);

console.log(memberPrice(1000));
console.log(salesPrice(1000));
