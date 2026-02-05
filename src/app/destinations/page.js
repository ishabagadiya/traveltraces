"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaClock, FaMapPin } from "react-icons/fa";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

// Destination Card Component
const DestinationCard = ({ destination, index }) => {
  return (
    <Link
      href={`/destinations/${destination.slug?.current}`}
      className="group block"
    >
      <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 border border-gray-200 h-full flex flex-col">
        {/* Image Section - Larger with overlay content */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src={destination.image ? urlFor(destination.image).url() : "/HeroImages/saputara.jpeg"}
            alt={destination.name}
            fill
            className="object-cover group-hover:scale-125 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          
          {/* Top Badges Row */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
            {/* Category Badge */}
            {destination.category && (
              <div className="bg-secondary/95 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-xs font-bold shadow-lg">
                {destination.category}
              </div>
            )}
            
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-white/90 transition-colors line-clamp-2 drop-shadow-lg">
              {destination.name}
            </h3>
            
            {destination.location && (
              <div className="flex items-center gap-2 text-white/90 mb-3">
                <FaMapPin className="text-sm" />
                <span className="text-sm font-semibold">
                  {destination.location}
                </span>
              </div>
            )}

            {destination.tagline && (
              <p className="text-white/90 text-sm line-clamp-2 mb-4 leading-relaxed drop-shadow-md">
                {destination.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col bg-white">
          {/* Tags Row */}
          <div className="flex flex-wrap gap-2 mb-4">
            {destination.duration && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-xs font-semibold border border-secondary/20">
                <FaClock className="text-xs" />
                {destination.duration?.days ? `${destination.duration.days} Days ${destination.duration.nights} Nights` : destination.duration}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-secondary text-white rounded-xl font-bold group-hover:bg-secondary/90 group-hover:shadow-lg transition-all">
              <span>Explore Destination</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featuredDestination"] | order(name asc){
          _id, 
          name, 
          location, 
          image, 
          tagline, 
          description, 
          duration, 
          slug,
          category
        }`
      )
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load destinations.");
        setLoading(false);
      });
  }, []);

  // Filter destinations based on search and filters
  const filteredDestinations = useMemo(() => {
    let filtered = destinations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((dest) => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Duration filter
    if (durationFilter !== "all") {
      filtered = filtered.filter(dest => {
        const destDuration = dest.duration?.days 
          ? `${dest.duration.days} Days ${dest.duration.nights} Nights`
          : dest.duration;
        return destDuration === durationFilter;
      });
    }
    
    return filtered;
  }, [destinations, searchTerm, durationFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading destinations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />
      <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 py-24 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6 animate-fade-in-up">
            <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold shadow-lg">
              ✈️ Discover Your Next Adventure
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Explore Destinations
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover amazing places, plan your next adventure, and create unforgettable memories with our curated collection of destinations.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/95 backdrop-blur-md sticky top-20 z-50 border-b-2 border-gray-200 shadow-lg">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <FaMapPin className="text-gray-400 text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, locations, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-4 pl-12 pr-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all bg-white shadow-sm hover:border-gray-300"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap lg:flex-nowrap">
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all bg-white shadow-sm hover:border-gray-300 font-medium text-gray-700 cursor-pointer"
              >
                <option value="all">All Durations</option>
                {Array.from(new Set(destinations.map(d => {
                  if (d.duration?.days) {
                    return `${d.duration.days} Days ${d.duration.nights} Nights`;
                  }
                  return d.duration;
                }).filter(Boolean))).map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block p-8 bg-gray-100 rounded-full mb-6">
                <div className="text-7xl">🏔️</div>
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">No destinations found</h3>
              <p className="text-gray-600 text-xl max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                    Our Destinations
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Showing <span className="font-bold text-secondary">{filteredDestinations.length}</span> of <span className="font-bold">{destinations.length}</span> destinations
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredDestinations.map((destination, index) => (
                  <DestinationCard key={destination._id} destination={destination} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-secondary/10 via-secondary/20 to-secondary/10 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-secondary mb-8">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
              Can't find what you're looking for? Contact us and we'll help you plan the perfect trip tailored to your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:8460146012"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-secondary text-white rounded-2xl font-bold hover:bg-secondary/90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a
                href="https://wa.me/918460146012"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
