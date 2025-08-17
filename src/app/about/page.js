"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import FounderCard from "@/components/FounderCard";
import VisionMissionCard from "@/components/VisionMissionCard";
import ContentSection from "@/components/ContentSection";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <Header />
      {/* Hero Section */}
      <section className="relative my-12 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative z-10 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-secondary mb-3 leading-tight">
              About Us
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
            <p className="max-w-[90%] mx-auto text-sm sm:text-xl text-secondary/80 mb-8 leading-relaxed">
              At Travel Traces, we don't just organize trips — we curate
              experiences that leave a lasting trace in your heart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">
                  Founded by young explorers
                </span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse animation-delay-800"></div>
                <span className="text-xs font-medium">
                  Soulful Travel Experiences for everyone
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Founders Who Lead From the Front"
            subtitle="Together, they are not just founders—they are fellow travelers, friends, and curators of memories."
          />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <FounderCard
              photo="/yash.png"
              name="Yash Saksena"
              role="The Visionary Explorer"
              description="With an instinct for storytelling and a heart that beats for the mountains, Yash crafts each Travel Traces journey to be deeply personal. His passion for offbeat India and connecting people with purpose ensures every trip is designed to feel intimate and immersive."
            />
            <FounderCard
              photo="/prithvi.png"
              name="Prithvi Gurjar"
              role="The Grounded Strategist"
              description="Behind every seamless trip is Prithvi, the man with a map and a plan. Calm, calculated, and quietly reliable, he handles everything from logistics to safety, making sure every traveler feels secure, seen, and supported."
            />
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <ContentSection
        title="🧭 Our Journey"
        content={[
          "Yash and Prithvi, wanderers at heart, spent years exploring India's untouched trails — not just to check off destinations, but to truly understand what makes travel feel magical.",
          "From sipping chai with locals in Spiti to singing under starlit skies in Pawna, they learned that the best journeys are the ones shared. And so, Travel Traces was born: a travel company that feels like family, where strangers become friends, and every journey is a celebration of life."
        ]}
      />

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <VisionMissionCard
              icon="🌐"
              title="Our Vision"
              content="To become India's most trusted, community-first travel brand—where every trip feels like traveling with friends, and every destination becomes a chapter in your life story."
            />
            <VisionMissionCard
              icon="🎯"
              title="Our Mission"
              isList={true}
              content={[
                { icon: "🌍", text: "To curate authentic and affordable travel experiences in India's most scenic and soulful corners" },
                { icon: "🤝", text: "To build a safe and inclusive space for solo travelers, especially women and first-time explorers" },
                { icon: "🌱", text: "To promote responsible, sustainable tourism that uplifts local communities" },
                { icon: "📸", text: "To create memories, not just itineraries—through stories, sunsets, and shared laughter" }
              ]}
            />
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="💼 What Makes Travel Traces Unique?"
            subtitle="We're not just another travel company. Here's what sets us apart."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👥",
                title: "Community-Focused",
                desc: "You won't feel like a customer—you'll feel like part of the gang",
              },
              {
                icon: "🏞",
                title: "Offbeat, Immersive Itineraries",
                desc: "Real places, real people, real stories—not tourist traps",
              },
              {
                icon: "🛡",
                title: "Safety-First Operations",
                desc: "Verified stays, expert trip leads, 24/7 support",
              },
              {
                icon: "🚐",
                title: "Hassle-Free Planning",
                desc: "From transport to trekking permits—we handle it all",
              },
              {
                icon: "📷",
                title: "Candid, Soulful Experiences",
                desc: "Unscripted moments. Raw emotions. No filters needed.",
              },
            ].map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="🧭 Experiences We Offer"
            subtitle="All our trips are led by trained leaders, coordinated with local experts, and crafted with love."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🏔",
                title: "Himalayan Treks",
                desc: "Kedarkantha, Valley of Flowers, Chopta-Tungnath, Har Ki Dun",
              },
              {
                icon: "🌧",
                title: "Monsoon Treks & Fort Adventures",
                desc: "Andharban, Korigad, Rajmachi, Pawna camping",
              },
              {
                icon: "🏖",
                title: "Weekend Escapes",
                desc: "Matheran, Mahabaleshwar, Diu, Saputara, Lonavala",
              },
              {
                icon: "🛕",
                title: "Spiritual Journeys",
                desc: "Kedarnath, Badrinath, Chardham, Kashi, Ayodhya",
              },
              {
                icon: "🏕",
                title: "Custom Group Trips",
                desc: "Student tours, corporate offsites, travel club collaborations",
              },
            ].map((experience, index) => (
              <FeatureCard
                key={index}
                icon={experience.icon}
                title={experience.title}
                desc={experience.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="🙌 The Travel Traces Family"
            subtitle="Behind every adventure is a tight-knit team of passionate travelers who believe in creating meaningful experiences."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👥",
                title: "Trip Coordinators",
                desc: "Trained in safety, fun, and emotional intelligence",
              },
              {
                icon: "🤝",
                title: "Local Collaborators",
                desc: "From mountain guides to café owners, we support local",
              },
              {
                icon: "⚡",
                title: "Operations Support",
                desc: "Available before, during, and after your trip for anything you need",
              },
            ].map((member, index) => (
              <FeatureCard
                key={index}
                icon={member.icon}
                title={member.title}
                desc={member.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Travel With Heart Section */}
      <ContentSection
        title="📷 Travel With Heart (And A Lot of Fun)"
        content={[
          "From bonfire jam sessions to midnight treks, from sharing stories under the stars to group dances by waterfalls—our journeys are filled with moments that feel more real than any picture.",
          "And yes—your best travel photos and videos? We've got those covered too."
        ]}
        bgColor="bg-secondary/5"
      />

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-secondary to-secondary/90 rounded-3xl p-8 sm:p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              📞 Ready to Trace Your Next Story?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8">
              Let's create something unforgettable together. Whether you're
              coming solo or with friends, you'll leave with memories, not just
              souvenirs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-secondary transition-all duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
