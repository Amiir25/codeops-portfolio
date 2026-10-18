"use client"

import EmptyCartState from "../cart/(components)/EmptyCartState";
import LeftCheckoutContent from "./(components)/LeftCheckoutContent";
import RightCheckoutContent from "./(components)/RightCheckoutContent";
import useCartStore from "../cart/(components)/useCartStore";

const Checkout = () => {
  const cart = useCartStore(state => state.cart);

  // Empty cart state
  if (cart.length === 0) {
    return (
      <EmptyCartState
        message="Explore our menu to find your favorite meals.  You'll proceed
        to checkout after adding dishes to cart."
        />
    );
  }

  return (
    <main className="px-2 md:px-8 lg:px-18 pt-8 bg-light-red/40">
      {/* Titles */}
      <section className="max-w-200 mt-8">
        <h1 className="text-dark-red text-3xl lg:text-5xl font-bold">
          Checkout & Payment
        </h1>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Left content */}
        <LeftCheckoutContent/>

        {/* Right content */}
        <RightCheckoutContent/>
      </section>
    </main>
  );
};

export default Checkout;
