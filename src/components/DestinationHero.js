// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { urlFor } from "@/sanity/lib/image";

// export default function DestinationHero({ destinations }) {
//     const [activeIndex, setActiveIndex] = useState(0);

//     useEffect(() => {
//         if (!destinations?.length) return;

//         const interval = setInterval(() => {
//             setActiveIndex((prev) =>
//                 prev === destinations.length - 1 ? 0 : prev + 1
//             );
//         }, 2500); // 2.5 seconds

//         return () => clearInterval(interval);
//     }, [destinations]);

//     if (!destinations?.length) return null;

//     return (
//         <section className="relative h-screen w-full overflow-hidden">
//             {destinations.map((dest, index) => {
//                 const isActive = index === activeIndex;

//                 return (
//                     <div
//                         key={dest._id}
//                         className={`absolute inset-0 transition-all duration-1000 ease-in-out
//               ${isActive ? "opacity-100 scale-100 z-20" : "opacity-0 scale-110 z-10"}`}
//                     >
//                         {/* Background */}
//                         <Image
//                             src={dest.image ? urlFor(dest.image).url() : "/HeroImages/saputara.jpeg"}
//                             alt={dest.name}
//                             fill
//                             priority={isActive}
//                             className="object-cover"
//                         />

//                         {/* Dark overlay */}
//                         <div className="absolute inset-0 bg-black/60" />

//                         {/* Text */}
//                         <div className="absolute inset-0 flex items-center justify-center text-center px-4">
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
//                                 transition={{ duration: 1 }}
//                                 className="max-w-4xl"
//                             >
//                                 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
//                                     {dest.name}
//                                 </h1>

//                                 {dest.tagline && (
//                                     <p className="text-lg md:text-2xl text-white/90 mb-8">
//                                         {dest.tagline}
//                                     </p>
//                                 )}

//                                 <Link
//                                     href={`/destinations/${dest.slug?.current}`}
//                                     className="inline-block px-10 py-4 bg-secondary text-white font-bold rounded-full text-lg shadow-2xl hover:scale-105 transition-transform"
//                                 >
//                                     Explore Destination
//                                 </Link>
//                             </motion.div>
//                         </div>
//                     </div>
//                 );
//             })}
//         </section>
//     );
// }









"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const heroSlides = [
    {
        image: "/HeroImages/Feature-Best-Places-to-Visit-in-Manali.jpg",
        title: "Majestic Mountains",
        tagline: "Explore the serenity and thrill of Manali's towering peaks.",
        link: "/destinations/mountains",
    },
    {

        image: "/HeroImages/shuttersto-6d71496a31ac52b.avif",
        title: "Sun-Kissed Beaches",
        tagline: "Relax and unwind at the pristine beaches of Goa.",
        link: "/destinations/beaches",
    },
    {
        image: "/HeroImages/jaisalmer-fort-1704691987.webp",
        title: "Cultural Journeys",
        tagline: "Immerse yourself in the rich culture of Jaisalmer.",
        link: "/destinations/culture",
    },
    {
        image: "/HeroImages/jawai-leopard-safari-1024x800-1.jpg",
        title: "Wildlife Adventures",
        tagline: "Get close to nature and spot exotic wildlife in Jawai.",
        link: "/destinations/wildlife",
    },
    {
        image: "/HeroImages/2026-02-10-698b22698afb7.webp",
        title: "Adventure Escapes",
        tagline: "Thrill-seekers, explore the best adventure spots in India.",
        link: "/destinations/adventure",
    },
];

export default function DestinationHero() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroSlides.length);
        }, 4500);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[70vh] overflow-hidden">
            {heroSlides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000
              ${isActive ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                    >
                        {/* 🔥 REAL IMAGE (NO NEXT/IMAGE) */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/45" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-3xl text-center"
                            >
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-md md:text-lg text-white/90 mb-6">
                                    {slide.tagline}
                                </p>
                                <Link
                                    href={slide.link}
                                    className="inline-block px-10 py-4 bg-secondary text-white font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform"
                                >
                                    Explore
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}