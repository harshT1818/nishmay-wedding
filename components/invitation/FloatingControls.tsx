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
import {
  useWeddingExperience,
} from "@/components/invitation/WeddingExperience";

export default function FloatingControls() {
  const {
    musicOn,
    toggleMusic,
  } = useWeddingExperience();

  const [visible, setVisible] =
    useState(false);

  const [showTop, setShowTop] =
    useState(false);

  const [reduceMotion, setReduceMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    function updateMotionPreference() {
      setReduceMotion(
        mediaQuery.matches,
      );
    }

    updateMotionPreference();

    mediaQuery.addEventListener(
      "change",
      updateMotionPreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference,
      );
    };
  }, []);

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
        behavior: reduceMotion
          ? "auto"
          : "smooth",
        block: "start",
      });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion
        ? "auto"
        : "smooth",
    });
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-x-0 z-50
        flex justify-center
        px-3
        bottom-[calc(12px+env(safe-area-inset-bottom))]
        sm:px-4
        sm:bottom-[calc(20px+env(safe-area-inset-bottom))]
      "
    >
      <div
        className="
          flex
          max-w-full
          items-center
          gap-0.5
          overflow-hidden
          rounded-full
          border
          border-white/10
          bg-[#281118]/95
          p-1.5
          text-white
          shadow-[0_16px_55px_rgba(42,15,22,0.32)]
          backdrop-blur-2xl
        "
      >
        <button
          type="button"
          onClick={() =>
            scrollTo("events")
          }
          className="
            flex
            h-11
            min-w-11
            items-center
            justify-center
            gap-2
            rounded-full
            px-3
            transition
            duration-300
            hover:bg-white/10
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#e2c28e]/70
            active:scale-95
            sm:px-4
          "
          aria-label="View celebrations"
        >
          <CalendarDays
            size={15}
            strokeWidth={1.35}
            className="shrink-0 text-[#e2c28e]"
          />

          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-white/80 sm:block">
            Celebrations
          </span>
        </button>

        <div
          aria-hidden="true"
          className="h-5 w-px shrink-0 bg-white/10"
        />

        <button
          type="button"
          onClick={() =>
            scrollTo("rsvp")
          }
          className="
            flex
            h-11
            min-w-11
            items-center
            justify-center
            gap-2
            rounded-full
            px-3
            transition
            duration-300
            hover:bg-white/10
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#e2c28e]/70
            active:scale-95
            sm:px-4
          "
          aria-label="Go to RSVP"
        >
          <Send
            size={15}
            strokeWidth={1.35}
            className="shrink-0 text-[#e2c28e]"
          />

          <span className="hidden text-[9px] uppercase tracking-[0.16em] text-white/80 sm:block">
            RSVP
          </span>
        </button>

        <div
          aria-hidden="true"
          className="h-5 w-px shrink-0 bg-white/10"
        />

        <button
          type="button"
          onClick={toggleMusic}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            transition
            duration-300
            hover:bg-white/10
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#e2c28e]/70
            active:scale-90
          "
          aria-label={
            musicOn
              ? "Pause wedding music"
              : "Play wedding music"
          }
          aria-pressed={musicOn}
        >
          <MusicWaveform
            playing={musicOn}
          />
        </button>

        {showTop && (
          <>
            <div
              aria-hidden="true"
              className="h-5 w-px shrink-0 bg-white/10"
            />

            <button
              type="button"
              onClick={scrollToTop}
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                transition
                duration-300
                hover:bg-white/10
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#e2c28e]/70
                active:scale-90
              "
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