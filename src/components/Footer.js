"use client";
import Link from "next/link";
import React from "react";
import footerSkyline from "@/assets/footer.avif";
import logo from "@/assets/logo-light.png";
import Image from "next/image";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary text-white pt-[60px] sm:pt-[100px]">
      <div className="mx-auto flex w-full md:w-[90%] flex-col md:flex-row gap-8 md:items-end md:justify-between pb-8 sm:pb-15">
        <div className="flex flex-col items-center md:items-start justify-center md:justify-start gap-2 w-full md:w-[40%]">
          <div className="w-[200px] h-max">
            <Image src={logo} alt="TravelTraces Logo" className="w-full h-auto" />
          </div>
          <a
            href="https://maps.google.com/?q=Nakshatra+Arcade,+46,+IOC+Rd,+Chandkheda,+Ahmedabad,+Gujarat+382424"
            target="_blank"
            rel="noopener noreferrer"
            className="md:ml-5 -mt-4 flex items-center gap-x-2 text-sm text-[#fcf3d8]/90 underline-offset-2 transition-opacity hover:opacity-90 hover:underline"
          >
            <FiMapPin className="h-8 w-8 shrink-0 mb-1.5" aria-hidden />
            <p className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 text-nowrap text-center md:text-left">
              <span>Nakshatra Arcade, 46, IOC Rd, Chandkheda, <br /> Ahmedabad, Gujarat 382424</span>
              <FiArrowUpRight className="h-4 w-4 inline-block ml-2 mb-1" aria-hidden />
            </p>
          </a>
        </div>

        <div className="w-full md:w-[60%] text-center md:text-right">
          <div className="mt-3 space-y-4 md:space-y-2 md:w-full">
            <div className="w-[80%]sm:w-[60%] mx-auto md:w-full flex flex-wrap gap-x-3 sm:gap-x-7 justify-center md:justify-end">
              <Link href="/" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Home
              </Link>
              <Link href="/destinations" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Destinations
              </Link>
              <Link href="/reviews" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Reviews
              </Link>
              <Link href="/team" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Team
              </Link>
            </div>

            <div className="w-full sm:w-[80%] md:w-full mx-auto flex flex-wrap gap-x-3 sm:gap-x-7 justify-center md:justify-end">
              <Link href="/careers" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Career
              </Link>
              <Link href="/about" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                About Us
              </Link>
              <Link href="/terms" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Terms and Condition
              </Link>
              <Link href="/privacy" className="text-xs sm:text-sm md:text-xs lg:text-sm text-[#fcf3d8]/90 transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

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
        <p className="text-[#fcf3d8] text-xs sm:text-sm">
          © {new Date().getFullYear()} traveltraces. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
