"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { IoInformationCircle, IoLocationSharp } from "react-icons/io5";

const destinations = [
  { name: "Saputara", image: "/HeroImages/saputara.jpeg" },
  { name: "Andharban", image: "/HeroImages/andharban.webp" },
  { name: "Matheran", image: "/HeroImages/matheran.jpeg" },
  { name: "Manali", image: "/HeroImages/manali.jpeg" },
  { name: "Kedarnath", image: "/HeroImages/kedarnath.jpeg" },
];

const AUTO_ROTATE_INTERVAL = 2000;

const Destinations = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const total = destinations.length;
  const intervalRef = useRef();

  // Autorotate logic
  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % total);
      }, AUTO_ROTATE_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, total]);

  const dest = destinations[current];

  return (
    <section className="flex flex-col items-center justify-center mt-[140px]">
      <div
        className="relative ml-auto mt-[55px] overflow-hidden w-[80%] h-[calc(100vh-200px)] flex items-center justify-center rounded-2xl shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setShowInfo(false); }}
      >
        <Image
          src={dest.image}
          alt={dest.name}
          width={675}
          height={390}
          className="object-cover w-full h-full"
        />

        {/* Progress Indicator (dots) and Info Icon */}
        <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between z-10">
          <div className="flex gap-2">
            {destinations.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-200 cursor-pointer ${idx === current ? 'bg-[#316866] w-4 h-2' : 'bg-gray-300 w-2 h-2'}`}
                style={{ display: 'inline-block' }}
              />
            ))}
          </div>
          <div className="relative ml-4">
            <IoInformationCircle
              className="text-lg text-white cursor-pointer hover:text-gray-300 transition drop-shadow-lg"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onFocus={() => setShowInfo(true)}
              onBlur={() => setShowInfo(false)}
              tabIndex={0}
              aria-label="Show place name"
            />
            {showInfo && (
              <div className="absolute opacity-70 -bottom-1 right-5 bg-white text-purple-800 px-2 py-1 rounded-md shadow-2xl text-xs font-bold whitespace-nowrap animate-fade-in z-20">
                {dest.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Destinations; 