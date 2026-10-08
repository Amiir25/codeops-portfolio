import { FaPlus, FaYelp } from "react-icons/fa6";
import Button from "../ui/Button";

// Gursha section data
const gurshaData = [
  {
    id: 1,
    tag: "HOUSE-ROASTED",
    tagColor: "bg-yellow-100 text-yellow-900",
    price: 350,
    priceColor: "text-dark-yellow",
    title: "Yirgacheffe Pour-Over",
    description:
      "Single-origin Ethiopian coffee from the highlands of Yirgacheffe, light-roasted in-house to highlight bright floral and citrus notes, served as a slow pour-over.",
    info: "250ml . Single Origin",
    button: "Add Cup",
  },
  {
    id: 2,
    tag: "DAILY INFUSION",
    tagColor: "bg-green-100 text-green-900",
    price: 80,
    priceColor: "text-dark-red",
    title: "Highlan Spice Shai",
    description:
      "Slow-simmered highland black tea leaves infused with crushed cinnamon bark, fragrant cardamom pods, cloves, and a hint of wild ginger.",
    info: "Served with Raw Sugar",
    button: "Add Cup",
  },
];

const GurshaSpirit = () => {
  return (
    <section className="px-2 py-4 md:p-8 mt-18 bg-light-red lg:flex items-center rounded-xl">
      <div>
        <p className="text-dark-red text-[10px] md:text-sm flex items-center gap-2">
          <FaYelp />
          <span>THE SPIRIT OF GURSHA</span>
        </p>
        <h1 className="text-3xl lg:text-5xl font-bold mt-2">
          "Those Who Share a Mesob Never Walk Alone."
        </h1>
        <p className="text-sm lg:text-base tracking-wide my-4">
          Gursha is the cherished act of honoring a companion by rolling choice
          morsels of wat within warm injera and feeding them directly by hand.
          At Mesob House, every table is configured for communal warmth and slow
          gratitude.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {gurshaData.map((data) => {
          const {
            id,
            tag,
            tagColor,
            price,
            priceColor,
            title,
            description,
            info,
            button,
          } = data;
          return (
            <div key={id} className="bg-white px-4 py-2 rounded">
              <div className="flex items-center justify-between">
                <p
                  className={`${tagColor} text-xs px-[.6em] py-[.3em] rounded`}
                >
                  {tag}
                </p>
                <p className={`${priceColor}`}>ETB {price}</p>
              </div>
              <h3 className="text-xl font-semibold mt-1">{title}</h3>
              <p className="text-sm my-2">{description}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs">{info}</p>
                <Button color={"light-red"}>
                  <FaPlus />
                  {button}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GurshaSpirit;