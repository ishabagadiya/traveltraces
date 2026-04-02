// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FaPhoneAlt } from "react-icons/fa";
// import { IoSearch } from "react-icons/io5";
// import { HiMenu, HiX } from "react-icons/hi";
// import { client } from "../sanity/lib/client";
// import logo from "@/assets/logo-white.svg";
// import Image from "next/image";
// import SearchResultsDropdown from "./SearchResultsDropdown";

// const Header = () => {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [allDestinations, setAllDestinations] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [filteredDestinations, setFilteredDestinations] = useState([]);

//   useEffect(() => {
//     // Fetch all destinations for search
//     client
//       .fetch(
//         `*[_type == "featuredDestination"] | order(name asc){
//           _id,
//           name,
//           location,
//           tagline,
//           slug
//         }`
//       )
//       .then((data) => {
//         setAllDestinations(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching destinations:", error);
//       });
//   }, []);

//   // Filter destinations based on search term
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredDestinations([]);
//       setShowSearchResults(false);
//       return;
//     }

//     const filtered = allDestinations.filter((dest) =>
//       dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dest.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredDestinations(filtered);
//     setShowSearchResults(true); // Always show dropdown when there's a search term
//   }, [searchTerm, allDestinations]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (filteredDestinations.length > 0) {
//       // Navigate to the first matching destination
//       const firstDestination = filteredDestinations[0];
//       if (firstDestination.slug?.current) {
//         router.push(`/destinations/${firstDestination.slug.current}`);
//       }
//     }
//   };

//   const handleDestinationClick = (destination) => {
//     setSearchTerm("");
//     setShowSearchResults(false);
//     if (destination.slug?.current) {
//       router.push(`/destinations/${destination.slug.current}`);
//     }
//   };

//   const handleSearchFocus = () => {
//     if (searchTerm.trim() !== "") {
//       setShowSearchResults(true);
//     }
//   };

//   const handleSearchBlur = () => {
//     // Delay hiding results to allow for clicks
//     setTimeout(() => setShowSearchResults(false), 200);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <header className="w-[94vw] bg-secondary mx-auto rounded-b-[2rem] shadow-2xl px-4 py-4 md:px-6 md:py-6">
//       {/* Bottom Row: Main Navigation */}
//       <div className="flex justify-between items-center">
//         {/* Left: Hamburger & Logo */}
//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Hamburger Menu Button - All Screen Sizes */}
//           <button
//             onClick={toggleMobileMenu}
//             className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
//             aria-label="Toggle menu"
//           >
//             {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
//           </button>

//           {/* Logo */}
//           <div className="w-[120px] md:w-[200px] h-auto">
//             <Link href="/" onClick={closeMobileMenu}>
//               <Image
//                 src={logo}
//                 alt="traveltraces"
//                 width={1563}
//                 height={1563}
//               ></Image>
//             </Link>
//           </div>
//         </div>

//         {/* Right: Action Icons */}
//         <div className="flex items-center space-x-3 md:space-x-5">
//           {/* Enhanced Search Bar with Dropdown */}
//           <div className="hidden md:block relative">
//             <form
//               onSubmit={handleSearch}
//               className="flex items-center bg-white/90 backdrop-blur-sm shadow-sm rounded-full pl-2 transition-all duration-200 text-sm text-secondary"
//             >
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onFocus={handleSearchFocus}
//                 onBlur={handleSearchBlur}
//                 placeholder="Search destinations..."
//                 className="bg-transparent outline-none px-3 py-2 md:px-4 md:py-3 text-sm rounded-full text-secondary placeholder-gray-600"
//                 aria-label="Search destinations"
//               />
//               <button
//                 type="submit"
//                 className="p-2 text-secondary rounded-full transition-colors duration-200"
//               >
//                 <IoSearch size={20} />
//               </button>
//             </form>

//             {/* Search Results Dropdown */}
//             <SearchResultsDropdown
//               showResults={showSearchResults}
//               destinations={filteredDestinations}
//               onDestinationClick={handleDestinationClick}
//             />
//           </div>

//           {/* Call Button */}
//           <a
//             href="tel:8460146012"
//             className="text-nowrap flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-3 py-2 md:px-4 md:py-3 rounded-full shadow-sm transition-colors duration-200 border border-white/30"
//             style={{ textDecoration: "none" }}
//             aria-label="Call 8460146012"
//           >
//             <FaPhoneAlt size={12} />
//             <span>Let's Talk!</span>
//           </a>
//         </div>
//       </div>

