import ReelsPageContent from "@/components/reels/ReelsPageContent";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Reels | TravelTraces",
  description:
    "Watch TravelTraces reels and short travel videos from our latest trips and experiences.",
};

async function getReelsPageData() {
  const collections = await client.fetch(
    `*[_type == "reelCollection" && isActive == true] | order(_updatedAt desc){
      title,
      _updatedAt,
      reels[]{
        _key,
        title,
        "videoUrl": video.asset->url,
        "thumbnailUrl": thumbnail.asset->url
      }
    }`
  );

  const title = collections?.[0]?.title || "Reels";

  const flattened = (collections || [])
    .flatMap((doc) =>
      (doc?.reels || []).map((reel) => ({
        ...reel,
        _docUpdatedAt: doc?._updatedAt,
      }))
    )
    .filter((item) => item?.videoUrl);

  const byUrl = new Map();
  for (const item of flattened) {
    if (!byUrl.has(item.videoUrl)) byUrl.set(item.videoUrl, item);
  }

  const reels = Array.from(byUrl.values()).sort((a, b) => {
    const aT = a?._docUpdatedAt ? Date.parse(a._docUpdatedAt) : 0;
    const bT = b?._docUpdatedAt ? Date.parse(b._docUpdatedAt) : 0;
    return bT - aT;
  });

  return { title, reels };
}

export default async function ReelsPage() {
  const { title, reels } = await getReelsPageData();
  return <ReelsPageContent title={title} reels={reels} />;
}
