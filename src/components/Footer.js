"use client";
import React from "react";
import footerSkyline from "@/assets/footer.avif";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-white pt-[60px] sm:pt-[100px]">
      {/* City Skyline */}
      <div
        className="w-full relative h-16 sm:h-20 md:h-24"
        style={{
          backgroundImage: `url(${typeof footerSkyline === 'string' ? footerSkyline : footerSkyline.src || footerSkyline})`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center bottom',
          backgroundSize: 'auto 100%'
        }}
        aria-hidden="true"
      />

      {/* Copyright */}
      <div className="w-full text-center py-4">
        <p className="text-white text-xs sm:text-sm">
          © {new Date().getFullYear()} traveltraces. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
