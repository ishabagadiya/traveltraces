"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { IoGlobeOutline, IoSearch } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { client } from "../sanity/lib/client";
import logo from "@/assets/logo-white.svg";
import Image from "next/image";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDestination, setShowDestination] = useState(false);
  const [destination, setDestination] = useState(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDestination(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch Destination of the Month from Sanity
    client
      .fetch(
        `*[_type == "destinationOfTheMonth"] | order(_createdAt desc)[0]{
          title,
          taglines,
          image,
          destination->{
            slug,
            name
          }
        }`
      )
      .then((data) => {
        console.log("Fetched destination data:", data);
        setDestination(data);
      })
      .catch((error) => {
        console.error("Error fetching destination:", error);
      });
  }, []);

  // Typing effect for taglines from Sanity
  useEffect(() => {
    if (!destination || !destination.taglines) return;
    let timeout;
    const taglines = destination.taglines;
    if (typing) {
      if (displayed.length < taglines[taglineIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(taglines[taglineIndex].slice(0, displayed.length + 1));
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
        setTaglineIndex((taglineIndex + 1) % taglines.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, taglineIndex, destination]);

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-[94vw] bg-secondary mx-auto rounded-b-[2rem] shadow-2xl px-4 py-4 md:px-6 md:py-6">
      {/* Bottom Row: Main Navigation */}
      <div className="flex justify-between items-center">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - All Screen Sizes */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          
          {/* Logo */}
          <div className="w-[150px] md:w-[200px] h-auto">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src={logo}
                alt="traveltraces"
                width={1563}
                height={1563}
              ></Image>
            </Link>
          </div>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Enhanced Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white/90 backdrop-blur-sm shadow-sm rounded-full pl-2 transition-all duration-200 text-sm text-secondary"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none px-3 py-2 md:px-4 md:py-3 text-sm rounded-full text-secondary placeholder-gray-600"
              aria-label="Search"
            />
            <button
              type="submit"
              className="p-2 text-secondary rounded-full transition-colors duration-200"
            >
              <IoSearch size={20} />
            </button>
          </form>
          {/* Call Button */}
          <a
            href="tel:8460146012"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-3 py-2 md:px-4 md:py-3 rounded-full shadow-sm transition-colors duration-200 border border-white/30"
            style={{ textDecoration: "none" }}
            aria-label="Call 8460146012"
          >
            <FaPhoneAlt size={12} />
            <span>Let's Talk!</span>
          </a>
        </div>
      </div>

      {/* Navigation Menu - Hamburger Menu for All Screens */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="flex flex-col items-center space-y-4 py-4 text-sm border-t border-white/20 mt-4">
          <Link
            href="/"
            className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
            onClick={closeMobileMenu}
          >
            Destinations
          </Link>
          <Link
            href="/about"
            className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
            onClick={closeMobileMenu}
          >
            About us
          </Link>
          <Link
            href="/policy"
            className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
            onClick={closeMobileMenu}
          >
            Cancellation Policy
          </Link>
        </nav>
        </div>

      <form
        onSubmit={handleSearch}
        className="flex md:hidden w-full items-center bg-white/90 backdrop-blur-sm border shadow-sm rounded-full px-2 transition-all duration-200 my-3 text-sm text-secondary"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent outline-none px-3 py-2 md:px-4 md:py-3 text-sm rounded-full text-secondary placeholder-gray-600"
          aria-label="Search"
        />
        <button
          type="submit"
          className="p-2 text-secondary rounded-full transition-colors duration-200"
        >
          <IoSearch size={20} />
        </button>
      </form>

      {/* Featured Destination/Testimonial Card - improved design */}
      <div className="relative w-full flex justify-center md:mt-4 bg-white/20 p-3 rounded-[1.5rem] mt-3">
        {/* Left: Badge and Headline */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2 md:gap-6">
          {/* Left: Badge, Heading, Tagline */}
          <div className="flex-1 flex flex-col items-start w-full gap-2">
            <span className="flex items-center gap-1 md:gap-3 bg-white/90 text-secondary text-[8px] md:text-xs font-bold px-4 py-1.5 rounded-full shadow">
              <IoGlobeOutline className="text-secondary" />
              Destination of the Month
            </span>

            <div className="flex flex-row items-start md:items-center gap-2 text-wrap ml-2">
              <h3 className="text-xs md:text-sm lg:text-2xl font-bold text-white md:pl-2">
                {destination && destination.title
                  ? `${destination.title}:`
                  : "Manali:"}
              </h3>
              <h3 className="text-xs md:text-sm lg:text-2xl font-bold text-white/90 text-wrap">
                {destination && destination.taglines ? (
                  <>
                    {displayed}
                    <span className="animate-pulse">|</span>
                  </>
                ) : (
                  <>
                    Where the mountains meet your soul.
                    <span className="animate-pulse">|</span>
                  </>
                )}
              </h3>
            </div>
          </div>

          {/* Right: Book Button */}
          {destination?.destination?.slug?.current ? (
            <Link
              href={`/destinations/${destination.destination.slug.current}`}
              className="flex items-center gap-2 bg-secondary hover:scale-[1.022] text-white font-semibold px-3 py-1 md:px-4 md:py-3 text-xs md:text-sm rounded-full shadow-sm transition-colors duration-200 border border-white/30 mr-auto"
            >
              Book Now
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div className="text-white/70 text-xs">No destination set</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
