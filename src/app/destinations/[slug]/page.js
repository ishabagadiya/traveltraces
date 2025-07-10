"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FaClock,
  FaMountain,
  FaUserFriends,
  FaRupeeSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhoneAlt,
  FaDownload,
  FaSuitcase,
  FaStar,
  FaUtensils,
  FaBed,
  FaBus,
  FaCamera,
  FaHiking,
  FaSwimmingPool,
  FaWifi,
  FaSnowflake,
  FaSun,
  FaLeaf,
  FaPlane,
  FaTrain,
} from "react-icons/fa";

// Comprehensive trip data
const trips = {
  saputara: {
    name: "Saputara",
    tagline: "Gujarat's Hidden Hill Station",
    images: [
      "/HeroImages/saputara.jpeg",
      "/HeroImages/matheran.jpeg",
      "/HeroImages/andharban.jpeg",
      "/HeroImages/manali.jpeg",
      "/HeroImages/andharban.jpeg",
      "/HeroImages/kedarnath.jpeg",
      "/HeroImages/andharban.webp",

    ],
    videos: [],
    description:
      "Discover the misty mountains and rich tribal culture of Gujarat's only hill station",
    duration: "2D/2N",
    difficulty: "Easy",
    ageAllowed: "10+",
    maxGroupSize: 15,
    rating: 4.8,
    reviews: 127,
    about:
      'Saputara, meaning "abode of serpents," is Gujarat\'s premier hill station nestled in the Sahyadri range. This picturesque destination offers a perfect blend of natural beauty, tribal culture, and adventure activities. With its cool climate, lush forests, and stunning viewpoints, Saputara provides an ideal escape from the plains.',
    highlights: [
      "Misty mountains & lush forests",
      "Saputara Lake & Sunset Point",
      "Local tribal culture & handicrafts",
      "Pleasant weather year-round",
      "Adventure activities & trekking",
      "Local cuisine & tribal markets",
    ],
    joinUsFrom: [
      {
        place: "Mumbai",
        price: "₹4,500",
        duration: "2 days",
        transport: "AC Bus",
      },
      {
        place: "Surat",
        price: "₹3,800",
        duration: "2 days",
        transport: "AC Bus",
      },
      {
        place: "Ahmedabad",
        price: "₹4,200",
        duration: "2 days",
        transport: "AC Bus",
      },
      {
        place: "Vadodara",
        price: "₹3,900",
        duration: "2 days",
        transport: "AC Bus",
      },
    ],
    availableDates: [
      "2024-07-10",
      "2024-07-24",
      "2024-08-05",
      "2024-08-19",
      "2024-09-02",
    ],
    schedule: [
      {
        day: 1,
        heading: "Arrival & Lake Exploration",
        description:
          "Arrive at Saputara, check-in at hotel. Visit Saputara Lake for boating, explore Sunset Point for breathtaking views, and enjoy tribal dance performance in the evening.",
        activities: [
          "Hotel Check-in",
          "Saputara Lake Boating",
          "Sunset Point Visit",
          "Tribal Dance Show",
        ],
        images: ["/HeroImages/saputara.jpeg"],
        meals: ["Lunch", "Dinner"],
      },
      {
        day: 2,
        heading: "Trek & Departure",
        description:
          "Early morning trek to Artist Village, visit Tribal Museum, explore local markets for handicrafts, and return journey.",
        activities: [
          "Morning Trek",
          "Tribal Museum",
          "Local Market Visit",
          "Return Journey",
        ],
        images: [],
        meals: ["Breakfast", "Lunch"],
      },
    ],
    inclusions: [
      "AC accommodation in 3-star hotel",
      "All meals (2 breakfast, 2 lunch, 1 dinner)",
      "AC bus transportation",
      "Professional trek guide",
      "All entry fees and permits",
      "First aid kit and safety equipment",
      "Trip coordinator throughout the journey",
    ],
    exclusions: [
      "Personal expenses",
      "Any additional activities",
      "Travel insurance",
      "GST (5%)",
      "Tips and gratuities",
    ],
    thingsToCarry: [
      "Comfortable trekking shoes",
      "Water bottle (2L)",
      "Raincoat/umbrella",
      "Warm clothes (evenings are cool)",
      "ID proof (mandatory)",
      "Personal medications",
      "Camera and power bank",
      "Snacks and energy bars",
    ],
    accommodation: {
      type: "3-Star Hotel",
      facilities: ["AC Rooms", "Hot Water", "WiFi", "Restaurant", "Parking"],
      roomType: "Double/Triple sharing",
    },
    transport: {
      type: "AC Bus",
      pickup: "Multiple pickup points in each city",
      departure: "Early morning (6:00 AM)",
      return: "Evening (8:00 PM)",
    },
    cancellation: {
      before7days: "Full refund",
      before3days: "50% refund",
      before1day: "25% refund",
      sameDay: "No refund",
    },
    brochure: "/brochures/saputara.pdf",
    faq: [
      {
        question: "Is this trip suitable for beginners?",
        answer:
          "Yes, this is an easy-level trip perfect for first-time trekkers and families.",
      },
      {
        question: "What is the weather like in Saputara?",
        answer:
          "Saputara enjoys pleasant weather throughout the year with temperatures ranging from 15-30°C.",
      },
      {
        question: "Are meals included in the package?",
        answer:
          "Yes, all meals including breakfast, lunch, and dinner are included in the package.",
      },
      {
        question: "What should I wear for the trek?",
        answer:
          "Comfortable trekking shoes, light cotton clothes, and a jacket for evenings are recommended.",
      },
    ],
  },
  manali: {
    name: "Manali",
    tagline: "Queen of Hills",
    images: [
      "/HeroImages/manali.jpeg",
      "/HeroImages/kedarnath.jpeg",
      "/HeroImages/saputara.jpeg",
      "/HeroImages/matheran.jpeg",
      "/HeroImages/andharban.jpeg",
    ],
    videos: [],
    description:
      "Experience the magic of the Himalayas with snow-capped peaks and adventure activities",
    duration: "4D/3N",
    difficulty: "Moderate",
    ageAllowed: "12+",
    maxGroupSize: 12,
    rating: 4.9,
    reviews: 203,
    about:
      "Manali, nestled in the heart of the Himalayas, is a paradise for nature lovers and adventure enthusiasts. With its snow-capped peaks, gushing rivers, and pine forests, Manali offers a perfect blend of tranquility and excitement.",
    highlights: [
      "Snow-capped Himalayan peaks",
      "Adventure activities (rafting, paragliding)",
      "Local Himachali culture",
      "Apple orchards and valleys",
      "Hot springs and temples",
      "Mountain biking and trekking",
    ],
    joinUsFrom: [
      {
        place: "Delhi",
        price: "₹12,500",
        duration: "4 days",
        transport: "AC Bus",
      },
      {
        place: "Chandigarh",
        price: "₹10,800",
        duration: "4 days",
        transport: "AC Bus",
      },
      {
        place: "Mumbai",
        price: "₹15,200",
        duration: "4 days",
        transport: "Flight + Bus",
      },
    ],
    availableDates: ["2024-07-15", "2024-07-29", "2024-08-12", "2024-08-26"],
    schedule: [
      {
        day: 1,
        heading: "Arrival & Mall Road",
        description:
          "Arrive in Manali, check-in at hotel. Evening walk on Mall Road, visit Hadimba Temple.",
        activities: [
          "Hotel Check-in",
          "Mall Road Walk",
          "Hadimba Temple",
          "Local Market",
        ],
        images: ["/HeroImages/manali.jpeg"],
        meals: ["Dinner"],
      },
      {
        day: 2,
        heading: "Solang Valley Adventure",
        description:
          "Full day adventure activities in Solang Valley including zorbing, paragliding, and skiing.",
        activities: [
          "Solang Valley",
          "Adventure Sports",
          "Photography",
          "Evening Bonfire",
        ],
        images: [],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        heading: "Rohtang Pass",
        description:
          "Visit Rohtang Pass for snow activities, photography, and breathtaking mountain views.",
        activities: [
          "Rohtang Pass",
          "Snow Activities",
          "Mountain Views",
          "Local Cuisine",
        ],
        images: [],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        heading: "Departure",
        description:
          "Morning visit to Vashisht Hot Springs, shopping, and return journey.",
        activities: ["Vashisht Hot Springs", "Shopping", "Return Journey"],
        images: [],
        meals: ["Breakfast"],
      },
    ],
    inclusions: [
      "AC accommodation in 3-star hotel",
      "All meals (3 breakfast, 3 lunch, 3 dinner)",
      "AC bus transportation",
      "Adventure activity equipment",
      "Professional guides",
      "All entry fees and permits",
      "First aid kit and safety equipment",
    ],
    exclusions: [
      "Personal expenses",
      "Optional adventure activities",
      "Travel insurance",
      "GST (5%)",
      "Tips and gratuities",
    ],
    thingsToCarry: [
      "Warm clothes and jackets",
      "Trekking shoes",
      "Sunglasses and sunscreen",
      "Water bottle",
      "ID proof (mandatory)",
      "Personal medications",
      "Camera and power bank",
      "Thermal wear (for snow activities)",
    ],
    accommodation: {
      type: "3-Star Hotel",
      facilities: [
        "AC Rooms",
        "Hot Water",
        "WiFi",
        "Restaurant",
        "Parking",
        "Bonfire",
      ],
      roomType: "Double/Triple sharing",
    },
    transport: {
      type: "AC Bus",
      pickup: "Multiple pickup points in each city",
      departure: "Evening (8:00 PM)",
      return: "Morning (8:00 AM)",
    },
    cancellation: {
      before7days: "Full refund",
      before3days: "50% refund",
      before1day: "25% refund",
      sameDay: "No refund",
    },
    brochure: "/brochures/manali.pdf",
    faq: [
      {
        question: "Is Rohtang Pass always accessible?",
        answer:
          "Rohtang Pass accessibility depends on weather conditions and may require permits during peak season.",
      },
      {
        question: "What adventure activities are included?",
        answer:
          "Basic adventure activities are included. Premium activities like paragliding may have additional charges.",
      },
      {
        question: "Is the trip suitable for elderly people?",
        answer:
          "Yes, with moderate physical activity. We can customize the itinerary for elderly participants.",
      },
      {
        question: "What is the best time to visit Manali?",
        answer:
          "March to June and September to December are the best months to visit Manali.",
      },
    ],
  },
  kedarnath: {
    name: "Kedarnath",
    tagline: "Sacred Himalayan Shrine",
    images: [
      "/HeroImages/kedarnath.jpeg",
      "/HeroImages/manali.jpeg",
      "/HeroImages/saputara.jpeg",
      "/HeroImages/matheran.jpeg",
      "/HeroImages/andharban.jpeg",
    ],
    videos: [],
    description:
      "Embark on a spiritual journey to one of the holiest Hindu shrines in the Himalayas",
    duration: "5D/4N",
    difficulty: "Challenging",
    ageAllowed: "16+",
    maxGroupSize: 10,
    rating: 4.7,
    reviews: 89,
    about:
      "Kedarnath, one of the holiest Hindu shrines, is located at an altitude of 3,583 meters in the Garhwal Himalayas. This sacred temple dedicated to Lord Shiva offers a unique blend of spirituality and adventure.",
    highlights: [
      "Sacred Kedarnath Temple",
      "Challenging trek through Himalayas",
      "Spiritual atmosphere",
      "Breathtaking mountain views",
      "Local Garhwali culture",
      "Hot springs at Gaurikund",
    ],
    joinUsFrom: [
      {
        place: "Delhi",
        price: "₹8,500",
        duration: "5 days",
        transport: "AC Bus",
      },
      {
        place: "Haridwar",
        price: "₹6,800",
        duration: "5 days",
        transport: "AC Bus",
      },
      {
        place: "Rishikesh",
        price: "₹7,200",
        duration: "5 days",
        transport: "AC Bus",
      },
    ],
    availableDates: ["2024-07-20", "2024-08-03", "2024-08-17", "2024-09-01"],
    schedule: [
      {
        day: 1,
        heading: "Journey to Rishikesh",
        description:
          "Depart from Delhi, arrive in Rishikesh, evening Ganga Aarti at Triveni Ghat.",
        activities: [
          "Departure",
          "Rishikesh Arrival",
          "Ganga Aarti",
          "Hotel Check-in",
        ],
        images: ["/HeroImages/kedarnath.jpeg"],
        meals: ["Dinner"],
      },
      {
        day: 2,
        heading: "Rishikesh to Guptkashi",
        description:
          "Travel to Guptkashi via Devprayag, Rudraprayag, and enjoy scenic mountain views.",
        activities: [
          "Mountain Drive",
          "River Confluence",
          "Local Markets",
          "Evening Rest",
        ],
        images: [],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 3,
        heading: "Trek to Kedarnath",
        description:
          "Early morning drive to Gaurikund, begin trek to Kedarnath (16 km uphill).",
        activities: [
          "Gaurikund",
          "Trek Start",
          "Mountain Views",
          "Temple Visit",
        ],
        images: [],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 4,
        heading: "Kedarnath Darshan",
        description:
          "Morning darshan at Kedarnath Temple, explore surroundings, evening return trek.",
        activities: [
          "Temple Darshan",
          "Local Exploration",
          "Return Trek",
          "Gaurikund",
        ],
        images: [],
        meals: ["Breakfast", "Lunch", "Dinner"],
      },
      {
        day: 5,
        heading: "Return Journey",
        description: "Return to Rishikesh, evening departure to Delhi.",
        activities: ["Return Journey", "Rishikesh", "Delhi Departure"],
        images: [],
        meals: ["Breakfast", "Lunch"],
      },
    ],
    inclusions: [
      "AC accommodation in hotels",
      "All meals during the trip",
      "AC bus transportation",
      "Trek guide and porter services",
      "Temple entry and permits",
      "First aid kit and safety equipment",
      "Trip coordinator throughout",
    ],
    exclusions: [
      "Personal expenses",
      "Pony or helicopter charges",
      "Travel insurance",
      "GST (5%)",
      "Tips and gratuities",
    ],
    thingsToCarry: [
      "Warm clothes and thermal wear",
      "Sturdy trekking shoes",
      "Walking stick",
      "Water bottle and energy drinks",
      "ID proof (mandatory)",
      "Personal medications",
      "Camera and power bank",
      "Raincoat and umbrella",
    ],
    accommodation: {
      type: "Basic Hotels & Guest Houses",
      facilities: ["Basic Rooms", "Hot Water", "Restaurant", "Parking"],
      roomType: "Double/Triple sharing",
    },
    transport: {
      type: "AC Bus",
      pickup: "Multiple pickup points in each city",
      departure: "Evening (7:00 PM)",
      return: "Morning (7:00 AM)",
    },
    cancellation: {
      before7days: "Full refund",
      before3days: "50% refund",
      before1day: "25% refund",
      sameDay: "No refund",
    },
    brochure: "/brochures/kedarnath.pdf",
    faq: [
      {
        question: "Is the trek to Kedarnath difficult?",
        answer:
          "Yes, it's a challenging 16km uphill trek. Ponies and helicopters are available at additional cost.",
      },
      {
        question: "What is the best time to visit Kedarnath?",
        answer:
          "May to June and September to October are the best months when the temple is open.",
      },
      {
        question: "Are there medical facilities available?",
        answer:
          "Basic medical facilities are available at Gaurikund and Kedarnath. Carry personal medications.",
      },
      {
        question: "Is photography allowed in the temple?",
        answer: "Photography is not allowed inside the main temple premises.",
      },
    ],
  },
};

