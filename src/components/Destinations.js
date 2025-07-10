"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { IoInformationCircle, IoLocationSharp } from "react-icons/io5";

const destinations = [
  { name: "Saputara", image: "/HeroImages/saputara.jpeg", imageMobile: "/HeroImages/saputara.jpeg" },
  { name: "Andharban", image: "/HeroImages/andharban.webp", imageMobile: "/HeroImages/andharban.webp" },
  { name: "Matheran", image: "/HeroImages/matheran.jpeg", imageMobile: "/HeroImages/matheran.jpeg" },
  { name: "Manali", image: "/HeroImages/manali.jpeg", imageMobile: "/HeroImages/manali.jpeg" },
  { name: "Kedarnath", image: "/HeroImages/kedarnath.jpeg", imageMobile: "/HeroImages/kedarnath.jpeg" },
];

const AUTO_ROTATE_INTERVAL = 2000;

const Destinations = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const total = destinations.length;
  const intervalRef = useRef();

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  const imageSrc = isMobile && dest.imageMobile ? dest.imageMobile : dest.image;

  return (
    <section className="flex flex-col items-center justify-center mt-[140px]">
      <div
        className="relative ml-auto mt-[70px] overflow-hidden w-[85%] sm:w-[85%] h-[calc(100vh-300px)] sm:h-[calc(100vh-200px)] flex items-center justify-center rounded-l-xl sm:rounded-l-2xl shadow-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setShowInfo(false); }}
      >
        <Image
          src={imageSrc}
          alt={dest.name}
          width={isMobile ? 400 : 675}
          height={isMobile ? 600 : 390}
          className="object-cover w-full h-full transition-all duration-300"
        />

        {/* Progress Indicator (dots) and Info Icon */}
        <div className="absolute bottom-3 sm:bottom-8 left-3 sm:left-10 right-3 sm:right-10 flex items-center justify-between z-10">
          <div className="flex gap-1 sm:gap-2">
            {destinations.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-200 cursor-pointer ${idx === current ? 'bg-[#316866] w-3 h-1.5 sm:w-4 sm:h-2' : 'bg-gray-300 w-1.5 h-1.5 sm:w-2 sm:h-2'}`}
                style={{ display: 'inline-block' }}
              />
            ))}
          </div>
          <div className="relative ml-2 sm:ml-4">
            <IoInformationCircle
              className="text-base sm:text-lg text-white cursor-pointer hover:text-gray-300 transition drop-shadow-lg focus:outline-none focus:ring-0"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onFocus={() => setShowInfo(true)}
              onBlur={() => setShowInfo(false)}
              tabIndex={0}
              aria-label="Show place name"
            />
            {showInfo && (
              <div className="absolute opacity-90 -bottom-1 right-5 bg-white text-purple-800 px-2 py-1 rounded-md shadow-2xl text-xs font-bold whitespace-nowrap animate-fade-in z-20">
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