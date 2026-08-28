"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

import type {
  LiveMedia,
} from "@/lib/live/getLiveWeddingData";

type MediaWallProps = {
  media: LiveMedia[];
};

const AUTO_SLIDE_MS = 3500;

export default function MediaWall({
  media,
}: MediaWallProps) {
  const reduceMotion =
    useReducedMotion();

  const sortedMedia =
    useMemo(() => {
      return [...media].sort(
        (a, b) => {
          if (
            a.isFeatured &&
            !b.isFeatured
          ) {
            return -1;
          }

          if (
            !a.isFeatured &&
            b.isFeatured
          ) {
            return 1;
          }

          return (
            new Date(
              b.createdAt,
            ).getTime() -
            new Date(
              a.createdAt,
            ).getTime()
          );
        },
      );
    }, [media]);

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    isPaused,
    setIsPaused,
  ] = useState(false);

  useEffect(() => {
    if (
      sortedMedia.length <= 1 ||
      isPaused
    ) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          setActiveIndex(
            (current) =>
              (current + 1) %
              sortedMedia.length,
          );
        },
        AUTO_SLIDE_MS,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, [
    sortedMedia.length,
    isPaused,
  ]);

  useEffect(() => {
    if (
      activeIndex >=
      sortedMedia.length
    ) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    sortedMedia.length,
  ]);

  if (
    sortedMedia.length === 0
  ) {
    return null;
  }

  const active =
    sortedMedia[activeIndex];

  function previous() {
    setActiveIndex(
      (current) =>
        current === 0
          ? sortedMedia.length - 1
          : current - 1,
    );
  }

  function next() {
    setActiveIndex(
      (current) =>
        (current + 1) %
        sortedMedia.length,
    );
  }

  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#b45e43]">
            Captured today
          </p>

          <h2 className="font-display mt-3 text-3xl tracking-[-0.04em] text-[#35151c] sm:text-4xl">
            Moments from the
            celebration.
          </h2>
        </div>

        <div
          className="mt-9 sm:mt-11"
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
        >
          <div className="relative mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-[22px] border border-[#35151c]/10 bg-[#e9e0d7] shadow-[0_18px_55px_rgba(53,21,28,0.08)]">
              <div className="relative flex h-[430px] items-center justify-center sm:h-[520px]">
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.div
                    key={active.id}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale:
                              0.985,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={
                      reduceMotion
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                            scale:
                              0.99,
                          }
                    }
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.65,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="absolute inset-0 flex items-center justify-center p-3 sm:p-5"
                  >
                    {active.mediaType ===
                    "photo" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          active.mediaUrl
                        }
                        alt={
                          active.caption ??
                          "Wedding moment"
                        }
                        draggable={
                          false
                        }
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <video
                        src={
                          active.mediaUrl
                        }
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {sortedMedia.length >
                  1 && (
                  <>
                    <button
                      type="button"
                      onClick={
                        previous
                      }
                      aria-label="Previous moment"
                      className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#35151c] shadow-sm backdrop-blur-md transition hover:bg-white sm:left-4"
                    >
                      <ChevronLeft
                        size={18}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={
                        next
                      }
                      aria-label="Next moment"
                      className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#35151c] shadow-sm backdrop-blur-md transition hover:bg-white sm:right-4"
                    >
                      <ChevronRight
                        size={18}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 text-center">
              {active.caption && (
                <p className="font-editorial mx-auto max-w-xl text-base leading-6 text-[#35151c] sm:text-lg">
                  {active.caption}
                </p>
              )}

              <div className="mt-2 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#8d7c7e]">
                {active.mediaType !==
                  "photo" && (
                  <>
                    <Play
                      size={11}
                    />

                    <span>
                      Video
                    </span>

                    <span>
                      ·
                    </span>
                  </>
                )}

                {active.guestName && (
                  <span>
                    Shared by{" "}
                    {
                      active.guestName
                    }
                  </span>
                )}
              </div>
            </div>

            {sortedMedia.length >
              1 && (
              <>
                <div className="mt-5 flex justify-center gap-1.5">
                  {sortedMedia.map(
                    (
                      item,
                      index,
                    ) => (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        onClick={() =>
                          setActiveIndex(
                            index,
                          )
                        }
                        aria-label={`Show moment ${
                          index + 1
                        }`}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          index ===
                          activeIndex
                            ? "w-7 bg-[#b45e43]"
                            : "w-2 bg-[#35151c]/15"
                        }`}
                      />
                    ),
                  )}
                </div>

                <p className="mt-3 text-center text-[9px] tracking-[0.16em] text-[#9a8b8d]">
                  {String(
                    activeIndex +
                      1,
                  ).padStart(
                    2,
                    "0",
                  )}
                  {" / "}
                  {String(
                    sortedMedia.length,
                  ).padStart(
                    2,
                    "0",
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}