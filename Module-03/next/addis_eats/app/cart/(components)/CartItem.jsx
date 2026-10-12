import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import useCartStore from "./useCartStore";

const CartItem = () => {
  const cart = useCartStore(state => state.cart);
  const increment = useCartStore(state => state.increment);
  const decrement = useCartStore(state => state.decrement);
  const removeDish = useCartStore(state => state.removeDish);

  return (
    <section className="mt-4 flex flex-col gap-8">
      {cart.map((item) => {
        const { id, nameEn, nameAm, description, priceETB, qty, imagePath } = item;
        return (
          <div
            key={id}
            className="flex flex-col lg:flex-row items-center justify-between gap-y-2 bg-white p-4 rounded-xl"
          >
            {/* Left section */}
            <section className="flex flex-col lg:flex-row gap-4">
              <div className="h-30 lg:h-auto w-full lg:w-40">
                <img
                  src={`${imagePath}/image-main.webp`}
                  alt=""
                  className="w-full h-full object-cover lg:object-contain"
                />
              </div>
              <div className="lg:max-w-60">
                <div className="font-semibold">
                  <h2 className="text-xl inline mr-2">{nameEn}</h2>
                  <span className="text-base text-dark-yellow">({nameAm})</span>
                </div>
                <p className="text-sm mt-2">{description}</p>
              </div>
            </section>

            {/* Right Section */}
            <section className="flex lg:flex-col items-center lg:items-end justify-around gap-y-2">
              <p className="font-bold text-brand">ETB {priceETB}</p>
              <div className="flex items-center gap-6 bg-light-red w-fit py-1 px-2 rounded">
                <button
                  onClick={() => decrement(id)}
                  className="bg-white px-2 py-1 rounded"
                >
                  <FaMinus />
                </button>
                <p className="font-semibold text-dark-red text-lg">
                  {item.qty}
                </p>
                <button
                  onClick={() => increment(id)}
                  className="bg-white px-2 py-1 rounded"
                >
                  <FaPlus />
                </button>
              </div>
              <button onClick={() => removeDish(id)}>
                <MdDeleteForever className="text-2xl text-rose-500" />
              </button>
            </section>
          </div>
        );
      })}
    </section>
  );
};

export default CartItem;