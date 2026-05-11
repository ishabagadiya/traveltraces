"use client";

import { useRef } from "react";

export default function BlogMobileToc({ headings = [] }) {
  const detailsRef = useRef(null);

  if (headings.length === 0) return null;

  const handleSelect = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <details
      ref={detailsRef}
      className="group order-1 sticky top-2 z-30 mt-6 rounded-2xl border border-black/10 bg-white/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/80 md:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-base font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
        <span>Table of Contents</span>
        <span
          aria-hidden="true"
          className="text-gray-500 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <ol className="max-h-[60vh] space-y-2 overflow-y-auto px-5 pb-5">
        {headings.map((h, i) => (
          <li
            key={h.id}
            className="flex items-baseline font-semibold gap-3 text-xs leading-5"
          >
            <span className="w-5 shrink-0 text-right text-xs text-gray-700">
              {i + 1}
            </span>
            <a
              href={`#${h.id}`}
              onClick={handleSelect}
              className="text-gray-800 hover:underline underline-offset-2 hover:text-secondary"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
