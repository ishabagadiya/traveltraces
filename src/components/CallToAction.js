"use client";
import React from "react";

export default function CallToAction() {
  return (
    <section className="w-full py-12 px-4 bg-gradient-to-br from-white via-yellow-50 to-white shadow-lg border border-purple-100">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-4xl font-extrabold text-purple-700 mb-4">
          Ready for Your Next Adventure?
        </h3>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Join thousands of happy travelers. Your journey starts here!
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow transition-all duration-200">
          Start Your Adventure
        </button>
      </div>
    </section>
  );
} 