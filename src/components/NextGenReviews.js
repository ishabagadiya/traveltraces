"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiMapPin } from "react-icons/fi";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

export default function EditorialReviews() {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    client
      .fetch(`*[_type == "travelerReview"] | order(_createdAt desc)`)
      .then((data) => {
        setReviews(data.map(r => ({
          ...r,
          photo: r.photo ? urlFor(r.photo).url() : "/HeroImages/andharban.jpeg"
        })));
        setLoading(false);
      });
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + reviews.length) % reviews.length);
  };

  if (loading || reviews.length === 0) return null;

  const current = reviews[index];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen bg-white flex items-center justify-center overflow-hidden py-20 px-4">
      
      {/* 1. LAYER: DYNAMIC BACKGROUND MESH */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${index % 2 === 0 ? '#384523' : '#1e293b'} 0%, transparent 70%)`
            }}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* 2. LAYER: THE IMAGE STAGE (Left 5 Columns) */}
          <div className="lg:col-span-5 relative group">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: 50 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] w-full max-w-md mx-auto"
              >
                {/* Floating Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gray-200 rounded-tr-[3rem]" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#384523]/30 rounded-bl-[3rem]" />
                
                {/* Main Image */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <Image 
                    src={current.photo} 
                    alt={current.name} 
                    fill 
                    className="object-cover saturate-[1.1] brightness-90 group-hover:scale-110 transition-transform duration-[2s]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-10 left-10">
                    <p className="text-[#384523] text-sm font-mono mb-2 flex items-center gap-2">
                      <FiMapPin /> {current.trip}
                    </p>
                    <h3 className="text-4xl font-bold text-white tracking-tighter leading-none italic uppercase drop-shadow-lg">
                      {current.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. LAYER: CONTENT (Right 7 Columns) */}
          <div className="lg:col-span-7 lg:pl-12">
            <div className="overflow-hidden mb-4">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                className="block text-[#384523] font-bold tracking-[0.4em] uppercase text-xs"
              >
                Traveler Testimonial
              </motion.span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Big Quote */}
                <h2 className="text-gray-900 text-base font-light leading-[1.15] tracking-tight mb-10">
                  <span className="text-[#384523] text-7xl serif absolute -left-8 -top-8 opacity-20">“</span>
                  {current.comment}
                  <span className="text-[#384523] text-7xl serif opacity-20">”</span>
                </h2>

                <div className="flex flex-col md:flex-row md:items-center gap-8 border-t border-gray-200 pt-10">
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Destination Journey</p>
                    <p className="text-xl text-gray-900 font-medium">{current.trip}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 4. LAYER: MODERN NAVIGATION */}
            <div className="flex items-center gap-8 mt-12">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => paginate(-1)}
                  className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-[#384523] hover:text-white hover:border-[#384523] transition-all group"
                >
                  <FiArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="relative flex items-center justify-center">
                  {/* Progress Circle */}
                  <svg className="w-20 h-20 -rotate-90">
                    <circle 
                      cx="40" cy="40" r="38" 
                      className="stroke-gray-200 fill-none" 
                      strokeWidth="2" 
                    />
                    <motion.circle 
                      cx="40" cy="40" r="38" 
                      className="stroke-[#384523] fill-none" 
                      strokeWidth="2"
                      strokeDasharray="239"
                      initial={{ strokeDashoffset: 239 }}
                      animate={{ strokeDashoffset: 239 - (239 * (index + 1)) / reviews.length }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <button 
                    onClick={() => paginate(1)}
                    className="absolute w-14 h-14 rounded-full bg-[#384523] flex items-center justify-center text-white hover:scale-110 transition-transform group"
                  >
                    <FiArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="text-gray-400 font-mono text-sm tracking-tighter">
                <span className="text-gray-900">0{index + 1}</span> / 0{reviews.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Section Title */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 rotate-90 hidden 2xl:block">
        <h2 className="text-[4vh] font-black text-gray-100 leading-none uppercase select-none">
          Stories
        </h2>
      </div>
    </section>
  );
}