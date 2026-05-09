import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AboutFoundersGridClient from "./AboutFoundersGridClient";
import { AboutSharedAudioProvider } from "./AboutSharedAudioContext";
import AboutTeamMembersGridClient from "./AboutTeamMembersGridClient";

const YASH_FALLBACK = {
  key: "yash",
  name: "Yash Saksena",
  role: "The Visionary Explorer",
  image: "/yash.png",
  instagramUrl: "https://www.instagram.com/yashsaksena/",
  linkedinUrl: "",
  description: "With an instinct for storytelling and a heart that beats for the mountains, Yash crafts each Travel Traces journey to be deeply personal. His passion for offbeat India and connecting people with purpose ensures every trip is designed to feel intimate and immersive."
};

const PRITHVI_FALLBACK = {
  key: "prithvi",
  name: "Prithvi Gurjar",
  role: "The Grounded Strategist",
  image: "/prithvi.png",
  instagramUrl: "https://www.instagram.com/prithvigurjar/",
  linkedinUrl: "",
  description: "Behind every seamless trip is Prithvi, the man with a map and a plan. Calm, calculated, and quietly reliable, he handles everything from logistics to safety, making sure every traveler feels secure, seen, and supported.",
};

const toImageUrl = (image) => {
  if (!image?.asset?._ref) return null;

  try {
    return urlFor(image).width(1200).quality(85).url();
  } catch {
    return null;
  }
};

function normalizeUrl(value) {
  if (value == null) return "";
  const s = String(value).trim();
  return s || "";
}

function songUrlFromSanity(slot) {
  const direct =
    normalizeUrl(slot?.songUrl) ||
    normalizeUrl(slot?.songFile?.asset?.url);
  return direct;
}

function mapFounderSlot(slot, fallback) {
  const image = toImageUrl(slot?.photo) || fallback.image;
  const linkedinFromSanity = normalizeUrl(slot?.linkedinUrl);
  const instagramFromSanity = normalizeUrl(slot?.instagramUrl);

  return {
    key: fallback.key,
    name: slot?.name?.trim() || fallback.name,
    role: slot?.role?.trim() || fallback.role,
    image,
    linkedinUrl: linkedinFromSanity || normalizeUrl(fallback.linkedinUrl),
    instagramUrl: instagramFromSanity || normalizeUrl(fallback.instagramUrl),
    songUrl: songUrlFromSanity(slot),
    description: slot?.details?.trim() || fallback.description,
  };
}

async function getTeamSectionData() {
  try {
    const section = await client.fetch(
      `*[_type == "aboutUsTeamSection"][0]{
        heading,
        subheading,
        founderYash{
          name,
          role,
          photo,
          linkedinUrl,
          instagramUrl,
          details,
          "songUrl": songFile.asset->url,
          songFile{
            asset->{
              url
            }
          }
        },
        founderPrithvi{
          name,
          role,
          photo,
          linkedinUrl,
          instagramUrl,
          details,
          "songUrl": songFile.asset->url,
          songFile{
            asset->{
              url
            }
          }
        },
        members[]{
          _key,
          name,
          designation,
          photo,
          linkedinUrl,
          instagramUrl,
          songFile{
            asset->{
              url
            }
          }
        }
      }`
    );

    const members = Array.isArray(section?.members) ? section.members : [];
    const teamMembers = members
      .map((member, index) => {
        const image = toImageUrl(member?.photo);
        if (!image) return null;

        return {
          key: member?._key || `member-${index}`,
          name: member?.name || "Team Member",
          designation: member?.designation || "",
          image,
          linkedinUrl: member?.linkedinUrl || "",
          instagramUrl: member?.instagramUrl || "",
          songUrl: member?.songFile?.asset?.url || "",
        };
      })
      .filter(Boolean);

    const founders = [
      mapFounderSlot(section?.founderYash, YASH_FALLBACK),
      mapFounderSlot(section?.founderPrithvi, PRITHVI_FALLBACK),
    ];

    return {
      heading: section?.heading || "The People Behind Travel Traces",
      subheading:
        section?.subheading ||
        "Built by people who understand travel from both sides, as planners and as travellers.",
      founders,
      members: teamMembers,
    };
  } catch {
    return {
      heading: "The People Behind Travel Traces",
      subheading:
        "Built by people who understand travel from both sides, as planners and as travellers.",
      founders: [
        mapFounderSlot(null, YASH_FALLBACK),
        mapFounderSlot(null, PRITHVI_FALLBACK),
      ],
      members: [],
    };
  }
}

export default async function AboutPageContent() {
  const teamSection = await getTeamSectionData();
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
  return (
    <AboutSharedAudioProvider>
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
          <AboutFoundersGridClient founders={teamSection.founders} />
        </div>
      </section>

      {teamSection.members.length > 0 && (
        <section className="mx-auto mt-10 w-full max-w-[1200px] px-4 pb-8 sm:px-6 sm:pb-12">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1F1F1F] sm:text-4xl">
                {teamSection.heading}
              </h2>
              <p className="mt-2 max-w-[560px] text-sm font-medium leading-6 text-[#1F1F1F]/70 sm:text-base">
                {teamSection.subheading}
              </p>
            </div>
          </div>

          <AboutTeamMembersGridClient members={teamSection.members} />
        </section>
      )}
    </main>
    </AboutSharedAudioProvider>
  );
}
