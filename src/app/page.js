"use client"
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AnimatedBackground from '../components/AnimatedBackground';
import Destinations from '@/components/Destinations';
import MoreThanAVisit from '@/components/MoreThanAVisit';
import NextGenReviews from '@/components/NextGenReviews';
import CallToAction from '@/components/CallToAction';
import FAQ from '@/components/FAQ';

export default function Home() {
  const [showDestinations, setShowDestinations] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const destinationsTimer = setTimeout(() => setShowDestinations(true), 800);
    const headerTimer = setTimeout(() => setShowHeader(true), 1600);
    return () => {
      clearTimeout(headerTimer);
      clearTimeout(destinationsTimer);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="opacity-0 animate-fade-in-fast animation-delay-0">
          <AnimatedBackground />
        </div>
        {showHeader && (
          <div className="absolute top-0 left-0 w-full z-50 opacity-0 animate-slide-down-fast animation-delay-1600">
            <Header />
          </div>
        )}
        {showDestinations && (
          <div className="opacity-0 animate-slide-in-br-fast animation-delay-800">
            <Destinations />
          </div>
        )}

      </div>
      {/* Other sections below, not affected by AnimatedBackground */}
      <MoreThanAVisit />
      <NextGenReviews />
      <CallToAction />
      <FAQ />
    </div>
  );
}
