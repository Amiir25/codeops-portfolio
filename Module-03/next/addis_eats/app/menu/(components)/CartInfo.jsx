"use client"

import { FaArrowRight, FaBagShopping, FaCircleXmark } from "react-icons/fa6";
import useCartStore from "@/app/cart/(components)/useCartStore";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const CartInfo = () => {
    const cart = useCartStore(state => state.cart);
    const total = useCartStore(state => state.total());
    const clearCart = useCartStore(state => state.clearCart);
    const router = useRouter();

  return (
    <>
      {cart.length !== 0 && (
        <section className="fixed bottom-4 inset-x-0 flex items-center justify-between gap-1 bg-gray-700 p-2 w-[95%] max-w-150 mx-auto rounded-xl text-sm transition-all duration-300">
          <div className="flex items-center gap-2">
            <div className="relative">
              <FaBagShopping className="bg-light-yellow text-dark-yellow w-12 h-8 p-1 rounded" />
              <small className="absolute -top-2 right-0 bg-brand text-white font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </small>
            </div>
            <div>
              <p className="text-light-red">Selected: {cart.length} item(s)</p>
              <p className="text-light-yellow">ETB {total}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <FaCircleXmark className="text-xl text-white" onClick={() => clearCart()}/>
            <Button color="brand" onClick={() => router.push("/cart")}>
              Proceed to Cart
              <FaArrowRight />
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default CartInfo;