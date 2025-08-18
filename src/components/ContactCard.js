"use client";

import React from "react";

export default function ContactCard({
  icon,
  title,
  href,
  ariaLabel,
  linkText,
  linkClass,
  target,
  rel,
}) {
  return (
    <div className="w-full h-[60px] md:h-[80px] bg-white/80 rounded-xl px-4 py-3 shadow-md hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer">
      {icon}
      <div className="flex flex-col items-start">
        <span className="text-gray-700 text-xs font-semibold leading-tight text-left">
          {title}
        </span>
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          className={linkClass}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
