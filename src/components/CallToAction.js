"use client";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { TbHandClick } from "react-icons/tb";
import { MdTravelExplore } from "react-icons/md";

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 px-4 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#8c78d7] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-[#003c3a] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-[rgba(225,185,255,0.8)] rounded-full"></div>
      </div>
      
      <div className="w-[90%] mx-auto">
        <div className="grid md:grid-cols-2 gap-6  items-center">
          {/* Left Side - Content */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 px-2 py-1.5 sm:px-4 sm:py-2 bg-[rgba(140,120,215,0.1)] rounded-full border border-[#8c78d7]">
              <TbHandClick className="w-3 h-3 sm:w-4 sm:h-4 text-[#8c78d7]" />
              <span className="text-[#8c78d7] font-semibold text-xs sm:textbase'">Share Your Experience</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
              <span className="text-[#003c3a]">Your Story</span>
              <br />
              <span className="text-[#8c78d7]">Matters to Us</span>
            </h2>
            
            <p className="text-sm lg:text-lg text-gray-600 leading-relaxed max-w-lg">
              Every review helps us craft better adventures. Your honest feedback shapes the future of travel experiences.
            </p>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex -space-x-2">
                <div className="w-6 md:w-8 h-6 md:h-8 text-xs md:text-base bg-[#8c78d7] rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div className="w-6 md:w-8 h-6 md:h-8 text-xs md:text-base bg-[rgba(225,185,255,0.8)] rounded-full flex items-center justify-center text-[#003c3a] font-bold">B</div>
                <div className="w-6 md:w-8 h-6 md:h-8 text-xs md:text-base bg-[#003c3a] rounded-full flex items-center justify-center text-white font-bold">C</div>
              </div>
              <span className="text-sm text-gray-500">Join 500+ travelers who've shared their stories</span>
            </div>
          </div>
          
          {/* Right Side - CTA Card */}
          <div className="relative">
            <div className="bg-[#8c78d7] rounded-3xl p-4 sm:p-8 border border-[rgba(140,120,215,0.2)]">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-10 h-10 sm:w-20 sm:h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <MdTravelExplore className="w-6 sm:w-10 h-6 sm:h-10 text-[#8c78d7]" />
                </div>
                
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2">Excited to Share?</h3>
                
                <a
                  href="https://docs.google.com/forms/d/1b7Pn1nKvITZpnxDum-LI35tCbtyvhEEVWpXEj03voOI/viewform?pli=1&pli=1&edit_requested=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="text-sm md:text-lg w-[70%] mx-auto md:w-full bg-white hover:bg-gray-100 text-[#8c78d7] font-bold py-2 px-2 md:py-4 md:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Write Your Review
                  </button>
                </a>
                
                <p className="text-xs text-purple-100 font-medium">No registration required</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
} 