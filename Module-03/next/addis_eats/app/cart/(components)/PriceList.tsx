import { CiDeliveryTruck } from "react-icons/ci";
import { LuTicketCheck } from "react-icons/lu";
import useCartStore from "./useCartStore";

const PriceLists = () => {
  const cart = useCartStore(state => state.cart);
  const subtotal = useCartStore(state => state.subtotal());
  const vat = useCartStore(state => state.vat());

  // Basket Ladger section
  const priceLists = [
    {
      id: 1,
      text: `Items Subtotal (${cart.length} items)`,
      amount: `${subtotal}`,
    },
    { id: 2, text: "100% Teff Injera Upgrade", amount: 60 },
    { id: 3, text: "Insulated Traditional Clay-Pak", amount: 40 },
    {
      id: 4,
      icon: CiDeliveryTruck,
      text: "Delivery Fee (Bole Zone)",
      amount: "FREE",
    },
    { id: 5, text: "City VAT & Tourism Levy (15%)", amount: vat },
    { id: 6, icon: LuTicketCheck, text: "GURSHA2025 APPLIED", amount: 200 },
  ];

  return (
    <section>
      {priceLists.map((list) => {
        const { id, icon: Icon, text, amount } = list;
        return (
          <div
            key={id}
            className={`flex items-center justify-between text-sm my-1
                  ${id === 4 && "text-green-800"}
                  ${id === 6 && "bg-light-red text-dark-yellow px-2 py-1"}
                `}
          >
            <div className="flex items-center gap-1">
              {Icon && <Icon />}
              <p>{text}</p>
            </div>
            <p
              className={`px-2 py-1 rounded-2xl
                    ${id === 4 && "bg-green-200/50"}
                    ${id == 6 && "text-brand font-semibold"}
                  `}
            >
              {id === 6 && "-"}
              {id !== 4 && "ETB"} {amount}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default PriceLists;