"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes, FaDownload } from "react-icons/fa";

export default function FixedGallery({ photos = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const closePopup = () => setSelectedIndex(null);

  const showNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % photos.length;
    });
  };

  const showPrevious = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + photos.length) % photos.length;
    });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - endX;
    const SWIPE_THRESHOLD = 40;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0) showNext();
      else showPrevious();
    }

    setTouchStartX(null);
  };

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  const handleDownload = async () => {
    if (!selectedPhoto?.src) return;
    try {
      const response = await fetch(selectedPhoto.src);
      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${selectedPhoto.title || "travel-photo"}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileUrl);
    } catch {
      // No-op: keep UI clean if download fails.
    }
  };

  return (
    <div className="py-2">
      {/* 1. Gallery Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2 sm:gap-3">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.key || index}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedIndex(index)}
            className="relative cursor-pointer overflow-hidden shadow-sm bg-gray-100 aspect-square w-full"
          >
            <Image
              src={photo.src}
              alt={photo.alt || "Gallery Item"}
              fill
              className="object-cover" // Ensures image fills box without stretching
              sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 14vw, 12vw"
            />
          </motion.div>
        ))}
      </div>

      {/* 2. Popup / Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl h-[60vh] sm:h-[70vh] bg-white rounded-xl overflow-hidden shadow-2xl p-4 sm:p-5"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs sm:text-sm text-secondary font-semibold truncate max-w-[75vw] sm:max-w-lg">
                    {selectedPhoto.title || selectedPhoto.alt || "Style showcase image"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    {selectedIndex + 1} / {photos.length}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="text-secondary hover:text-black/60 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all"
                    aria-label="Download image"
                  >
                    <FaDownload className="text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="text-secondary hover:text-black/60 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all"
                    aria-label="Close popup"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="relative w-full h-[70%] sm:h-[70%] rounded-lg bg-gray-50 overflow-hidden touch-pan-y">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt || "Enlarged view"}
                  fill
                  className="object-contain"
                />

                {/* Previous button */}
                <button
                  type="button"
                  onClick={showPrevious}
                  className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/35 hover:bg-black/55 p-2 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <FaArrowLeft className="text-xs sm:text-sm" />
                </button>

                {/* Next button */}
                <button
                  type="button"
                  onClick={showNext}
                  className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/35 hover:bg-black/55 p-2 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <FaArrowRight className="text-xs sm:text-sm" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {photos.map((photo, index) => (
                  <button
                    key={photo.key || index}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all ${
                      index === selectedIndex ? "border-secondary scale-[1.03]" : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt || `Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}