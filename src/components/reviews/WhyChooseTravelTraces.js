"use client";

import Image from "next/image";
import starIcon from "@/assets/whytraveltraces/star.svg";
import smileIcon from "@/assets/whytraveltraces/smile.svg";
import heartIcon from "@/assets/whytraveltraces/heart.svg";
import supportIcon from "@/assets/whytraveltraces/support.svg";

const features = [
  {
    title: "Best Experiences",
    description: "We work with local experts to create high-quality, customized adventures just for you.",
    icon: starIcon,
  },
  {
    title: "Happy Travellers",
    description: "Our travellers trust us for exceptional experiences. Check out their positive reviews.",
    icon: smileIcon,
  },
  {
    title: "Personalised Trips",
    description: "Your trip is designed to match your unique interests and preferences.",
    icon: heartIcon,
  },
  {
    title: "24/7 Support",
    description: "Our team is always here to help, ensuring a smooth journey every step of the way.",
    icon: supportIcon,
  },
];

export default function WhyChooseTravelTraces() {
  return (
    <section className="bg-[#dfdfdf] px-4 pb-16 md:px-8">
      <div className="mx-auto w-full md:w-[90%] border-t-2 border-[#0000001d] pt-10">
        <h2 className="mb-8 text-xl md:text-2xl font-bold text-secondary">Why Choose TravelTraces?</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            return (
              <article key={feature.title} className="flex flex-row sm:flex-col gap-6 w-full">
                <div className="h-12 w-12 md:h-20 md:w-20 items-center justify-center">
                  <Image src={feature.icon} alt="" className="h-12 w-12 md:h-20 md:w-20" />
                </div>
                <div className="flex flex-col justify-center gap-0.5 md:gap-2 w-full">
                  <h3 className="text-sm md:text-lg font-extrabold text-black w-full">{feature.title}</h3>
                  <p className="text-xs md:text-sm leading-relaxed text-black/80 w-full">{feature.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
