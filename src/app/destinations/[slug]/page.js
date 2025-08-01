"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FaClock,
  FaMountain,
  FaUserFriends,
  FaCalendarAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaDownload,
  FaSuitcase,
  FaStar,
  FaUtensils,
  FaBed,
  FaBus,
  FaCamera,
  FaHiking,
  FaSwimmingPool,
  FaLeaf,
  FaPlane,
  FaTrain,
} from "react-icons/fa";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

export default function TripDetailsPage() {
  const params = useParams();
  const slug = params?.slug;

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [selectedPlaceIdx, setSelectedPlaceIdx] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const intervalRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client
      .fetch(
        `*[_type == "destination" && slug.current == $slug][0]{
          name, tagline, images, videos, description, duration, difficulty, ageAllowed, maxGroupSize, rating, reviews, about, highlights, joinUsFrom, availableDates, schedule, inclusions, exclusions, thingsToCarry, accommodation, transport, cancellation, brochure, faq, location, image
        }`,
        { slug }
      )
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load destination.");
        setLoading(false);
      });
  }, [slug]);

  // Carousel logic (like Destinations component)
  const total = trip?.images?.length || 0;
  useEffect(() => {
    if (!trip || !trip.images || trip.images.length === 0) return;
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % trip.images.length);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, trip]);

  // Add scroll-to-card effect when currentDay changes
  useEffect(() => {
    if (cardRefs.current[currentDay]) {
      cardRefs.current[currentDay].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentDay]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!trip) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-[60vh] min-h-[400px] md:min-h-[500px] bg-black flex items-end">
        <div
          className="absolute inset-0 w-full h-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={trip.images && trip.images[current] ? urlFor(trip.images[current]).url() : "/HeroImages/saputara.jpeg"}
            alt={`${trip.name} - Hero Image`}
            fill
            className="object-cover w-full h-full transition-all duration-300"
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {trip.images?.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full cursor-pointer transition-all duration-200 ${
                  idx === current
                    ? "bg-secondary w-4 h-2"
                    : "bg-gray-300 w-2 h-2"
                }`}
                style={{ display: "inline-block" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Thumbnail Gallery below Carousel */}
      <div
        className="box-border w-full sm:px-12 mx-auto py-3 flex gap-2 justify-center items-center bg-[rgba(152,129,237,0.08)]"
        style={{ overflowX: "auto" }}
      >
        {trip.images?.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`flex-shrink-0 rounded-xl border-2 transition-all duration-200 focus:outline-none
              ${
                current === idx
                  ? "border-secondary ring-2 ring-secondary bg-white"
                  : "border-transparent bg-secondary/10"
              }
            `}
            style={{
              width: `calc(95vw / ${trip.images.length} - 8px)`,
              maxWidth: "90px",
            }}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img ? urlFor(img).url() : "/HeroImages/saputara.jpeg"}
              alt={`${trip.name} thumbnail ${idx + 1}`}
              width={60}
              height={40}
              className="object-cover w-full h-12 md:w-24 md:h-16 rounded-lg"
            />
          </button>
        ))}
      </div>

      {/* Trip Header Content */}
      <section className="w-full bg-transparent py-8 md:py-12 mb-4 md:mb-8 border-b border-[rgba(140,120,215,0.13)]">
        <div className="mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-1 text-secondary tracking-tight leading-tight ">
            {trip.name}
          </h1>
          <p className="text-lg sm:text-2xl font-semibold mb-3 text-secondary tracking-wide">
            {trip.tagline}
          </p>
          <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            {trip.description}
          </p>
          <div className="flex gap-2 xs:gap-3 justify-center items-center w-full">
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-secondary/20 text-secondary rounded-full font-semibold text-[10px] sm:text-base">
              <FaClock className="text-secondary" /> {trip.duration}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-secondary/10 text-secondary rounded-full font-semibold text-[10px] sm:text-base">
              <FaMountain className="text-secondary" /> {trip.difficulty}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-secondary/20 text-secondary rounded-full font-semibold text-[10px] sm:text-base">
              <FaUserFriends className="text-secondary" /> Age {trip.ageAllowed}
              +
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-secondary/10 text-secondary rounded-full font-semibold text-[10px] sm:text-base">
              <FaStar className="text-secondary" /> {trip.rating}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky CTA Buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-3 md:hidden">
        <a href="tel:8460146012" className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition">
          <FaPhoneAlt />
        </a>
        <a href="https://wa.me/918460146012" target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition">
          <FaWhatsapp />
        </a>
        <a href={trip.brochure && trip.brochure.asset ? trip.brochure.asset.url : "#"} download className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition">
          <FaDownload />
        </a>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-3 sm:px-6">
        {/* About Section */}
        <section className="px-2 sm:px-0 py-6 sm:py-10 mb-8 bg-secondary/10 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-2 border-l-4 border-secondary pl-3">
            About This Trip
          </h2>
          <p className="text-secondary text-sm sm:text-base leading-relaxed mb-4">
            {trip.about}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2 mt-6">
            Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-3">
            {trip.highlights?.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-secondary/10 border border-secondary rounded-xl px-2 py-2 md:px-4 md:py-3 shadow-sm"
              >
                <FaStar className="text-secondary min-w-5 min-h-5" />
                <span className="text-secondary font-medium text-xs md:text-base">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us From - creative boarding pass ticket selector */}
        <section className="w-full px-0 py-6 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-5 border-l-4 border-secondary pl-3">
            Join Us From
          </h2>
          <div
            className="join-us-scroll flex gap-4 pb-4 px-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {trip.joinUsFrom?.map((j, i) => {
              // Choose icon based on transport
              let TransportIcon = FaBus;
              if (j.transport.toLowerCase().includes("flight"))
                TransportIcon = FaPlane;
              else if (j.transport.toLowerCase().includes("train"))
                TransportIcon = FaTrain;
              // Confetti burst only on selected
              const isSelected = selectedPlaceIdx === i;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl group transition-transform duration-300 ${
                    isSelected ? "z-10 scale-[1.01] shadow-2xl" : "scale-100"
                  } `}
                  aria-label={`Boarding pass from ${j.place} via ${j.transport}`}
                  tabIndex={0}
                  onClick={() => setSelectedPlaceIdx(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelectedPlaceIdx(i);
                  }}
                  role="button"
                >
                 
                  {/* Ticket shape */}
                  <div
                    className={`relative flex flex-col justify-between min-w-[120px] md:w-[200px] w-max border-2 ${
                      isSelected ? "border-secondary" : "border-secondary/30"
                    } rounded-2xl px-3 py-2 shadow-lg transition-all duration-300 cursor-pointer boarding-pass`}
                    title={`Departing from ${j.place} via ${j.transport}`}
                  >

                    <span
                      className={`inline-block text-lgl transition-transform duration-300 ${
                        isSelected ? "animate-bounce-once" : ""
                      }`}
                      aria-label={j.transport}
                    >
                      <TransportIcon className="inline text-secondary" />
                    </span>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-base md:text-2xl font-extrabold text-secondary tracking-tight leading-tight">
                        {j.place}
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        {j.price}
                      </span>
                      <span className="text-left text-xs text-secondary/70 mt-1">
                        {j.duration}
                      </span>
                    </div>
                    {/* Confetti burst */}
                    {isSelected && (
                      <span className="absolute left-1/2 top-2 -translate-x-1/2 z-20 pointer-events-none">
                        <svg width="60" height="30">
                          <g>
                            <circle cx="10" cy="10" r="2" fill="currentColor" className="text-secondary" >
                              <animate
                                attributeName="cy"
                                values="10;0;10"
                                dur="0.7s"
                                repeatCount="1"
                              />
                            </circle>
                            <circle cx="30" cy="8" r="2" fill="currentColor" className="text-secondary/60">
                              <animate
                                attributeName="cy"
                                values="8;0;8"
                                dur="0.6s"
                                repeatCount="1"
                              />
                            </circle>
                            <circle cx="50" cy="12" r="2" fill="currentColor" className="text-secondary/40">
                              <animate
                                attributeName="cy"
                                values="12;0;12"
                                dur="0.8s"
                                repeatCount="1"
                              />
                            </circle>
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Available Dates for selected place */}
        <section className="w-full mb-4">
          <h3 className="text-lg font-semibold text-secondary mb-2 pl-3 flex items-center gap-2">
            <FaCalendarAlt className="text-secondary" />
            Available Dates from {trip.joinUsFrom?.[selectedPlaceIdx]?.place || "-"}
          </h3>
          <div className="flex flex-wrap gap-3 px-2">
            {trip.availableDates?.map((date, index) => {
              // Format date as '10 Jul'
              const formatted = new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              });
              return (
                <span
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-secondary rounded-xl font-semibold shadow-md text-secondary text-sm sm:text-base transition-all duration-200 hover:bg-secondary hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                  tabIndex={0}
                  aria-label={`Available on ${formatted}`}
                >
                  <FaCalendarAlt className="text-secondary" />
                  {formatted}
                </span>
              );
            })}
          </div>
        </section>

        {/* Schedule Timeline - Modern Vertical Stacked Cards */}
        <section className="px-0 sm:px-0 py-6 sm:py-10 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-8 border-l-4 border-secondary pl-3">
            Day-wise Itinerary
          </h2>
          <div className="flex flex-col gap-3 md:gap-10">
            {trip.schedule?.map((s, i) => {
              // Pick an icon for the main activity (fallback to FaSuitcase)
              const activity = s.activities?.[0]?.toLowerCase() || "";
              let ActivityIcon = FaSuitcase;
              if (activity.includes("trek") || activity.includes("hiking")) ActivityIcon = FaHiking;
              else if (activity.includes("lake") || activity.includes("boating")) ActivityIcon = FaCamera;
              else if (activity.includes("temple")) ActivityIcon = FaLeaf;
              else if (activity.includes("market")) ActivityIcon = FaUtensils;
              else if (activity.includes("hotel")) ActivityIcon = FaBed;
              else if (activity.includes("adventure")) ActivityIcon = FaMountain;
              else if (activity.includes("hot springs")) ActivityIcon = FaSwimmingPool;
              return (
                <div
                  key={i}
                  className="w-full mx-auto bg-secondary/10 rounded-3xl flex flex-col px-6 py-6 md:px-10 md:py-10 relative transition-all duration-300"
                >
                  {/* Day and icon */}
                  <div className="flex items-center gap-2 md:gap-5 mb-2 md:mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-white font-extrabold text-xl shadow-lg">
                      {s.day}
                    </span>
                    <span className="ml-2 text-base md:text-2xl font-bold text-secondary uppercase tracking-wide">
                      {s.heading}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-secondary text-base md:text-lg mb-4 leading-relaxed">
                    {s.description}
                  </p>
                  {/* Meals */}
                  {s.meals && s.meals.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-3">
                      {s.meals.map((meal, mealIndex) => (
                        <span
                          key={mealIndex}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-secondary/20 text-secondary rounded-full text-sm md:text-base font-semibold shadow"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Image gallery */}
                  {s.images && s.images.length > 0 && (
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {s.images.map((img, j) => (
                        <Image
                          key={j}
                          src={img ? urlFor(img).url() : "/HeroImages/saputara.jpeg"}
                          alt="schedule"
                          width={120}
                          height={80}
                          className="w-28 h-20 object-cover rounded-xl shadow border border-secondary"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex gap-6 justify-center mb-6 pb-5">
          <a
            href="tel:8460146012"
            className="flex items-center gap-3 px-6 py-2 bg-secondary text-white rounded-full font-semibold shadow-lg hover:bg-secondary/80 transition text-base"
          >
            <FaPhoneAlt />
            Call Now
          </a>
          <a
            href="https://wa.me/918460146012"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-6 py-2 bg-secondary text-white rounded-full font-semibold shadow-lg hover:bg-secondary/80 transition text-base"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
          <a
            href={trip.brochure && trip.brochure.asset ? trip.brochure.asset.url : "#"}
            download
            className="flex items-center gap-3 px-6 py-2 bg-secondary text-white rounded-full font-semibold shadow-lg hover:bg-secondary/80 transition text-base"
          >
            <FaDownload />
            Download Brochure
          </a>
        </div>
      </div>
    </main>
  );
}
