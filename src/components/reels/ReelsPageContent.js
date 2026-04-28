"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import reelsLogo from "@/assets/logo-reels.jpeg";

export default function ReelsPageContent({
  title,
  reels,
  profileHandle = "traveltraces",
  profileUrl = null,
}) {
  const router = useRouter();
  const videoRefs = useRef([]);
  const audioBadgeTimerRef = useRef(null);
  const hasShownInitialMuteHintRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCaptionIndex, setExpandedCaptionIndex] = useState(null);
  const [isMutedGlobal, setIsMutedGlobal] = useState(true);
  const [hasAudioInteracted, setHasAudioInteracted] = useState(false);
  const [audioBadge, setAudioBadge] = useState({ visible: false, muted: true });

  const showAudioBadge = (muted, duration = 1200) => {
    if (audioBadgeTimerRef.current) {
      clearTimeout(audioBadgeTimerRef.current);
    }
    setAudioBadge({ visible: true, muted });
    audioBadgeTimerRef.current = setTimeout(() => {
      setAudioBadge((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  const handleToggleVideoMute = () => {
    const nextMuted = !isMutedGlobal;
    setIsMutedGlobal(nextMuted);
    setHasAudioInteracted(true);
    showAudioBadge(nextMuted);
  };

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
      video.muted = isMutedGlobal;

      if (index === activeIndex) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMutedGlobal]);

  useEffect(() => {
    setExpandedCaptionIndex(null);
  }, [activeIndex]);

  useEffect(() => {
    if (
      activeIndex === 0 &&
      isMutedGlobal &&
      !hasAudioInteracted &&
      !hasShownInitialMuteHintRef.current
    ) {
      showAudioBadge(true, 1600);
      hasShownInitialMuteHintRef.current = true;
    }
  }, [activeIndex, isMutedGlobal, hasAudioInteracted]);

  useEffect(() => {
    return () => {
      if (audioBadgeTimerRef.current) {
        clearTimeout(audioBadgeTimerRef.current);
      }
    };
  }, []);

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
    <section className="relative h-dvh w-full bg-black">
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed left-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/55 md:left-5 md:top-5"
        aria-label="Go back"
      >
        <IoArrowBack size={18} />
      </button>

      <div
        className="mx-auto h-full w-full snap-y snap-mandatory overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reels.map((reel, index) => (
          <article
            key={reel._key || reel.videoUrl}
            className="flex h-dvh w-full snap-start snap-always items-center justify-center"
            style={{ minHeight: "100dvh" }}
          >
            <div className="relative aspect-9/16 h-full w-full max-w-[500px]">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  onClick={handleToggleVideoMute}
                  data-index={index}
                  src={reel.videoUrl}
                  poster={reel.thumbnailUrl || undefined}
                  loop
                  muted={isMutedGlobal}
                  playsInline
                  preload={index === activeIndex ? "auto" : "metadata"}
                  className="h-auto w-full max-h-full cursor-pointer"
                >
                  Your browser does not support the video tag.
                </video>

                {audioBadge.visible ? (
                  <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex items-center justify-center rounded-full bg-black/70 p-3 text-white backdrop-blur-sm">
                    {audioBadge.muted ? (
                      <FaVolumeMute className="h-5 w-5" />
                    ) : (
                      <FaVolumeUp className="h-5 w-5" />
                    )}
                  </div>
                ) : null}

                {/* Instagram-like bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/85 via-black/45 to-transparent px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-14">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full">
                        <div className="relative h-full w-full overflow-hidden rounded-full bg-black">
                          <Image
                            src={reelsLogo}
                            alt="TravelTraces"
                            fill
                            className="object-cover"
                            sizes="40px"
                            priority={index === 0}
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <a
                            href={profileUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate text-xs font-semibold text-white"
                          >
                            {profileHandle}
                          </a>
                          <span className="text-white/80" aria-hidden>
                            ↗
                          </span>
                        </div>
                        <div className="truncate text-xs font-medium text-white/70">
                          Original audio
                        </div>
                      </div>
                    </div>

                    <a
                      href={profileUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-xl border border-white/80 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Follow
                    </a>
                  </div>

                  <div className="mt-3 w-full text-xs leading-relaxed text-white">
                    <p
                      onClick={() =>
                        setExpandedCaptionIndex(
                          expandedCaptionIndex === index ? null : index
                        )
                      }
                      className={`cursor-pointer ${expandedCaptionIndex === index ? "" : "line-clamp-2"}`}
                    >
                      {reel.title || title || "Travel reel"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
