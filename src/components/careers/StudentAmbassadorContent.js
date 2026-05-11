import Image from "next/image";
import careerHero from "@/assets/career.png";
import { urlFor } from "@/sanity/lib/image";

const benefits = [
  "Free / discounted trips",
  "Commission on bookings",
  "Networking opportunities",
  "Skill development",
];

const keyResponsibilities = [
  "Promote travel packages among your college network",
  "Create engaging content (Reels, Posts, Stories)",
  "Encourage group participation",
  "Help grow the TravelTraces community.",
];

const ambassadorTerms = [
  "Ambassadors must maintain professional and respectful behavior while representing TravelTraces.",
  "All promotions and communication should be genuine, accurate, and not misleading.",
  "Rewards, commissions, and incentives are applicable only on successful and verified bookings.",
  "TravelTraces reserves the right to modify packages, benefits, or program structure.",
  "Misuse of the brand name, false commitments, or misconduct may lead to immediate removal from the program.",
  "This program is voluntary and does not constitute full-time or part-time employment.",
  "Ambassadors are expected to actively participate in promotions and content creation.",
  "During trips, ambassadors must follow all safety guidelines, rules, and instructions provided by the TravelTraces team.",
  "Any disputes will be handled at the discretion of the TravelTraces management.",
];

export default function StudentAmbassadorContent({ heroImage }) {
  const heroImageSrc = heroImage
    ? urlFor(heroImage).width(1920).height(800).quality(85).url()
    : careerHero;
  const heroImageAlt = heroImage?.alt || "Be an Awara";

  return (
    <main className="w-full bg-[#dfdfdf]">
      <div
        className="relative w-full h-[500px] overflow-hidden"
      >
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full"
        />
      </div>

      <section className="w-full sm:w-[90%] mx-auto px-4 py-6 sm:px-0 sm:py-6">
        <div className="sm:mt-10 mt-6 grid grid-cols-1 items-end md:grid-cols-12 gap-4 sm:gap-6">
          <div className="flex flex-col gap-2 sm:gap-6 col-span-5">
            <h2 className="text-base md:text-xl font-extrabold text-secondary sm:text-nowrap">Your Role as a Student Ambassador</h2>
            <p className="text-sm lg:text-base leading-relaxed text-gray-800">
              As a Student Ambassador, you represent TravelTraces on your campus
              promoting trips, creating content, and building a travel community.
              <br />
              Flexible commitment that fits around your studies, with rewards tied
              to verified bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 col-span-7">
            {benefits.map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 rounded-xl border border-black/20 px-5 md:px-3 lg:px-5 py-3 text-sm lg:text-base text-gray-600"
              >
                <span
                  aria-hidden="true"
                  className="text-secondary"
                >
                  ✓
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="sm:mt-10 mt-6 rounded-2xl bg-[#0b1220] px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14">
          <div className="flex flex-col">
            <p className="text-xs font-medium uppercase tracking-wider text-white/50">
              What you&apos;ll drive
            </p>
            <h2 className="mt-1 text-base md:text-xl font-extrabold text-white">
              Your Key{" "}
              <span className="text-cyan-400">Responsibilities</span>
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {keyResponsibilities.map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-xl border border-white/15 px-5 py-4 text-sm lg:text-base"
              >
                <span className="text-white/40">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-white/90">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:mt-12 mt-6">
          <h2 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            Bring Your Instincts.{" "}
            <span className="text-cyan-500">We&apos;ll Fuel Your Momentum.</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-black/15 px-6 py-6 md:col-span-2">
              <h3 className="text-sm font-bold text-gray-900">
                Terms &amp; Conditions
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
                {ambassadorTerms.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="self-start rounded-2xl bg-[#0b1220] px-6 py-6 text-white">
              <h3 className="text-base font-bold">Ready to apply?</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Send your details, socials, and a note about why you&apos;d be a
                great fit for TravelTraces.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="mailto:traveltraces2@gmail.com?subject=Application%20%E2%80%93%20Student%20Ambassador"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                >
                  Apply via email
                </a>
                <a
                  href="https://wa.me/918460146012?text=Hi%20TravelTraces%2C%20I%27d%20like%20to%20apply%20for%20the%20Student%20Ambassador%20program."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                >
                  Apply via WhatsApp
                </a>
                <a
                  href="tel:+918460146012"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
