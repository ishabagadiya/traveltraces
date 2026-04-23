import NextGenReviews from "@/components/homepage/NextGenReviews";
import ReviewsCta from "@/components/reviews/ReviewsCta";
import WhyChooseTravelTraces from "@/components/reviews/WhyChooseTravelTraces";

export const metadata = {
  title: "Reviews | TravelTraces",
  description: "Read real traveler reviews and experiences with TravelTraces.",
};

export default function ReviewsPage() {
  return (
    <div className="w-full overflow-hidden">
      <ReviewsCta />
      <NextGenReviews maxReviews={null} sectionTitle=" " />
      <WhyChooseTravelTraces />
    </div>
  );
}
