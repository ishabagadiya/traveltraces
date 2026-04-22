"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaImages } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { urlFor } from "@/sanity/lib/image";

const getDurationText = (duration) => {
  if (!duration) return null;
  if (duration?.days) return `${duration.days} Days ${duration.nights} Nights`;
  if (typeof duration === "string") {
    const compactDurationMatch = duration
      .trim()
      .match(/^(\d+)\s*d\s*\/\s*(\d+)\s*n$/i);
    if (compactDurationMatch) {
      const [, days, nights] = compactDurationMatch;
      return `${days} Days ${nights} Nights`;
    }
  }
  return duration;
};

const getAhmedabadOption = (destination) =>
  (destination.joinUsFrom || []).find(
    (item) => item?.place?.trim()?.toLowerCase() === "ahmedabad"
  );

const getStartingPrice = (destination) => {
  const joinPrices = (destination.joinUsFrom || [])
    .map((item) => Number(item?.price))
    .filter((value) => Number.isFinite(value));

  if (joinPrices.length > 0) return Math.min(...joinPrices);
  return null;
};

export default function DestinationCard({ destination }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const ahmedabadOption = getAhmedabadOption(destination);
  const durationText = getDurationText(ahmedabadOption?.duration);
  const startingPrice =
    Number(ahmedabadOption?.price) || getStartingPrice(destination);
  const galleryImages = useMemo(() => {
    const images = Array.isArray(destination.images) ? destination.images.slice(0, 5) : [];
    if (images.length > 0) return images;
    return destination.image ? [destination.image] : [];
  }, [destination.images, destination.image]);
  const hasMultipleImages = galleryImages.length > 1;

  const goToPreviousImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (!hasMultipleImages || isImageHovered) return undefined;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [galleryImages.length, hasMultipleImages, isImageHovered]);

  return (
    <Link
      href={`/destinations/${destination.slug?.current}`}
      className="group block w-[280px]"
    >
      <article className="w-full h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
        <div
          className="relative h-[250px] w-full overflow-hidden rounded-2xl"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={galleryImages.length > 0 ? urlFor(galleryImages[activeImageIndex]).url() : "/HeroImages/saputara.jpeg"}
            alt={destination.name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              hasMultipleImages ? "" : "object-top"
            }`}
          />

          {hasMultipleImages ? (
            <>
              {isImageHovered ? (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 text-gray-900 shadow transition hover:bg-white/70"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/50 p-2 text-gray-900 shadow transition hover:bg-white/70"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImageIndex(idx);
                    }}
                    className={`h-1 w-1 rounded-full transition ${
                      idx === activeImageIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="p-4 w-full">
          <p className="text-xs text-gray-500 mb-1.5">{durationText || "Custom Duration"}</p>
          <h3 className="text-base md:text-lg font-extrabold leading-tight text-gray-900">{destination.name}</h3>
          <p className="mt-1 text-xs text-gray-700 h-[25px]">
            {destination.tagline || destination.location || "Explore this curated trip package"}
          </p>

          <div className="py-2">
            <div className="h-[1px] w-full rounded-full bg-gray-200" />
          </div>

          <div className="flex items-end justify-between rounded-xl bg-gray-100 px-3 py-2">
            <span className="text-sm font-bold text-[#384523]">
              {startingPrice ? `₹ ${startingPrice.toLocaleString("en-IN")}` : "Contact Us"}
            </span>
            {ahmedabadOption && (
              <span className="text-xs text-gray-500">From Ahmedabad</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
