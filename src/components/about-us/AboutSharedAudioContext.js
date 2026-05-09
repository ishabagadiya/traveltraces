"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AboutSharedAudioContext = createContext(null);

export function AboutSharedAudioProvider({ children }) {
  const audioRef = useRef(null);
  const activeIdRef = useRef(null);
  const [activeTrackId, setActiveTrackId] = useState(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const toggleTrack = useCallback(
    async ({ id, url }) => {
      if (!url) return;

      const audio = ensureAudio();
      const isThisTrack = activeIdRef.current === id;
      const isPlaying = isThisTrack && !audio.paused;

      if (isPlaying) {
        audio.pause();
        activeIdRef.current = null;
        setActiveTrackId(null);
        return;
      }

      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = url;
        await audio.play();
        activeIdRef.current = id;
        setActiveTrackId(id);
      } catch {
        activeIdRef.current = null;
        setActiveTrackId(null);
      }
    },
    [ensureAudio]
  );

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      activeIdRef.current = null;
    };
  }, []);

  const value = { activeTrackId, toggleTrack };

  return (
    <AboutSharedAudioContext.Provider value={value}>
      {children}
    </AboutSharedAudioContext.Provider>
  );
}

export function useAboutSharedAudio() {
  const ctx = useContext(AboutSharedAudioContext);
  if (!ctx) {
    throw new Error(
      "useAboutSharedAudio must be used within AboutSharedAudioProvider"
    );
  }
  return ctx;
}
