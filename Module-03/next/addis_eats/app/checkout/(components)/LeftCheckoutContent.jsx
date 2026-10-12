"use client"

import { useState } from "react";
import Button from "@/components/ui/Button";
import { RiEBike2Line, RiHandHeartLine } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import PaymentMethods from "./PaymentMethods";
import CheckoutForm from "./CheckoutForm";

const LeftCheckoutContent = () => {
  const [selectedBtn, setSelectedBtn] = useState("deliver");

  return (
    <div className="lg:col-span-2 bg-white px-2 md:px-8 lg:px-12 py-8 rounded">
      {/* Top buttons */}
      <section className="mt-4 flex items-center justify-center gap-2 md:gap-8 lg:gap-18 p-2 bg-light-red rounded-lg text-xs md:text-sm lg:text-base">
        <Button
          color={selectedBtn === "deliver" ? "white" : "light-red"}
          onClick={() => setSelectedBtn("deliver")}
        >
          <RiEBike2Line />
          Prompt Delivery across Addis
        </Button>
        <Button
          color={selectedBtn === "dine-in" ? "white" : "light-red"}
          onClick={() => setSelectedBtn("dine-in")}
        >
          <FiPackage />
          Dine-in Pickup (Bole)
        </Button>
      </section>

      {/* Checkout Form */}
      <CheckoutForm />

      {/* Payment method */}
      <PaymentMethods />

      {/* Promise */}
      <section className="mt-8 p-4 bg-light-red mx-2 rounded flex items-start gap-4">
        <RiHandHeartLine className="bg-light-yellow text-dark-yellow w-12 h-12 p-3 rounded" />
        <div className="flex-2">
          <h3 className="font-semibold">The Mesob House Promise</h3>
          <p className="text-xs">
            Each communal platter arrives with four extra folds of authentic
            100% pure teff injera, warm wet towels, and our hand-blended Mitmita
            spice on the side.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LeftCheckoutContent;