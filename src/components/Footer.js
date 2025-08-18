"use client";
import React from "react";
import {
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-white.svg";
import ContactCard from "@/components/ContactCard";

export default function Footer() {
  return (
    <>
      {/* Full-width Cursive TravelTraces */}
      <div className="w-full text-center overflow-hidden bg-secondary flex flex-col items-center justify-end relative pt-14 pb-2">
        {/* Logo and Navigation Section */}
          <div className="mx-auto px-6 py-6 w-full flex justify-between items-center">
            {/* Left: Logo */}
            <div className="w-[100px] sm:w-[220px] md:w-[250px] h-auto">
              <Link href="/">
                <Image
                  src={logo}
                  alt="TravelTraces"
                  width={1563}
                  height={1563}
                  className="w-full h-auto"
                />
              </Link>
            </div>

            {/* Right: Navigation Links */}
            <nav className="flex items-end flex-col gap-2 sm:gap-4 text-[10px] sm:text-sm">
              <div className="flex gap-5 sm:gap-8 lg:gap-12">
                <Link href="/destinations" className="text-white hover:text-gray-300">Destinations</Link>
                <Link href="/about" className="text-white hover:text-gray-300">About us</Link>
              </div>
              <div className="flex gap-5 sm:gap-8 lg:gap-12">
                <Link href="/policy" className="text-white hover:text-gray-300">Cancellation Policy</Link>
                <Link href="/privacy" className="text-white hover:text-gray-300">Privacy Policy</Link>
              </div>
            </nav>
          </div>

        {/* Conversational Cards - Full width */}
        <div className="w-full px-2 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-stretch">
            {[
              {
                key: "instagram",
                icon: (
                  <FaInstagram
                    size={22}
                    className="text-pink-500 group-hover:scale-110 group-hover:text-pink-600 transition-transform duration-200"
                  />
                ),
                title: "Wanna see how people are enjoying?",
                href: "https://instagram.com/travel_traces__",
                ariaLabel: "Instagram",
                linkText: "Check our latest reels!",
                linkClass:
                  "text-pink-600 hover:underline text-xs font-medium mt-0.5 text-left",
                target: "_blank",
                rel: "noopener",
              },
              {
                key: "youtube",
                icon: (
                  <FaYoutube
                    size={22}
                    className="text-red-600 group-hover:scale-110 group-hover:text-red-700 transition-transform duration-200"
                  />
                ),
                title: "Watch our latest adventures",
                href: "https://youtube.com/@traveltraces",
                ariaLabel: "YouTube",
                linkText: "on YouTube!",
                linkClass:
                  "text-red-700 hover:underline text-xs font-medium mt-0.5 text-left",
                target: "_blank",
                rel: "noopener",
              },
              {
                key: "call",
                icon: (
                  <FaPhone
                    size={22}
                    className="text-blue-600 group-hover:scale-110 group-hover:text-blue-700 transition-transform duration-200"
                  />
                ),
                title: "Talk to us",
                href: "tel:8460146012",
                ariaLabel: "Call",
                linkText: "8460146012",
                linkClass:
                  "text-blue-700 hover:underline text-xs font-medium mt-0.5 text-left",
              },
              {
                key: "whatsapp",
                icon: (
                  <FaWhatsapp
                    size={22}
                    className="text-green-600 group-hover:scale-110 group-hover:text-green-700 transition-transform duration-200"
                  />
                ),
                title: "Chat on WhatsApp",
                href: "https://wa.me/918460146012",
                ariaLabel: "WhatsApp",
                linkText: "Start chat",
                linkClass:
                  "text-green-700 hover:underline text-xs font-medium mt-0.5 text-left",
                target: "_blank",
                rel: "noopener",
              },
            ].map((c) => (
              <ContactCard
                key={c.key}
                icon={c.icon}
                title={c.title}
                href={c.href}
                ariaLabel={c.ariaLabel}
                linkText={c.linkText}
                linkClass={c.linkClass}
                target={c.target}
                rel={c.rel}
              />
            ))}
          </div>
        </div>
        {/* Copyright */}
        <div className="w-full text-center z-20">
          {/* Animated Text */}
          <div className="animated-text mb-4 text-white opacity-20">
            <main>
              <div className="animated-text-main">
                <span className="travel">TRAVEL</span>TRACES
              </div>
            </main>
          </div>
          
          <span className="text-white text-xs font-bold drop-shadow-sm rounded px-2 py-1 inline-block">
            &copy; {new Date().getFullYear()} TravelTraces. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
}
