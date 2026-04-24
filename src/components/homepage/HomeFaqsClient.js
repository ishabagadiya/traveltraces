"use client";

import React, { useState } from "react";

export default function HomeFaqsClient({ faqs }) {
  const [openFaqId, setOpenFaqId] = useState(faqs?.[0]?._id || null);

  const toggleFaq = (faqId) => {
    setOpenFaqId((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <section className="bg-[#dfdfdf] px-4 py-5 md:px-0 md:py-16">
      <div className="mx-auto w-full md:w-[90%]">
        <h2 className="mb-7 text-2xl font-bold text-secondary md:mb-10 md:text-4xl">FAQs</h2>

        <div className="border-y border-secondary/30">
          {faqs.map((faq, index) => {
            const isOpen = openFaqId === faq._id;
            const itemIndex = String(index + 1).padStart(2, "0");

            return (
              <div key={faq._id} className="border-b border-secondary/20 last:border-b-0">
                <div
                  onClick={() => toggleFaq(faq._id)}
                  className="grid cursor-pointer grid-cols-[56px_1fr_auto] items-start gap-3 px-3 py-4 md:grid-cols-[72px_1fr_auto] md:px-5"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleFaq(faq._id);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq._id}`}
                >
                  <span className="pt-1 font-mono text-[11px] text-gray-500 md:text-xs">[{itemIndex}]</span>

                  <div className="pr-2">
                    <p className="text-xs font-semibold leading-tight text-gray-900 sm:text-base">
                      {faq.question}
                    </p>
                    {isOpen ? (
                      <p
                        id={`faq-answer-${faq._id}`}
                        className="mt-2 max-w-3xl text-xs leading-relaxed text-gray-700 md:text-sm"
                      >
                        {faq.answer}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-start pt-1">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs transition-all ${
                        isOpen
                          ? "border-secondary bg-secondary text-white"
                          : "border-gray-400 text-gray-500"
                      }`}
                      aria-hidden
                    >
                      {isOpen ? "-" : "+"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
