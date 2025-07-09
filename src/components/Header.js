"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaBars,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoGlobeOutline, IoSearch, IoHeartOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TfiWheelchair } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";

// TypingTagline component for animated tagline
const taglines = [
  "Where the mountains meet your soul.",
  "Adventure awaits in every corner.",
  "Find peace in the heart of nature.",
];

function TypingTagline() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < taglines[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(taglines[index].slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setTyping(true);
        setIndex((index + 1) % taglines.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <div className="text-lg md:text-2xl font-extrabold text-purple-700 whitespace-nowrap overflow-hidden max-w-full text-ellipsis">
      {displayed}
      <span className="animate-pulse">|</span>
    </div>
  );
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <header className="absolute left-1/2 top-0 -translate-x-1/2 z-20 w-[90vw]">
      <div className="bg-white rounded-b-[3rem] shadow-2xl px-10 py-8">
        {/* Bottom Row: Main Navigation */}
        <div className="flex justify-between items-center">
          {/* Left: Hamburger (Mobile) & Logo */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Open menu"
            >
              <FaBars size={22} />
            </button>
            <Link href="/">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-light text-gray-600 ml-1">
                  TravelTraces
                </span>
              </div>
            </Link>
          </div>
          {/* Right: Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-gray-600">
            {/* Enhanced Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white border border-gray-300 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-200 shadow-sm rounded-full px-2 transition-all duration-200"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none px-4 py-3 text-sm rounded-full"
                aria-label="Search"
              />
              <button
                type="submit"
                className="p-2 text-purple-700 hover:text-white hover:bg-purple-500 rounded-full transition-colors duration-200"
              >
                <IoSearch size={20} />
              </button>
            </form>
            {/* Call Button */}
            <a
              href="tel:8460146012"
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full shadow-sm transition-colors duration-200 border border-purple-200"
              style={{ textDecoration: "none" }}
              aria-label="Call 8460146012"
            >
              <FaPhoneAlt size={16} />
              <span>Let's Talk!</span>
            </a>
          </div>
        </div>
        {/* Featured Destination/Testimonial Card - improved design */}
        <div className="w-full flex justify-center mt-4">
          <div className="relative w-full mx-auto overflow-hidden rounded-3xl bg-purple-300">
            {/* Background image with overlay */}
            <img
              src="/HeroImages/manali.jpeg"
              alt="Manali"
              className="w-full h-[100px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-purple-100/80 backdrop-blur-md" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 py-3 z-10">
              {/* Left: Badge and Headline */}
              <div className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-6">
                {/* Left: Badge, Heading, Tagline */}
                <div className="flex-1 flex flex-col items-start justify-center gap-1">
                  <span className="flex items-center gap-3 bg-white text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full shadow">
                    <IoGlobeOutline className="text-purple-700" />
                    Destination of the Month
                  </span>

                  <div className="flex items-center gap-2">
                    <h3 className="text-lg md:text-2xl font-extrabold text-purple-800 pl-2">
                      Manali:
                    </h3>
                    <TypingTagline />
                  </div>
                </div>
                {/* Right: Book Button */}
                <button className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full shadow-sm transition-colors duration-200 border border-purple-200">
                  Book Now
                  <svg
                    className="w-5 h-5"
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
      </div>
    </header>
  );
};

export default Header;
