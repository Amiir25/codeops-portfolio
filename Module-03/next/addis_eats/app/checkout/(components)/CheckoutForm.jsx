import { BiCloudDownload } from "react-icons/bi";
import { LuSquareUser } from "react-icons/lu";
import { MdMyLocation } from "react-icons/md";
import { RiSendPlaneLine } from "react-icons/ri";
// import { useAuth } from "../auth/AuthContext";

const CheckoutForm = () => {
//   const { currentUser } = useAuth();
//   const { name, phone, email } = currentUser;

  return (
    <>
      <form className="mt-8">
        {/* Contact & Guest Details */}
        <section action="">
          <header className="flex items-center justify-between">
            <h2 className="flex items-center gap-2">
              <LuSquareUser className="text-brand" />
              <span className="text-gray-800">1. Contact & Guest Details</span>
            </h2>
            <p className="text-[10px] md:text-sx lg:text-sm bg-light-yellow text-dark-yellow px-2 py-1 rounded-xl">
              Habesha Hospitality
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <label htmlFor="name" className="text-xs flex flex-col gap-1">
              RECIPIENT NAME
              <input
                type="text"
                id="name"
                value={name}
                className="p-2 bg-light-red rounded"
              />
            </label>
            <label htmlFor="phone" className="text-xs flex flex-col gap-1">
              PHONE (CALLS & TELEGRAM SMS)
              <input
                type="tel"
                id="phone"
                value={phone}
                className="p-2 bg-light-red rounded"
              />
            </label>
          </div>
          <label
            htmlFor="email"
            className="text-xs flex flex-col gap-1 mt-2 max-w-100"
          >
            EMAIL FOR DIGITAL RECEIPT
            <input
              type="email"
              id="email"
              value={email}
              className="p-2 bg-light-red rounded"
            />
          </label>
        </section>

        {/* Delivery Location */}
        <section className="mt-8">
          <header className="flex items-center justify-between">
            <h2 className="flex items-center gap-2">
              <MdMyLocation className="text-brand" />
              <span className="text-gray-800">2. Delivery Location</span>
            </h2>
            <p className="text-[10px] md:text-xs lg:text-sm bg-green-50 text-green-900 px-2 py-1 rounded-xl flex items-center gap-1">
              <BiCloudDownload />
              <span>Insulated Mesob Carrier</span>
            </p>
          </header>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <label htmlFor="sub-city" className="text-xs flex flex-col gap-1">
              SUB-CITY
              <input
                type="text"
                id="sub-city"
                className="p-2 bg-light-red rounded"
              />
            </label>
            <label htmlFor="street" className="text-xs flex flex-col gap-1">
              NEIGHBORHOOD
              <input
                type="tel"
                id="street"
                className="p-2 bg-light-red rounded"
              />
            </label>
          </div>
          <label
            htmlFor="landmark"
            className="text-xs flex flex-col gap-1 mt-2 max-w-100"
          >
            STREET, BUILDING, FLAT NO.
            <input
              type="email"
              id="landmark"
              className="p-2 bg-light-red rounded"
            />
          </label>
        </section>

        {/* Dispatching time */}
        <section className="mt-4">
          <h3 className="text-gray-800">DESIRED DISPATCH TIMING</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex items-baseline gap-2 bg-light-red px-1 py-2 rounded">
              <input type="radio" />
              <div>
                <h4 className="font-semibold">Immediate Dispatch</h4>
                <p className="text-sm">
                  Fresh & hot off clay stove (~35–45 min)
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2 bg-light-red px-1 py-2 rounded">
              <input type="radio" />
              <div>
                <h4 className="font-semibold">Schedule for Dinner</h4>
                <p className="text-sm">Set for evening feast (e.g., 7:30 PM)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-light-red mt-4 px-1 py-2 rounded max-w-">
            <div className="flex items-center gap-2">
              <RiSendPlaneLine className="text-brand" />
              <p className="flex flex-col">
                <span className="font-semibold text-sm">
                  Direct Kitchen-to-Door Route
                </span>
                <span className="text-xs">
                  Dispatched with heated earthen tray covers
                </span>
              </p>
            </div>
            <p className="text-xs bg-white text-green-900 px-2 py-1 rounded-xl w-fit text-center">
              Bole Zone Priority
            </p>
          </div>
        </section>
      </form>
    </>
  );
};

export default CheckoutForm;