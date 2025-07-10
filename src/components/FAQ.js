"use client";
import React, { useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import {
  FaSuitcase,
  FaMapMarkedAlt,
  FaCreditCard,
  FaHeadset,
  FaPlane,
  FaHotel,
  FaCamera,
  FaCompass,
  FaLightbulb,
  FaBullseye,
  FaBolt,
  FaShieldAlt,
  FaStar,
  FaComments,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { TbSquareArrowRight } from "react-icons/tb";

const allExperiences = [
  {
    title: "Discover Hidden Gems",
    description:
      "Let our AI-powered recommendations find the perfect destinations that match your travel style and preferences.",
    tip: "Pro tip: Use our mood-based filters for personalized suggestions",
    icon: <FaCompass className="text-base sm:text-lg text-[#003c3a]" />,
    tipIcon: <FaLightbulb className="text-base sm:text-lg text-[#003c3a]" />,
    color: "from-[#2d133b] to-[#8c78d7]",
  },
  {
    title: "Create Your Itinerary",
    description:
      "Build custom travel plans with our interactive timeline builder. Mix popular attractions with local secrets.",
    tip: "Save multiple itineraries for different seasons",
    icon: <FaMapMarkedAlt className="text-base sm:text-lg text-[#003c3a]" />,
    tipIcon: <FaBullseye className="text-base sm:text-lg text-[#003c3a]" />,
    color: "from-[#3a1857] to-[#5f4b8b]",
  },
  {
    title: "Smart Booking System",
    description:
      "Our intelligent booking engine finds the best prices and automatically suggests optimal travel dates.",
    tip: "Enable price alerts for your dream destinations",
    icon: <FaSuitcase className="text-base sm:text-lg text-[#e1b9ff]" />,
    tipIcon: <FaBolt className="text-base sm:text-lg text-[#003c3a]" />,
    color: "from-[#4b206b] to-[#2d133b]",
  },
  {
    title: "Travel Protection",
    description:
      "Comprehensive coverage that adapts to your trip type. From adventure sports to luxury retreats.",
    tip: "24/7 emergency assistance included",
    icon: <FaCreditCard className="text-base sm:text-lg text-[#003c3a]" />,
    tipIcon: <FaShieldAlt className="text-base sm:text-lg text-[#003c3a]" />,
    color: "from-[#2d133b] via-[#3a1857] to-[#8c78d7]",
  },
  {
    title: "Local Experiences",
    description:
      "Connect with authentic local guides and experience destinations like a true insider.",
    tip: "Book experiences that support local communities",
    icon: <FaCamera className="text-base sm:text-lg text-[#003c3a]" />,
    tipIcon: <FaStar className="text-base sm:text-lg text-[#003c3a]" />,
    color: "from-[#3a1857] to-[#8c78d7]",
  },
  {
    title: "Real-time Support",
    description:
      "Get instant help from our travel experts through chat, voice, or video calls anytime, anywhere.",
    tip: "Download offline maps and guides before your trip",
    icon: <FaHeadset className="text-base sm:text-lg text-[#e1b9ff]" />,
    tipIcon: <FaComments className="text-base sm:text-lg text-[#003c3a]" />,
    color: "from-[#4b206b] to-[#2d133b]",
  },
];

export default function FAQ() {
  const [hoveredExperience, setHoveredExperience] = useState(null);

  return (
    <section className="w-full py-6 sm:py-8 md:py-12 px-3 sm:px-6 md:px-16 bg-gradient-to-br from-[#003c3a] via-[#8c78d7] to-[#e1b9ff] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
            Your Travel Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
            Discover how we transform every trip into an unforgettable adventure
          </p>
        </div>

        {/* All Experience Cards Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {allExperiences.map((experience, idx) => (
              <div
                key={idx}
                className={`group relative transition-all duration-500 transform hover:scale-[1.01] ${
                  hoveredExperience === idx ? "z-20" : "z-10"
                }`}
                style={{
                  transform:
                    hoveredExperience === idx ? "scale(1.01)" : "scale(1)",
                  transitionDelay: `${idx * 80}ms`,
                }}
                onMouseEnter={() => setHoveredExperience(idx)}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                {/* Floating shadow */}
                <div
                  className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                    hoveredExperience === idx
                      ? `bg-gradient-to-r ${experience.color} blur-lg scale-105 opacity-50`
                      : "bg-white/10 blur-md scale-100 opacity-20"
                  }`}
                ></div>

                {/* Main card */}
                <div
                  className={`relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 transition-all duration-500 overflow-hidden cursor-pointer h-full ${
                    hoveredExperience === idx
                      ? "border-[#003c3a] shadow-xl"
                      : "border-white/30 hover:border-[#8c78d7]/60 shadow-lg"
                  }`}
                >
                  {/* Gradient header */}
                  <div
                    className={`bg-gradient-to-r ${experience.color} p-3 sm:p-4 md:p-6 text-white`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight">
                        {experience.title}
                      </h3>
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl opacity-80">
                        {experience.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-6 flex-1">
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed font-medium mb-3 sm:mb-4 text-[#003c3a]">
                      {experience.description}
                    </p>

                    {/* Pro tip */}
                    <div className="bg-gradient-to-r from-[#003c3a]/10 to-[#8c78d7]/10 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border-l-2 sm:border-l-3 border-[#8c78d7]">
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-0.5">
                          {experience.tipIcon}
                        </div>
                        <p className="text-xs sm:text-sm md:text-base font-semibold text-[#003c3a] leading-relaxed">
                          {experience.tip}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full transition-all duration-500 ${
                      hoveredExperience === idx
                        ? "scale-125 opacity-100"
                        : "scale-100 opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 sm:mt-8 md:mt-12 text-center group">
          <button className="font-bold flex items-center gap-2 bg-purple-900 hover:bg-purple-800 text-white text-sm sm:text-base md:text-lg px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 rounded-full shadow-lg transition-colors duration-200 border border-purple-900">
            Start Your Journey{" "}
            <FiArrowRight className="mt-0.5 sm:mt-1 group-hover:ml-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