export default function TripDetailsPage() {
  const params = useParams();
  const slug = params?.slug;
  const trip = trips[slug] || trips["saputara"];

  // Carousel logic (like Destinations component)
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = trip.images.length;
  const intervalRef = useRef();

  // Join Us From selection
  const [selectedPlaceIdx, setSelectedPlaceIdx] = useState(0);
  const selectedPlace = trip.joinUsFrom[selectedPlaceIdx];

  // Place this at the top of your component, with other useState hooks:
  const [expandedIdx, setExpandedIdx] = useState(0);
  // Add currentDay state for the itinerary carousel
  const [currentDay, setCurrentDay] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % total);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, total]);

  // Add scroll-to-card effect when currentDay changes
  useEffect(() => {
    if (cardRefs.current[currentDay]) {
      cardRefs.current[currentDay].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentDay]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-[60vh] min-h-[400px] md:min-h-[500px] bg-black flex items-end">
        <div
          className="absolute inset-0 w-full h-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={trip.images[current]}
            alt={`${trip.name} - Hero Image`}
            fill
            className="object-cover w-full h-full transition-all duration-300"
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {trip.images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full cursor-pointer transition-all duration-200 ${
                  idx === current
                    ? "bg-[#316866] w-4 h-2"
                    : "bg-gray-300 w-2 h-2"
                }`}
                style={{ display: "inline-block" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Thumbnail Gallery below Carousel */}
      <div
        className="box-border w-full sm:px-12 mx-auto py-3 flex gap-2 justify-center items-center bg-[rgba(152,129,237,0.08)]"
        style={{ overflowX: "auto" }}
      >
        {trip.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`flex-shrink-0 rounded-xl border-2 transition-all duration-200 focus:outline-none
              ${
                current === idx
                  ? "border-[#8c78d7] ring-2 ring-[#e1b9ff] bg-white"
                  : "border-transparent bg-[rgba(225,185,255,0.15)]"
              }
            `}
            style={{
              width: `calc(95vw / ${trip.images.length} - 8px)`,
              maxWidth: "90px",
            }}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${trip.name} thumbnail ${idx + 1}`}
              width={60}
              height={40}
              className="object-cover w-full h-12 md:w-24 md:h-16 rounded-lg"
            />
          </button>
        ))}
      </div>

      {/* Trip Header Content */}
      <section className="w-full bg-transparent py-8 md:py-12 mb-4 md:mb-8 border-b border-[rgba(140,120,215,0.13)]">
        <div className="mx-auto px-4 sm:px-8 flex flex-col items-center text-center">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-1 text-purple-700 tracking-tight leading-tight ">
            {trip.name}
          </h1>
          <p className="text-lg sm:text-2xl font-semibold mb-3 text-[#8c78d7] tracking-wide">
            {trip.tagline}
          </p>
          <p className="text-sm sm:text-base text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            {trip.description}
          </p>
          <div className="flex gap-2 xs:gap-3 justify-center items-center w-full">
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-[rgba(140,120,215,0.12)] text-[#7c3aed] rounded-full font-semibold text-[10px] sm:text-base">
              <FaClock className="text-[#8c78d7]" /> {trip.duration}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-[rgba(225,185,255,0.18)] text-[#003c3a] rounded-full font-semibold text-[10px] sm:text-base">
              <FaMountain className="text-[#003c3a]" /> {trip.difficulty}
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-[rgba(140,120,215,0.10)] text-[#003c3a] rounded-full font-semibold text-[10px] sm:text-base">
              <FaUserFriends className="text-[#8c78d7]" /> Age {trip.ageAllowed}
              +
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 bg-[rgba(225,185,255,0.18)] text-[#8c78d7] rounded-full font-semibold text-[10px] sm:text-base">
              <FaStar className="text-[#e1b9ff]" /> {trip.rating}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky CTA Buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-3 md:hidden">
        <a href="tel:8460146012" className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition">
          <FaPhoneAlt />
        </a>
        <a href="https://wa.me/918460146012" target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition">
          <FaWhatsapp />
        </a>
        <a href={trip.brochure} download className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition">
          <FaDownload />
        </a>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-3 sm:px-6">
        {/* About Section */}
        <section className="px-2 sm:px-0 py-6 sm:py-10 mb-8 bg-[rgba(225,185,255,0.08)] rounded-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#8c78d7] mb-2 border-l-4 border-[#8c78d7] pl-3">
            About This Trip
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
            {trip.about}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-[#003c3a] mb-2 mt-6">
            Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 md:gap-3">
            {trip.highlights?.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[rgba(140,120,215,0.10)] border border-[#e1b9ff] rounded-xl px-2 py-2 md:px-4 md:py-3 shadow-sm"
              >
                <FaStar className="text-[#8c78d7] min-w-5 min-h-5" />
                <span className="text-gray-900 font-medium text-xs md:text-base">
                  {h}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us From - creative boarding pass ticket selector */}
        <section className="w-full px-0 py-6 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003c3a] mb-5 border-l-4 border-[#003c3a] pl-3">
            Join Us From
          </h2>
          <div
            className="join-us-scroll flex gap-4 pb-4 px-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {trip.joinUsFrom.map((j, i) => {
              // Choose icon based on transport
              let TransportIcon = FaBus;
              if (j.transport.toLowerCase().includes("flight"))
                TransportIcon = FaPlane;
              else if (j.transport.toLowerCase().includes("train"))
                TransportIcon = FaTrain;
              // Confetti burst only on selected
              const isSelected = selectedPlaceIdx === i;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl group transition-transform duration-300 ${
                    isSelected ? "z-10 scale-[1.01] shadow-2xl" : "scale-100"
                  } `}
                  aria-label={`Boarding pass from ${j.place} via ${j.transport}`}
                  tabIndex={0}
                  onClick={() => setSelectedPlaceIdx(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelectedPlaceIdx(i);
                  }}
                  role="button"
                >
                 
                  {/* Ticket shape */}
                  <div
                    className={`relative flex flex-col justify-between min-w-[120px] md:w-[200px] w-max border-2 ${
                      isSelected ? "border-[#8c78d7]" : "border-[#e1b9ff]"
                    } rounded-2xl px-3 py-2 shadow-lg transition-all duration-300 cursor-pointer boarding-pass`}
                    title={`Departing from ${j.place} via ${j.transport}`}
                  >

                    <span
                      className={`inline-block text-lgl transition-transform duration-300 ${
                        isSelected ? "animate-bounce-once" : ""
                      }`}
                      aria-label={j.transport}
                    >
                      <TransportIcon className="inline" />
                    </span>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-base md:text-2xl font-extrabold text-[#8c78d7] tracking-tight leading-tight">
                        {j.place}
                      </span>
                      <span className="text-base font-semibold text-[#003c3a]">
                        {j.price}
                      </span>
                      <span className="text-left text-xs text-gray-500 mt-1">
                        {j.duration}
                      </span>
                    </div>
                    {/* Confetti burst */}
                    {isSelected && (
                      <span className="absolute left-1/2 top-2 -translate-x-1/2 z-20 pointer-events-none">
                        <svg width="60" height="30">
                          <g>
                            <circle cx="10" cy="10" r="2" fill="#8c78d7">
                              <animate
                                attributeName="cy"
                                values="10;0;10"
                                dur="0.7s"
                                repeatCount="1"
                              />
                            </circle>
                            <circle cx="30" cy="8" r="2" fill="#e1b9ff">
                              <animate
                                attributeName="cy"
                                values="8;0;8"
                                dur="0.6s"
                                repeatCount="1"
                              />
                            </circle>
                            <circle cx="50" cy="12" r="2" fill="#003c3a">
                              <animate
                                attributeName="cy"
                                values="12;0;12"
                                dur="0.8s"
                                repeatCount="1"
                              />
                            </circle>
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Available Dates for selected place */}
        <section className="w-full mb-4">
          <h3 className="text-lg font-semibold text-[#8c78d7] mb-2 pl-3 flex items-center gap-2">
            <FaCalendarAlt className="text-[#8c78d7]" />
            Available Dates from {selectedPlace.place}
          </h3>
          <div className="flex flex-wrap gap-3 px-2">
            {trip.availableDates.map((date, index) => {
              // Format date as '10 Jul'
              const formatted = new Date(date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              });
              return (
                <span
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#e1b9ff] rounded-xl font-semibold shadow-md text-[#7c3aed] text-sm sm:text-base transition-all duration-200 hover:bg-[#e1b9ff] hover:text-[#003c3a] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8c78d7] cursor-pointer"
                  tabIndex={0}
                  aria-label={`Available on ${formatted}`}
                >
                  <FaCalendarAlt className="text-[#8c78d7]" />
                  {formatted}
                </span>
              );
            })}
          </div>
        </section>

        {/* Schedule Timeline - Modern Vertical Stacked Cards */}
        <section className="px-0 sm:px-0 py-6 sm:py-10 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003c3a] mb-8 border-l-4 border-[#003c3a] pl-3">
            Day-wise Itinerary
          </h2>
          <div className="flex flex-col gap-3 md:gap-10">
            {trip.schedule.map((s, i) => {
              // Pick an icon for the main activity (fallback to FaSuitcase)
              const activity = s.activities?.[0]?.toLowerCase() || "";
              let ActivityIcon = FaSuitcase;
              if (activity.includes("trek") || activity.includes("hiking")) ActivityIcon = FaHiking;
              else if (activity.includes("lake") || activity.includes("boating")) ActivityIcon = FaCamera;
              else if (activity.includes("temple")) ActivityIcon = FaLeaf;
              else if (activity.includes("market")) ActivityIcon = FaUtensils;
              else if (activity.includes("hotel")) ActivityIcon = FaBed;
              else if (activity.includes("adventure")) ActivityIcon = FaMountain;
              else if (activity.includes("hot springs")) ActivityIcon = FaSwimmingPool;
              return (
                <div
                  key={i}
                  className="w-full mx-auto bg-white rounded-3xl shadow-2xl flex flex-col px-6 py-6 md:px-10 md:py-10 relative transition-all duration-300"
                >
                  {/* Day and icon */}
                  <div className="flex items-center gap-2 md:gap-5 mb-2 md:mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e1b9ff] text-[#8c78d7] font-extrabold text-xl shadow-lg">
                      {s.day}
                    </span>
                    <span className="ml-2 text-base md:text-2xl font-bold text-[#8c78d7] uppercase tracking-wide">
                      {s.heading}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-gray-700 text-base md:text-lg mb-4 leading-relaxed">
                    {s.description}
                  </p>
                  {/* Meals */}
                  {s.meals && s.meals.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-3">
                      {s.meals.map((meal, mealIndex) => (
                        <span
                          key={mealIndex}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-green-100 text-green-800 rounded-full text-sm md:text-base font-semibold shadow"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Image gallery */}
                  {s.images && s.images.length > 0 && (
                    <div className="flex gap-4 mt-4 flex-wrap">
                      {s.images.map((img, j) => (
                        <Image
                          key={j}
                          src={img}
                          alt="schedule"
                          width={120}
                          height={80}
                          className="w-28 h-20 object-cover rounded-xl shadow border border-[#e1b9ff]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex gap-6 justify-center mb-6 pb-5">
          <a
            href="tel:8460146012"
            className="flex items-center gap-3 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition text-base"
          >
            <FaPhoneAlt />
            Call Now
          </a>
          <a
            href="https://wa.me/918460146012"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 px-6 py-2 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition text-base"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
          <a
            href={trip.brochure}
            download
            className="flex items-center gap-3 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition text-base"
          >
            <FaDownload />
            Download Brochure
          </a>
        </div>
      </div>
    </main>
  );
}