//       {/* Navigation Menu - Hamburger Menu for All Screens */}
//       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
//         isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//       }`}>
//         <nav className="flex flex-col items-center space-y-4 py-4 text-sm border-t border-white/20 mt-4">
//           <Link
//             href="/"
//             className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
//             onClick={closeMobileMenu}
//           >
//             Home
//           </Link>
//           <Link
//             href="/destinations"
//             className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
//             onClick={closeMobileMenu}
//           >
//             Destinations
//           </Link>
//           <Link
//             href="/about"
//             className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
//             onClick={closeMobileMenu}
//           >
//             About us
//           </Link>
//           <Link
//             href="/policy"
//             className="text-white/90 hover:text-white font-medium transition-colors duration-200 w-full text-center py-2 hover:bg-white/10 rounded-lg"
//             onClick={closeMobileMenu}
//           >
//             Cancellation Policy
//           </Link>
//         </nav>
//         </div>

//       {/* Mobile Search Bar with Dropdown */}
//       <div className="md:hidden relative">
//         <form
//           onSubmit={handleSearch}
//           className="flex w-full items-center bg-white/90 backdrop-blur-sm border shadow-sm rounded-full px-2 transition-all duration-200 my-3 text-sm text-secondary"
//         >
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onFocus={handleSearchFocus}
//             onBlur={handleSearchBlur}
//             placeholder="Search destinations..."
//             className="w-full bg-transparent outline-none px-3 py-2 md:px-4 md:py-3 text-sm rounded-full text-secondary placeholder-gray-600"
//             aria-label="Search destinations"
//           />
//           <button
//             type="submit"
//             className="p-2 text-secondary rounded-full transition-colors duration-200"
//           >
//             <IoSearch size={20} />
//           </button>
//         </form>

//         {/* Mobile Search Results Dropdown */}
//         <SearchResultsDropdown
//           showResults={showSearchResults}
//           destinations={filteredDestinations}
//           onDestinationClick={handleDestinationClick}
//         />
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import logo from "@/assets/logo-white.svg";
import SearchResultsDropdown from "./SearchResultsDropdown";

const Header = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allDestinations, setAllDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showResults, setShowResults] = useState(false);

  /* Fetch destinations */
  useEffect(() => {
    client
      .fetch(
        `*[_type == "featuredDestination"]{
          name,
          location,
          slug
        }`
      )
      .then(setAllDestinations)
      .catch(console.error);
  }, []);

  /* Search filter */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered([]);
      setShowResults(false);
      return;
    }

    const results = allDestinations.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFiltered(results);
    setShowResults(true);
  }, [searchTerm, allDestinations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filtered[0]?.slug?.current) {
      router.push(`/destinations/${filtered[0].slug.current}`);
      setSearchTerm("");
      setShowResults(false);
    }
  };

  const handleResultClick = (dest) => {
    setSearchTerm("");
    setShowResults(false);
    router.push(`/destinations/${dest.slug.current}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-secondary/95 backdrop-blur-lg shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="TravelTraces"
            width={160}
            height={60}
            priority
          />
        </Link>

        {/* Desktop Nav – Avian Style */}
        <nav className="hidden lg:flex items-center gap-3">

          <Link
            href="/"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm text-white border border-white/30 hover:bg-white/15 hover:-translate-y-[1px] transition"
          >
            Home
          </Link>

          <Link
            href="/destinations"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm text-white border border-white/30 hover:bg-white/15 hover:-translate-y-[1px] transition"
          >
            Destinations
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm text-white border border-white/30 hover:bg-white/15 hover:-translate-y-[1px] transition"
          >
            About
          </Link>

          <Link
            href="/policy"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm text-white border border-white/30 hover:bg-white/15 hover:-translate-y-[1px] transition"
          >
            Policy
          </Link>

          <Link
            href="/plan-trip"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-sm text-white border border-white/30 hover:bg-white/15 hover:-translate-y-[1px] transition"
          >
            Plan Trip
          </Link>

        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4 relative">

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white/95 rounded-full px-3 py-2 text-secondary shadow-sm"
          >
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowResults(true)}
              className="bg-transparent outline-none text-sm w-44"
            />
            <button type="submit">
              <IoSearch size={18} />
            </button>
          </form>

          <SearchResultsDropdown
            showResults={showResults}
            destinations={filtered}
            onDestinationClick={handleResultClick}
          />

          {/* Call CTA */}
          <a
            href="tel:8460146012"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-2 rounded-full transition"
          >
            <FaPhoneAlt size={12} />
            Let’s Talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4 text-white text-sm bg-secondary border-t border-white/20">

          <Link href="/" onClick={() => setMenuOpen(false)}> Home</Link>
          <Link href="/destinations" onClick={() => setMenuOpen(false)}> Destinations</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/policy" onClick={() => setMenuOpen(false)}>Policy</Link>
          <Link href="/plan-trip" onClick={() => setMenuOpen(false)}>Plan Trip</Link>

          {/* Mobile Search */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white/95 rounded-full px-3 py-2 text-secondary mt-4"
          >
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
            <IoSearch size={18} />
          </form>

          <SearchResultsDropdown
            showResults={showResults}
            destinations={filtered}
            onDestinationClick={handleResultClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;