"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';

const destinations = [
  {
    name: "Saputara",
    image: "/HeroImages/saputara.jpeg",
    price: "4,500",
    duration: "2 days",
    description: "Gujarat's hill station with misty mountains and tribal culture",
    rating: 4.5,
    difficulty: "Easy"
  },
  {
    name: "Andharban",
    image: "/HeroImages/andharban.webp",
    price: "3,200",
    duration: "1 day",
    description: "Dense forest trek with stunning valley views",
    rating: 4.2,
    difficulty: "Moderate"
  },
  {
    name: "Matheran",
    image: "/HeroImages/matheran.jpeg",
    price: "5,000",
    duration: "2 days",
    description: "Peaceful hill station with toy train and sunset points",
    rating: 4.3,
    difficulty: "Easy"
  },
  {
    name: "Manali",
    image: "/HeroImages/manali.jpeg",
    price: "12,000",
    duration: "5 days",
    description: "Adventure hub with snow peaks and river valleys",
    rating: 4.6,
    difficulty: "Moderate"
  },
  {
    name: "Kedarnath",
    image: "/HeroImages/kedarnath.jpeg",
    price: "15,000",
    duration: "6 days",
    description: "Sacred pilgrimage trek to ancient Shiva temple",
    rating: 4.8,
    difficulty: "Challenging"
  },
];


function getVisibleCount() {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export default function MoreThanAVisit() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const total = destinations.length;
  const intervalRef = useRef();
  const [favorites, setFavorites] = useState(Array(destinations.length).fill(false));

  useEffect(() => {
    function handleResize() {
      setVisibleCount(getVisibleCount());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotate logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [total]);

  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  // Get visible cards
  const visibleCards = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleCards.push(destinations[(current + i) % total]);
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  return (
    <section className="relative w-full mx-auto min-h-[600px] md:min-h-[700px] flex items-center justify-center py-28 px-18 md:py-20 overflow-hidden">

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.1),transparent_50%)]" />
      </div>
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 md:mb-0">Experience More Than Travel</h2>
            <div className="h-1 w-60 bg-gradient-to-r from-purple-500 via-indigo-500 to-white rounded-full"></div>
          </div>
          <p className="text-gray-500 max-w-lg text-lg md:text-right">Uncover hidden gems and make memories that last a lifetime. Your next adventure starts here!</p>
      </div>
      <div className="flex flex-col items-center">
        {/* Carousel Cards */}
          <div className="flex gap-10 w-full justify-center">
            {visibleCards.map((dest, idx) => {
              // Find the real index in the destinations array
              const realIdx = (current + idx) % destinations.length;
              const slug = dest.name.toLowerCase().replace(/\s+/g, '');
              return (
                <Link href={`/destinations/${slug}`} key={dest.name} className="relative rounded-2xl overflow-hidden shadow-lg group w-[400px] h-[400px] border-2 border-purple-200 ring-2 ring-purple-100 transition-transform duration-300 hover:shadow-2xl">
                  {/* Favorite Heart Icon */}
                  <button
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-purple-100 transition"
                    onClick={e => { e.preventDefault(); setFavorites(favs => { const updated = [...favs]; updated[realIdx] = !updated[realIdx]; return updated; }); }}
                    aria-label={favorites[realIdx] ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites[realIdx] ? (
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    )}
                  </button>

                  <div className={`absolute top-4 left-4 z-30 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(dest.difficulty)}`}>
                    {dest.difficulty}
                  </div>


                  <Image
                    src={dest.image}
                    alt={dest.name}
                    width={675}
                    height={390}
                    className="object-cover w-full h-full" />
                  {/* Bottom Gradient Overlay for readability */}

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5 w-[90%] rounded-tr-2xl bg-purple-200/60 backdrop-blur-md shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 mb-1">
                        {/* Location Pin Icon */}
                        <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-7.163-8-10.5A8 8 0 0112 2a8 8 0 018 8.5C20 13.837 16.418 21 12 21z" />
                          <circle cx="12" cy="10" r="3" fill="currentColor" />
                        </svg>
                        <div className="text-lg font-bold text-gray-900">{dest.name}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-600">{dest.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {dest.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-purple-900 font-medium mt-4">
                      <span className="flex items-center gap-1">
                        {/* Calendar Icon */}
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
                          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
                          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
                          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        {dest.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        {/* Unicode Indian Rupee Symbol */}
                        <span className="text-purple-500 font-bold text-base">₹</span>
                        {dest.price}
                      </span>
                    </div>
              </div>
            </Link>
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
                onClick={() => setCurrent(idx)}
                  className={`rounded-full transition-all duration-200 cursor-pointer ${idx === current ? 'bg-purple-600 w-4 h-2' : 'bg-purple-300 w-2 h-2'}`}
                style={{ display: 'inline-block' }}
              />
            ))}
          </div>
          {/* Right Arrow */}
            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-purple-300 text-purple-800 shadow transition"
                aria-label="Previous destination"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
              </button>
          <button
            onClick={next}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-purple-300 text-purple-800 shadow transition"
            aria-label="Next destination"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 