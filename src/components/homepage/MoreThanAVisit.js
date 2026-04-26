"use client";
import React, { useState, useEffect, useRef } from "react";
import { client } from "@/sanity/lib/client";
import { FaChevronRight } from "react-icons/fa";
import DestinationCard from "@/components/destinations/DestinationCard";

function getVisibleCount() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1400) return 4;
  if (window.innerWidth >= 1100) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

// Reusable Carousel Component
function CategoryCarousel({ title, destinations, visibleCount }) {
  const scrollRef = useRef(null);

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: Math.max(scrollRef.current.clientWidth * 0.75, 220),
      behavior: "smooth",
    });
  };

  if (destinations.length === 0) return null;

  return (
    <div className="w-full md:w-[90%] mx-auto">
      {/* Section Title */}
      <div className="mb-4 md:mb-8 text-left">
        <h3 className="text-2xl md:text-4xl font-bold text-secondary mb-3">
          {title}
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-8 w-full overflow-x-auto overflow-y-hidden pb-2 touch-pan-x [&::-webkit-scrollbar]:hidden"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {destinations.map((dest, idx) => {
            const fallbackSlug = String(dest?.name || "")
              .trim()
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            const normalizedDestination = {
              ...dest,
              slug: dest?.slug?.current
                ? dest.slug
                : { current: fallbackSlug },
            };

            return (
              <div key={`${dest.name}-${idx}`} className="shrink-0">
                <DestinationCard destination={normalizedDestination} />
              </div>
            );
          })}
        </div>
        {destinations.length > 1 && (
          <button
            type="button"
            onClick={handleScrollRight}
            aria-label={`Scroll ${title} carousel right`}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 sm:w-10 sm:h-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-white transition-colors  cursor-pointer"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function MoreThanAVisit() {
  const [allDestinations, setAllDestinations] = useState([]);
  const [featureVideoUrl, setFeatureVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    setLoading(true);
    Promise.all([
      client.fetch(
        `*[_type == "featuredDestination"] | order(_createdAt asc){
          name,
          image,
          category,
          showOnUpcomingTrips,
          joinUsFrom[]{place, price}
        }`
      ),
      client.fetch(
        `*[_type == "homepageMedia" && isActive == true] | order(_updatedAt desc)[0]{
          featureVideo{
            asset->{
              url
            }
          }
        }`
      ),
    ])
      .then(([destinationData, homepageMedia]) => {
        setAllDestinations(destinationData);
        if (homepageMedia?.featureVideo?.asset?.url) {
          setFeatureVideoUrl(homepageMedia.featureVideo.asset.url);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load featured destinations.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter destinations by category
  const domesticDestinations = allDestinations.filter(
    (dest) => dest.category === "Domestic Destinations"
  );
  const upcomingTrips = allDestinations.filter((dest) => dest.showOnUpcomingTrips);
  const internationalTrips = allDestinations.filter(
    (dest) => dest.category === "International Trips"
  );
  const treks = allDestinations.filter(
    (dest) => dest.category === "Treks" || dest.category === "Winter Treks"
  );

  if (loading) {
    return (
      <section className="relative w-full mx-auto bg-[#dfdfdf] py-8 sm:py-12 px-4 md:px-0">
        <div className="relative z-10 flex flex-col gap-8 sm:gap-12 w-full">
          {["Upcoming Trips", "Domestic Destinations"].map((title) => (
            <div key={title} className="w-full md:w-[90%] mx-auto">
              <div className="mb-4 md:mb-8">
                <div className="h-8 w-44 rounded-md bg-white/70 animate-pulse md:h-10 md:w-64" />
              </div>
              <div className="flex gap-4 md:gap-8 overflow-hidden pb-2">
                {Array.from({ length: visibleCount }).map((_, idx) => (
                  <div
                    key={`${title}-${idx}`}
                    className="rounded-2xl md:rounded-3xl w-[170px] sm:w-[200px] md:w-[250px] h-[250px] sm:h-[290px] md:h-[360px] bg-white/70 animate-pulse shrink-0"
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="relative z-20 -mb-[120px] md:-mb-[170px]">
            <div className="mx-auto w-full md:w-[90%] h-[200px] md:h-[300px] overflow-hidden rounded-2xl bg-white/70 animate-pulse" />
          </div>

          <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#dfdfdf] pt-[120px] pb-8 md:pt-[200px] sm:pb-10 px-4 md:px-0">
            <div className="w-full md:w-[90%] mx-auto">
              <div className="mb-4 md:mb-8">
                <div className="h-8 w-24 rounded-md bg-white/70 animate-pulse md:h-10 md:w-36" />
              </div>
              <div className="flex gap-4 md:gap-8 overflow-hidden pb-2">
                {Array.from({ length: visibleCount }).map((_, idx) => (
                  <div
                    key={`treks-${idx}`}
                    className="rounded-2xl md:rounded-3xl w-[170px] sm:w-[200px] md:w-[250px] h-[250px] sm:h-[290px] md:h-[360px] bg-white/70 animate-pulse shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[90%] mx-auto">
            <div className="mb-4 md:mb-8">
              <div className="h-8 w-44 rounded-md bg-white/70 animate-pulse md:h-10 md:w-64" />
            </div>
            <div className="flex gap-4 md:gap-8 overflow-hidden pb-2">
              {Array.from({ length: visibleCount }).map((_, idx) => (
                <div
                  key={`international-${idx}`}
                  className="rounded-2xl md:rounded-3xl w-[170px] sm:w-[200px] md:w-[250px] h-[250px] sm:h-[290px] md:h-[360px] bg-white/70 animate-pulse shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex items-center justify-center min-h-[400px] py-10">
        <div className="text-lg text-red-500 font-medium">{error}</div>
      </section>
    );
  }

  return (
    <section className="relative w-full mx-auto min-h-[500px] flex items-center justify-center bg-white py-8 sm:py-12 px-4 md:px-0">
      <div className="relative z-10 flex flex-col gap-8 sm:gap-12 w-full">

        {/* Category Carousels */}
        <CategoryCarousel
          title="Upcoming Trips"
          destinations={upcomingTrips}
          visibleCount={visibleCount}
        />

        <CategoryCarousel
          title="Domestic Destinations"
          destinations={domesticDestinations}
          visibleCount={visibleCount}
        />

        <div className="relative z-20 -mb-[120px] md:-mb-[170px]">
          <div className="mx-auto w-full md:w-[90%] h-[200px] md:h-[300px] overflow-hidden rounded-2xl shadow-lg">
            {featureVideoUrl && (
            <video
              src={featureVideoUrl}
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              className="block w-full h-full object-cover object-center"
            >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#dfdfdf] pt-[120px] pb-8 md:pt-[200px] sm:pb-10 px-6 md:px-0">
          <CategoryCarousel
            title="Treks"
            destinations={treks}
            visibleCount={visibleCount}
          />
        </div>

        <CategoryCarousel
          title="International Trips"
          destinations={internationalTrips}
          visibleCount={visibleCount}
        />

      </div>
    </section>
  );
}
