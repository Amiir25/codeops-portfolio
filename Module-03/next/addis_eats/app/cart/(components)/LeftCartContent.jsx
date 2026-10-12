import CartItem from "./CartItem";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaEject, FaRegHeart } from "react-icons/fa6";
import useCartStore from "./useCartStore";

// Dining Etiquette
const etiquttes = [
  {
    id: 1,
    title: "Include Traditional Handwash Basin",
    description: "Scented warm lemon towels and hand-rinsing urn presentation.",
  },
  {
    id: 2,
    title: "No Cutlery Needed (True Gursha)",
    description:
      "We embrace the communal joy of eating with fresh Injera rolls.",
  },
];

const LeftCartContent = ({ onClearTable }) => {
  const cart = useCartStore(state => state.cart);

  return (
    <div className="lg:col-span-2">
      {/* Cart header */}
      <section className="mt-8 flex items-start justify-between">
        <h2 className="lg:text-xl flex flex-col lg:flex-row gap-x-2">
          <span className="font-semibold">Clay Pot Stews & Provisions</span>
          <span className="text-dark-yellow">
            ({cart.length} handcrafted selections)
          </span>
        </h2>
        <button
          className="text-sm lg:text-base text-red-400 flex items-center gap-1"
          onClick={onClearTable}
        >
          <IoIosRemoveCircle />
          <span>Clear Table</span>
        </button>
      </section>

      {/* Cart items */}
      <CartItem />

      {/* Dining Etiquette */}
      <section className="mt-8 px-4 py-8 bg-light-red mx-2 rounded">
        <h2 className="text-dark-yellow flex items-center gap-2">
          <FaEject />
          <span className="font-semibold">
            Gursha Hospitality & Dining Etiquette
          </span>
        </h2>
        <div className="mt-4 flex flex-col lg:flex-row gap-4">
          {etiquttes.map((et) => {
            const { id, title, description } = et;
            return (
              <div
                key={id}
                className="flex items-baseline gap-2 bg-white px-2 py-4 rounded-xl"
              >
                <input type="checkbox" />
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chef Note */}
        <div className="mt-4">
          <p className="flex items-start justify-between">
            <span>Kitchen Chef Note / Injera Separation Preference</span>
            <span className="text-dark-yellow">Optional</span>
          </p>
          <div className="mt-1 focus-within:ring-2 rounded bg-white h-12 px-2 py-1">
            <input
              type="text"
              placeholder="E.g., Please wrap extra Teff rolls in heat-retaining gold foil separately from the Doro Wat pot..."
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>
      </section>

      {/* The meaning of Gursha */}
      <section className="mt-8 p-4 bg-light-red mx-2 rounded flex items-start gap-4">
        <FaRegHeart className="bg-light-yellow text-dark-red w-12 h-12 p-3 rounded" />
        <div className="flex-2">
          <h3 className="font-semibold">The Meaning of Gursha</h3>
          <p className="text-xs">
            In Habesha dining culture, placing a savory morsel directly into a
            companion's mouth with love cements friendship, trust, and shared
            celebration. Every platter at Mesob House is prepared ready for
            Gursha.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LeftCartContent;