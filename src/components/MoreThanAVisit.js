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

export default function MoreThanAVisit() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('next');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  // Refs for cleanup
  const autoPlayRef = useRef(null);
  const touchTimeoutRef = useRef(null);
  const carouselRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Pause auto-play when user interacts
  const pauseAutoPlay = useCallback(() => {
    setIsUserInteracting(true);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 5 seconds of no interaction
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    touchTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      setIsAutoPlaying(true);
    }, 5000);
  }, []);

  // Handle touch start
  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  // Handle touch move
  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
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
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionDirection('next');
    
    setTimeout(() => {
      setCurrent((current + 1) % destinations.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  }, [isTransitioning, current, destinations.length]);

  // Handle touch end and determine swipe direction
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next card
      handleNext();
      pauseAutoPlay();
    } else if (isRightSwipe) {
      // Swipe right - previous card
      handlePrev();
      pauseAutoPlay();
    }
  }, [touchStart, touchEnd, handleNext, handlePrev, pauseAutoPlay]);

  // Handle manual navigation
  const handleManualNavigation = useCallback((direction) => {
    if (direction === 'next') {
      handleNext();
    } else {
      handlePrev();
    }
    pauseAutoPlay();
  }, [handleNext, handlePrev, pauseAutoPlay]);

  // Handle dot navigation
  const handleDotNavigation = useCallback((index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setTransitionDirection(index > current ? 'next' : 'prev');
    
    setTimeout(() => {
      setCurrent(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
    pauseAutoPlay();
  }, [current, isTransitioning, pauseAutoPlay]);

  // Get visible cards
  const visibleCards = [];
  for (let i = 0; i < visibleCount; i++) {
    if (destinations.length > 0) {
      visibleCards.push(destinations[(current + i) % destinations.length]);
    }
  }

  useEffect(() => {
    setLoading(true);
    client
      .fetch(
        `*[_type == "featuredDestination"] | order(_createdAt asc){
      name,
      image,
      price,
      duration,
      description,
      rating,
      difficulty
    }`
      )
      .then((data) => {
        setDestinations(data);
        setFavorites(Array(data.length).fill(false));
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



  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Moderate":
        return "text-yellow-600 bg-yellow-100";
      case "Challenging":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <section className="relative w-full mx-auto min-h-[400px] md:min-h-[550px] lg:min-h-[600px] flex items-center justify-center bg-secondary py-14 md:py-28 px-6 sm:px-10 md:px-18 overflow-hidden rounded-t-[2rem] md:rounded-t-[4rem] opacity-40">
        <div className="relative z-10 flex flex-col w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-5 md:mb-8">
            <div className="flex flex-col gap-1 md:gap-6">
              <div className="h-8 md:h-12 lg:h-16 w-48 md:w-80 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-1 w-60 bg-gray-300 rounded-full animate-pulse" />
            </div>
            <div className="h-6 w-64 bg-gray-200 rounded animate-pulse my-4" />
          </div>
          <div className="flex flex-col items-center">
            {/* Skeleton Carousel Cards */}
            <div className="flex gap-10 w-full justify-center">
              {Array.from({ length: visibleCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden shadow-lg w-[400px] h-[350px] md:h-[400px] border-2 border-white/20 ring-2 ring-white/10 bg-gray-200 animate-pulse opacity-40"
                >
                  {/* Favorite Heart Icon Skeleton */}
                  <div className="absolute top-4 right-4 z-30 p-2 rounded-full bg-gray-300 w-8 h-8" />
                  {/* Difficulty Skeleton */}
                  <div className="absolute top-4 left-4 z-30 px-4 py-2 rounded-full bg-gray-300 w-20 h-6" />
                  {/* Image Skeleton */}
                  <div className="w-full h-full bg-gray-300" />
                  {/* Bottom Overlay Skeleton */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5 w-[90%] rounded-tr-2xl bg-gray-100 backdrop-blur-md shadow-md flex flex-col gap-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full" />
                        <div className="h-6 w-32 bg-gray-300 rounded" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-300 rounded-full" />
                        <div className="h-4 w-8 bg-gray-300 rounded" />
                      </div>
                    </div>
                    <div className="h-4 w-full bg-gray-300 rounded mb-2" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                    <div className="flex items-center gap-4 mt-4">
                      <div className="w-20 h-4 bg-gray-300 rounded" />
                      <div className="w-16 h-4 bg-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Skeleton Progress and Arrows */}
            <div className="flex items-center justify-between gap-4 mt-6 w-full">
              <div className="flex gap-2">
                {Array.from({ length: visibleCount }).map((_, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/30 w-2 h-2 animate-pulse"
                    style={{ display: "inline-block" }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-6">
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="w-full flex items-center justify-center min-h-[400px] py-10">
        <div className="text-lg text-red-600 font-semibold">{error}</div>
      </section>
    );
  }
  if (destinations.length === 0) {
    return (
      <section className="w-full flex items-center justify-center min-h-[400px] py-10">
        <div className="text-lg text-gray-600 font-semibold">
          No featured destinations found.
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full mx-auto min-h-[400px] md:min-h-[550px] lg:min-h-[600px] flex items-center justify-center bg-secondary py-14 mt-14 md:py-28 px-6 sm:px-10 md:px-18 overflow-hidden rounded-[2rem] md:rounded-[4rem]">
      <div className="relative z-10 flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-5 md:mb-8">
          <div className="flex flex-col gap-1 md:gap-6">
            <h2 className="text-xl md:text-3xl lg:text-5xl font-extrabold text-white mb-3 md:mb-0 shiny-text">
              Experience More Than Travel
            </h2>
            <div className="h-0.5 sm:h-1 w-60 bg-gradient-to-r from-white to-secondary rounded-full"></div>
          </div>
          <p className="text-gray-300 text-sm md:text-base md:text-right my-4">
            Uncover hidden gems and make memories that last a lifetime. Your
            next adventure starts here!
          </p>
        </div>
        <div className="flex flex-col items-center">
          {/* Carousel Cards */}
          <div
            ref={carouselRef}
            className="flex gap-10 w-full justify-center touch-pan-x relative"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => !isUserInteracting && setIsAutoPlaying(true)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {visibleCards.map((dest, idx) => {
              // Find the real index in the destinations array
              const realIdx = (current + idx) % destinations.length;
              const slug = dest.name.toLowerCase().replace(/\s+/g, "");
              return (
                <div
                  key={`${dest.name}-${current}-${idx}`}
                  className={`relative rounded-2xl overflow-hidden shadow-lg w-[400px] h-[350px] md:h-[400px] border-2 border-white/20 ring-2 ring-white/10 transition-all duration-500 ease-in-out transform ${
                    isTransitioning 
                      ? transitionDirection === 'next' 
                        ? 'opacity-0 scale-95 translate-x-4' 
                        : 'opacity-0 scale-95 -translate-x-4'
                      : 'opacity-100 scale-100 translate-x-0'
                  } hover:shadow-2xl touch-manipulation`}
                >
                  <Link href={`/destinations/${slug}`} className="block w-full h-full">
                    {/* Favorite Heart Icon */}
                    <button
                      className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white/30 transition-all duration-200 hover:scale-110"
                      onClick={(e) => {
                        e.preventDefault();
                        setFavorites((favs) => {
                          const updated = [...favs];
                          updated[realIdx] = !updated[realIdx];
                          return updated;
                        });
                      }}
                      aria-label={
                        favorites[realIdx]
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {favorites[realIdx] ? (
                        <svg
                          className="w-4 h-4 text-secondary transition-all duration-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-secondary transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                    </button>

                    <div
                      className={`absolute top-4 left-4 z-30 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${getDifficultyColor(dest.difficulty)}`}
                    >
                      {dest.difficulty}
                    </div>

                    <Image
                      src={
                        dest.image
                          ? urlFor(dest.image).width(675).height(390).url()
                          : "/HeroImages/saputara.jpeg"
                      }
                      alt={dest.name}
                      width={675}
                      height={390}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Bottom Gradient Overlay for readability */}

                   
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 w-[90%] rounded-bl-2xl rounded-tr-2xl bg-white backdrop-blur-md shadow-md transition-all duration-300 transform translate-y-0 group-hover:translate-y-[-2px] group-hover:shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-1">
                          {/* Location Pin Icon */}
                          <svg
                            className="w-6 h-6 text-secondary transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21c-4.418 0-8-7.163-8-10.5A8 8 0 0112 2a8 8 0 018 8.5C20 13.837 16.418 21 12 21z"
                            />
                            <circle cx="12" cy="10" r="3" fill="currentColor" />
                          </svg>
                          <div className="text-lg font-bold text-gray-900 transition-colors duration-200">
                            {dest.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-yellow-400 transition-all duration-200"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-600 transition-colors duration-200">
                            {dest.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 transition-colors duration-200">
                        {dest.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-seondary font-medium mt-4 transition-all duration-200">
                        <span className="flex items-center gap-1">
                          {/* Calendar Icon */}
                          <svg
                            className="w-4 h-4 text-secondary/60 transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                            <line
                              x1="16"
                              y1="2"
                              x2="16"
                              y2="6"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="8"
                              y1="2"
                              x2="8"
                              y2="6"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="3"
                              y1="10"
                              x2="21"
                              y2="10"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          {dest.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          {/* Unicode Indian Rupee Symbol */}
                          <span className="text-secondary/60 font-bold text-base transition-colors duration-200">
                            ₹
                          </span>
                          {dest.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* Progress and Arrows */}
          <div className="flex items-center justify-between gap-4 mt-6 w-full">
            {/* Dots */}
            <div className="flex gap-2">
              {destinations.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => handleDotNavigation(idx)}
                  className={`rounded-full transition-all duration-300 cursor-pointer hover:bg-white/50 ${
                    idx === current 
                      ? "bg-white w-4 h-2 shadow-lg" 
                      : "bg-white/30 w-2 h-2 hover:scale-125"
                  }`}
                  style={{ display: "inline-block" }}
                />
              ))}
            </div>
            {/* Right Arrow */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleManualNavigation('prev')}
                disabled={isTransitioning}
                className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white/50 text-secondary shadow transition-all duration-200 hover:scale-110 active:scale-95 ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
                aria-label="Previous destination"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleManualNavigation('next')}
                disabled={isTransitioning}
                className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white/50 text-secondary shadow transition-all duration-200 hover:scale-110 active:scale-95 ${
                  isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
                aria-label="Next destination"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
