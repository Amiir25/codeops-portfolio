"use client"

import useFetchDishes from "@/hooks/useFetchDishes";
import useDebounce from "@/hooks/useDebounce";
import Button from "@/components/ui/Button";
import { useMemo, useState } from "react";
import { FaFire, FaUtensils } from "react-icons/fa6";
import CategoryBar from "./(components)/CategoryBar";
import SearchBar from "./(components)/SearchBar";
import DishCard from "./(components)/(dish)/DishCard";
import CartInfo from "./(components)/CartInfo";

const Menu = () => {
  // ---
  const { dishes, loading, error } = useFetchDishes();

  // ---
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const [selectedCat, setSelectedCat] = useState("All Dishes");

  // Filter visible dishes for search and category
  const visibleDishes = useMemo(() => {
    // Filter by category
    let filtered = dishes;

    if (selectedCat !== "All Dishes") {
      filtered = dishes.filter(
        (dish) => dish.category.toLowerCase() === selectedCat.toLowerCase(),
      );
    }

    // Return the category list if search is empty
    if (!debouncedSearchTerm.trim()) return filtered;

    // Filter by search
    const term = debouncedSearchTerm.toLowerCase();
    return filtered.filter(
      (dish) =>
        dish.nameEn.toLowerCase().includes(term) ||
        dish.category.toLowerCase().includes(term),
    );
  }, [dishes, debouncedSearchTerm, selectedCat]);

  return (
    <main className="my-12 px-2 md:px-8 lg:px-18">
      {/* Titles */}
      <section className="max-w-200">
        <p className="text-dark-red text-[10px] md:text-sm flex items-center gap-2">
          <FaFire />
          <span>HANDCRAFTED GONDAR & ADDIS SPICES</span>
        </p>
        <h1 className="text-3xl lg:text-5xl font-bold mt-2">
          Our Complete Culinary Heritage
        </h1>
        <p className="text-sm lg:text-base tracking-wide my-4">
          Every dish is prepared daily from scratch using sun-dried spices,
          stone-ground legume flours, and clarified herbal butter sourced
          directly from highland farm cooperatives.
        </p>
      </section>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* Categories */}
      <CategoryBar selectedCat={selectedCat} onChangeCat={setSelectedCat} />

      {/* Dishes */}

      <section className="mt-18">
        {loading ? (
          <div className="text-gray-500 mb-20">
            <span>Loading Dishes</span>
            <div className="space-y-2 mt-2">
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-[80%] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-[90%] bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ) : error ? (
          <p className="border-t-4 border--4 border-red-500 text-red-500 text-center gap-2 mx-4 rounded-2xl p-2">
            Unable to load special dishes at the moment! Try again later.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {dishes.length > 0 && visibleDishes.length === 0 ? (
              <p>No dish found</p>
            ) : (
              visibleDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))
            )}
          </div>
        )}
      </section>

      {/* Bottom Section */}
      <section className="px-2 md:px-8 lg:px-18 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between gap-4 bg-light-red px-8 py-4 rounded-xl">
          <div className="flex items-center gap-2">
            <FaUtensils className="w-14 h-10 bg-brand text-white p-2 rounded-lg" />
            <div>
              <p className="font-semibold">
                Experience Communal Dining Around the Mesob
              </p>
              <p className="text-xs md:text-sm">
                All platters are served with unlimited warm Teff injera rolls
                and fresh house-made Ayib.
              </p>
            </div>
          </div>
          <div>
            <Button color={"light-yellow"}>Reserver a Group Mesob Table</Button>
          </div>
        </div>
      </section>

      {/* Bottom Cart Info */}
      <CartInfo />
    </main>
  );
};

export default Menu;