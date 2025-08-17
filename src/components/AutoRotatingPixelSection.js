"use client";
import { useEffect, useState } from 'react';
import PixelTransition from './PixelTransition';

const destinations = [
  {
    id: 1,
    name: "Kedarnath",
    location: "Uttarakhand, India",
    firstContent: (
      <div className="w-full h-full">
        <img 
          src="/HeroImages/kedarnath.jpeg" 
          alt="Kedarnath"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    secondContent: (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Kedarnath</h3>
          <p className="text-sm text-white/80">Uttarakhand, India</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: "Manali",
    location: "Himachal Pradesh, India",
    firstContent: (
      <div className="w-full h-full">
        <img 
          src="/HeroImages/manali.jpeg" 
          alt="Manali"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    secondContent: (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Manali</h3>
          <p className="text-sm text-white/80">Himachal Pradesh, India</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: "Matheran",
    location: "Maharashtra, India",
    firstContent: (
      <div className="w-full h-full">
        <img 
          src="/HeroImages/matheran.jpeg" 
          alt="Matheran"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    secondContent: (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Matheran</h3>
          <p className="text-sm text-white/80">Maharashtra, India</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Saputara",
    location: "Gujarat, India",
    firstContent: (
      <div className="w-full h-full">
        <img 
          src="/HeroImages/saputara.jpeg" 
          alt="Saputara"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    secondContent: (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Saputara</h3>
          <p className="text-sm text-white/80">Gujarat, India</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Andharban",
    location: "Maharashtra, India",
    firstContent: (
      <div className="w-full h-full">
        <img 
          src="/HeroImages/andharban.jpeg" 
          alt="Andharban"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    secondContent: (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Andharban</h3>
          <p className="text-sm text-white/80">Maharashtra, India</p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    name: "Kedarnath",
    location: "Uttarakhand, India",
    firstContent: (
      <div className="w-full h-full">
        <img 
          src="/HeroImages/kedarnath.jpeg" 
          alt="Kedarnath"
          className="w-full h-full object-cover"
        />
      </div>
    ),
    secondContent: (
      <div className="w-full h-full flex items-center justify-center bg-secondary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Kedarnath</h3>
          <p className="text-sm text-white/80">Uttarakhand, India</p>
        </div>
      </div>
    )
  }
];

export default function AutoRotatingPixelSection() {
  const [activeCards, setActiveCards] = useState(new Set());

  useEffect(() => {
    const triggerRandomAnimation = () => {
      const randomIndex = Math.floor(Math.random() * destinations.length);
      setActiveCards(prev => {
        const newSet = new Set(prev);
        newSet.add(randomIndex);
        return newSet;
      });

      // Remove the card from active set after animation
      setTimeout(() => {
        setActiveCards(prev => {
          const newSet = new Set(prev);
          newSet.delete(randomIndex);
          return newSet;
        });
      }, 2000); // Animation duration + buffer
    };

    // Trigger animation every 1-3 seconds randomly
    const interval = setInterval(() => {
      triggerRandomAnimation();
    }, Math.random() * 2000 + 1000); // Random interval between 1-3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#271E37] mb-4">
            Explore Our Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the magic of pixel-perfect transitions as we showcase our most popular travel destinations
          </p>
        </div>

        {/* Auto-scrolling Cards Row */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className="flex-shrink-0 w-[300px]"
              >
                <PixelTransition
                  firstContent={destination.firstContent}
                  secondContent={destination.secondContent}
                  gridSize={8}
                  animationStepDuration={0.4}
                  pixelColor="#271E37"
                  className="mx-auto"
                  isActive={activeCards.has(index)}
                />
              </div>
            ))}
            {/* Duplicate cards for seamless loop */}
            {destinations.map((destination, index) => (
              <div
                key={`duplicate-${destination.id}`}
                className="flex-shrink-0 w-[300px]"
              >
                <PixelTransition
                  firstContent={destination.firstContent}
                  secondContent={destination.secondContent}
                  gridSize={8}
                  animationStepDuration={0.4}
                  pixelColor="#271E37"
                  className="mx-auto"
                  isActive={activeCards.has(index)}
                />
              </div>
            ))}
          </div>
        </div>



        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ready to experience these destinations in person?
          </p>
          <button className="bg-[#271E37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1a1428] transition-colors duration-200">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
} 