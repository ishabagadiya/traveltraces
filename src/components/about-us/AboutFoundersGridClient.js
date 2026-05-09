"use client";

import Image from "next/image";
import { FaInstagram, FaPause, FaVolumeUp } from "react-icons/fa";
import { useAboutSharedAudio } from "./AboutSharedAudioContext";

function founderTrackId(key) {
  return `founder:${key}`;
}

export default function AboutFoundersGridClient({ founders = [] }) {
  const { activeTrackId, toggleTrack } = useAboutSharedAudio();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {founders.map((founder) => {
          const trackId = founderTrackId(founder.key);
          const isPlaying = activeTrackId === trackId;

          return (
            <article
              key={founder.key}
              className="group overflow-hidden rounded-xl bg-[#111111] text-white ring-1 ring-black/10"
            >
              <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
                <Image
                  src={founder.image}
                  alt={`${founder.name} photo`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className={`object-cover object-center transition duration-300 ${
                    isPlaying
                      ? "sm:grayscale-0 sm:scale-[1.03]"
                      : "sm:grayscale sm:group-hover:scale-[1.03] sm:group-hover:grayscale-0"
                  }`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                {founder.songUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      toggleTrack({ id: trackId, url: founder.songUrl })
                    }
                    className={`absolute right-3 top-3 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none text-white backdrop-blur-md transition-all ${
                      isPlaying
                        ? "dj-sound-playing"
                        : "bg-black/50"
                    }`}
                    aria-label={
                      isPlaying
                        ? `Pause ${founder.name} song`
                        : `Play ${founder.name} song`
                    }
                  >
                    {isPlaying ? (
                      <FaPause className="text-xs" />
                    ) : (
                      <FaVolumeUp className="text-xs" />
                    )}
                  </button>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div className="min-w-0 flex-1 pr-2 text-left">
                      <p className="text-base font-bold leading-tight">
                        {founder.name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-white/80">
                        {founder.role}
                      </p>
                      {founder.description ? (
                        <p className="mt-2 max-h-30 overflow-y-auto text-xs leading-relaxed text-white/75 [scrollbar-width:thin]">
                          {founder.description}
                        </p>
                      ) : null}
                    </div>
                    <div className="mb-0.5 flex shrink-0 items-center gap-1.5 self-end">
                      {founder.instagramUrl ? (
                        <a
                          href={founder.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name} Instagram`}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                        >
                          <FaInstagram className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                      {founder.linkedinUrl ? (
                        <a
                          href={founder.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${founder.name} LinkedIn`}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 fill-current"
                            aria-hidden="true"
                          >
                            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.93H6.31V17H8.34M7.33 10.05A1.18 1.18 0 1 0 7.33 7.69A1.18 1.18 0 0 0 7.33 10.05M17.69 17V13.67C17.69 11.89 16.74 10.93 15.47 10.93C14.44 10.93 13.97 11.5 13.71 11.9V10.93H11.68V17H13.71V13.62C13.71 13.44 13.72 13.25 13.77 13.12C13.91 12.75 14.23 12.37 14.77 12.37C15.48 12.37 15.76 12.91 15.76 13.71V17H17.69Z" />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <style jsx>{`
        .dj-sound-playing {
          background: linear-gradient(120deg, #ec4899, #a855f7, #3b82f6, #22c55e, #facc15);
          background-size: 260% 260%;
          animation: djGradientShift 2.2s ease infinite;
        }

        @keyframes djGradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
