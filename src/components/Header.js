"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { client } from "../sanity/lib/client";
import logo from "@/assets/logo-white.svg";
import Image from "next/image";
import SearchResultsDropdown from "./SearchResultsDropdown";

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allDestinations, setAllDestinations] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    // Fetch all destinations for search
    client
      .fetch(
        `*[_type == "featuredDestination"] | order(name asc){
          _id,
          name,
          location,
          tagline,
          slug
        }`
      )
      .then((data) => {
        setAllDestinations(data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  }, []);

  // Filter destinations based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDestinations([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = allDestinations.filter((dest) =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDestinations(filtered);
    setShowSearchResults(true); // Always show dropdown when there's a search term
  }, [searchTerm, allDestinations]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredDestinations.length > 0) {
      // Navigate to the first matching destination
      const firstDestination = filteredDestinations[0];
      if (firstDestination.slug?.current) {
        router.push(`/destinations/${firstDestination.slug.current}`);
      }
    }
  };

  const handleDestinationClick = (destination) => {
    setSearchTerm("");
    setShowSearchResults(false);
    if (destination.slug?.current) {
      router.push(`/destinations/${destination.slug.current}`);
    }
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim() !== "") {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => setShowSearchResults(false), 200);
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
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Menu Button - All Screen Sizes */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          
          {/* Logo */}
          <div className="w-[120px] md:w-[200px] h-auto">
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
          {/* Enhanced Search Bar with Dropdown */}
          <div className="hidden md:block relative">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white/90 backdrop-blur-sm shadow-sm rounded-full pl-2 transition-all duration-200 text-sm text-secondary"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search destinations..."
                className="bg-transparent outline-none px-3 py-2 md:px-4 md:py-3 text-sm rounded-full text-secondary placeholder-gray-600"
                aria-label="Search destinations"
              />
              <button
                type="submit"
                className="p-2 text-secondary rounded-full transition-colors duration-200"
              >
                <IoSearch size={20} />
              </button>
            </form>

            {/* Search Results Dropdown */}
            <SearchResultsDropdown
              showResults={showSearchResults}
              destinations={filteredDestinations}
              onDestinationClick={handleDestinationClick}
            />
          </div>

          {/* Call Button */}
          <a
            href="tel:8460146012"
            className="text-nowrap flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-3 py-2 md:px-4 md:py-3 rounded-full shadow-sm transition-colors duration-200 border border-white/30"
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

      {/* Mobile Search Bar with Dropdown */}
      <div className="md:hidden relative">
        <form
          onSubmit={handleSearch}
          className="flex w-full items-center bg-white/90 backdrop-blur-sm border shadow-sm rounded-full px-2 transition-all duration-200 my-3 text-sm text-secondary"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder="Search destinations..."
            className="w-full bg-transparent outline-none px-3 py-2 md:px-4 md:py-3 text-sm rounded-full text-secondary placeholder-gray-600"
            aria-label="Search destinations"
          />
          <button
            type="submit"
            className="p-2 text-secondary rounded-full transition-colors duration-200"
          >
            <IoSearch size={20} />
          </button>
        </form>

        {/* Mobile Search Results Dropdown */}
        <SearchResultsDropdown
          showResults={showSearchResults}
          destinations={filteredDestinations}
          onDestinationClick={handleDestinationClick}
        />
      </div>
    </header>
  );
};

export default Header;
