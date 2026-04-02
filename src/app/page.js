// "use client";
// import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Destinations from "@/components/Destinations";
// import MoreThanAVisit from "@/components/MoreThanAVisit";
// import NextGenReviews from "@/components/NextGenReviews";
// import CallToAction from "@/components/CallToAction";
// import FAQ from "@/components/FAQ";
// import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <div className="w-full overflow-hidden">
//       <Header />
//       <Destinations />
//       <MoreThanAVisit />
//       <NextGenReviews />
//       <CallToAction />
//       <FAQ />
//       <Footer />
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Header from "../components/Header";
// import DestinationHero from "@/components/DestinationHero";
// import DestinationsHorizontal from "@/components/DestinationsHorizontal";
// import MoreThanAVisit from "@/components/MoreThanAVisit";
// import NextGenReviews from "@/components/NextGenReviews";
// import CallToAction from "@/components/CallToAction";
// import FAQ from "@/components/FAQ";
// import Footer from "@/components/Footer";
// import { client } from "@/sanity/lib/client";

// export default function Home() {
//   const [destinations, setDestinations] = useState([]);

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type == "destination"] | order(_createdAt asc){
//           _id, name, tagline, location, slug, image
//         }`
//       )
//       .then((data) => setDestinations(data));
//   }, []);

//   return (
//     <div className="w-full overflow-hidden">
//       <Header />

//       {/* Hero Slider */}
//       <DestinationHero destinations={destinations} />

//       {/* Horizontal Destination Carousel */}
//       <DestinationsHorizontal destinations={destinations} />

//       <MoreThanAVisit />
//       <NextGenReviews />
//       <CallToAction />
//       <FAQ />
//       <Footer />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import DestinationHero from "@/components/DestinationHero";
// import DestinationsHorizontal from "@/components/DestinationsHorizontal";
import MoreThanAVisit from "@/components/MoreThanAVisit";
import NextGenReviews from "@/components/NextGenReviews";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

import IntroIcons from './../components/IntroIcons';

export default function Home() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "destination"] | order(_createdAt asc){
          _id, name, tagline, location, slug, image, category, duration
        }`
      )
      .then((data) => setDestinations(data));
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-50">
      <Header />
      <IntroIcons />

      {/* Full-screen Hero Slider */}
      <DestinationHero destinations={destinations} />

      {/* Optional horizontal featured destinations
      {destinations.length > 0 && (
        <DestinationsHorizontal destinations={destinations} />
      )} */}

      {/* Other sections */}
      <MoreThanAVisit />
      <NextGenReviews />
      <CallToAction />
      <FAQ />
      <Footer />
    </div>
  );
}