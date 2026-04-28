import ReelsPageContent from "@/components/reels/ReelsPageContent";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Reels | TravelTraces",
  description:
    "Watch TravelTraces reels and short travel videos from our latest trips and experiences.",
};

function parseInstagramHandle(instagramUrl) {
  try {
    if (!instagramUrl) return null;
    const url = new URL(instagramUrl);
    const handle = url.pathname.replace(/\//g, "").trim();
    return handle || null;
  } catch {
    return null;
  }
}

async function getReelsPageData() {
  const socials = await client.fetch(
    `*[_type == "contactSocialLinks"][0]{ instagramUrl }`
  );

  const reels = await client.fetch(
    `*[_type == "reelCollection" && defined(video.asset)] | order(_updatedAt desc){
      _id,
      _updatedAt,
      "title": description,
      "videoUrl": video.asset->url
    }`
  );

  return {
    title: "Reels",
    profileUrl: socials?.instagramUrl || null,
    profileHandle: parseInstagramHandle(socials?.instagramUrl) || "traveltraces",
    reels: (reels || []).filter((item) => item?.videoUrl),
  };
}

export default async function ReelsPage() {
  const { title, reels, profileHandle, profileUrl } = await getReelsPageData();
  return (
    <ReelsPageContent
      title={title}
      reels={reels}
      profileHandle={profileHandle}
      profileUrl={profileUrl}
    />
  );
}
