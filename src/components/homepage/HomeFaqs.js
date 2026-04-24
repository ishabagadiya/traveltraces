import { client } from "@/sanity/lib/client";
import HomeFaqsClient from "./HomeFaqsClient";

async function getFaqs() {
  try {
    const faqs = await client.fetch(
      `*[_type == "homepageFaq"] | order(_createdAt asc){
        _id,
        question,
        answer
      }`
    );
    return Array.isArray(faqs) ? faqs : [];
  } catch {
    return [];
  }
}

export default async function HomeFaqs() {
  const faqs = await getFaqs();

  if (!faqs.length) return null;

  return (
    <HomeFaqsClient faqs={faqs} />
  );
}
