"use client"

import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaBarsStaggered,
  FaCircleDot,
  FaMugSaucer,
} from "react-icons/fa6";
import Button from "../ui/Button";

// Hero buttons
const heroBtns = [
  {
    id: 1,
    icon: FaArrowDown,
    color: "brand",
    text: "Explore Today's Specials",
    to: "#specials",
  },
  {
    id: 2,
    icon: FaBarsStaggered,
    color: "light-red",
    text: "Full Banquet Menu",
    to: "/menu",
  },
  {
    id: 3,
    icon: FaMugSaucer,
    color: "light-yellow",
    text: "Buna Ceremony 4:00 PM Daily",
    to: "#buna-ceremony",
  },
];

// Hero data
const heroData = [
  {
    id: 1,
    color: "text-dark-red",
    title: "100%",
    subtitle: "Brown & White Teff",
  },
  {
    id: 2,
    color: "text-dark-yellow",
    title: "6+ Hours",
    subtitle: "Slow Stew Caramels",
  },
  {
    id: 3,
    color: "text-green-900",
    title: "Gursha",
    subtitle: "Hospitality Shared",
  },
];

const HomeHero = () => {
  const images = [1, 2, 3, 4, 5, 6];
  const [current, setCurrent] = useState(0);

  // Image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-8 md:grid grid-cols-2 lg:gap-x-20">
      {/* Hero Left */}
      <div>
        <p className="bg-light-red text-dark-red text-[10px] px-2 py-1 rounded-xl w-fit flex items-center gap-2 tracking-wider">
          <FaCircleDot />
          <span>TRADITIONAL HABESHA HEARTH</span>
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
          <span>Communal Warmth,</span>
          <span className="block text-brand italic">Slow-Cooked Heritage.</span>
        </h1>
        <p className="text-sm lg:text-base tracking-wide my-4">
          Handcrafted wats, ancient stone-ground teff injera, and velvety kitfo
          simmered in 72-hour infused niter kibbeh and heirloom berbere
          harvested from the Ethiopian highlands.
        </p>
        <div className="flex flex-col lg:flex-row items-start gap-2 text-xs">
          {heroBtns.map((btn) => {
            const { id, icon: Icon, color, text, to } = btn;
            return (
              <div key={id}>
                <Button key={id} color={color}>
                  {text}
                  <Icon />
                </Button>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-8">
          {heroData.map((data) => {
            const { id, color, title, subtitle } = data;
            return (
              <div key={id}>
                <p className={`${color} text-sm`}>{title}</p>
                <p className="text-red-400 text-xs">{subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Right */}
      <div className="grid rounded-xl overflow-hidden mt-8 md:mt-0">
        {images.map((n, i) => (
          <img
            key={n}
            src={`/images/dishes/home-page-images/image-${n}.webp`}
            alt=""
            className={`col-start-1 row-start-1 w-full h-full transition-opacity duration-2000 ease-in-out
            ${ i === current ? "opacity-100" : "opacity-0" }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeHero;