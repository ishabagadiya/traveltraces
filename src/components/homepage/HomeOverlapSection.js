"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const SLIDE_INTERVAL_MS = 3500;

export default function HomeOverlapSection() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "homepageMedia" && isActive == true] | order(_updatedAt desc)[0]{
          overlapSliderImages[]{
            alt,
            asset,
            crop,
            hotspot
          }
        }`
      )
      .then((doc) => {
        const raw = doc?.overlapSliderImages?.filter((img) => img?.asset) ?? [];
        const built = raw.map((img) => ({
          src: urlFor(img).width(1600).height(900).url(),
          alt: img.alt?.trim() || "Overlap banner",
        }));
        setSlides(built);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative z-20 -mb-[120px] md:-mb-[150px] px-4 md:px-0">
      <div className="relative mx-auto w-full md:w-[90%] h-[200px] md:h-[300px] overflow-hidden rounded-2xl shadow-lg">
        {slides.length > 0 &&
          slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
      </div>
    </div>
  );
}
