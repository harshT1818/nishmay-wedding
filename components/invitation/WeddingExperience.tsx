"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WeddingExperienceContextType = {
  musicOn: boolean;
  startExperience: () => void;
  toggleMusic: () => void;
};

const WeddingExperienceContext =
  createContext<WeddingExperienceContextType | null>(null);

export function WeddingExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const [musicOn, setMusicOn] =
    useState(false);

  useEffect(() => {
    const audio = new Audio(
      "/audio/wedding-theme.mp3",
    );

    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  async function startExperience() {
    const audio = audioRef.current;

    if (audio) {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }
    }

    document
      .getElementById("greeting")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setMusicOn(true);
      } catch {
        setMusicOn(false);
      }

      return;
    }

    audio.pause();
    setMusicOn(false);
  }

  return (
    <WeddingExperienceContext.Provider
      value={{
        musicOn,
        startExperience,
        toggleMusic,
      }}
    >
      {children}
    </WeddingExperienceContext.Provider>
  );
}

export function useWeddingExperience() {
  const context = useContext(
    WeddingExperienceContext,
  );

  if (!context) {
    throw new Error(
      "useWeddingExperience must be used inside WeddingExperienceProvider",
    );
  }

  return context;
}