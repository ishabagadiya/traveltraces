"use client";
import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import footerSkyline from "@/assets/footer.avif";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-white">
      {/* Top Separator Line */}
      <div className="w-full h-px bg-gray-400/30"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Company Name */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
            TRAVELTRACES
          </h2>
        </div>

        {/* Contact Information - Horizontal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 text-sm sm:text-base">
          <a
            href="mailto:contact@traveltraces.in"
            className="text-white hover:text-gray-300 transition-colors"
          >
            contact@traveltraces.in
          </a>
          <a
            href="tel:8460146012"
            className="text-white hover:text-gray-300 transition-colors"
          >
            +91-8460146012
          </a>
          <a
            href="https://traveltraces.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            www.traveltraces.in
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <a
            href="https://instagram.com/travel_traces__"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
          >
            <FaInstagram className="text-pink-500" size={20} />
          </a>
          <a
            href="https://youtube.com/@traveltraces"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
          >
            <FaYoutube className="text-red-600" size={20} />
          </a>
          <a
            href="https://wa.me/918460146012"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
          >
            <FaWhatsapp className="text-green-600" size={20} />
          </a>
        </div>
      </div>

      {/* City Skyline */}
      <div 
        className="w-full mt-4 sm:mt-6 relative h-16 sm:h-20 md:h-24"
        style={{
          backgroundImage: `url(${typeof footerSkyline === 'string' ? footerSkyline : footerSkyline.src || footerSkyline})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center bottom',
          backgroundSize: 'auto 100%'
        }}
        aria-hidden="true"
      />

      {/* Copyright */}
      <div className="w-full text-center py-4 sm:py-6">
        <p className="text-white text-xs sm:text-sm">
          © {new Date().getFullYear()} TRAVELTRACES, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
