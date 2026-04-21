"use client";

import Header from "../components/Header";
import Destinations from "@/components/homepage/Destinations";
import MoreThanAVisit from "@/components/homepage/MoreThanAVisit";
import HomeOverlapSection from "@/components/homepage/HomeOverlapSection";
import NextGenReviews from "@/components/homepage/NextGenReviews";
import ContactSocialBanner from "@/components/homepage/ContactSocialBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <Destinations />
      <MoreThanAVisit />
      <HomeOverlapSection />
      <NextGenReviews />
      <ContactSocialBanner />
      <Footer />
    </div>
  );
}
