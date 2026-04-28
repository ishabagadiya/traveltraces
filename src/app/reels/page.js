import ReelsPageContent from "@/components/reels/ReelsPageContent";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Reels | TravelTraces",
  description:
    "Watch TravelTraces reels and short travel videos from our latest trips and experiences.",
};

async function getReelsPageData() {
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
    reels: (reels || []).filter((item) => item?.videoUrl),
  };
}

export default async function ReelsPage() {
  const { title, reels } = await getReelsPageData();
  return <ReelsPageContent title={title} reels={reels} />;
}
