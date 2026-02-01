"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    question: "How do I book a trip?",
    answer: "Booking is super easy! Just browse our destinations, pick your favorite trip, select your dates, and complete the payment. You'll receive a confirmation email with all the details within 24 hours."
  },
  {
    question: "What's included in the trip package?",
    answer: "Our packages typically include accommodation, transportation, meals (as specified), guided tours, and most activities. Check each trip's detailed itinerary for specific inclusions. Travel insurance and personal expenses are usually not included."
  },
  {
    question: "Can I customize my trip?",
    answer: "Absolutely! We love creating personalized experiences. Contact us with your preferences, and we'll work together to tailor the trip to your interests, budget, and travel style."
  },
  {
    question: "What's your cancellation policy?",
    answer: "We offer flexible cancellation options. Cancellations made 30+ days before departure get a full refund (minus processing fees). 15-30 days before: 70% refund. 7-15 days: 50% refund. Less than 7 days: no refund. Check our detailed policy page for complete terms."
  },
  {
    question: "Do I need travel insurance?",
    answer: "While not mandatory, we highly recommend travel insurance for all trips. It covers medical emergencies, trip cancellations, lost baggage, and other unexpected situations. We can help you find the right insurance plan."
  },
  {
    question: "What if I'm traveling solo?",
    answer: "Solo travel is awesome! Many of our trips are perfect for solo travelers. You'll meet like-minded adventurers and make new friends. Some trips have single supplement options for private rooms, or you can share with a roommate."
  },
  {
    question: "How fit do I need to be?",
    answer: "We offer trips for all fitness levels! Each trip has a difficulty rating (Easy, Moderate, Challenging). Easy trips are suitable for everyone, while challenging ones may require good fitness. Check the trip details for specific requirements."
  },
  {
    question: "What should I pack?",
    answer: "We'll send you a detailed packing list after booking, tailored to your specific trip. Generally, pack comfortable clothes, good walking shoes, weather-appropriate gear, and don't forget your camera for those epic moments!"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Left Aligned */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20 mb-4">
            <span className="text-secondary text-xs font-bold uppercase tracking-wider">faq</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary mb-3 tracking-tight leading-tight">
            questions? <br />
            <span className="text-secondary/80">we've got answers</span>
          </h2>
          <p className="text-secondary/70 text-base sm:text-lg max-w-xl">
            everything you need to know about traveling with us
          </p>
        </div>

        {/* Split Layout - Questions Left, Answer Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
          {/* Left Side - Questions List */}
          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <button
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                  openIndex === index
                    ? "bg-secondary text-white border-secondary shadow-lg"
                    : "bg-white border-secondary/10 hover:border-secondary/30 hover:bg-secondary/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors ${
                    openIndex === index
                      ? "bg-white/20 text-white"
                      : "bg-secondary/10 text-secondary"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                      openIndex === index ? "text-white" : "text-secondary"
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Side - Answer Display */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-3xl p-6 sm:p-8 border-2 border-secondary/20 min-h-[300px] flex items-center">
              {openIndex !== null ? (
                <div className="w-full">
                  <div className="inline-flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-full mb-4">
                    <span className="text-secondary text-xs font-bold uppercase tracking-wider">answer</span>
                  </div>
                  <p className="text-secondary text-base sm:text-lg leading-relaxed">
                    {faqData[openIndex].answer}
                  </p>
                </div>
              ) : (
                <div className="w-full text-center">
                  <div className="inline-flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-full mb-4">
                    <span className="text-secondary text-xs font-bold uppercase tracking-wider">select a question</span>
                  </div>
                  <p className="text-secondary/50 text-base">
                    Click on any question to see the answer here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Still have questions CTA - Modern Style */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-secondary/10 shadow-lg">
          <div className="text-center">
            <p className="text-secondary/70 text-sm sm:text-base mb-4">
              still have questions?
            </p>
            <a
              href="mailto:contact@traveltraces.in"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              drop us a line
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
