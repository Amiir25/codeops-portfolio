import { FaCrown } from "react-icons/fa6";
import DishImages from "./DishImages";

const DishDetailLeftContent = ({ selectedDish }) => {

  return (
    <div className="hidden md:block">
      {/* Images */}
      <DishImages selectedDish={selectedDish}/>

      {/* Text */}
      <section className="flex items-start gap-6 bg-light-red mt-8 px-4 py-8 rounded">
        <FaCrown className="text-brand text-xl" />
        <div className="flex-2">
          <p className="text-xs">
            <span className="text-dark-yellow">HERITAGE & LINEAGE . </span>
            <span className="text-gray-900">The Crown Jewel</span>
          </p>
          <h2 className="font-semibold text-xl">
            Royal Feast of the Highlands
          </h2>
          <p className="text-sm">
            Traditionally reserved for festive holidays such as Fasika and
            Enkutatash, Doro Wat is the ultimate test of culinary mastery. Each
            pot demands simmering over 3 kilograms of hand-chopped sweet red
            onions without a single drop of water, patiently reduced for half a
            day with our hand-milled berbere spice blend and nit'ir qibe
            (aromatic clarified butter).
          </p>
        </div>
      </section>
    </div>
  );
};

export default DishDetailLeftContent;