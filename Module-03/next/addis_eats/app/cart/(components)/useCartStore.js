import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            // Add dish
            addDish: (newDish) => set((state) => {
                // Check if dish is on cart
                const existing = state.cart.find(dish => dish.id === newDish.id);

                // Increment if it exists
                if (existing) {
                    return {
                        cart: state.cart.map(dish => (
                            dish.id === newDish.id
                                ? { ...dish, qty: dish.qty + 1 }
                                : dish
                        ))
                    }
                }

                // Add new dish
                return {
                    cart: [ ...state.cart, { ...newDish, qty: 1 } ],
                };
            }),

            // Remove dish
            removeDish: (id) => set((state) => ({
                cart: state.cart.filter(dish => dish.id !== id),
            })),

            // Increment
            increment: (id) => set((state) => ({
                cart: state.cart.map(dish =>
                    dish.id === id
                        ? { ...dish, qty: dish.qty + 1 }
                        : dish
                )
            })),

            // Decrement
            decrement: (id) => set((state) => ({
                cart: state.cart
                .map(dish =>
                    dish.id === id
                        ? { ...dish, qty: dish.qty - 1 }
                        : dish
                )
                .filter((dish) => dish.qty > 0) // remove if qty reaches 0
            })),

            // Clear cart
            clearCart: () => set({ cart: [] }),

            // Prices
            subtotal: () => (
                get().cart.reduce((sum, dish) => sum + dish.priceETB * dish.qty, 0)
            ),
            vat: () => (get().subtotal() * 0.15),
            total: () => (get().subtotal() + get().vat()),
        }),
        {
            name: "savedCart",
        }
    )
);

export default useCartStore;