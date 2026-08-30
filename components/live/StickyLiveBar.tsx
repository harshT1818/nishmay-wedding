"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ChevronUp,
} from "lucide-react";

type StickyLiveBarProps = {
  event: {
    name: string;
    liveStatus:
      | "upcoming"
      | "live"
      | "completed"
      | "delayed";
    liveMessage: string | null;
  } | null;
};

export default function StickyLiveBar({
  event,
}: StickyLiveBarProps) {
  const [
    visible,
    setVisible,
  ] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(
        window.scrollY >
          350,
      );
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

  if (
    !event ||
    event.liveStatus ===
      "completed"
  ) {
    return null;
  }

  function goToLive() {
    document
      .getElementById(
        "happening-now",
      )
      ?.scrollIntoView({
        behavior:
          "smooth",
        block: "start",
      });
  }

  return (
    <div
      className={`fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 transition-all duration-300 sm:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={goToLive}
        className="flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-[#35151c]/95 px-4 py-3 text-left shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-2 w-2 shrink-0 text-[#d49a52]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>

          <div className="min-w-0">
            <p className="text-[7px] uppercase tracking-[0.2em] text-[#d8bd8c]">
              {event.liveStatus ===
              "delayed"
                ? "Schedule update"
                : "Live now"}
            </p>

            <p className="truncate text-xs text-[#f6f0e6]">
              {
                event.name
              }
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 text-[8px] uppercase tracking-[0.14em] text-[#f6f0e6]/65">
          View

          <ChevronUp
            size={13}
          />
        </div>
      </button>
    </div>
  );
}