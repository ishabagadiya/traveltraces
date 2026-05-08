"use client";

import { useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
} from "framer-motion";

export default function InfiniteNativeScrollGallery({ photos = [], fallbackImage }) {
  const containerRef = useRef(null);

  // 1. Triple the photos to create the illusion of infinity
  const infinitePhotos = useMemo(() => [...photos, ...photos, ...photos], [photos]);

  // 2. Track Native Scroll position
  const { scrollX } = useScroll({
    container: containerRef,
  });

  // 3. Track velocity of the scroll for the "Lean/Skew" effect
  const scrollVelocity = useVelocity(scrollX);
  const skew = useTransform(scrollVelocity, [-1000, 1000], [20, -20]);
  const smoothSkew = useSpring(skew, { stiffness: 400, damping: 30 });

  // 4. INFINITE LOOP LOGIC (Native Scroll Teleportation)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, offsetWidth } = container;
      const singleSetWidth = scrollWidth / 3;

      // If we scroll into the last set, jump back to the middle set
      if (scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft = scrollLeft - singleSetWidth;
      }
      // If we scroll into the first set, jump forward to the middle set
      else if (scrollLeft <= 0) {
        container.scrollLeft = singleSetWidth;
      }
    };

    // Set initial scroll position to the start of the second (middle) set
    container.scrollLeft = container.scrollWidth / 3;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [photos]);

  if (!photos.length) return null;

  return (
    <div className="relative w-full h-[260px] sm:h-[280px] bg-transparent overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto h-full items-center snap-x [&::-webkit-scrollbar]:hidden"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          perspective: "1000px" 
        }}
      >
        {infinitePhotos.map((photo, index) => (
          <CarouselItem 
            key={`${photo.key || index}-${index}`} 
            photo={photo} 
            skew={smoothSkew} 
            containerRef={containerRef}
            fallbackImage={fallbackImage}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselItem({ photo, skew, containerRef, fallbackImage }) {
  const itemRef = useRef(null);

  // 5. Internal Parallax Calculation
  const { scrollXProgress } = useScroll({
    target: itemRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const imageX = useTransform(scrollXProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={itemRef}
      style={{ skewX: skew }}
      className="relative shrink-0 w-[200px] h-[260px] sm:w-[220px] sm:h-[280px] overflow-hidden rounded-sm bg-transparent"
    >
      <motion.div 
        className="relative w-[130%] h-full left-[-15%]"
        style={{ x: imageX }}
      >
        <Image
          src={photo.src || fallbackImage}
          alt={photo.alt || "Gallery Item"}
          fill
          draggable={false}
          className="object-cover"
          sizes="220px"
        />
      </motion.div>
    </motion.div>
  );
}