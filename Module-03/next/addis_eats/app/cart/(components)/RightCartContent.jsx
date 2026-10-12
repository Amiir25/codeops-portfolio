import PriceLists from "./PriceList";
import Button from "@/components/ui/Button";
import { FaArrowRight, FaMoneyBill } from "react-icons/fa6";
import { SiMealie } from "react-icons/si";
import { RiCupFill } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { IoMdLock } from "react-icons/io";
import useCartStore from "./useCartStore";
import { useRouter } from "next/navigation";

// Bottom list
const bottomList = [
  {
    id: 1,
    icon: GiHotMeal,
    iconColor: "text-gree-900",
    text: "Piping Warm Delivery in woven Mesob packaging",
  },
  {
    id: 2,
    icon: FaMoneyBill,
    iconColor: "text-yellow-900",
    text: "Telebirr, CBE Birr, Cash & Card on delivery",
  },
  {
    id: 3,
    icon: IoMdLock,
    iconColor: "text-red-900",
    text: "Encrypted checkout & real-time dispatcher SMS",
  },
];

const RightCartContent = () => {
  const total = useCartStore(state => state.total());
  const router = useRouter();

  return (
    <div className="bg-white px-4 py-8 shadow rounded-xl h-fit">
      {/* Title */}
      <section className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Basket Ladger</h2>
        <p className="bg-light-yellow text-dark-red px-2 py-1 rounded">
          Birr (ETB)
        </p>
      </section>

      {/* Price List */}
      <PriceLists />

      {/* Cupon */}
      <section className="flex items-center justify-between mt-4 text-xs">
        <input type="text" placeholder="Have another cupon code?" />
        <Button color="light-red">Apply</Button>
      </section>

      {/* Grand total */}
      <section className="mt-8 bg-light-red px-4 py-2 mx-2 rounded">
        <p className="text-xs flex items-center justify-between">
          <span className="text-gray-800">GRAND TOTAL</span>
          <span className="text-dark-yellow">Taxes included</span>
        </p>
        <h2 className="mt-2 text-3xl text-brand font-bold">ETB {total}</h2>
      </section>

      {/* Checkout */}
      <section className="mt-8">
        <Button color="brand" onClick={() => router.push("/checkout")}>
          Proceed to Delivery Checkout
          <FaArrowRight />
        </Button>
      </section>

      {/* More dishes */}
      <section className="text-sm flex items-center justify-center gap-2 mt-4">
        <SiMealie />
        <p>Explore more dishes from our Menu</p>
      </section>

      {/* Bottom list */}
      <section className="mt-8">
        {bottomList.map((item) => {
          const { id, icon: Icon, iconColor, text } = item;
          return (
            <div key={id} className="flex items-center gap-2 text-xs my-1">
              <Icon className={`${iconColor}`} />
              <p>{text}</p>
            </div>
          );
        })}
      </section>

      {/* Jebena Buna */}
      <section className="mt-8 p-4 bg-light-red mx-2 rounded flex items-start gap-4">
        <RiCupFill className="bg-green-100 text-green-900 w-12 h-12 p-3 rounded" />
        <div className="flex-2">
          <h3 className="font-semibold">Adding Fresh Jebena Buna?</h3>
          <p className="text-xs">
            Complement your feast with our 4:00 PM ritual roasted coffee beans
            with frankincense aroma.
          </p>
          <p className="text-brand mt-2 text-xs flex items-center gap-2">
            <span>ADD TO ORDER</span>
            <FaArrowRight />
          </p>
        </div>
      </section>
    </div>
  );
};

export default RightCartContent;