"use client"

import { useEffect, useRef } from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, [])

  return (
    <section className="mt-8 flex flex-col md:flex-row md:items-center gap-y-1 gap-x-4">
      <label htmlFor="search" className="text-dark-yellow">
        Search Dishes
      </label>
      <input
        type="search"
        ref={searchRef}
        id="search"
        name="search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search dishes by name or category..."
        className="border border-gray-300 w-full max-w-120 px-4 py-2 rounded"
      />
    </section>
  );
};

export default SearchBar;