"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Destinations from "@/components/Destinations";
import MoreThanAVisit from "@/components/MoreThanAVisit";
import NextGenReviews from "@/components/NextGenReviews";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <Destinations />
      <MoreThanAVisit />
      <NextGenReviews />
      <CallToAction />
      <FAQ />
      <Footer />
    </div>
  );
}
