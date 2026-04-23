"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FiClock, FiStar, FiUser } from "react-icons/fi";

const AUTO_ROTATE_INTERVAL = 3500;
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=33b5970ecd4ab1db&rlz=1C1YTUH_enIN1024IN1025&sxsrf=ANbL-n4gWQpXmfEnWYDkLgKJUHpaP6h1YQ:1776952142632&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR0leiSzxlQsyvxQasNRJhnpcQ3yvEAi9YoacnRJeYaQLFhrBCPjEKoGsgFeVj3fYbSi2ZV30_h_U97MXidAv2DrTxg-E6_vklwOnxEe7YBc7ci8JYAzu5LiT_CfYYc44JlNPnKnFVnNZv2tUithote5owQh&q=Travel+Traces+%7C+Your+Trusted+Tour+Operator+in+Ahmedabad+Reviews&sa=X&ved=2ahUKEwiSgvrJjoSUAxVE3jgGHR2dEEkQ0bkNegQINBAH&biw=1536&bih=695&dpr=1.25";
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
        `*[_type == "imagesOfHerosection"] | order(_createdAt asc){ _id, image }`
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
    <section className="relative w-[90%] mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg mt-5">
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
              alt={`Hero image ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute w-full inset-0 bg-gradient-to-t from-black/30 via-black/60 to-black/30" />
          </div>
      ))}

      <div className="absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center text-white w-full">
        <div className="flex flex-col items-center justify-center px-4 text-center w-full">
          <span
            className="mb-3 block text-3xl sm:text-5xl font-extrabold md:text-7xl"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: "900" }}
          >
            TravelTraces
          </span>
          <p className="w-full gap-1.5 leading-relaxed text-white text-xs sm:text-base 2xl:text-xl">
            Where every trip starts with a smile and{" "}
            <br className="block" />
            <span className="relative inline-block mt-1">
              <span className="relative z-0 font-medium text-yellow-400">
                ends with a story
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 150 60"
                preserveAspectRatio="none"
                className="absolute -top-0 right-0 sm:right-2.5 z-10 block h-[25px] w-[120px] overflow-visible sm:w-[130px] lg:-top-1 lg:right-1 lg:h-[30px] lg:w-[130px] 2xl:-top-0.5 2xl:right-4 2xl:h-[35px] 2xl:w-[160px]"
              >
                <path
                  d="M56.15,64.35 C 94.7,67.56 179,63.62 179,32.96 C 179,7.04 123.43,0 83.74,0 S -8.11,7.04 -8.11,32.08 S 35.55,70.85 129.86,67.56"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  pathLength="1"
                  strokeDashoffset="0"
                  strokeDasharray="1 1"
                />
              </svg>
            </span>
          </p>
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-2 text-[8px] sm:text-xs font-semibold text-white/90">
            <span className="flex items-center gap-1.5">
              <FiClock className="h-3 w-3 text-cyan-300 sm:h-4 sm:w-4" />
              24x7 Support
            </span>
            <span className="text-white/45">|</span>
            <span className="flex items-center gap-1.5">
              <FiUser className="h-3 w-3 text-cyan-300 sm:h-4 sm:w-4" />
              100% Personalised
            </span>
            <span className="text-white/45">|</span>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5">
              <FiStar className="h-3 w-3 text-cyan-300 sm:h-4 sm:w-4" />
              4.9+ Rated
            </span>
            </a>
          </div>
          <p className="mt-3 text-[8px] sm:text-xs font-medium text-white/95">
            #India's New Age youth Travel Partner
          </p>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
