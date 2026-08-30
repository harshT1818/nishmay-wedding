"use client";

import {
  useEffect,
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
  X,
} from "lucide-react";

import type {
  LiveMedia,
} from "@/lib/live/getLiveWeddingData";

import MediaReactions from "@/components/live/MediaReactions";

type MediaLightboxProps = {
  media: LiveMedia[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (
    index: number,
  ) => void;
};

export default function MediaLightbox({
  media,
  activeIndex,
  onClose,
  onChange,
}: MediaLightboxProps) {
  const reduceMotion =
    useReducedMotion();

  const isOpen =
    activeIndex !== null;

  const active =
    activeIndex !== null
      ? media[activeIndex]
      : null;

  function previous() {
    if (
      activeIndex === null ||
      media.length === 0
    ) {
      return;
    }

    onChange(
      activeIndex === 0
        ? media.length - 1
        : activeIndex - 1,
    );
  }

  function next() {
    if (
      activeIndex === null ||
      media.length === 0
    ) {
      return;
    }

    onChange(
      (activeIndex + 1) %
        media.length,
    );
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape"
      ) {
        onClose();
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        previous();
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        next();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    isOpen,
    activeIndex,
    media.length,
    onClose,
  ]);

  return (
    <AnimatePresence>
      {isOpen && active && (
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration:
              reduceMotion
                ? 0
                : 0.22,
          }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#140d0f]/96 backdrop-blur-xl"
        >
          {/* Top bar */}
          <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:h-16 sm:px-6">
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/45">
              {activeIndex + 1}
              {" / "}
              {media.length}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close media viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 sm:h-11 sm:w-11"
            >
              <X size={18} />
            </button>
          </div>

          {/* Media */}
          <div className="relative min-h-0 flex-1">
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
                        scale: 0.985,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.99,
                      }
                }
                transition={{
                  duration:
                    reduceMotion
                      ? 0
                      : 0.3,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="absolute inset-0 flex items-center justify-center px-3 pb-2 sm:px-16"
                drag={
                  reduceMotion
                    ? false
                    : "x"
                }
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.16}
                onDragEnd={(
                  _,
                  info,
                ) => {
                  if (
                    info.offset.x >
                    80
                  ) {
                    previous();
                  }

                  if (
                    info.offset.x <
                    -80
                  ) {
                    next();
                  }
                }}
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
                    draggable={false}
                    className="max-h-full max-w-full select-none object-contain"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <video
                      src={
                        active.mediaUrl
                      }
                      controls
                      playsInline
                      preload="metadata"
                      className="max-h-full max-w-full object-contain"
                    />

                    <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 text-[8px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-md sm:left-4 sm:top-4">
                      <Play
                        size={10}
                        fill="currentColor"
                      />

                      Video
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Desktop navigation */}
            {media.length >
              1 && (
              <>
                <button
                  type="button"
                  onClick={
                    previous
                  }
                  aria-label="Previous media"
                  className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/10 sm:flex"
                >
                  <ChevronLeft
                    size={19}
                  />
                </button>

                <button
                  type="button"
                  onClick={
                    next
                  }
                  aria-label="Next media"
                  className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/10 sm:flex"
                >
                  <ChevronRight
                    size={19}
                  />
                </button>
              </>
            )}
          </div>

          {/* Caption + guest + reactions */}
          <div className="shrink-0 px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-2 text-center sm:px-6 sm:pb-7 sm:pt-3">
            {active.caption && (
              <p className="font-editorial mx-auto max-w-xl text-base leading-5 text-white sm:text-xl sm:leading-6">
                {
                  active.caption
                }
              </p>
            )}

            {active.guestName && (
              <p
                className={`text-[8px] uppercase tracking-[0.2em] text-white/45 sm:text-[9px] ${
                  active.caption
                    ? "mt-1.5"
                    : ""
                }`}
              >
                Shared by{" "}
                {
                  active.guestName
                }
              </p>
            )}

            <div className="mt-3 sm:mt-4">
              <MediaReactions
                mediaId={
                  active.id
                }
              />
            </div>

            {media.length >
              1 && (
              <p className="mt-2 text-[8px] tracking-[0.12em] text-white/25 sm:hidden">
                Swipe for more
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}