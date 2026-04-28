"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoCompassOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoSearch,
  IoStarOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { client } from "../../sanity/lib/client";
import logo from "@/assets/logo-dark.png";
import Image from "next/image";
import SearchResultsDropdown from "../SearchResultsDropdown";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [allDestinations, setAllDestinations] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const navItems = [
    { label: "home", href: "/", icon: IoHomeOutline },
    {
      label: "explore",
      href: "/destinations",
      icon: IoCompassOutline,
    },
    { label: "testimonials", href: "/reviews", icon: IoStarOutline },
    { label: "about us", href: "/about-us", icon: IoInformationCircleOutline },
    { label: "reels", href: "/reels", icon: IoVideocamOutline },
  ];
  const isNavItemActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

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

  return (
    <header className="w-full md:w-[90%] mx-auto bg-white px-4 py-4 md:px-0">
      {/* Bottom Row: Main Navigation */}
      <div className="flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="relative h-10 w-[120px] md:h-14 md:w-[200px] overflow-hidden">
            <Link href="/" className="block h-full w-full -ml-6">
              <Image
                src={logo}
                alt="traveltraces"
                fill
                className="object-cover object-center"
                sizes="(min-width: 768px) 200px, 120px"
                priority
              />
            </Link>
          </div>

        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Enhanced Search Bar with Dropdown */}
          <div className="hidden md:block relative">
            <form
              onSubmit={handleSearch}
              className="my-0! flex items-center border border-secondary bg-white/90 backdrop-blur-sm shadow-sm rounded-full pl-2 transition-all duration-200 text-sm text-secondary"
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
            className="text-nowrap flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm px-3 py-2 md:px-4 md:py-3 rounded-full shadow-sm transition-colors duration-200 border border-secondary/20"
            style={{ textDecoration: "none" }}
            aria-label="Call 8460146012"
          >
            <FaPhoneAlt size={12} />
            <span>Let's Talk!</span>
          </a>
        </div>
      </div>

      {/* Mobile Search Bar with Dropdown */}
      <div className="md:hidden relative">
        <form
          onSubmit={handleSearch}
          className="flex w-full items-center bg-white/90 backdrop-blur-sm border shadow-sm rounded-full px-2 transition-all duration-200 mt-3 text-sm text-secondary"
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

      {/* Desktop Secondary Navigation */}
      <nav className="hidden md:flex items-center justify-center gap-6 border-t border-secondary/10 mt-4 pt-3 text-sm text-secondary/60">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`inline-flex items-center gap-1 leading-none capitalize transition-colors duration-200 hover:text-secondary ${
              isNavItemActive(item.href) ? "text-secondary font-semibold" : ""
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Bottom Fixed Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-secondary/15 bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="mx-auto grid max-w-screen-sm grid-cols-5 px-2 py-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center text-[10px] font-medium capitalize transition-colors duration-200 ${
                isNavItemActive(item.href) ? "text-secondary" : "text-secondary/50"
              }`}
            >
              {item.icon && <item.icon size={16} />}
              <span className="truncate max-w-full">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
