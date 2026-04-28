"use client";

import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function ReelsPageContent({ title, reels }) {
  const router = useRouter();
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, reels.length);
  }, [reels.length]);

  useEffect(() => {
    if (!reels?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const index = Number(visibleEntry.target.getAttribute("data-index"));
        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        threshold: [0.55, 0.75],
      }
    );

    const currentVideos = videoRefs.current.filter(Boolean);
    currentVideos.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [reels]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  if (!reels?.length) {
    return (
      <section className="w-full px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-3xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="fixed left-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/20 bg-white text-secondary shadow-sm transition-colors hover:bg-secondary/5 md:left-5 md:top-5"
            aria-label="Go back"
          >
            <IoArrowBack size={18} />
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary md:text-4xl">
              {title || "Reels"}
            </h1>
            <p className="mt-4 text-secondary/70">
              No reels yet. Check back later for updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full bg-black">
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed left-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/55 md:left-5 md:top-5"
        aria-label="Go back"
      >
        <IoArrowBack size={18} />
      </button>

      <div
        className="scrollbar-hide mx-auto h-full w-full snap-y snap-mandatory overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {reels.map((reel, index) => (
          <article
            key={reel._key || reel.videoUrl}
            className="flex h-screen w-full snap-start snap-always items-center justify-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="relative aspect-9/16 h-full w-full max-w-[500px]">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  data-index={index}
                  src={reel.videoUrl}
                  poster={reel.thumbnailUrl || undefined}
                  loop
                  muted
                  playsInline
                  preload={index === activeIndex ? "auto" : "metadata"}
                  className="h-auto w-full max-h-full"
                >
                  Your browser does not support the video tag.
                </video>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-4 pb-10">
                  <p className="line-clamp-3 max-w-[280px] text-sm font-medium text-white">
                    {reel.title || title || "Travel reel"}
                  </p>
                  <p className="mt-2 text-xs text-white/70">
                    Reel {index + 1} of {reels.length}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
