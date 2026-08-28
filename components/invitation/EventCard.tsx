"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import type { WeddingEvent } from "@/types/invitation";
import VenueMap from "@/components/invitation/VenueMap";

type EventCardProps = {
  event: WeddingEvent;
  index?: number;
};

const eventAccents = [
  {
    line: "bg-[#b45e43]",
    number: "text-[#b45e43]",
  },
  {
    line: "bg-[#b99155]",
    number: "text-[#b99155]",
  },
  {
    line: "bg-[#8e4438]",
    number: "text-[#8e4438]",
  },
  {
    line: "bg-[#8c6a4a]",
    number: "text-[#8c6a4a]",
  },
  {
    line: "bg-[#35151c]",
    number: "text-[#35151c]",
  },
];

export default function EventCard({
  event,
  index = 0,
}: EventCardProps) {
  const reduceMotion =
    useReducedMotion();

  const accent =
    eventAccents[
      index % eventAccents.length
    ];

  const hasExactVenue =
    Boolean(event.address);

  const venueLabel =
    event.venue && event.location
      ? `${event.venue}, ${event.location}`
      : event.venue ||
        event.location ||
        "Venue TBD";

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 22,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={
        reduceMotion
          ? {
              duration: 0,
            }
          : {
              duration: 0.8,
              delay:
                index * 0.05,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }
      }
      className="relative min-w-0"
    >
      <div
        className="
          grid
          min-w-0
          gap-4
          border-t
          border-[#35151c]/10
          py-7
          sm:grid-cols-[54px_minmax(0,1fr)]
          sm:gap-6
          sm:py-10
        "
      >
        {/* Event number */}
        <div className="flex items-center gap-3 sm:block">
          <span
            className={`
              shrink-0
              text-[9px]
              tracking-[0.2em]
              sm:text-[10px]
              ${accent.number}
            `}
          >
            {String(
              index + 1,
            ).padStart(
              2,
              "0",
            )}
          </span>

          <div
            className={`
              h-px
              w-8
              shrink-0
              sm:mt-3
              sm:w-6
              ${accent.line}
            `}
          />
        </div>

        {/* Event content */}
        <div className="min-w-0">
          <h3
            className="
              font-display
              max-w-3xl
              break-words
              text-[2rem]
              leading-[1.02]
              tracking-[-0.045em]
              text-[#261b1d]
              sm:text-4xl
              sm:leading-[1.04]
              lg:text-[2.8rem]
            "
          >
            {event.name}
          </h3>

          {/* Date / time / location */}
          <div
            className="
              mt-5
              grid
              min-w-0
              gap-2.5
              text-[12px]
              leading-5
              text-[#625558]
              sm:flex
              sm:flex-wrap
              sm:gap-x-5
              sm:gap-y-3
            "
          >
            {event.date && (
              <div className="flex min-w-0 items-start gap-2">
                <CalendarDays
                  size={13}
                  strokeWidth={
                    1.4
                  }
                  className="mt-[3px] shrink-0 text-[#8e4438]"
                />

                <span className="min-w-0">
                  {event.date}
                </span>
              </div>
            )}

            {event.time && (
              <div className="flex min-w-0 items-start gap-2">
                <Clock3
                  size={13}
                  strokeWidth={
                    1.4
                  }
                  className="mt-[3px] shrink-0 text-[#8e4438]"
                />

                <span className="min-w-0">
                  {event.time}
                </span>
              </div>
            )}

            <div className="flex min-w-0 items-start gap-2">
              <MapPin
                size={13}
                strokeWidth={1.4}
                className="mt-[3px] shrink-0 text-[#8e4438]"
              />

              <span className="min-w-0 break-words">
                {venueLabel}
              </span>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <p
              className="
                mt-5
                max-w-2xl
                break-words
                text-[13px]
                leading-6
                text-[#76686a]
                sm:text-sm
              "
            >
              {event.description}
            </p>
          )}

          {/* Guest information */}
          {(event.dressCode ||
            event.instructions) && (
            <div
              className="
                mt-6
                grid
                gap-5
                border-t
                border-[#35151c]/8
                pt-5
                sm:grid-cols-2
                sm:gap-6
              "
            >
              {event.dressCode && (
                <div className="min-w-0">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-[#a18f8c] sm:text-[9px]">
                    Dress code
                  </p>

                  <p className="mt-2 break-words text-xs leading-5 text-[#4f4346]">
                    {
                      event.dressCode
                    }
                  </p>
                </div>
              )}

              {event.instructions && (
                <div
                  className={
                    event.dressCode
                      ? "min-w-0"
                      : "min-w-0 sm:col-span-2"
                  }
                >
                  <p className="text-[8px] uppercase tracking-[0.2em] text-[#a18f8c] sm:text-[9px]">
                    Good to know
                  </p>

                  <p className="mt-2 max-w-2xl break-words text-xs leading-5 text-[#76686a]">
                    {
                      event.instructions
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Exact venue + Google Map */}
          {hasExactVenue && (
            <div className="mt-7 sm:mt-9">
              <VenueMap
                venue={
                  event.venue
                }
                location={
                  event.location
                }
                address={
                  event.address
                }
                mapsUrl={
                  event.mapsUrl
                }
              />
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}