"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import DestinationCard from "@/components/destinations/DestinationCard";

const CATEGORY_TABS = [
  {
    id: "weekend",
    label: "Weekend Trips",
    schemaValue: "Weekend Trips",
  },
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
      <main className="min-h-screen bg-[#dfdfdf] pb-16 pt-6 sm:pt-10">
        <section className="mx-auto w-full md:w-[90%] px-4 md:px-0">
          <div className="mx-auto mb-6 sm:mb-10 max-w-[90%] md:max-w-[700px]">
            <div className="flex flex-wrap justify-center gap-2 sm:hidden">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`mobile-tab-skeleton-${idx}`}
                  className="basis-[calc(50%-0.25rem)] h-11 rounded-full bg-white/70 animate-pulse"
                />
              ))}
            </div>
            <div className="hidden sm:grid sm:grid-cols-4 sm:rounded-full sm:border sm:border-[#c7c7c7] sm:bg-[#dcdcdc] sm:text-center sm:p-1">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`desktop-tab-skeleton-${idx}`}
                  className="h-11 rounded-full bg-white/70 animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="gap-5 md:gap-6 pb-3 flex flex-wrap justify-center items-center w-full">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={`destination-card-skeleton-${idx}`}
                className="w-[170px] sm:w-[200px] md:w-[250px]"
              >
                <div className="h-[250px] sm:h-[300px] md:h-[360px] rounded-2xl md:rounded-3xl bg-white/70 animate-pulse" />
                <div className="mt-3 h-4 w-3/4 rounded bg-white/70 animate-pulse" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/70 animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </main>
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
            <div className="mx-auto mb-6 sm:mb-10 max-w-[90%] md:max-w-[700px]">
              <div className="flex flex-wrap justify-center gap-2 sm:hidden">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategory === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                      className={`basis-[calc(50%-0.25rem)] cursor-pointer rounded-full border border-[#c7c7c7] bg-[#dcdcdc] px-3 py-3 font-semibold transition-all text-xs ${
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
              <div className="hidden sm:grid sm:grid-cols-4 sm:rounded-full sm:border sm:border-[#c7c7c7] sm:bg-[#dcdcdc] sm:text-center">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = activeCategory === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                      className={`cursor-pointer rounded-full px-3 py-3 font-semibold transition-all text-sm md:text-base ${
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
