import StudentAmbassadorContent from "@/components/careers/StudentAmbassadorContent";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Student Ambassador Program | TravelTraces",
  description:
    "Become a TravelTraces Student Ambassador: benefits, responsibilities, and terms for representing TravelTraces on your campus.",
};

export default async function CareersPage() {
  const careerPage = await client.fetch(
    `*[_type == "careerPage" && isActive == true] | order(_updatedAt desc)[0]{
      heroImage
    }`
  );

  return <StudentAmbassadorContent heroImage={careerPage?.heroImage} />;
}
