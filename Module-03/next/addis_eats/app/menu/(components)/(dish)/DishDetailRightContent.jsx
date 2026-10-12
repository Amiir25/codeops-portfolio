import {
  FaBagShopping,
  FaCircle,
  FaCircleUp,
  FaFire,
  FaHeart,
  FaMinus,
  FaPercent,
  FaPlus,
  FaUsers,
} from "react-icons/fa6";
import Button from "@/components/ui/Button";
import DishImages from "./DishImages";
import useCartStore from "@/app/cart/(components)/useCartStore";

// Spicy level
const spicyLevels = [
  {
    id: 1,
    title: "Mild",
    text: "Alicha touch, fragrant cardamoms",
    rank: "1/3",
  },
  {
    id: 2,
    title: "Traditional",
    text: "Berbere warmth (Recommended)",
    rank: "2/3",
  },
  {
    id: 3,
    title: "Fiery Awaze",
    text: "Served with Awaze & Mitmita dip",
    rank: "3/3",
  },
];

// Side Accents
const sideAccents = [
  { id: 1, title: "Fresh Ayib", text: "Mild fresh cottage curd", tag: "Free" },
  {
    id: 2,
    title: "Stewed Gomen",
    text: "Garlic infused collard greens",
    tag: "Free",
  },
  {
    id: 3,
    title: "House Awaze Paste",
    text: "Aged tej and berbere sauce",
    tag: "Free",
  },
  {
    id: 4,
    title: "Extra Braised Egg",
    text: "Slow cooked in the wat broth",
    tag: "+ETB 40",
  },
];

const DishDetailRightContent = ({ selectedDish }) => {
  const addDish = useCartStore((state) => state.addDish);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);

  const cartItem = useCartStore((state) =>
    state.cart.find((item) => item.id === selectedDish.id),
  );

  const inCart = Boolean(cartItem);
  const qty = cartItem?.qty ?? 0;

  const handleOrder = () => {
    addDish(selectedDish);
  };

  const handlePlus = () => {
    if (inCart) increment(selectedDish.id);
    else handleOrder();
  };

  return (
    <div>
      {/* Image */}
      <section className="md:hidden">
        <DishImages selectedDish={selectedDish} />
      </section>

      {/*  */}
      <section>
        <h1 className="font-bold mt-2 flex flex-col md:flex-row md:items-baseline gap-x-2">
          <span className="text-xl md:text-2xl lg:text-4xl text-brand italic">
            {selectedDish?.nameEn}
          </span>
          <small className="text-dark-yellow lg:text-xl">
            ({selectedDish?.nameAm})
          </small>
        </h1>
        <p className="text-sm lg:text-base tracking-wide my-2">
          {selectedDish?.description}
        </p>
      </section>

      {/*  */}
      <section className="mt-4 flex flex-col md:flex-row md:items-center justify-center gap-x-4">
        <p className="flex items-center gap-1 text-amber-900 text-sm">
          <FaUsers />
          <span>{selectedDish?.servings}</span>
        </p>
        <p className="flex items-center gap-1 text text-gray-800 text-sm">
          <FaCircleUp />
          <span>Unlimited table Injera refill included</span>
        </p>
        <p className="flex items-center gap-1 text text-green-900 text-sm">
          <FaPercent />
          <span>Taxes included</span>
        </p>
      </section>

      {/* 1. Heat & Spicy Level */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>1. Heat & Spicy Level</span>
          <FaFire className="text-brand" />
        </h2>
        <div className="mt-2 flex flex-col md:flex-row md:items-center gap-2">
          {spicyLevels.map((level) => {
            const { id, title, text, rank } = level;
            return (
              <div
                key={id}
                className={`px-4 py-2 rounded
                  ${selectedDish.spiceLevel.includes(rank) ? "bg-brand text-light-red" : "bg-light-red text-gray-800"}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{title}</p>
                  <p>{rank}</p>
                </div>
                <p className="text-xs lg:text-sm">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Traditional Injera base */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>2. Traditional Injera base</span>
          <FaCircle className="text-dark-yellow" />
        </h2>
        <div className="flex items-center justify-between bg-brand text-light-red px-4 py-2 rounded-xl mt-1">
          <div>
            <p className="font-semibold text-sm">
              Standard Teff & Barley Blend
            </p>
            <p className="text-xs">
              Spongy, tart sourdough, naturally soft (Traditional)
            </p>
          </div>
          <p className="text-sm">Included</p>
        </div>
        <div className="flex items-center justify-between bg-light-red text-gray-800 px-4 py-2 rounded-xl mt-1">
          <div>
            <p className="font-semibold text-sm">
              100% Pure Organic Brown Teff
            </p>
            <p className="text-xs">
              Naturally 100% Gluten-Free, iron-rich nutty grain
            </p>
          </div>
          <p className="text-sm">+ETB 60</p>
        </div>
      </section>

      {/* 3. Complimentary Side Accents */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          3. Complimentary Side Accents
        </h2>
        <p className="text-dark-red text-sm">
          Select up to 2 artisanal palate companions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {sideAccents.map((accent) => {
            const { id, title, text, tag } = accent;
            return (
              <div
                key={id}
                className="flex items-center justify-between px-2 py-4 rounded-xl bg-light-red"
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="accent-brand" />
                  <p>
                    <span className="block font-semibold">{title}</span>
                    <span>{text}</span>
                  </p>
                </div>
                <p>{tag}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Buttons */}
      <section className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 bg-light-red w-fit py-1 px-2 rounded">
          <button onClick={() => decrement(selectedDish.id)} disabled={!inCart}>
            <FaMinus />
          </button>
          <p className="font-semibold text-dark-red text-lg">{qty}</p>
          <button onClick={handlePlus}>
            <FaPlus />
          </button>
        </div>
        <div>
          <Button color="brand" onClick={handleOrder} disabled={inCart}>
            <FaBagShopping />
            <span>Add to Order . ETB {selectedDish.priceETB}</span>
          </Button>
        </div>
      </section>

      {/* Bottom */}
      <section className="flex items-center justify-between mt-10">
        <p className="flex items-center gap-1 text-sm text-gray-800">
          <FaHeart />
          <span>Save to Favorites</span>
        </p>
        <p className="flex items-center gap-1 text-sm text-dark-yellow">
          <FaUsers />
          <span>Order as Group Mesob Feast</span>
        </p>
      </section>
    </div>
  );
};

export default DishDetailRightContent;