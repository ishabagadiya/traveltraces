"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import DestinationCard from "@/components/destinations/DestinationCard";

const CATEGORY_TABS = [
  {
    id: "domestic",
    label: "Domestic",
    schemaValue: "Domestic Destinations",
  },
  {
    id: "treks",
    label: "Treks",
    schemaValue: "Treks",
  },
  {
    id: "international",
    label: "International",
    schemaValue: "International Trips",
  },
];

export default function DestinationsPageClient() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_TABS[0].id);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featuredDestination"] | order(name asc){
          _id, 
          name, 
          location, 
          image, 
          images,
          tagline, 
          description, 
          slug,
          category,
          joinUsFrom[]{
            place,
            price,
            duration
          }
        }`
      )
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load destinations.");
        setLoading(false);
      });
  }, []);

  const filteredDestinations = destinations.filter((destination) => {
    const selectedTab = CATEGORY_TABS.find((tab) => tab.id === activeCategory);
    if (!selectedTab) return true;
    if (selectedTab.id === "treks") {
      return (
        destination.category === "Treks" || destination.category === "Winter Treks"
      );
    }
    return destination.category === selectedTab.schemaValue;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-secondary"></div>
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
    <main className="min-h-screen bg-[#dfdfdf] pb-16 pt-6 sm:pt-10">
      <section className="mx-auto w-full md:w-[90%]">
        {destinations.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-3xl font-bold text-gray-800">No trips found</h3>
          </div>
        ) : (
          <>
            <div className="mx-auto mb-6 sm:mb-10 rounded-full border border-[#c7c7c7] bg-[#dcdcdc] max-w-[90%] md:max-w-[700px]">
              <div className="grid grid-cols-3 text-center">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategory === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                        className={`cursor-pointer rounded-full px-3 py-3 font-semibold transition-all text-xs sm:text-sm md:text-base ${
                          isActive
                            ? "bg-white text-black shadow-sm"
                            : "text-black/90 hover:bg-[#d2d2d2] hover:shadow-sm"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="py-20 text-center">
                <h3 className="text-2xl font-bold text-gray-800">No trips in this category</h3>
              </div>
            ) : (
              <div className="gap-5 md:gap-6 pb-3 flex flex-wrap justify-center items-center w-full">
                {filteredDestinations.map((destination) => (
                  <DestinationCard key={destination._id} destination={destination} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
