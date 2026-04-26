import Image from "next/image";
import instagramIcon from "@/assets/social icons/instagram.png";

export default function AboutPageContent() {
  const scallopMaskStyle = {
    maskImage:
      "radial-gradient(15.24px at 50% 21.5px, rgb(0, 0, 0) 99%, rgba(0, 0, 0, 0) 101%), radial-gradient(15.24px at 50% -11.5px, rgba(0, 0, 0, 0) 99%, rgb(0, 0, 0) 101%), radial-gradient(15.24px at 50% calc(100% - 21.5px), rgb(0, 0, 0) 99%, rgba(0, 0, 0, 0) 101%), radial-gradient(15.24px at 50% calc(100% + 11.5px), rgba(0, 0, 0, 0) 99%, rgb(0, 0, 0) 101%)",
    WebkitMaskImage:
      "radial-gradient(15.24px at 50% 21.5px, rgb(0, 0, 0) 99%, rgba(0, 0, 0, 0) 101%), radial-gradient(15.24px at 50% -11.5px, rgba(0, 0, 0, 0) 99%, rgb(0, 0, 0) 101%), radial-gradient(15.24px at 50% calc(100% - 21.5px), rgb(0, 0, 0) 99%, rgba(0, 0, 0, 0) 101%), radial-gradient(15.24px at 50% calc(100% + 11.5px), rgba(0, 0, 0, 0) 99%, rgb(0, 0, 0) 101%)",
    maskPosition:
      "calc(50% - 20px) 0px, 50% 10px, calc(50% - 20px) 100%, 50% calc(100% - 10px)",
    WebkitMaskPosition:
      "calc(50% - 20px) 0px, 50% 10px, calc(50% - 20px) 100%, 50% calc(100% - 10px)",
    maskSize:
      "40px 51%, 40px calc(51% - 10px), 40px 51%, 40px calc(51% - 10px)",
    WebkitMaskSize:
      "40px 51%, 40px calc(51% - 10px), 40px 51%, 40px calc(51% - 10px)",
    maskRepeat: "repeat-x",
    WebkitMaskRepeat: "repeat-x",
  };
  const founders = [
    {
      name: "Yash Saksena",
      role: "The Visionary Explorer",
      image: "/yash.png",
      instagramHandle: "@yashsaksena",
      instagramUrl: "https://www.instagram.com/yashsaksena/",
      description:
        "With an instinct for storytelling and a heart that beats for the mountains, Yash crafts each Travel Traces journey to be deeply personal. His passion for offbeat India and connecting people with purpose ensures every trip is designed to feel intimate and immersive.",
    },
    {
      name: "Prithvi Gurjar",
      role: "The Grounded Strategist",
      image: "/prithvi.png",
      instagramHandle: "@prithvigurjar",
      instagramUrl: "https://www.instagram.com/prithvigurjar/",
      description:
        "Behind every seamless trip is Prithvi, the man with a map and a plan. Calm, calculated, and quietly reliable, he handles everything from logistics to safety, making sure every traveler feels secure, seen, and supported.",
    },
  ];

  return (
    <main className="w-full bg-[#dfdfdf] py-8 sm:py-10">
      <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <h1 className="mb-3 text-lg font-extrabold text-secondary sm:text-xl">
          About Travel Traces
        </h1>
        <p className="text-sm md:text-base font-semibold leading-7 text-gray-700">
          At Travel Traces, we don&apos;t just organize trips-we curate
          experiences that leave a lasting trace in your heart. Founded by two
          passionate explorers, Yash Saksena and Prithvi Gurjar, Travel Traces
          is built on the idea that travel should be soulful, safe, and full of
          stories worth telling.
        </p>
        <p className="mt-3 text-sm md:text-base font-semibold leading-7 text-gray-700">
          Born from countless journeys, both on beaten paths and far beyond
          them, Travel Traces was established to make authentic, affordable, and
          inclusive travel accessible for all-whether you&apos;re a first-time
          solo traveler, a thrill-seeker, or someone simply looking to escape
          the routine.
        </p>
      </section>

      <section className="mt-8 h-fit w-full bg-[#BEDAD9]" style={scallopMaskStyle}>
        <div className="mx-auto flex max-w-[1200px] flex-col px-5 py-16 md:px-20 md:py-20">
          <h2 className="mb-8 text-center text-xl font-extrabold text-[#1F1F1F] md:mb-10 md:text-2xl">
            Meet The Founders
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
              >
                <div className="relative h-[260px] w-full bg-[#2f2f2f] sm:h-[300px]">
                  <Image
                    alt={`${founder.name} Image Desktop`}
                    src={founder.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-bold text-[#1F1F1F] sm:text-xl">
                        {founder.name}
                      </p>
                      <span className="text-xs font-medium text-[#1F1F1F]/75 sm:text-sm">
                        {founder.role}
                      </span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={founder.instagramUrl}
                      aria-label={`${founder.name} Instagram`}
                      className="rounded-full overflow-hidden h-6 w-6 flex items-center justify-center"
                    >
                      <Image
                        alt="Instagram Icon"
                        src={instagramIcon}
                        width={16}
                        height={16}
                        className="h-full w-full object-cover"
                      />
                    </a>
                  </div>
                  <p className="text-xs md:text-sm leading-6 text-[#1F1F1F] sm:text-[15px]">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
