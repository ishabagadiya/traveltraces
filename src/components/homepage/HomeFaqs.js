import { client } from "@/sanity/lib/client";

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
    <section className="bg-[#dfdfdf] px-4 py-5 md:px-0 md:py-16">
      <div className="mx-auto w-full md:w-[90%]">
        <h2 className="mb-7 text-2xl font-bold text-secondary md:mb-10 md:text-4xl">FAQs</h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq._id}
              className="group rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4"
            >
              <summary className="relative cursor-pointer list-none pr-8 text-xs sm:text-base font-semibold text-gray-900 marker:content-['']">
                {faq.question}
                <span
                  aria-hidden
                  className="absolute right-5 mt-0.5 text-xl leading-none text-gray-500 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-gray-700 md:text-base w-[90%] mr-auto">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
