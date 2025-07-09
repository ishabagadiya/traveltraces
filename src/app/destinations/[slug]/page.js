"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaClock, FaMountain, FaUserFriends, FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt, FaWhatsapp, FaPhoneAlt, FaDownload, FaSuitcase } from 'react-icons/fa';

// Mock data for demonstration
const trips = {
  saputara: {
    name: 'Saputara',
    images: ['/HeroImages/saputara.jpeg'],
    videos: [],
    description: "Gujarat's hill station with misty mountains and tribal culture",
    duration: '2 days',
    difficulty: 'Easy',
    ageAllowed: '10+',
    about: 'Saputara is a beautiful hill station in Gujarat, known for its cool climate and lush green forests.',
    highlights: [
      'Misty mountains & lush forests',
      'Saputara Lake & Sunset Point',
      'Local tribal culture',
      'Pleasant weather year-round'
    ],
    joinUsFrom: [
      { place: 'Mumbai', price: '₹4,500', duration: '2 days' },
      { place: 'Surat', price: '₹3,800', duration: '2 days' }
    ],
    availableDates: ['2024-07-10', '2024-07-24', '2024-08-05'],
    schedule: [
      { day: 1, heading: 'Arrival & Sightseeing', description: 'Arrive and explore Saputara Lake, Sunset Point.', images: ['/HeroImages/saputara.jpeg'] },
      { day: 2, heading: 'Trek & Return', description: 'Morning trek and return journey.', images: [] }
    ],
    brochure: '/brochures/saputara.pdf',
    thingsToCarry: ['Trekking shoes', 'Water bottle', 'Raincoat', 'ID proof']
  },
  // Add more trips here
};

export default function TripDetailsPage() {
  const params = useParams();
  const slug = params?.slug;
  const trip = trips[slug] || trips['saputara']; // fallback for demo

  return (
    <main className="max-w-6xl mx-auto py-0 md:py-8 px-0 md:px-6">
      {/* Hero Carousel */}
      <section className="relative w-full h-[320px] md:h-[420px] bg-gradient-to-br from-[#8c78d7] via-[#e1b9ff] to-[#7c3aed] rounded-b-3xl flex items-center justify-center overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0">
          <Image src={trip.images[0]} alt={trip.name} fill className="object-cover w-full h-full opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/80 via-[#e1b9ff]/40 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">{trip.name}</h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mb-4 max-w-2xl mx-auto">{trip.description}</p>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/80 text-[#7c3aed] rounded-full font-semibold shadow"><FaClock /> {trip.duration}</span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/80 text-[#a78bfa] rounded-full font-semibold shadow"><FaMountain /> {trip.difficulty}</span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/80 text-[#003c3a] rounded-full font-semibold shadow"><FaUserFriends /> Age {trip.ageAllowed}+</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {trip.availableDates.map((date, i) => (
              <span key={i} className="px-3 py-1 bg-[#e1b9ff] text-[#7c3aed] rounded-full font-semibold shadow">{date}</span>
            ))}
          </div>
        </div>
      </section>
      {/* Sticky CTA Buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-4 md:hidden">
        <a href="tel:8460146012" className="flex items-center gap-2 px-5 py-3 bg-[#7c3aed] text-white rounded-full font-bold shadow-lg hover:bg-[#8c78d7] transition"><FaPhoneAlt /> Call</a>
        <a href="https://wa.me/918460146012" target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition"><FaWhatsapp /> WhatsApp</a>
        <a href={trip.brochure} download className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition"><FaDownload /> Brochure</a>
      </div>
      {/* Main Content */}
      <div className="bg-white/90 rounded-3xl shadow-xl -mt-12 md:-mt-20 p-6 md:p-12 relative z-10">
        {/* About & Highlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-2">About</h2>
          <p className="text-gray-700 mb-4">{trip.about}</p>
          <h3 className="text-xl font-semibold text-[#8c78d7] mb-2">Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-6 text-gray-800">
            {trip.highlights?.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
        {/* Join Us From */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-2">Join Us From</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trip.joinUsFrom.map((j, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#e1b9ff]/40 rounded-xl p-4 shadow">
                <FaMapMarkerAlt className="text-[#7c3aed] text-xl" />
                <span className="font-semibold text-[#7c3aed]">{j.place}</span>
                <span className="text-[#8c78d7]">{j.price}</span>
                <span className="text-[#003c3a]">{j.duration}</span>
              </div>
            ))}
          </div>
        </section>
        {/* Schedule Timeline */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-4">Day-wise Schedule</h2>
          <ol className="relative border-l-4 border-[#e1b9ff] pl-6">
            {trip.schedule.map((s, i) => (
              <li key={i} className="mb-10 ml-4">
                <div className="absolute -left-6 top-2 w-8 h-8 bg-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold shadow-lg">{s.day}</div>
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="font-bold text-lg text-[#7c3aed] mb-1">{s.heading}</h3>
                  <p className="mb-2 text-gray-700">{s.description}</p>
                  <div className="flex gap-2">
                    {s.images.map((img, j) => (
                      <Image key={j} src={img} alt="schedule" width={96} height={64} className="w-24 h-16 object-cover rounded" />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
        {/* Things to Carry */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#7c3aed] mb-2">Things to Carry</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trip.thingsToCarry.map((item, i) => (
              <li key={i} className="flex items-center gap-2 bg-[#e1b9ff]/40 rounded-lg px-3 py-2 text-[#003c3a] font-medium"><FaSuitcase className="text-[#7c3aed]" /> {item}</li>
            ))}
          </ul>
        </section>
        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex gap-6 justify-center mt-8">
          <a href="tel:8460146012" className="flex items-center gap-2 px-8 py-4 bg-[#7c3aed] text-white rounded-full font-bold shadow-lg hover:bg-[#8c78d7] transition text-lg"><FaPhoneAlt /> Call Now</a>
          <a href="https://wa.me/918460146012" target="_blank" rel="noopener" className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-bold shadow-lg hover:bg-green-600 transition text-lg"><FaWhatsapp /> WhatsApp</a>
          <a href={trip.brochure} download className="flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition text-lg"><FaDownload /> Download Brochure</a>
        </div>
      </div>
    </main>
  );
} 