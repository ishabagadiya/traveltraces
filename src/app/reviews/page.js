import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NextGenReviews from "@/components/NextGenReviews";

export default function ReviewsPage() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <NextGenReviews maxReviews={null} sectionTitle="Client reviews" />
      <Footer />
    </div>
  );
}
