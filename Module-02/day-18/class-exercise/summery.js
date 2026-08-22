import { orders } from "./orders.js";
import { withVat, format } from "./pricing.js";

const calculateOrders = (orders) => {
    const ordersWithTotals = orders.map((({items, ...otherInfo}) => {
        const perOrderTotal = items.reduce((acc, {qty, unitPrice}) => {
            return acc + (qty * unitPrice);
        }, 0)

        return { ...otherInfo, items, perOrderTotal }
    }))
    
    return ordersWithTotals;
}

const calculateSubtotal = () => {
    const subtotal = calculateOrders(orders).reduce((sum, { perOrderTotal} ) => {
        return sum + perOrderTotal
    }, 0)
    return subtotal;
}

const grandTotal = () => {
    console.log(`\
        Grand Total: ${withVat(calculateSubtotal())}
    `);
}

const filterHighOrders = () => {
    const highOrders = calculateOrders(orders).filter(({ perOrderTotal }) => perOrderTotal >= 3000);

    console.log(`\
        Orders over 3000 ETB
        ********************
    `);
    highOrders.map(order => format(order));
    grandTotal()
}

filterHighOrders()