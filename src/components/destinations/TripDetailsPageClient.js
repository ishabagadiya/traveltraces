"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import {
  FaClock,
  FaCalendarAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaDownload,
  FaBus,
  FaPlane,
  FaTrain,
  FaShare,
  FaPaperPlane,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export default function TripDetailsPageClient() {
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.slug;

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlaceIdx, setSelectedPlaceIdx] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [expandedDays, setExpandedDays] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client
      .fetch(
        `*[_type == "featuredDestination" && slug.current == $slug][0]{
          name, tagline, images, description, duration, joinUsFrom, schedule,location, image, price, category, brochure{asset->{url, originalFilename, mimeType}}
        }`,
        { slug }
      )
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load destination.");
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (cardRefs.current[currentDay]) {
      cardRefs.current[currentDay].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentDay]);

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: trip?.name || "Travel Destination",
          text: trip?.tagline || "Check out this amazing destination!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (clipboardErr) {
        console.error("Failed to copy link:", clipboardErr);
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!trip) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  return (
    <div className="w-full overflow-hidden bg-[#dfdfdf]">
      <main className="min-h-screen w-[90%] mx-auto ">
        {trip.images && trip.images.length > 0 && (
          <section className="mt-10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 md:gap-1 h-[400px] md:h-[500px]">
              <div className="relative h-full rounded-t-xl md:rounded-t-none md:rounded-l-xl overflow-hidden shadow-2xl">
                <Image
                  src={trip.images[0] ? urlFor(trip.images[0]).url() : "/HeroImages/saputara.jpeg"}
                  alt={`${trip.name} - Main Image`}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-0.5 md:gap-1 h-full">
                {trip.images.slice(1, 5).map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative overflow-hidden shadow-xl ${
                      idx === 2
                        ? "rounded-bl-xl md:rounded-bl-none"
                        : idx === 1
                          ? "rounded-tr-none md:rounded-tr-xl"
                          : idx === 3
                            ? "rounded-br-xl"
                            : "rounded-none"
                    }`}
                  >
                    <Image
                      src={urlFor(img).url()}
                      alt={`${trip.name} - Image ${idx + 2}`}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-secondary/20 text-secondary rounded-full font-semibold text-[10px] sm:text-sm mb-4">
                    <FaClock className="text-secondary" />{" "}
                    {trip.duration?.days
                      ? `${trip.duration.days} Days ${trip.duration.nights} Nights`
                      : trip.duration || "N/A"}
                  </span>
                </div>
                <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black mb-2 text-secondary tracking-tight leading-tight">
                  {trip.name}
                </h1>
                <p className="text-lg sm:text-xl font-semibold mb-3 text-secondary tracking-wide">{trip.tagline}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">{trip.description}</p>
                <div className="flex items-center justify-end gap-3">
                  <a
                    href={
                      trip.brochure?.asset?.url
                        ? `${trip.brochure.asset.url}?dl=${encodeURIComponent(trip.brochure.asset.originalFilename || "brochure")}`
                        : "#"
                    }
                    download
                    className="flex items-center gap-2 px-4 py-2 border border-secondary/30 rounded-full text-secondary hover:bg-secondary/5 transition"
                  >
                    <FaDownload className="text-secondary" />
                    <span className="text-sm font-medium">Download Brochure</span>
                  </a>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
                  >
                    <FaShare className="text-gray-500" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>
              <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary/70 mb-2">Pricing Details</p>
                  <div className="mb-3">
                    {(() => {
                      const ahmedabadPrice =
                        trip.joinUsFrom?.find((item) => item.place?.toLowerCase().includes("ahmedabad"))?.price ||
                        trip.price ||
                        "5,900";
                      return (
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-secondary leading-none">₹ {ahmedabadPrice}</span>
                            <span className="text-sm text-secondary/70 font-medium">from Ahmedabad</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <p className="border-t border-secondary/20 pt-3 text-xs text-secondary/70">
                    Price may vary by date and occupancy.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 ">
              {/* join us from section */}
              <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-secondary flex items-center gap-2">
                    <FaPaperPlane className="text-xs" />
                    Join Us From
                  </h3>
                </div>
                <div className="join-us-scroll flex flex-wrap gap-2 overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                  {trip.joinUsFrom?.map((j, i) => {
                    let TransportIcon = FaBus;
                    const transportType = j.transport?.toLowerCase() || "";
                    if (transportType.includes("train")) TransportIcon = FaTrain;
                    else if (transportType.includes("plane") || transportType.includes("flight")) TransportIcon = FaPlane;
                    else if (transportType.includes("bus")) TransportIcon = FaBus;

                    const isSelected = selectedPlaceIdx === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedPlaceIdx(i)}
                        className={`group relative flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 ${
                          isSelected
                            ? "bg-secondary text-white border-secondary shadow-md"
                            : "bg-white text-secondary border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5"
                        }`}
                        aria-label={`Depart from ${j.place} via ${j.transport}`}
                        title={`${j.place} - ₹${j.price}${j.duration ? ` (${j.duration?.days ? `${j.duration.days} Days ${j.duration.nights} Nights` : j.duration})` : ""}`}
                      >
                        <TransportIcon className={`text-xs ${isSelected ? "text-white" : "text-secondary/70"}`} />
                        <span className="text-xs font-semibold whitespace-nowrap">{j.place}</span>
                        <span className={`text-xs font-bold ${isSelected ? "text-white/90" : "text-secondary/80"}`}>₹{j.price}</span>
                        {isSelected && <FaCheck className="text-xs ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* dates section */}
              <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-secondary flex items-center gap-2">
                    <FaCalendarAlt className="text-xs" />
                    Available Dates
                  </h3>
                  {trip.joinUsFrom?.[selectedPlaceIdx]?.place && (
                    <span className="text-xs text-secondary/60">from {trip.joinUsFrom[selectedPlaceIdx].place}</span>
                  )}
                </div>
                {trip.joinUsFrom?.[selectedPlaceIdx]?.availableDates &&
                trip.joinUsFrom[selectedPlaceIdx].availableDates.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {trip.joinUsFrom[selectedPlaceIdx].availableDates.map((date, index) => {
                      const formatted = new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
                      return (
                        <span
                          key={index}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/5 border border-secondary/20 rounded-lg font-semibold text-secondary text-xs transition-all duration-200 hover:bg-secondary hover:text-white hover:border-secondary cursor-pointer"
                          tabIndex={0}
                          aria-label={`Available on ${formatted}`}
                        >
                          <FaCalendarAlt className="text-[10px]" />
                          {formatted}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 px-2 text-center">
                    <p className="text-xs text-secondary/70 mb-3">Dates not available yet</p>
                    <a
                      href="https://wa.me/918460146012"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold text-xs transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>Connect on WhatsApp for Dates</span>
                    </a>
                  </div>
                )}
              </div>

              {/* itinerary section */}
              {trip.schedule && trip.schedule.length > 0 && (
                <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-secondary">Itinerary</h2>
                    {(() => {
                      const allExpanded = trip.schedule.every((_, idx) => expandedDays[idx]);
                      return (
                        <button
                          onClick={() => {
                            if (allExpanded) {
                              setExpandedDays({});
                            } else {
                              const newExpanded = {};
                              trip.schedule.forEach((_, idx) => {
                                newExpanded[idx] = true;
                              });
                              setExpandedDays(newExpanded);
                            }
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition bg-white"
                        >
                          {allExpanded ? (
                            <>
                              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                <line x1="8" y1="1" x2="8" y2="4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M6 4 L8 6 L10 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                <line x1="2" y1="6" x2="14" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="8" y1="8" x2="8" y2="11" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M6 8 L8 6 L10 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                              </svg>
                              <span>Collapse All</span>
                            </>
                          ) : (
                            <>
                              <div className="flex flex-col -space-y-1">
                                <FaChevronUp className="text-[8px]" />
                                <FaChevronDown className="text-[8px]" />
                              </div>
                              <span>Expand All</span>
                            </>
                          )}
                        </button>
                      );
                    })()}
                  </div>

                  <div className="flex flex-col gap-3">
                    {trip.schedule.map((s, i) => {
                      const isExpanded = expandedDays[i];
                      return (
                        <div key={i} className="bg-gray-100 overflow-hidden transition-all duration-300 rounded-xl shadow-md border border-secondary/10">
                          <button
                            onClick={() => {
                              setExpandedDays((prev) => ({ ...prev, [i]: !prev[i] }));
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-200 transition !rounded-xl"
                          >
                            <span className="flex items-center justify-center px-3 py-1 bg-gray-600 text-white rounded-full text-xs font-semibold flex-shrink-0">
                              Day {i + 1}
                            </span>
                            <span className="flex-1 text-left text-sm font-medium text-gray-800">
                              {s.heading || s.description?.substring(0, 50) + "..."}
                            </span>
                            {isExpanded ? (
                              <FaChevronUp className="text-gray-500 text-xs transition-transform duration-300 flex-shrink-0" />
                            ) : (
                              <FaChevronDown className="text-gray-500 text-xs transition-transform duration-300 flex-shrink-0" />
                            )}
                          </button>

                          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="bg-white">
                              <div className="px-4 pt-4 pb-4 space-y-4">
                                {s.description && Array.isArray(s.description) && s.description.length > 0 ? (
                                  <ul className="space-y-2 list-none">
                                    {s.description.map((point, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-800">
                                        <span className="text-secondary mt-1.5 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : typeof s.description === "string" && s.description ? (
                                  <p className="text-sm text-gray-800 leading-relaxed">{s.description}</p>
                                ) : null}
                              </div>

                              {s.images && s.images.length > 0 && (
                                <div className="relative w-full h-48 md:h-64 rounded-b-2xl overflow-hidden">
                                  <Image
                                    src={s.images[0] ? urlFor(s.images[0]).url() : "/HeroImages/saputara.jpeg"}
                                    alt={`Day ${i + 1} - ${s.heading}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">Still Got Queries ?</h3>
                <p className="text-sm text-secondary/70 mb-5">
                  Talk to Travel Traces experts for availability, pricing, and custom options.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/918460146012"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-secondary/30 hover:border-secondary text-secondary font-semibold py-3 px-3 rounded-full transition bg-secondary/5 hover:bg-secondary/10"
                  >
                    <FaWhatsapp className="text-green-500 text-xl" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:8460146012"
                    className="w-full flex items-center justify-center gap-2 border-2 border-secondary/30 hover:border-secondary text-secondary font-semibold py-3 px-3 rounded-full transition bg-secondary/5 hover:bg-secondary/10"
                  >
                    <FaPhoneAlt className="text-secondary text-lg" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
