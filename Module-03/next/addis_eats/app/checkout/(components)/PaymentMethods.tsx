import { CiBank, CiCreditCard1 } from "react-icons/ci";
import { LuCreditCard } from "react-icons/lu";
import { MdMyLocation, MdQrCodeScanner } from "react-icons/md";

// Payment methods
const paymentMethods = [
  {
    id: 1,
    tag: "tb",
    name: "Telebirr",
    description: "Instant SuperApp QR prompt or USSD confirmation",
    icon: MdQrCodeScanner,
    color: "bg-blue-950",
  },
  {
    id: 2,
    tag: "CBE",
    name: "CBE Birr / CBE Mobile Banking",
    description: "Direct settlement via Commercial Bank of Ethiopia",
    icon: CiBank,
    color: "bg-green-950",
  },
  {
    id: 3,
    tag: "POS",
    name: "Cash or Card on Delivery",
    description:
      "Rider delivers with wireless POS card terminal + change for cash",
    icon: CiCreditCard1,
    color: "bg-red-950",
  },
  {
    id: 4,
    tag: "AB",
    name: "Amole / Awash Birr",
    description: "Dashen Amole wallet or Awash Birr direct integration",
    icon: LuCreditCard,
    color: "bg-gray-950",
  },
];

const PaymentMethods = () => {
  return (
    <section className="mt-8">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2">
          <MdMyLocation className="text-brand" />
          <span className="text-gray-800">3. Payment Methods</span>
        </h2>
        <p className="text-[10px] lg:text-xs text-dark-red px-2 py-1 rounded-xl flex items-center gap-1 tracking-wide">
          <span>Encrypted & Direct</span>
        </p>
      </header>
      <div className="flex flex-col gap-2 mt-2">
        {paymentMethods.map((method) => {
          const { id, tag, name, description, icon: Icon, color } = method;
          return (
            <section
              key={id}
              className="flex items-center justify-between bg-light-red px-2 py-4 rounded"
            >
              <div className="flex items-center gap-2">
                <input type="radio" />
                <p
                  className={`${color} text-white w-14 h-8 flex items-center justify-center p-1 rounded`}
                >
                  {tag}
                </p>
                <p className="flex flex-col">
                  <span className="text-sm font-semibold">{name}</span>
                  <span className="text-xs">{description}</span>
                </p>
              </div>
              <Icon className="text-gray-500" />
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethods;