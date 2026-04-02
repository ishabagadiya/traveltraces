"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const destinations = [
    { name: "Thailand", icon: "/icons/download (6).png", href: "/destinations/Thailand" },
    { name: "Kashmir", icon: "/icons/stock-vector-jagged-mountain-peaks-black-silhouette-mountains-white-2651938915.jpg", href: "/destinations/kashmir" },
    { name: "Andharban Trek", icon: "/icons/download (3).png", href: "/destinations/AndharbanTrek" },
    { name: "Jaisalmer", icon: "/icons/images.png", href: "/destinations/jaisalmer" },
    { name: "Rishikesh", icon: "/icons/download (5).png", href: "/destinations/rishikesh" },
    { name: "Dwarka", icon: "/icons/download.png", href: "/destinations/dwarka" },
    { name: "Kedarkanta", icon: "/icons/download (2).png", href: "/destinations/kedarkanta" },
    { name: "Matheran", icon: "/icons/download (4).png", href: "/destinations/matheran" },
    { name: "Goa", icon: "/icons/Tropical-Beach-Silhouette.png", href: "/destinations/goa" },
];

export default function IntroIcon() {
    return (
        <section className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">

                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={dest.href}
                                className="group flex flex-col items-center text-center"
                            >
                                {/* SVG Icon */}
                                <div className="w-12 h-12 md:w-14 md:h-14 mb-2">
                                    <img
                                        src={dest.icon}
                                        alt={dest.name}
                                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Text */}
                                <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-black transition">
                                    {dest.name}
                                </span>
                            </Link>
                        </motion.div>
                    ))}

                </div>
            </div>

            {/* Avian-style divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </section>
    );
}