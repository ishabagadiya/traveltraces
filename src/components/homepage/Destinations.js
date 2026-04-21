"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const AUTO_ROTATE_INTERVAL = 3500;
const AUDIENCE_WORDS = [
  "Explorers",
  "Adventurers",
  "Colleagues",
  "Travellers",
  "Friends",
  "Families",
];

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAudience, setCurrentAudience] = useState(0);
  const totalSlides = destinations.length;

  useEffect(() => {
    client
      .fetch(
        `*[_type == "destination"] | order(_createdAt asc){ _id, name, location, image }`
      )
      .then((data) => {
        setDestinations(data);
      });
  }, []);

  useEffect(() => {
    if (destinations.length <= 1) return undefined;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [destinations.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAudience((prev) => (prev + 1) % AUDIENCE_WORDS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (destinations.length === 0) {
    return (
      <section className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[430px] animate-pulse bg-gray-200" />
    );
  }

  const previousSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  const nextSlide = (currentSlide + 1) % totalSlides;

  return (
    <section className="relative w-full h-[430px] overflow-hidden">
      {destinations.map((destination, index) => (
          <div
            key={destination._id}
            className={`w-full inline-block absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "translate-x-0 opacity-100 z-20"
                : index === previousSlide
                  ? "-translate-x-full opacity-100 z-10"
                  : index === nextSlide
                    ? "translate-x-full opacity-100 z-10"
                    : "translate-x-full opacity-0 z-0"
            }`}
          >
            <Image
              src={destination.image ? urlFor(destination.image).url() : ""}
              alt={destination.name}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute w-full inset-0 bg-gradient-to-t sm:bg-gradient-to-r bg-black/50 sm:from-black/30 to-transparent" />
          </div>
      ))}

      <div className="absolute inset-0 z-30 flex items-start sm:items-center">
        <div className="w-full px-4 pt-12 sm:pt-0 sm:px-10 md:px-14 lg:px-20">
          <h1 className="max-w-[620px] text-white font-extrabold leading-[0.95] text-3xl sm:text-5xl">
            <span className="block mb-3">Experiences for</span>
            <span className="block">
              <span className="relative inline-block mr-2 sm:mr-6">
                Tourist
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 16"
                  preserveAspectRatio="none"
                  className="absolute left-0 right-0 top-[60%] h-6 w-full -translate-y-1/2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
                >
                  <path
                    d="M2 12 Q50 2 98 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>{AUDIENCE_WORDS[currentAudience]}</span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
