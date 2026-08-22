export const withVat = (subtotal) => {
    return (subtotal * 1.15).toFixed(2);
}

export const format = ({ id, customer, perOrderTotal }) => {
    console.log(`\
        - Order Id: ${id}
        - Customer: ${customer}
        - Total Price: ${perOrderTotal}
        --------------------
    `)
}
