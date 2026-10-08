"use client"

import { useRouter } from "next/navigation";
import Button from "../ui/Button";

const CTA = () => {
  const router = useRouter();
  
  return (
    <section className="px-2 py-4 md:p-8 lg:p-12 mt-18 bg-brand text-light-red rounded-xl flex flex-col md:flex-row md:items-center gap-4 md:gap-8 lg:gap-18">
      <div className="md:max-w-[70%] lg:max-w-180">
        <p className="text-light-yellow text-[10px] md:text-sm">
          JOIN OUR TABLE
        </p>
        <h1 className="text-2xl lg:text-3xl font-bold mt-2">
          Experiance Authentic Habesha Warmth Tonight
        </h1>
        <p className="text-sm tracking-wide my-4">
          Whether gathering around our circular mesobs for communal dining or
          ordering freshly baked injera to your home in Addis Ababa.
        </p>
      </div>
      <div className="flex md:flex-col items-center justify-center gap-2 text-[14px] md:text-base">
        <Button color={"white"} onClick={() => router.push("/menu")}>
          Book A Mesob Table
        </Button>
        <Button color={"light-yellow"} onClick={() => router.push("/menu")}>
          View Complete Menu
        </Button>
      </div>
    </section>
  );
};

export default CTA;