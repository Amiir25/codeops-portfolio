import CTA from "@/components/home/CTA";
import GurshaSpirit from "@/components/home/GurshaSpirit";
import HomeHero from "@/components/home/HomeHero";
import Reflections from "@/components/home/Reflections";
import SpecialDishes from "@/components/home/SpecialDishes";
import { FaCircleCheck } from "react-icons/fa6";

const Home = () => {
  return (
    <main className="px-2 md:px-8 lg:px-18 mt-8">
      {/* Top text */}
      <section className="mx-2 flex items-center justify-center md:justify-between gap-4 text-[10px] mt-4 bg-light-red p-1 rounded-2xl tracking-wider">
        <div className="flex items-center gap-4 lg:ml-12">
          <FaCircleCheck className="text-dark-yellow" />
          <p className="flex flex-col lg:flex-row lg:items-center gap-x-4">
            <span className="text-dark-red">100% PURE TEFF</span>
            <span className="text-dark-yellow">Slow-Cooked Daily</span>
            <span>Heritage grains sourced direct fro</span>
          </p>
        </div>
        <p className="bg-green-200 text-green-800 w-fit px-4 py-1 rounded-2xl">
          Gluten Free
        </p>
      </section>

      {/* Hero */}
      <HomeHero />

      {/* Specials */}
      <SpecialDishes />

      {/* Gursha Spirit */}
      <GurshaSpirit />

      {/* Reflections section */}
      <Reflections />

      {/* Call To Action */}
      <CTA />
    </main>
  );
};

export default Home;