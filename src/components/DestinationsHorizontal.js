// "use client";

// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { FiChevronRight } from "react-icons/fi";
// import { urlFor } from "@/sanity/lib/image";

// const AUTO_ROTATE_INTERVAL = 3500;

// export default function DestinationsHorizontal({ destinations }) {
//     const [current, setCurrent] = useState(0);
//     const intervalRef = useRef(null);
//     const visibleSlots = 5;

//     useEffect(() => {
//         if (!destinations?.length) return;

//         intervalRef.current = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % destinations.length);
//         }, AUTO_ROTATE_INTERVAL);

//         return () => clearInterval(intervalRef.current);
//     }, [destinations]);

//     const getSlotIndex = (slot) => (current + slot) % destinations.length;

//     return (
//         <section className="relative w-full py-12 overflow-x-hidden">
//             <div className="flex gap-4 justify-center items-end">
//                 {Array.from({ length: visibleSlots }).map((_, slot) => {
//                     const dest = destinations[getSlotIndex(slot)];
//                     const isCenter = slot === Math.floor(visibleSlots / 2);

//                     if (!dest) return null;

//                     return (
//                         <div key={dest._id + slot} className="flex flex-col items-center">
//                             <motion.div
//                                 layout
//                                 whileHover={{ scale: isCenter ? 1.05 : 1.08 }}
//                                 transition={{ duration: 0.5 }}
//                                 className={`relative cursor-pointer ${isCenter ? "w-72 sm:w-96 h-60 sm:h-80" : "w-40 sm:w-52 h-48 sm:h-64"}`}
//                                 onClick={() => setCurrent(getSlotIndex(slot))}
//                             >
//                                 <div className={`relative w-full h-full overflow-hidden rounded-2xl shadow-lg`}>
//                                     <Image
//                                         src={urlFor(dest.image).url()}
//                                         alt={dest.name}
//                                         fill
//                                         className="object-cover transition-transform duration-700 hover:scale-105"
//                                         priority={isCenter}
//                                     />
//                                     {isCenter && (
//                                         <motion.div
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end"
//                                         >
//                                             <h3 className="text-white text-lg sm:text-2xl font-bold">
//                                                 {dest.name}
//                                             </h3>
//                                             <p className="text-gray-200 text-sm sm:text-base">
//                                                 {dest.location}
//                                             </p>
//                                         </motion.div>
//                                     )}
//                                 </div>
//                             </motion.div>

//                             {/* Social icons on 2nd left */}
//                             {slot === 1 && (
//                                 <motion.div
//                                     initial={{ y: 10, opacity: 0 }}
//                                     animate={{ y: [0, 5, 0], opacity: 1 }}
//                                     transition={{ repeat: Infinity, duration: 2 }}
//                                     className="mt-4 flex flex-col gap-3 text-base"
//                                 >
//                                     <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">YouTube</a>
//                                     <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">Instagram</a>
//                                     <a href="https://wa.me/918460146012" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">WhatsApp</a>
//                                 </motion.div>
//                             )}

//                             {/* CTA on 2nd right */}
//                             {slot === 3 && (
//                                 <div className="mt-4 text-center">
//                                     <p className="text-xs sm:text-sm font-semibold text-gray-600">
//                                         Find Your Escape
//                                     </p>
//                                     <Link href="/destinations">
//                                         <button className="mt-2 p-3 rounded-full bg-secondary text-white shadow-xl hover:scale-110 transition">
//                                             <FiChevronRight />
//                                         </button>
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </section>
//     );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

const AUTO_ROTATE_INTERVAL = 3500;

export default function DestinationsHorizontal({ destinations }) {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);
    const visibleSlots = 5;

    useEffect(() => {
        if (!destinations?.length) return;

        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % destinations.length);
        }, AUTO_ROTATE_INTERVAL);

        return () => clearInterval(intervalRef.current);
    }, [destinations]);

    const getSlotIndex = (slot) => (current + slot) % destinations.length;

    return (
        <section className="relative w-full py-8 overflow-x-hidden">
            <div className="flex gap-3 justify-center items-end">
                {Array.from({ length: visibleSlots }).map((_, slot) => {
                    const dest = destinations[getSlotIndex(slot)];
                    const isCenter = slot === Math.floor(visibleSlots / 2);
                    if (!dest) return null;

                    return (
                        <div key={dest._id + slot} className="flex flex-col items-center">
                            <motion.div
                                layout
                                whileHover={{ scale: isCenter ? 1.04 : 1.06 }}
                                transition={{ duration: 0.5 }}
                                className={`relative cursor-pointer ${isCenter ? "w-60 sm:w-72 h-48 sm:h-56" : "w-32 sm:w-40 h-36 sm:h-44"
                                    }`}
                            >
                                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src={urlFor(dest.image).url()}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        priority={isCenter}
                                    />
                                    {isCenter && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-2 flex flex-col justify-end"
                                        >
                                            <h3 className="text-white text-lg sm:text-xl font-bold">
                                                {dest.name}
                                            </h3>
                                            <p className="text-gray-200 text-sm">{dest.location}</p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}