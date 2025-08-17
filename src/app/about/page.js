"use client";
import { useEffect, useState } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full overflow-hidden">      
      {/* Hero Section */}
      <section className="relative my-12 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">        
        <div className="relative z-10 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              About Us
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
            <p className="max-w-[90%] mx-auto text-sm sm:text-xl text-secondary/80 mb-8 leading-relaxed">
              At Travel Traces, we don't just organize trips—we curate experiences that leave a lasting trace in your heart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Founded by young explorers</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse animation-delay-800"></div>
                <span className="text-sm font-medium">Soulful Travel Experiences for everyone</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              👥 Founders Who Lead From the Front
            </h2>
            <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
              Together, they are not just founders—they are fellow travelers, friends, and curators of memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Yash Saksena */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Yash Saksena</h3>
                <p className="text-secondary/60 font-medium">The Visionary Explorer</p>
              </div>
              <p className="text-secondary/80 leading-relaxed">
                With an instinct for storytelling and a heart that beats for the mountains, Yash crafts each Travel Traces journey to be deeply personal. His passion for offbeat India and connecting people with purpose ensures every trip is designed to feel intimate and immersive.
              </p>
            </div>

            {/* Prithvi Gurjar */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🧭</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Prithvi Gurjar</h3>
                <p className="text-secondary/60 font-medium">The Grounded Strategist</p>
              </div>
              <p className="text-secondary/80 leading-relaxed">
                Behind every seamless trip is Prithvi, the man with a map and a plan. Calm, calculated, and quietly reliable, he handles everything from logistics to safety, making sure every traveler feels secure, seen, and supported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
              🧭 Our Journey
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl p-8 sm:p-12 border border-secondary/10">
            <p className="text-lg sm:text-xl text-secondary/80 leading-relaxed mb-6">
              Yash and Prithvi, wanderers at heart, spent years exploring India's untouched trails — not just to check off destinations, but to truly understand what makes travel feel magical.
            </p>
            <p className="text-lg sm:text-xl text-secondary/80 leading-relaxed">
              From sipping chai with locals in Spiti to singing under starlit skies in Pawna, they learned that the best journeys are the ones shared. And so, Travel Traces was born: a travel company that feels like family, where strangers become friends, and every journey is a celebration of life.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary/10 h-full">
                <div className="w-20 h-20 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                <p className="text-secondary/80 leading-relaxed">
                  To become India's most trusted, community-first travel brand—where every trip feels like traveling with friends, and every destination becomes a chapter in your life story.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-secondary/10 h-full">
                <div className="w-20 h-20 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                <ul className="text-secondary/80 leading-relaxed space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">🌍</span>
                    <span>To curate authentic and affordable travel experiences in India's most scenic and soulful corners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">🤝</span>
                    <span>To build a safe and inclusive space for solo travelers, especially women and first-time explorers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">🌱</span>
                    <span>To promote responsible, sustainable tourism that uplifts local communities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary mt-1">📸</span>
                    <span>To create memories, not just itineraries—through stories, sunsets, and shared laughter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              💼 What Makes Travel Traces Unique?
            </h2>
            <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
              We're not just another travel company. Here's what sets us apart.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👥", title: "Community-Focused", desc: "You won't feel like a customer—you'll feel like part of the gang" },
              { icon: "🏞", title: "Offbeat, Immersive Itineraries", desc: "Real places, real people, real stories—not tourist traps" },
              { icon: "🛡", title: "Safety-First Operations", desc: "Verified stays, expert trip leads, 24/7 support" },
              { icon: "🚐", title: "Hassle-Free Planning", desc: "From transport to trekking permits—we handle it all" },
              { icon: "📷", title: "Candid, Soulful Experiences", desc: "Unscripted moments. Raw emotions. No filters needed." }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-secondary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-secondary/70 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              🧭 Experiences We Offer
            </h2>
            <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
              All our trips are led by trained leaders, coordinated with local experts, and crafted with love.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏔", title: "Himalayan Treks", desc: "Kedarkantha, Valley of Flowers, Chopta-Tungnath, Har Ki Dun" },
              { icon: "🌧", title: "Monsoon Treks & Fort Adventures", desc: "Andharban, Korigad, Rajmachi, Pawna camping" },
              { icon: "🏖", title: "Weekend Escapes", desc: "Matheran, Mahabaleshwar, Diu, Saputara, Lonavala" },
              { icon: "🛕", title: "Spiritual Journeys", desc: "Kedarnath, Badrinath, Chardham, Kashi, Ayodhya" },
              { icon: "🏕", title: "Custom Group Trips", desc: "Student tours, corporate offsites, travel club collaborations" }
            ].map((experience, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-secondary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{experience.icon}</div>
                <h3 className="text-lg font-bold text-secondary mb-3">{experience.title}</h3>
                <p className="text-secondary/70 text-sm leading-relaxed">{experience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              🙌 The Travel Traces Family
            </h2>
            <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
              Behind every adventure is a tight-knit team of passionate travelers who believe in creating meaningful experiences.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👥", title: "Trip Coordinators", desc: "Trained in safety, fun, and emotional intelligence" },
              { icon: "🤝", title: "Local Collaborators", desc: "From mountain guides to café owners, we support local" },
              { icon: "⚡", title: "Operations Support", desc: "Available before, during, and after your trip for anything you need" }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-secondary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{member.icon}</div>
                <h3 className="text-lg font-bold text-secondary mb-3">{member.title}</h3>
                <p className="text-secondary/70 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel With Heart Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
              📷 Travel With Heart (And A Lot of Fun)
            </h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl p-8 sm:p-12 border border-secondary/10">
            <p className="text-lg sm:text-xl text-secondary/80 leading-relaxed mb-6">
              From bonfire jam sessions to midnight treks, from sharing stories under the stars to group dances by waterfalls—our journeys are filled with moments that feel more real than any picture.
            </p>
            <p className="text-lg sm:text-xl text-secondary/80 leading-relaxed">
              And yes—your best travel photos and videos? We've got those covered too.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-secondary to-secondary/90 rounded-3xl p-8 sm:p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              📞 Ready to Trace Your Next Story?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8">
              Let's create something unforgettable together. Whether you're coming solo or with friends, you'll leave with memories, not just souvenirs.
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
    </div>
  );
}
