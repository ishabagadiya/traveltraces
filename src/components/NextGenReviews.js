"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const reviews = [
  {
    name: "Aarav Sharma",
    location: "Mumbai, India",
    photo: "/HeroImages/andharban.jpeg",
    comment:
      "Absolutely unforgettable! The guides were amazing and every moment felt magical. Can't wait for my next trip!",
    rating: 5,
    trip: "Andharban Trek",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Priya Patel",
    location: "Ahmedabad, India",
    photo: "/HeroImages/saputara.jpeg",
    comment:
      "The best travel experience I've ever had. The hidden gems we explored were breathtaking! Highly recommended!",
    rating: 5,
    trip: "Saputara Adventure",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Rahul Verma",
    location: "Delhi, India",
    photo: "/HeroImages/manali.jpeg",
    comment:
      "From start to finish, everything was perfect. The team made us feel like family. Thank you for the memories!",
    rating: 5,
    trip: "Manali Expedition",
    date: "3 weeks ago",
    verified: true,
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad, India",
    photo: "/HeroImages/kedarnath.jpeg",
    comment:
      "Loved every bit of the journey! The attention to detail and care was beyond expectations. Will travel again!",
    rating: 5,
    trip: "Kedarnath Pilgrimage",
    date: "1 week ago",
    verified: true,
  },
  {
    name: "Arjun Singh",
    location: "Jaipur, India",
    photo: "/HeroImages/andharban.jpeg",
    comment:
      "Professional service with a personal touch. The landscapes were stunning and the experience was seamless!",
    rating: 5,
    trip: "Rajasthan Desert Safari",
    date: "5 days ago",
    verified: true,
  },
  {
    name: "Kavya Nair",
    location: "Kochi, India",
    photo: "/HeroImages/saputara.jpeg",
    comment:
      "An incredible journey that exceeded all expectations. The local insights made it truly special!",
    rating: 5,
    trip: "Western Ghats Trek",
    date: "4 days ago",
    verified: true,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const Blobs = () => (
  <>
    <div className="absolute -top-20 -left-20 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-300 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute top-1/2 right-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-0 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
  </>
);

function FloatingCard({ review, position }) {
  // position: 'center', 'left', 'right', 'hidden'
  let transform = "";
  let opacity = 0.3;
  let zIndex = 1;
  let scale = 0.8;
  let shadow = "";
  if (position === "center") {
    transform = "translateX(0%) scale(1) rotateY(0deg)";
    opacity = 1;
    zIndex = 10;
    scale = 1;
    shadow =
      "0 8px 40px 0 rgba(139,92,246,0.25), 0 0 0 8px rgba(168,85,247,0.08)";
  } else if (position === "left") {
    transform = "translateX(-60%) scale(0.9) rotateY(15deg)";
    opacity = 0.7;
    zIndex = 5;
    scale = 0.9;
  } else if (position === "right") {
    transform = "translateX(60%) scale(0.9) rotateY(-15deg)";
    opacity = 0.7;
    zIndex = 5;
    scale = 0.9;
  } else {
    transform = "translateX(0%) scale(0.7)";
    opacity = 0.1;
    zIndex = 1;
    scale = 0.7;
  }
  return (
    <div
      className="absolute  flex items-center justify-center transition-all duration-700 ease-out"
      style={{
        transform,
        opacity,
        zIndex,
        pointerEvents: position === "center" ? "auto" : "none",
      }}
    >
      <div
        className="relative bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/30 h-full w-full max-w-xs sm:max-w-lg md:max-w-xl mx-auto flex flex-col"
        style={{ boxShadow: shadow }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {/* Floating Elements */}
        <div className="absolute top-2 right-2 w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-2xl blur-md opacity-30"></div>
              <Image
                src={review.photo}
                alt={review.name}
                width={365}
                height={400}
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white shadow-xl"
              />
              {review.verified && (
                <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-pulse-fast">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-sm sm:text-xl">
                {review.name}
              </h3>
              <p className="text-purple-600 text-xs sm:text-sm font-medium flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {review.location}
              </p>
            </div>
          </div>
          {/* Quote */}
          <blockquote className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 relative">
            <svg
              className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 text-purple-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.17 8A4.17 4.17 0 0 0 3 12.17V21h7v-8.83A4.17 4.17 0 0 0 7.17 8zm9.66 0A4.17 4.17 0 0 0 12.83 12.17V21h7v-8.83A4.17 4.17 0 0 0 16.83 8z" />
            </svg>
            <span className="relative z-10 pl-6 text-xs sm:text-sm">"{review.comment}"</span>
          </blockquote>
          {/* Rating & Trip Info */}
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} />
              <span className="text-xs sm:text-sm text-gray-500 ml-2">
                {review.rating}.0
              </span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
              {review.date}
            </span>
          </div>
          {/* Trip Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                clipRule="evenodd"
              />
            </svg>
            {review.trip}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NextGenReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const total = reviews.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  // Determine which cards to show
  const getCardPosition = (idx) => {
    if (idx === currentIndex) return "center";
    if (idx === (currentIndex + 1) % total) return "right";
    if (idx === (currentIndex - 1 + total) % total) return "left";
    return "hidden";
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-screen py-10 sm:py-16 md:py-20 px-2 sm:px-4 bg-gradient-to-br from-purple-400 via-purple-600 to-purple-700 overflow-hidden">
      <Blobs />
      <div className="relative mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-1 sm:py-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-bounce delay-500"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Traveler Stories
            </span>
          </h2>
          <p className="text-base sm:text-xl text-white/70 max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
            Experience the magic through the eyes of fellow travelers who've
            embarked on extraordinary journeys
          </p>
        </div>
        {/* Main Review Display */}
        <div className="relative h-[290px] sm:h-[330px] mb-6 sm:mb-8 w-[90%] md:w-[70%] mx-auto">
          <div
            className="w-full absolute inset-0 flex items-center justify-center"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {reviews.map((review, idx) => (
              <FloatingCard
                key={idx}
                review={review}
                position={getCardPosition(idx)}
              />
            ))}
          </div>
        </div>
        {/* Navigation */}
        <div className="flex flex-row items-center justify-between w-[90%] mx-auto gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-0">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 sm:w-12 h-2 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    : "w-2 sm:w-3 h-2 sm:h-3 bg-white/30 rounded-full hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + total) % total)
              }
              className="w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % total)}
              className="w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
            >
              <svg
                className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform"
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
    </section>
  );
}
