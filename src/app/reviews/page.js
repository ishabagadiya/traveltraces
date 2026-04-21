import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextGenReviews from "@/components/homepage/NextGenReviews";
import WhyChooseTravelTraces from "@/components/reviews/WhyChooseTravelTraces";
import ContactSocialBanner from "@/components/homepage/ContactSocialBanner";

export default function ReviewsPage() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <NextGenReviews maxReviews={null} sectionTitle="Traveler reviews" />
      <WhyChooseTravelTraces />
      <ContactSocialBanner />
      <Footer />
    </div>
  );
}
