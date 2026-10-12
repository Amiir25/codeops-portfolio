import useCartStore from "@/app/cart/(components)/useCartStore";

const CheckoutCartItems = () => {
  const cart = useCartStore(state => state.cart);
  
  return (
    <section className="mt-4 flex flex-col gap-8">
      {cart.map((item) => {
        const { id, nameEn, description, priceETB, qty, imagePath } = item;
        return (
          <div
            key={id}
            className="flex flex-col lg:flex-row items-center justify-between gap-y-2 bg-white px-1 py-4 rounded-xl"
          >
            {/* Left section */}
            <section className="flex flex-col lg:flex-row gap-4">
              <div className="h-30 lg:h-auto w-full lg:w-40">
                <img
                  src={`${imagePath}/image-main.webp`}
                  alt=""
                  className="w-full h-full object-cover lg:object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-sm">{nameEn}</h2>
                <p className="text-xs">{description}</p>
                <p className="text-gray-800 mt-2 text-[10px]">Qty: {qty}</p>
              </div>
            </section>
            {/* Right Section */}
            <p className="font-bold text-brand">ETB {priceETB}</p>
          </div>
        );
      })}
    </section>
  );
};

export default CheckoutCartItems;