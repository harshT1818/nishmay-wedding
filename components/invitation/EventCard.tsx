"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
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
  const accent =
    eventAccents[index % eventAccents.length];

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.22,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div className="grid gap-4 border-t border-[#35151c]/10 py-7 sm:grid-cols-[54px_minmax(0,1fr)_auto] sm:gap-6 sm:py-9">
        {/* Index */}
        <div className="flex items-start gap-3 sm:block">
          <span
            className={`text-[10px] tracking-[0.2em] ${accent.number}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div
            className={`mt-[7px] h-px w-8 sm:mt-3 sm:w-6 ${accent.line}`}
          />
        </div>

        {/* Main */}
        <div>
          <h3 className="font-display max-w-3xl text-3xl leading-[1.02] tracking-[-0.04em] sm:text-4xl lg:text-[2.8rem]">
            {event.name}
          </h3>

          {/* Core details */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#625558]">
            {event.date && (
              <div className="flex items-center gap-1.5">
                <CalendarDays
                  size={13}
                  strokeWidth={1.4}
                />

                <span>{event.date}</span>
              </div>
            )}

            {event.time && (
              <div className="flex items-center gap-1.5">
                <Clock3
                  size={13}
                  strokeWidth={1.4}
                />

                <span>{event.time}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <MapPin
                size={13}
                strokeWidth={1.4}
              />

              <span>
                {event.venue
                  ? `${event.venue}, ${event.location}`
                  : event.location}
              </span>
            </div>
          </div>

          {event.description && (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#76686a]">
              {event.description}
            </p>
          )}

          {(event.dressCode ||
            event.instructions ||
            event.address) && (
            <div className="mt-5 grid gap-3 text-[11px] sm:grid-cols-2">
              {event.dressCode && (
                <div>
                  <p className="uppercase tracking-[0.17em] text-[#a18f8c]">
                    Dress Code
                  </p>

                  <p className="mt-1.5 text-[#4f4346]">
                    {event.dressCode}
                  </p>
                </div>
              )}

              {event.address && (
                <div>
                  <p className="uppercase tracking-[0.17em] text-[#a18f8c]">
                    Venue
                  </p>

                  <p className="mt-1.5 max-w-md leading-5 text-[#4f4346]">
                    {event.address}
                  </p>
                </div>
              )}

              {event.instructions && (
                <div className="sm:col-span-2">
                  <p className="uppercase tracking-[0.17em] text-[#a18f8c]">
                    Good to know
                  </p>

                  <p className="mt-1.5 max-w-2xl leading-5 text-[#76686a]">
                    {event.instructions}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
          <VenueMap
            venue={event.venue}
            location={event.location}
            address={event.address}
            mapsUrl={event.mapsUrl}
          />
       
      </div>
    </motion.article>
  );
}