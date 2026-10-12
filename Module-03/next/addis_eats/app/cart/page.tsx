"use client"

import React, { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuBadgeCheck } from "react-icons/lu";
import LeftCartContent from "./(components)/LeftCartContent";
import RightCartContent from "./(components)/RightCartContent";
import Spinner from "@/components/ui/Spinner";
import ClearCartConfirmation from "./(components)/ClearCartConfirmation";
import EmptyCartState from "./(components)/EmptyCartState";
import useCartStore from "./(components)/useCartStore";
import { useRouter } from "next/navigation";

const Cart = () => {
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const router = useRouter();

  const [showSpinner, setShowSpinner] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Clear cart table
  const handleClearTable = () => {
    setShowConfirm(false);
    setShowSpinner(true);

    setTimeout(() => {
      clearCart();
      setShowSpinner(false);
      router.push("/menu");
    }, 2000);
  };

  // Show Confirmation
  if (showConfirm) {
    return (
      <ClearCartConfirmation
        onClose={() => setShowConfirm(false)}
        onConfirm={handleClearTable}
      />
    );
  }

  // Loading state
  if (showSpinner) {
    return <Spinner />;
  }

  if (cart.length === 0) {
    return (
      <EmptyCartState
        message="Dishes you add to your order will appear here. Explore our menu to find
        your favorite meals."
      />
    );
  }

  return (
    <main className="px-2 md:px-8 lg:px-18 pt-8 bg-light-yellow/20">
      {/* Top text */}
      <section className="mx-2 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between gap-4 text-xs lg:text-sm mt-4 bg-light-red p-2 rounded-2xl">
        <div className="flex lg:items-center gap-x-4">
          <CiDeliveryTruck className="text-dark-yellow text-xl" />
          <div className="flex flex-col flex-2">
            <p className="text-dark-red">Free Highland Delivery: </p>
            <p className="text-dark-yellow">
              Complimentary delivery across Bole, Kazanchis, and Sarbet on
              orders over ETB 1,200!
            </p>
          </div>
        </div>
        <p className="bg-green-200 text-green-800 w-fit px-4 py-1 rounded-2xl flex items-center gap-2 text-[10px]">
          <LuBadgeCheck />
          THRESHOLD UNLOCKED
        </p>
      </section>

      {/* Titles */}
      <section className="max-w-200 mt-8">
        <p className="text-dark-yellow text-[10px] md:text-sm">
          <span>COMMUNAL FESTING</span>
        </p>
        <h1 className="text-dark-red text-3xl lg:text-5xl font-bold">
          Your Gursha Basket
        </h1>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Left content */}
        <LeftCartContent onClearTable={() => setShowConfirm(true)} />

        {/* Right content */}
        <RightCartContent />
      </section>
    </main>
  );
};

export default Cart;