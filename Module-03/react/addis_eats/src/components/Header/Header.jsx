import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

const Header = ({ searchQuery, onSearch }) => {

  const searchRef = useRef(null);

  // Focus on mount
  useEffect(() => {
    searchRef.current.focus();
  }, [])

  return (
    <header>
      <h1>Addis Eats</h1>
      <div className="search">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search foods..."
          ref={searchRef}
        />
      </div>
    </header>
  );
};

export default Header;
