import Link from "next/link";
import { BsForkKnife } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { RiCupFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="mt-18 bg-amber-50 py-8 px-2 md:px-8 lg:px-18 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8">
        {/* 1 */}
        <section className="flex flex-col gap-3">
          <img src="/images/logo.webp" alt="Logo" className="w-40" />
          <p>
            Sharing traditions from the Ethiopian highlands — one Gursha at a
            time.
          </p>
          <div className="flex items-center">
            <RiCupFill className="text-dark-yellow w-12 h-8 p-2 rounded-lg" />
            <p className="text-[10px] md:text-xs">
              Traditional Coffee Ceremony daily at 4:00 PM
            </p>
          </div>
        </section>

        {/* 2 */}
        <section className="flex flex-col gap-1 my-2">
          <h3 className="font-semibold">HOSPITALITY HOURS</h3>
          <p>Tuesday - Sunday: 11:30AM - 11:00PM</p>
          <p>Monday: Reserved for Private Banquets</p>
          <small>Jebena Buna & Fresh Roasting All Evening</small>
        </section>

        {/* 3 */}
        <section className="flex flex-col gap-1 my-2">
          <h3 className="font-semibold">DIETARY TRADITIONS</h3>
          <p>Vegan Fasting (Beyaynetu / Tsom)</p>
          <p>Traditional Prime Meat Feasts</p>
          <p>House Tej (Pure Honey Wine)</p>
          <p>Jebena Buna Roasting Ceremony</p>
        </section>

        {/* 4 */}
        <section className="flex flex-col gap-1 my-2">
          <h3 className="font-semibold">ADDIS LOCATION</h3>
          <p>Bole Medhanialem, Addis Ababa & express delivery across town.</p>
          <p className="text-dark-red">+251 911 234 567</p>
          <div className="flex items-center gap-2 text-gray-600 mt-2 text-xl">
            <BsForkKnife />
            <RiCupFill />
            <CiShare2 />
          </div>
        </section>
      </div>

      {/* 5 */}
      <section className="flex flex-col lg:flex-row items-center lg:justify-between gap-2 mt-12 text-xs md:text-sm text-center">
        <p>
          © 2025 Mesob House Habesha Dining. Authentic Ethiopian & Eritrean
          Heritage.
        </p>
        <div className="flex item-center gap-4">
          <Link href={"#"}>Gursha Hospitality</Link>
          <Link href={"#"}>Privacy Policy</Link>
          <Link href={"#"}>Terms of Table</Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;