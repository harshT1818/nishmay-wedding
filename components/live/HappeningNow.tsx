"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Clock3,
  MapPin,
} from "lucide-react";

import type {
  LiveEvent,
} from "@/lib/live/getLiveWeddingData";

type HappeningNowProps = {
  event: LiveEvent | null;
};

function formatTime(
  time: string | null,
) {
  if (!time) {
    return null;
  }

  const [
    hours,
    minutes,
  ] = time.split(":");

  const date = new Date();

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0,
  );

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  );
}

export default function HappeningNow({
  event,
}: HappeningNowProps) {
  const reduceMotion =
    useReducedMotion();

  return (
    <section className="px-5 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-12">
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 18,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration:
            reduceMotion
              ? 0
              : 0.8,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="mx-auto max-w-4xl"
      >
        {event ? (
          <div className="relative overflow-hidden rounded-[28px] bg-[#35151c] px-6 py-8 text-[#f8efe7] sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full border border-[#d49a52]/15" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d49a52] opacity-60" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d49a52]" />
                </span>

                <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#d8bd8c]">
                  Live now
                </p>
              </div>

              <h1 className="font-display mt-5 max-w-2xl text-[2.6rem] leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                {event.name}
              </h1>

              {event.liveMessage && (
                <p className="font-editorial mt-5 max-w-xl text-lg leading-7 text-[#e7c9ba] sm:text-xl">
                  {event.liveMessage}
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 text-xs text-[#d9c8c2] sm:flex-row sm:flex-wrap sm:gap-5">
                {formatTime(
                  event.startTime,
                ) && (
                  <div className="flex items-center gap-2">
                    <Clock3
                      size={15}
                    />

                    {formatTime(
                      event.startTime,
                    )}
                  </div>
                )}

                {(event.venueName ||
                  event.locationName) && (
                  <div className="flex min-w-0 items-start gap-2">
                    <MapPin
                      size={15}
                      className="mt-[1px] shrink-0"
                    />

                    <span className="min-w-0 break-words">
                      {[
                        event.venueName,
                        event.locationName,
                      ]
                        .filter(
                          Boolean,
                        )
                        .join(
                          ", ",
                        )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="border-y border-[#35151c]/10 py-12 text-center">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#b45e43]">
              Wedding live
            </p>

            <h1 className="font-display mt-4 text-4xl tracking-[-0.045em] text-[#35151c] sm:text-5xl">
              Celebrations are
              coming alive soon.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#76686a]">
              Live updates,
              moments and wedding
              highlights will
              appear here.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}