"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
import { MdTravelExplore, MdModeOfTravel, MdHiking } from "react-icons/md";
import { WiTrain } from "react-icons/wi";
import { GiRollingSuitcase } from "react-icons/gi";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

const AUTO_ROTATE_INTERVAL = 3000;
const VISIBLE_SLOTS_DESKTOP = 5;
const VISIBLE_SLOTS_MOBILE = 5;

const SocialIcons = () => (
  <div className="flex items-center flex-col gap-1.5 sm:gap-3 text-xs sm:text-base">
    <a
      href="#"
      aria-label="YouTube"
      className="text-gray-600 hover:text-red-600"
    >
      <FaYoutube />
    </a>
    <a
      href="#"
      aria-label="Instagram"
      className="text-gray-600 hover:text-pink-500"
    >
      <FaInstagram />
    </a>
    <a
      href="#"
      aria-label="WhatsApp"
      className="text-gray-600 hover:text-green-500"
    >
      <FaWhatsapp />
    </a>
  </div>
);

const slideIcons = [
  MdTravelExplore,
  MdHiking,
  MdModeOfTravel,
  WiTrain,
  GiRollingSuitcase,
];

const SlideIcon = ({ icon: Icon }) => (
  <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center shadow-md">
    <Icon className="text-secondary text-sm sm:text-2xl" />
  </div>
);

