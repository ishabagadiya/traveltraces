"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { client } from "../sanity/lib/client";
import { specialFeaturesQuery } from "../sanity/lib/queries";
import Link from "next/link";

// Reusable FeatureCard component
const FeatureCard = ({ feature, idx, hoveredFeature, setHoveredFeature, prefix }) => (
  <div
    key={`${prefix}-${idx}`}
    className={`flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px] lg:w-[500px] xl:w-[600px] mx-2 sm:mx-3 md:mx-4 group transition-all duration-500 ${
      hoveredFeature === idx ? "z-20" : "z-10"
    }`}
    onMouseEnter={() => setHoveredFeature(idx)}
    onMouseLeave={() => setHoveredFeature(null)}
  >
    <div className="flex items-center py-4 sm:py-6 md:py-8 px-2 sm:px-3 md:px-4">
      {/* Image always on left */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-xl sm:rounded-2xl overflow-hidden mr-3 sm:mr-4 md:mr-6 lg:mr-8">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      {/* Content always on right */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-sm lg:text-xl xl:text-2xl font-bold text-[#384523] mb-2 sm:mb-3 tracking-wider leading-tight">
          {feature.title}
        </h3>
        <p className="text-[8px] sm:text-xs lg:text-lg text-[#384523]/80 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  </div>
);

export default function FAQ() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [specialFeatures, setSpecialFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialFeatures = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(specialFeaturesQuery);
        setSpecialFeatures(data);
      } catch (err) {
        console.error('Error fetching special features:', err);
        setError('Failed to load features');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialFeatures();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-8 md:py-12 overflow-hidden bg-white">
        <div className="mx-auto flex flex-col items-center relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#384523] mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
              What Makes Us Special
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#384523]/70 max-w-2xl mx-auto leading-relaxed px-2">
              Discover the unique features that set TravelTraces apart from the rest
            </p>
          </div>
          
          {/* Skeleton Loader - First Row */}
          <div className="w-full overflow-hidden border-t border-b border-gray-200">
            <div className="flex py-8">
              <div className="flex items-center py-6 px-4 mx-4">
                {/* Skeleton Image */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse mr-4"></div>
                {/* Skeleton Content */}
                <div className="flex-1 min-w-0">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-32"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                </div>
              </div>
              
              <div className="flex items-center py-6 px-4 mx-4">
                {/* Skeleton Image */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse mr-4"></div>
                {/* Skeleton Content */}
                <div className="flex-1 min-w-0">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-36"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-52"></div>
                </div>
              </div>
              
              <div className="flex items-center py-6 px-4 mx-4">
                {/* Skeleton Image */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse mr-4"></div>
                {/* Skeleton Content */}
                <div className="flex-1 min-w-0">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-28"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-44"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skeleton Loader - Second Row */}
          <div className="w-full overflow-hidden border-b border-gray-200 mt-4">
            <div className="flex py-8">
              <div className="flex items-center py-6 px-4 mx-4">
                {/* Skeleton Image */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse mr-4"></div>
                {/* Skeleton Content */}
                <div className="flex-1 min-w-0">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-30"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-46"></div>
                </div>
              </div>
              
              <div className="flex items-center py-6 px-4 mx-4">
                {/* Skeleton Image */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse mr-4"></div>
                {/* Skeleton Content */}
                <div className="flex-1 min-w-0">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-34"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-50"></div>
                </div>
              </div>
              
              <div className="flex items-center py-6 px-4 mx-4">
                {/* Skeleton Image */}
                <div className="w-24 h-24 rounded-xl bg-gray-200 animate-pulse mr-4"></div>
                {/* Skeleton Content */}
                <div className="flex-1 min-w-0">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-26"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-42"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || specialFeatures.length === 0) {
    return (
      <section className="w-full py-8 md:py-12 overflow-hidden bg-white">
        <div className="mx-auto flex flex-col items-center relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#384523] mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
              What Makes Us Special
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#384523]/70 max-w-2xl mx-auto leading-relaxed px-2">
              {error || 'No features available at the moment'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 md:py-12 overflow-hidden bg-white">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#384523]/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: "10s",
            }}
          ></div>
        ))}
      </div>

      <div className="mx-auto flex flex-col items-center relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#384523] mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
            What Makes Us Special
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#384523]/70 max-w-2xl mx-auto leading-relaxed px-2">
            Discover the unique features that set TravelTraces apart from the rest
          </p>
        </div>

        {/* First Auto-scrolling section moving left to right */}
        <div className="w-full overflow-hidden border-t border-b border-gray-200">
          <div 
            className="flex animate-scroll-left"
            style={{
              animation: 'scrollLeft 50s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* First set */}
            {specialFeatures.map((feature, idx) => (
              <FeatureCard
                key={`first-${feature._id}`}
                feature={feature}
                idx={idx}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                prefix="first"
              />
            ))}
            
            {/* Second set for seamless loop */}
            {specialFeatures.map((feature, idx) => (
              <FeatureCard
                key={`second-${feature._id}`}
                feature={feature}
                idx={idx}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                prefix="second"
              />
            ))}
            
            {/* Third set for seamless loop */}
            {specialFeatures.map((feature, idx) => (
              <FeatureCard
                key={`third-${feature._id}`}
                feature={feature}
                idx={idx}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                prefix="third"
              />
            ))}
          </div>
        </div>

        {/* Second Auto-scrolling section moving right to left */}
        <div className="w-full overflow-hidden border-b border-gray-200 mt-4 sm:mt-6 md:mt-8">
          <div 
            className="flex animate-scroll-right"
            style={{
              animation: 'scrollRight 45s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* First set */}
            {specialFeatures.map((feature, idx) => (
              <FeatureCard
                key={`fourth-${feature._id}`}
                feature={feature}
                idx={idx}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                prefix="fourth"
              />
            ))}
            
            {/* Second set for seamless loop */}
            {specialFeatures.map((feature, idx) => (
              <FeatureCard
                key={`fifth-${feature._id}`}
                feature={feature}
                idx={idx}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                prefix="fifth"
              />
            ))}
            
            {/* Third set for seamless loop */}
            {specialFeatures.map((feature, idx) => (
              <FeatureCard
                key={`sixth-${feature._id}`}
                feature={feature}
                idx={idx}
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                prefix="sixth"
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Link href="destinations">
        <div className="mt-8 sm:mt-10 md:mt-12 text-center group">
          <button className="font-bold flex items-center gap-2 bg-[#384523] hover:bg-[#4a5d2e] text-white text-sm sm:text-base md:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 border border-[#384523] hover:shadow-xl">
            Start Your Journey{" "}
            <FiArrowRight className="mt-0.5 sm:mt-1 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
        </Link>
      </div>

      {/* CSS Animations for smooth scrolling */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        
        /* Pause animation on hover for better user experience */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
