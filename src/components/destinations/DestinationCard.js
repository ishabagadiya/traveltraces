"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { urlFor } from "@/sanity/lib/image";

const getStartingPrice = (destination) => {
  const parsePrice = (value) => {
    const numeric = Number(String(value || "").replace(/[^\d]/g, ""));
    return Number.isNaN(numeric) ? null : numeric;
  };

  const ahmedabadEntry = (destination.joinUsFrom || []).find(
    (item) => String(item?.place || "").trim().toLowerCase() === "ahmedabad"
  );
  const ahmedabadPrice = parsePrice(ahmedabadEntry?.price);
  if (ahmedabadPrice && ahmedabadPrice > 0) return ahmedabadPrice;

  const fallbackPrices = (destination.joinUsFrom || [])
    .map((item) => parsePrice(item?.price))
    .filter((value) => value !== null && value > 0);

  if (!fallbackPrices.length) return null;
  return Math.min(...fallbackPrices);
};

export default function DestinationCard({ destination }) {
  const startingPrice = getStartingPrice(destination);
  const destinationImage = destination.image
    ? urlFor(destination.image).width(1131).height(1600).url()
    : "/HeroImages/saputara.jpeg";

  return (
    <Link
      href={`/destinations/${destination.slug?.current}`}
      className="group relative flex items-start justify-start rounded-2xl md:rounded-3xl overflow-hidden sm:w-[300px] sm:h-[370px] w-[270px] h-[320px]"
    >
      <Image
        src={destinationImage}
        alt={destination.name}
        width={1080}
        height={1350}
        className="w-full! h-auto! rounded-2xl md:rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.01]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] md:text-[11px] font-semibold tracking-[0.08em] uppercase text-white/85">
              From Ahmedabad            
            </p>
            {startingPrice ? (
              <p className="text-lg font-extrabold leading-tight text-white">
                ₹ {startingPrice.toLocaleString("en-IN")}
              </p>
            ) : (
              <p className="text-sm font-semibold text-white">Contact Us</p>
            )}
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 text-white">
            <FiArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
