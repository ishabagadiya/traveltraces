"use client";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";
import { TbBrandWhatsappFilled } from "react-icons/tb";

export default function Footer() {
  return (
    <>
      {/* Fixed WhatsApp Floating Button */}
      <a
        href="https://wa.me/918460146012"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed z-50 bottom-8 right-8 group text-green-500 hover:text-green-600 transition-transform duration-200 hover:scale-110"
      >
        <span className="relative flex items-center justify-center">
          {/* Tooltip */}
          <span className="absolute bottom-2 right-12 px-4 py-2 bg-white text-green-600 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
            Any queries? Chat now
          </span>
          <TbBrandWhatsappFilled size={44} />
        </span>
      </a>

      {/* Full-width Cursive TravelTraces */}
      <div className="w-full text-center overflow-hidden h-[320px] flex flex-col items-center justify-end relative p-0 mb-7 bg-[#6e11b01e]">
        <span
          style={{ fontFamily: "Dancing Script, cursive", fontWeight: 700 }}
          className="text-[22vw] text-gray-600 opacity-15 block leading-none"
        >
          TravelTraces
        </span>
        {/* Conversational Cards */}
        <div className="absolute grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-2 pb-8 z-10 place-items-end">
          {/* Email Card */}
          <div className="w-full h-[60px] md:h-[92px] bg-white/80 rounded-xl px-4 py-3 shadow-md hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer max-w-xs mx-auto">
            <FaEnvelope size={22} className="text-green-600 group-hover:scale-110 group-hover:text-green-700 transition-transform duration-200" />
            <div className="flex flex-col items-start">
              <span className="text-gray-700 text-xs font-semibold leading-tight text-left">Still have doubts?</span>
              <a
                href="mailto:contact@traveltraces.in"
                target="_blank"
                rel="noopener"
                aria-label="Email"
                className="text-green-700 hover:underline text-xs font-medium mt-0.5 text-left"
              >
                Mail us at contact@traveltraces.in
              </a>
            </div>
          </div>
          {/* Instagram Card */}
          <div className="w-full h-[60px] md:h-[92px] bg-white/80 rounded-xl px-4 py-3 shadow-md hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer max-w-xs mx-auto">
            <FaInstagram size={22} className="text-pink-500 group-hover:scale-110 group-hover:text-pink-600 transition-transform duration-200" />
            <div className="flex flex-col items-start">
              <span className="text-gray-700 text-xs font-semibold leading-tight text-left">Wanna see how people are enjoying?</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="text-pink-600 hover:underline text-xs font-medium mt-0.5 text-left"
              >
                Check our latest reels!
              </a>
            </div>
          </div>
          {/* YouTube Card */}
          <div className="w-full h-[60px] md:h-[92px] bg-white/80 rounded-xl px-4 py-3 shadow-md hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer max-w-xs mx-auto">
            <FaYoutube size={22} className="text-red-600 group-hover:scale-110 group-hover:text-red-700 transition-transform duration-200" />
            <div className="flex flex-col items-start">
              <span className="text-gray-700 text-xs font-semibold leading-tight text-left">Watch our latest adventures</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
                className="text-red-700 hover:underline text-xs font-medium mt-0.5 text-left"
              >
                on YouTube!
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="absolute bottom-0 left-0 w-full text-center z-20">
          <span className="text-purple-700 text-xs font-bold drop-shadow-sm rounded px-2 py-1 inline-block">
            &copy; {new Date().getFullYear()} TravelTraces. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
}