const SkeletonPillar = ({ isCenter, isFirstLeftOrRight, isSecondLeftOrRight }) => {
  let pillarHeight = "h-[180px] sm:h-[340px] lg:h-[380px]";
  let pillarWidth = "w-[180px] sm:w-[340px] lg:w-[380px]";
  let pillarTranslateY = "";
  if (isCenter) {
    pillarWidth = "w-[180px] sm:w-[340px] lg:w-[380px]";
    pillarTranslateY = "";
  } else if (isFirstLeftOrRight) {
    pillarWidth = "w-[45px] sm:w-[100px] lg:w-[120px]";
    pillarTranslateY = "";
  } else if (isSecondLeftOrRight) {
    pillarWidth = "w-[45px] sm:w-[100px] lg:w-[120px]";
    pillarTranslateY = "-translate-y-4 md:-translate-y-10";
  } else {
    pillarWidth = "w-[50px] sm:w-[60px] sm:w-[80px] md:w-[100px]";
    pillarTranslateY = "";
  }
  const borderRadius = isCenter ? "rounded-[20px] sm:rounded-[35px]" : "rounded-full";
  return (
    <div
      className={`relative ${pillarHeight} ${pillarWidth} ${pillarTranslateY} ${borderRadius} overflow-hidden bg-gray-200 animate-pulse shadow-lg opacity-40`}
      style={{ minWidth: undefined }}
    >
      {isCenter && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-gray-300 rounded-md animate-pulse" />
      )}
    </div>
  );
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "destination"] | order(_createdAt asc){ _id, name, location, image }`
      )
      .then((data) => {
        setDestinations(data);
        if (data.length > 0) {
          setCurrent(0);
        }
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered && destinations.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % destinations.length);
      }, AUTO_ROTATE_INTERVAL);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, destinations]);

  if (destinations.length === 0) {
    // Render skeleton loader with 5 slots
    const VISIBLE_SLOTS = isMobile ? VISIBLE_SLOTS_MOBILE : VISIBLE_SLOTS_DESKTOP;
    const centerIndex = Math.floor(VISIBLE_SLOTS / 2);
    return (
      <section className="w-full flex items-center justify-center py-10 sm:py-14 px-1 sm:px-4 md:px-6 lg:px-8 overflow-x-auto overflow-y-visible pt-[110px] sm:pt-[180px]">
        <div className="flex flex-grow items-end justify-center gap-1 sm:gap-4 w-full h-[180px] sm:h-[340px] lg:h-[380px]">
          {Array.from({ length: VISIBLE_SLOTS }, (_, slot) => {
            const isCenter = slot === centerIndex;
            const isFirstLeftOrRight = slot === centerIndex - 1 || slot === centerIndex + 1;
            const isSecondLeftOrRight = slot === centerIndex - 2 || slot === centerIndex + 2;
            // Social icons skeleton for 2nd left
            if (isSecondLeftOrRight && slot === centerIndex - 2) {
              return (
                <div key={slot} className="flex flex-col items-center">
                  <SkeletonPillar isCenter={isCenter} isFirstLeftOrRight={isFirstLeftOrRight} isSecondLeftOrRight={isSecondLeftOrRight} />
                  <div className="mt-2 flex flex-col gap-1.5 sm:gap-3">
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                  </div>
                </div>
              );
            }
            // Find Your Escape skeleton for 2nd right
            if (isSecondLeftOrRight && slot === centerIndex + 2) {
              return (
                <div key={slot} className="flex flex-col items-center">
                  <SkeletonPillar isCenter={isCenter} isFirstLeftOrRight={isFirstLeftOrRight} isSecondLeftOrRight={isSecondLeftOrRight} />
                  <div className="text-[8px] sm:text-xs font-semibold text-gray-400 w-[40px] sm:w-[100px] lg:w-[120px] text-wrap text-center mt-2 bg-gray-200 h-4 rounded animate-pulse" />
                  <div className="mt-2 w-8 h-8 sm:w-12 sm:h-12 bg-gray-300 rounded-full animate-pulse" />
                </div>
              );
            }
            return (
              <React.Fragment key={slot}>
                <SkeletonPillar isCenter={isCenter} isFirstLeftOrRight={isFirstLeftOrRight} isSecondLeftOrRight={isSecondLeftOrRight} />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    );
  }

  const VISIBLE_SLOTS = isMobile ? VISIBLE_SLOTS_MOBILE : VISIBLE_SLOTS_DESKTOP;

  // Always render VISIBLE_SLOTS, wrapping around the destinations array
  const getSlotIndex = (slot) => {
    if (destinations.length === 0) return 0;
    // Center slot is current, others are offsets
    return (
      (current + slot - Math.floor(VISIBLE_SLOTS / 2) + destinations.length) %
      destinations.length
    );
  };

  return (
    <section className="w-full flex items-center justify-center py-10 sm:py-14 px-1 sm:px-4 md:px-6 lg:px-8 overflow-x-auto overflow-y-visible pt-[110px] sm:pt-[180px]">
      <div
        className="flex flex-grow items-end justify-center gap-1 sm:gap-4 w-full h-[180px] sm:h-[340px] lg:h-[380px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: VISIBLE_SLOTS }, (_, slot) => {
          const destIdx = getSlotIndex(slot);
          const dest = destinations[destIdx];
          const centerIndex = Math.floor(VISIBLE_SLOTS / 2);
          if (!dest) return null;
          const IconComponent = slideIcons[slot % slideIcons.length];

          // Slot type helpers
          const isCenter = slot === centerIndex;
          const isFirstLeft = slot === centerIndex - 1;
          const isFirstRight = slot === centerIndex + 1;
          const isSecondLeft = slot === centerIndex - 2;
          const isSecondRight = slot === centerIndex + 2;
          const isActive = isCenter;

          // Responsive sizing and positioning logic
          let pillarHeight = "h-[180px] sm:h-[340px] lg:h-[380px]"; // Responsive height
          let pillarWidth = "w-[180px] sm:w-[340px] lg:w-[380px]"; // Center is square, responsive
          let pillarTranslateY = "";
          if (isCenter) {
            pillarWidth = "w-[180px] sm:w-[340px] lg:w-[380px]";
            pillarTranslateY = "";
          } else if (isFirstLeft || isFirstRight) {
            pillarWidth = "w-[45px] sm:w-[100px] lg:w-[120px]";
            pillarTranslateY = "";
          } else if (isSecondLeft || isSecondRight) {
            pillarWidth = "w-[45px] sm:w-[100px] lg:w-[120px]";
            pillarTranslateY = "-translate-y-4 md:-translate-y-10";
          } else {
            pillarWidth = "w-[50px] sm:w-[60px] sm:w-[80px] md:w-[100px]";
            pillarTranslateY = "";
          }

          const zIndex = isActive
            ? "z-20"
            : isFirstLeft || isFirstRight
            ? "z-10"
            : "z-0";
          const borderRadius = isActive ? "rounded-[20px] sm:rounded-[35px]" : "rounded-full";

          // Pillar content
          const pillar = (
            <div
              onClick={() => setCurrent(destIdx)}
              className={`relative cursor-pointer transition-all duration-500 ease-in-out transform-gpu ${pillarHeight} ${pillarWidth} ${zIndex} ${pillarTranslateY}`}
              style={{ minWidth: undefined }}
            >
              <div
                className={`relative w-full h-full ${borderRadius} overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              >
                <Image
                  src={dest.image ? urlFor(dest.image).url() : ""}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover hover:scale-[1.02]"
                  priority={isActive}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-4 md:p-6 flex flex-col justify-end">
                    {/* Center slot: icon + name + location row */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/90">
                        <IconComponent className="text-secondary text-sm sm:text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-white text-base sm:text-xl md:text-xl font-bold">
                          {dest.name}
                        </h3>
                        <p className="text-gray-200 text-xs sm:text-sm mt-0.5">
                          {dest.location || "Explore this amazing destination"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {!isCenter && <SlideIcon icon={IconComponent} />}
              </div>
            </div>
          );

          // Special case: 2nd left (social icons below)
          if (isSecondLeft) {
            return (
              <div
                key={dest._id + "-" + slot}
                className="flex flex-col items-center"
              >
                {pillar}
                <div className="mt-2">
                  <SocialIcons />
                </div>
              </div>
            );
          }

          // Special case: 2nd right (find your escape + chevron below)
          if (isSecondRight) {
            return (
              <div
                key={dest._id + "-" + slot}
                className="flex flex-col items-center"
              >
                {pillar}
                <div className="text-[8px] sm:text-xs font-semibold text-gray-600 w-[40px] sm:w-[100px] lg:w-[120px] text-wrap text-center">
                  Find Your Escape
                </div>
                <button className="mt-2 p-1.5 text-sm sm:text-xl sm:p-3 rounded-full border bg-secondary border-gray-400 text-gray-300 hover:scale-[1.01] transition-colors">
                  <FiChevronRight />
                </button>
              </div>
            );
          }

          // Default: just the pillar
          return (
            <React.Fragment key={dest._id + "-" + slot}>
              {pillar}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default Destinations;
