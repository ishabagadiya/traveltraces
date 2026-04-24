"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiX } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaDownload,
  FaBus,
  FaPlane,
  FaTrain,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
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
  const [heroImageStartIndex, setHeroImageStartIndex] = useState(0);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [openTripFaqIndex, setOpenTripFaqIndex] = useState(null);
  const cardRefs = useRef([]);
  const galleryScrollRef = useRef(null);
  const isGalleryDraggingRef = useRef(false);
  const galleryDragStartXRef = useRef(0);
  const galleryStartScrollLeftRef = useRef(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client
      .fetch(
        `*[_type == "featuredDestination" && slug.current == $slug][0]{
          name,
          tagline,
          images,
          description,
          joinUsFrom[]{
            place,
            price,
            duration,
            availableDates[],
            schedule
          },
          location,
          image,
          price,
          category,
          inclusions,
          exclusions,
          tripGallery,
          faqs[]{
            question,
            answer
          },
          brochures[]{
            buttonName,
            pdf{
              asset->{url, originalFilename, mimeType}
            }
          }
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

  useEffect(() => {
    if (!trip?.images || trip.images.length <= 1) return undefined;

    const interval = setInterval(() => {
      setHeroImageStartIndex((prev) => (prev + 1) % trip.images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [trip?.images]);

  useEffect(() => {
    if (!isAboutModalOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsAboutModalOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isAboutModalOpen]);

  const selectedDuration = trip?.joinUsFrom?.[selectedPlaceIdx]?.duration || trip?.joinUsFrom?.[0]?.duration;
  const durationText =
    selectedDuration?.days != null
      ? `${selectedDuration.days} Days ${selectedDuration.nights ?? 0} Nights`
      : "N/A";
  const selectedSchedule = trip?.joinUsFrom?.[selectedPlaceIdx]?.schedule || [];
  const tripFaqs = Array.isArray(trip?.faqs) ? trip.faqs.filter((faq) => faq?.question && faq?.answer) : [];
  const aboutDescription = String(trip?.description || "").trim();
  const shouldTruncateAbout = aboutDescription.length > 180;
  const visibleAboutDescription = shouldTruncateAbout
    ? `${aboutDescription.slice(0, 150).trim()}...`
    : aboutDescription || "No description available.";

  const rotatingImages = Array.isArray(trip?.images) ? trip.images : [];
  const tripGalleryImages = Array.isArray(trip?.tripGallery) && trip.tripGallery.length > 0
    ? trip.tripGallery.filter(Boolean)
    : rotatingImages;
  const loopedTripGalleryImages =
    tripGalleryImages.length > 1
      ? [...tripGalleryImages, ...tripGalleryImages, ...tripGalleryImages]
      : tripGalleryImages;
  const activeHeroImage =
    rotatingImages.length > 0
      ? rotatingImages[heroImageStartIndex % rotatingImages.length]
      : trip?.image;

  const normalizeGalleryLoop = () => {
    const el = galleryScrollRef.current;
    if (!el || tripGalleryImages.length <= 1) return;
    const oneSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft < oneSetWidth * 0.5) {
      el.scrollLeft += oneSetWidth;
    } else if (el.scrollLeft > oneSetWidth * 1.5) {
      el.scrollLeft -= oneSetWidth;
    }
  };

  const scrollGallery = (direction) => {
    if (!galleryScrollRef.current) return;
    const scrollAmount = 320;
    galleryScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(normalizeGalleryLoop, 360);
  };

  const startGalleryDrag = (clientX) => {
    if (!galleryScrollRef.current) return;
    isGalleryDraggingRef.current = true;
    galleryDragStartXRef.current = clientX;
    galleryStartScrollLeftRef.current = galleryScrollRef.current.scrollLeft;
  };

  const moveGalleryDrag = (clientX) => {
    if (!isGalleryDraggingRef.current || !galleryScrollRef.current) return;
    const distance = clientX - galleryDragStartXRef.current;
    galleryScrollRef.current.scrollLeft = galleryStartScrollLeftRef.current - distance;
  };

  const endGalleryDrag = () => {
    isGalleryDraggingRef.current = false;
    normalizeGalleryLoop();
  };

  useEffect(() => {
    const el = galleryScrollRef.current;
    if (!el || tripGalleryImages.length <= 1) return;

    const oneSetWidth = el.scrollWidth / 3;
    el.scrollLeft = oneSetWidth;

    const onScroll = () => {
      if (isGalleryDraggingRef.current) return;
      normalizeGalleryLoop();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [tripGalleryImages.length]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!trip) return <div className="min-h-screen flex items-center justify-center">Not found</div>;

  return (
    <div className="w-full bg-[#dfdfdf]">
      <main className="min-h-screen">
        {activeHeroImage && (
          <section className="w-full mt-0 mb-4">
            <div className="relative h-[400px] md:h-[550px] overflow-hidden">
              <Image
                src={urlFor(activeHeroImage).url()}
                alt={`${trip.name} - Main Image`}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute left-6 bottom-8 z-10 max-w-[90%] md:left-10 md:bottom-12 md:max-w-[55%]">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                  {trip.name}
                </h1>
                <p className="mt-2 text-sm sm:text-lg font-semibold text-white/95 tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                  {trip.tagline}
                </p>
              </div>
              {rotatingImages.length > 1 ? (
                <div className="absolute left-10 top-4 z-10 flex items-center gap-1.5">
                  {rotatingImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${idx === heroImageStartIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                        }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        )}

        <section className="pb-20 w-full md:w-[90%] mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-2">
          <aside className="flex flex-col gap-2 w-full md:w-1/2 md:sticky top-2 h-full">
            {/* destination details section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <p className="mb-4 text-xs sm:text-sm font-semibold text-secondary">
                {durationText}
              </p>
              <h1 className="text-2xl md:text-3xl font-black mb-3 text-gray-900 tracking-tight leading-tight">
                About {trip.name} Trip
              </h1>
              {!shouldTruncateAbout && aboutDescription ? (
                <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="leading-relaxed">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-bold text-gray-900">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-base font-semibold text-gray-900">{children}</h3>,
                      ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    }}
                  >
                    {aboutDescription}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {visibleAboutDescription}
                  {shouldTruncateAbout ? (
                    <>
                      {" "}
                      <button
                        type="button"
                        onClick={() => setIsAboutModalOpen(true)}
                        className="inline p-0 text-sm font-semibold text-[#1A73E8] underline underline-offset-2"
                      >
                        Read More
                      </button>
                    </>
                  ) : null}
                </p>
              )}
              {Array.isArray(trip.brochures) && trip.brochures.length > 0 ? (
                <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
                  {trip.brochures.map((brochure, index) => {
                    const fileUrl = brochure?.pdf?.asset?.url;
                    if (!fileUrl) return null;

                    const fileName = brochure?.pdf?.asset?.originalFilename || "brochure.pdf";
                    const buttonLabel = brochure?.buttonName || "Download Brochure";

                    return (
                      <a
                        key={`brochure-${index}`}
                        href={`${fileUrl}?dl=${encodeURIComponent(fileName)}`}
                        download
                        className="flex items-center gap-2 px-4 py-2 border border-secondary/30 rounded-full text-secondary hover:bg-secondary/5 transition"
                      >
                        <FaDownload className="text-xs md:text-base" />
                        <span className="text-xs md:text-sm">{buttonLabel}</span>
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-secondary mb-2">Still Got Queries ?</h3>
              <p className="text-sm text-secondary/70 mb-5">
                Talk to Travel Traces experts for availability, pricing, and custom options.
              </p>
              <div className="grid grid-cols-2 gap-1 sm:gap-3">
                <a
                  href="https://wa.me/918460146012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-secondary px-2 md:px-6 py-2 md:py-2.5 md:text-xs text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white text-nowrap"
                >
                  <FaWhatsapp className="text-xs md:text-base" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:8460146012"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-secondary px-2 md:px-6 py-2 md:py-2.5 md:text-xs text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-white text-nowrap"
                >
                  <FaPhoneAlt className="text-xs md:text-base" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </aside>

          <main className="flex flex-col gap-2 w-full md:w-1/2">
            {/* join us from section */}
            <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg md:text-xl font-bold text-secondary flex items-center gap-2">
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
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200 ${isSelected
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
                <h3 className="text-lg md:text-xl font-bold text-secondary flex items-center gap-2">
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
            {selectedSchedule.length > 0 && (
              <div className="rounded-xl px-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-secondary">Itinerary</h2>
                  {(() => {
                    const allExpanded = selectedSchedule.every((_, idx) => expandedDays[idx]);
                    return (
                      <button
                        onClick={() => {
                          if (allExpanded) {
                            setExpandedDays({});
                          } else {
                            const newExpanded = {};
                            selectedSchedule.forEach((_, idx) => {
                              newExpanded[idx] = true;
                            });
                            setExpandedDays(newExpanded);
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition bg-white"
                      >
                        {allExpanded ? (
                          <>
                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                              <line x1="8" y1="1" x2="8" y2="4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M6 4 L8 6 L10 4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                              <line x1="2" y1="6" x2="14" y2="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                              <line x1="8" y1="8" x2="8" y2="11" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M6 8 L8 6 L10 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                            <span className="text-xs md:text-sm">Collapse All</span>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col -space-y-1">
                              <FaChevronUp className="text-[8px]" />
                              <FaChevronDown className="text-[8px]" />
                            </div>
                            <span className="text-xs md:text-sm">Expand All</span>
                          </>
                        )}
                      </button>
                    );
                  })()}
                </div>

                <div className="flex flex-col gap-3">
                  {selectedSchedule.map((s, i) => {
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
                                <ul className="space-y-2 list-disc list-inside marker:text-secondary">
                                  {s.description.map((point, idx) => (
                                    <li key={idx} className="text-sm text-gray-800 leading-relaxed">{point}</li>
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

            {trip.inclusions?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4 md:p-5">
                <h2 className="text-lg md:text-xl font-bold text-secondary mb-3">Included</h2>
                <ul className="space-y-2 list-disc list-inside marker:text-secondary">
                  {trip.inclusions.map((item, idx) => (
                    <li key={`inclusion-${idx}`} className="text-sm text-gray-800 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {trip.exclusions?.length > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4 md:p-5">
                <h2 className="text-lg md:text-xl font-bold text-secondary mb-3">Not Included</h2>
                <ul className="space-y-2 list-disc list-inside marker:text-secondary">
                  {trip.exclusions.map((item, idx) => (
                    <li key={`exclusion-${idx}`} className="text-sm text-gray-800 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {tripFaqs.length > 0 && (
              <div className="bg-white rounded-xl shadow-md border border-secondary/10 p-4 md:p-5">
                <h2 className="mb-4 text-lg md:text-xl font-bold text-secondary">FAQs</h2>
                <div className="border-y border-secondary/30">
                  {tripFaqs.map((faq, index) => {
                    const isOpen = openTripFaqIndex === index;
                    const itemIndex = String(index + 1).padStart(2, "0");

                    return (
                      <div key={`trip-faq-${index}`} className="border-b border-secondary/20 last:border-b-0">
                        <div
                          onClick={() => setOpenTripFaqIndex((prev) => (prev === index ? -1 : index))}
                          className="grid cursor-pointer grid-cols-[56px_1fr_auto] items-start gap-3 px-3 py-4 md:grid-cols-[72px_1fr_auto] md:px-5"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setOpenTripFaqIndex((prev) => (prev === index ? -1 : index));
                            }
                          }}
                          aria-expanded={isOpen}
                          aria-controls={`trip-faq-answer-${index}`}
                        >
                          <span className="pt-1 text-[11px] text-gray-500 md:text-xs">[{itemIndex}]</span>

                          <div className="pr-2">
                            <p className="text-xs font-semibold leading-tight text-gray-900 sm:text-base">{faq.question}</p>
                            {isOpen ? (
                              <p id={`trip-faq-answer-${index}`} className="mt-2 max-w-3xl text-xs leading-relaxed text-gray-700 md:text-sm">
                                {faq.answer}
                              </p>
                            ) : null}
                          </div>

                          <div className="flex items-start pt-1">
                            <span
                              className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs transition-all ${isOpen ? "border-secondary bg-secondary text-white" : "border-gray-400 text-gray-500"
                                }`}
                              aria-hidden
                            >
                              {isOpen ? "-" : "+"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </main>
        </section>

        {tripGalleryImages.length > 0 && (
          <section className="w-full md:w-[80%] mx-auto px-4 md:px-0 pb-20 overflow-hidden">
            <div className="relative flex flex-col items-center justify-center w-full">
              <h2 className="text-lg md:text-2xl font-bold text-secondary text-center w-full z-30">Journey in Frames</h2>
              <p className="mt-1 text-sm text-gray-600 text-center z-30">Pictures Perfect Moments</p>
            </div>
            <div className="relative mt-5">
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                className="absolute left-2 top-1/2 z-30 inline-flex h-7 md:h-10 w-7 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-secondary/65 text-white shadow-lg backdrop-blur-sm transition hover:bg-secondary/80"
                aria-label="Scroll gallery left"
              >
                <FaChevronLeft className="text-xs md:text-base" />
              </button>
              <div className="pointer-events-none absolute top-[-80px] z-10 m-0 h-[102px] w-full shrink-0 scale-110 rounded-[50%/40%] bg-[#dfdfdf] p-0 box-border" />
              <div
                ref={galleryScrollRef}
                className="overflow-x-auto overflow-y-hidden px-8 cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-2"
                onMouseDown={(e) => startGalleryDrag(e.clientX)}
                onMouseMove={(e) => moveGalleryDrag(e.clientX)}
                onMouseUp={endGalleryDrag}
                onMouseLeave={endGalleryDrag}
                onTouchStart={(e) => startGalleryDrag(e.touches[0].clientX)}
                onTouchMove={(e) => moveGalleryDrag(e.touches[0].clientX)}
                onTouchEnd={endGalleryDrag}
              >
                {loopedTripGalleryImages.map((photo, idx) => (
                  <div key={`trip-gallery-${idx}`} className="relative md:h-[400px] md:w-[300px] h-[200px] w-[150px] shrink-0 overflow-hidden">
                    <Image
                      src={urlFor(photo).url()}
                      alt={`${trip.name} gallery photo ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 176px, 208px"
                    />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute bottom-[-70px] z-10 m-0 h-[102px] w-full shrink-0 scale-110 rounded-[50%/40%] bg-[#dfdfdf] p-0 box-border" />
              <button
                type="button"
                onClick={() => scrollGallery("right")}
                className="absolute right-2 top-1/2 z-30 inline-flex h-7 md:h-10 w-7 md:w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-secondary/65 text-white shadow-lg backdrop-blur-sm transition hover:bg-secondary/80"
                aria-label="Scroll gallery right"
              >
                <FaChevronRight className="text-xs md:text-base" />
              </button>
            </div>
          </section>
        )}
      </main>

      {isAboutModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-trip-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close trip description"
            onClick={() => setIsAboutModalOpen(false)}
          />

          <div className="relative z-10 max-h-[min(90vh,640px)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:rounded-[1.75rem] md:p-8">
            <button
              type="button"
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close"
            >
              <FiX className="h-5 w-5" />
            </button>

            <h2 id="about-trip-modal-title" className="pr-10 text-xl font-bold text-gray-900 md:text-2xl">
              About {trip.name} Trip
            </h2>

            <div className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  h1: ({ children }) => <h1 className="text-xl font-bold text-gray-900">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold text-gray-900">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-semibold text-gray-900">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                }}
              >
                {aboutDescription || "No description available."}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
