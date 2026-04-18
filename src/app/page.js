"use client";

import Header from "../components/Header";
import Destinations from "@/components/Destinations";
import MoreThanAVisit from "@/components/MoreThanAVisit";
import HomeOverlapSection from "@/components/HomeOverlapSection";
import NextGenReviews from "@/components/NextGenReviews";
import ContactSocialBanner from "@/components/ContactSocialBanner";
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
