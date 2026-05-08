import Destinations from "@/components/homepage/Destinations";
import MoreThanAVisit from "@/components/homepage/MoreThanAVisit";
import HomeOverlapSection from "@/components/homepage/HomeOverlapSection";
import NextGenReviews from "@/components/homepage/NextGenReviews";
import HomeFaqs from "@/components/homepage/HomeFaqs";
import StyleShowcaseSection from "@/components/homepage/StyleShowcaseSection";

export const metadata = {
  title: "TravelTraces | Curated Trips and Experiences",
  description:
    "Discover curated destinations, unique travel stories, and trusted trip experiences with TravelTraces.",
};

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <Destinations />
      <MoreThanAVisit />
      <HomeOverlapSection />
      <NextGenReviews sectionTitle="Traveler Reviews" />
      <StyleShowcaseSection />
      <HomeFaqs />
    </div>
  );
}
