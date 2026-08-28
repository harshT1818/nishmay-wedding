"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowUp,
  CalendarDays,
  Send,
} from "lucide-react";

import MusicWaveform from "@/components/invitation/MusicWaveform";
import { useWeddingExperience } from "@/components/invitation/WeddingExperience";

export default function FloatingControls() {
  const {
    musicOn,
    toggleMusic,
  } = useWeddingExperience();

  const [visible, setVisible] =
    useState(false);

  const [showTop, setShowTop] =
    useState(false);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;

      setVisible(y > 420);
      setShowTop(y > 1400);
    }

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#281118]/90 p-1.5 text-white shadow-[0_16px_55px_rgba(42,15,22,0.28)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() =>
            scrollTo("events")
          }
          className="flex h-11 items-center gap-2 rounded-full px-3 transition-all duration-300 hover:bg-white/10 active:scale-95 sm:px-4"
        >
          <CalendarDays
            size={15}
            strokeWidth={1.35}
            className="text-[#e2c28e]"
          />

          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-white/80 sm:block">
            Celebrations
          </span>
        </button>

        <div className="h-5 w-px bg-white/10" />

        <button
          type="button"
          onClick={() =>
            scrollTo("rsvp")
          }
          className="flex h-11 items-center gap-2 rounded-full px-3 transition-all duration-300 hover:bg-white/10 active:scale-95 sm:px-4"
        >
          <Send
            size={15}
            strokeWidth={1.35}
            className="text-[#e2c28e]"
          />

          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-white/80 sm:block">
            RSVP
          </span>
        </button>

        <div className="h-5 w-px bg-white/10" />

        <button
          type="button"
          onClick={toggleMusic}
          className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 active:scale-90"
          aria-label={
            musicOn
              ? "Pause wedding music"
              : "Play wedding music"
          }
        >
          <MusicWaveform
            playing={musicOn}
          />
        </button>

        {showTop && (
          <>
            <div className="h-5 w-px bg-white/10" />

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 active:scale-90"
              aria-label="Back to top"
            >
              <ArrowUp
                size={15}
                strokeWidth={1.35}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}