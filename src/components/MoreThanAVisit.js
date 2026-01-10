"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

function getVisibleCount() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1400) return 4;
  if (window.innerWidth >= 1100) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

// Reusable Carousel Component
function CategoryCarousel({ title, destinations, visibleCount }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const autoPlayRef = useRef(null);
  const touchTimeoutRef = useRef(null);
  const carouselRef = useRef(null);
  const minSwipeDistance = 50;

  const pauseAutoPlay = useCallback(() => {
    setIsUserInteracting(true);
    setIsAutoPlaying(false);
    
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      setIsAutoPlaying(true);
    }, 5000);
  }, []);

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handlePrev = useCallback(() => {
    if (isTransitioning || destinations.length === 0) return;
    setIsTransitioning(true);
    setTransitionDirection('prev');
    
    setTimeout(() => {
      setCurrent((current - 1 + destinations.length) % destinations.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  }, [isTransitioning, current, destinations.length]);

  const handleNext = useCallback(() => {
    if (isTransitioning || destinations.length === 0) return;
    setIsTransitioning(true);
    setTransitionDirection('next');
    
    setTimeout(() => {
      setCurrent((current + 1) % destinations.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  }, [isTransitioning, current, destinations.length]);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
      pauseAutoPlay();
    } else if (isRightSwipe) {
      handlePrev();
      pauseAutoPlay();
    }
  }, [touchStart, touchEnd, handleNext, handlePrev, pauseAutoPlay]);

  const handleManualNavigation = useCallback((direction) => {
    if (direction === 'next') {
      handleNext();
    } else {
      handlePrev();
    }
    pauseAutoPlay();
  }, [handleNext, handlePrev, pauseAutoPlay]);

  const handleDotNavigation = useCallback((index) => {
    if (isTransitioning || index === current || destinations.length === 0) return;
    setIsTransitioning(true);
    setTransitionDirection(index > current ? 'next' : 'prev');
    
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
    pauseAutoPlay();
  }, [current, isTransitioning, pauseAutoPlay, destinations.length]);

  const visibleCards = [];
  const maxVisible = Math.min(visibleCount, destinations.length);
  for (let i = 0; i < maxVisible; i++) {
    if (destinations.length > 0) {
      visibleCards.push(destinations[(current + i) % destinations.length]);
    }
  }

  // Auto-rotate logic
  useEffect(() => {
    if (!isAutoPlaying || destinations.length === 0 || isTransitioning || isUserInteracting) return;
    
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [destinations.length, isTransitioning, isAutoPlaying, isUserInteracting, handleNext]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  if (destinations.length === 0) return null;

  return (
    <div className="mb-16 md:mb-20">
      {/* Section Title */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
          {title}
        </h3>
        <div className="h-1 w-24 bg-white/40 rounded-full mx-auto"></div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-8 w-full justify-center touch-pan-x relative overflow-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => !isUserInteracting && setIsAutoPlaying(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {visibleCards.map((dest, idx) => {
            const slug = dest.name.toLowerCase().replace(/\s+/g, "");
            return (
              <Link
                key={`${dest.name}-${current}-${idx}`}
                href={`/destinations/${slug}`}
                className={`flex items-center justify-center rounded-3xl overflow-hidden !w-[320px] !h-max transition-all duration-500 ease-out ${
                  isTransitioning 
                    ? transitionDirection === 'next' 
                      ? 'opacity-70 scale-95 translate-x-8' 
                      : 'opacity-70 scale-95 -translate-x-8'
                    : 'opacity-100 scale-100 translate-x-0'
                } hover:shadow-2xl group`}
              >
                <Image
                  src={
                    dest.image
                      ? urlFor(dest.image).width(1080).height(1350).url()
                      : "/HeroImages/saputara.jpeg"
                  }
                  alt={dest.name}
                  width={1080}
                  height={1350}
                  className="!w-full !h-auto rounded-3xl group-hover:scale-[1.03]"
                />
              </Link>
            );
          })}
        </div>

        {/* Navigation - Only show if more than one destination */}
        {destinations.length > 1 && (
          <div className="flex items-center justify-center gap-8 mt-10">
            {/* Dots */}
            <div className="flex gap-2">
              {destinations.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotNavigation(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === current 
                      ? "bg-white w-8 h-2" 
                      : "bg-white/40 w-2 h-2 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleManualNavigation('prev')}
                disabled={isTransitioning}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-secondary transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                aria-label="Previous destination"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleManualNavigation('next')}
                disabled={isTransitioning}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-secondary transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                aria-label="Next destination"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MoreThanAVisit() {
  const [allDestinations, setAllDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    setLoading(true);
    client
      .fetch(
        `*[_type == "featuredDestination"] | order(_createdAt asc){
      name,
      image,
      category
    }`
      )
      .then((data) => {
        setAllDestinations(data);
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
  const internationalTrips = allDestinations.filter(
    (dest) => dest.category === "International Trips"
  );
  const winterTreks = allDestinations.filter(
    (dest) => dest.category === "Winter Treks"
  );

  if (loading) {
    return (
      <section className="relative w-full mx-auto min-h-[500px] flex items-center justify-center bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 py-16 md:py-24 px-6 md:px-12">
        <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="h-10 md:h-14 w-64 md:w-96 bg-white/20 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-1 w-48 bg-white/20 rounded-full animate-pulse mx-auto" />
          </div>
          <div className="flex gap-8 justify-center">
            {Array.from({ length: visibleCount }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden w-[320px] h-[420px] bg-white/10 animate-pulse"
              />
            ))}
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
    <section className="relative w-full mx-auto min-h-[500px] flex items-center justify-center bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 py-16 md:py-24 px-6 md:px-12">
      <div className="relative z-10 flex flex-col w-full max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Experience More Than Travel
          </h2>
          <div className="h-1 w-32 bg-white/40 rounded-full mx-auto"></div>
        </div>

        {/* Category Carousels */}
        <CategoryCarousel
          title="Domestic Destinations"
          destinations={domesticDestinations}
          visibleCount={visibleCount}
        />
        
        <CategoryCarousel
          title="International Trips"
          destinations={internationalTrips}
          visibleCount={visibleCount}
        />
        
        <CategoryCarousel
          title="Winter Treks"
          destinations={winterTreks}
          visibleCount={visibleCount}
        />
      </div>
    </section>
  );
}
