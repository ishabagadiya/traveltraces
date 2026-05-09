"use client";

import Image from "next/image";
import { FaInstagram, FaPause, FaVolumeUp } from "react-icons/fa";
import { useAboutSharedAudio } from "./AboutSharedAudioContext";

function memberTrackId(key) {
  return `member:${key}`;
}

export default function AboutTeamMembersGridClient({ members = [] }) {
  const { activeTrackId, toggleTrack } = useAboutSharedAudio();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => {
        const trackId = memberTrackId(member.key);
        const isPlaying = activeTrackId === trackId;

        return (
          <article
            key={member.key}
            className="group overflow-hidden rounded-xl bg-[#111111] text-white ring-1 ring-black/10"
          >
            <div className="relative h-[290px] w-full overflow-hidden sm:h-[320px]">
              <Image
                src={member.image}
                alt={`${member.name} photo`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition duration-300 ${
                  isPlaying
                    ? "sm:grayscale-0 sm:scale-[1.03]"
                    : "sm:grayscale sm:group-hover:scale-[1.03] sm:group-hover:grayscale-0"
                }`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

              {member.songUrl && (
                <button
                  type="button"
                  onClick={() =>
                    toggleTrack({ id: trackId, url: member.songUrl })
                  }
                  className={`absolute right-3 top-3 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none text-white backdrop-blur-md transition-all ${
                    isPlaying
                      ? "dj-sound-playing"
                      : "bg-black/50"
                  }`}
                  aria-label={isPlaying ? `Pause ${member.name} song` : `Play ${member.name} song`}
                >
                  {isPlaying ? <FaPause className="text-xs" /> : <FaVolumeUp className="text-xs" />}
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-base font-bold leading-tight">{member.name}</p>
                    <p className="mt-1 text-xs font-medium text-white/80">{member.designation}</p>
                  </div>
                  <div className="mb-0.5 flex items-center gap-1.5">
                    {member.instagramUrl && (
                      <a
                        href={member.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Instagram`}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                      >
                        <FaInstagram className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                          <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.93H6.31V17H8.34M7.33 10.05A1.18 1.18 0 1 0 7.33 7.69A1.18 1.18 0 0 0 7.33 10.05M17.69 17V13.67C17.69 11.89 16.74 10.93 15.47 10.93C14.44 10.93 13.97 11.5 13.71 11.9V10.93H11.68V17H13.71V13.62C13.71 13.44 13.72 13.25 13.77 13.12C13.91 12.75 14.23 12.37 14.77 12.37C15.48 12.37 15.76 12.91 15.76 13.71V17H17.69Z" />
                        </svg>
                      </a>
                    )}
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
