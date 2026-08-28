"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

type VenueMapProps = {
  venue?: string | null;
  location?: string | null;
  address?: string | null;
  mapsUrl?: string | null;
};

export default function VenueMap({
  venue,
  location,
  address,
}: VenueMapProps) {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  const query =
    address ||
    [venue, location]
      .filter(Boolean)
      .join(", ");

  if (!query) {
    return null;
  }

  const encodedQuery =
    encodeURIComponent(query);

  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}`
    : null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="mt-7"
    >
      {/* VENUE DETAILS */}

      <div className="mb-4">
        <p className="text-[8px] uppercase tracking-[0.3em] text-[#b45e43]">
          The venue
        </p>

        {venue && (
          <h4 className="font-display mt-2 text-2xl tracking-[-0.035em] text-[#261b1d] sm:text-3xl">
            {venue}
          </h4>
        )}

        {address && (
          <div className="mt-3 flex max-w-2xl gap-2.5">
            <MapPin
              size={15}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-[#b45e43]"
            />

            <p className="text-xs leading-5 text-[#76686a] sm:text-[13px]">
              {address}
            </p>
          </div>
        )}

        {!address && location && (
          <div className="mt-3 flex max-w-2xl gap-2.5">
            <MapPin
              size={15}
              strokeWidth={1.4}
              className="mt-0.5 shrink-0 text-[#b45e43]"
            />

            <p className="text-xs leading-5 text-[#76686a] sm:text-[13px]">
              {location}
            </p>
          </div>
        )}
      </div>

      {/* MAP FRAME */}

      <div className="relative mx-auto max-w-2xl">
        {/* soft outer gold border */}

        <div className="pointer-events-none absolute -inset-2 rounded-[26px] border border-[#b99155]/20" />

        {/* inner wine border */}

        <div className="pointer-events-none absolute -inset-[5px] rounded-[24px] border border-[#35151c]/10" />

        <div className="relative overflow-hidden rounded-[20px] border border-[#b99155]/30 bg-[#eadfd3] p-[5px] shadow-[0_12px_35px_rgba(53,21,28,0.08)]">
          <div className="relative overflow-hidden rounded-[15px] border border-white/30">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={
                  venue
                    ? `Map showing ${venue}`
                    : "Event venue map"
                }
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-[165px] w-full border-0 sm:h-[195px]"
              />
            ) : (
              <div className="flex h-[165px] items-center justify-center px-6 text-center sm:h-[195px]">
                <div>
                  <MapPin
                    size={28}
                    strokeWidth={1.2}
                    className="mx-auto text-[#b45e43]"
                  />

                  <p className="font-display mt-3 text-xl text-[#261b1d]">
                    {venue || location}
                  </p>

                  <p className="mt-2 text-xs text-[#76686a]">
                    Map preview unavailable.
                  </p>
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#35151c]/5" />
          </div>
        </div>

        {/* DECORATIVE CORNERS */}

        <div className="pointer-events-none absolute -left-3 -top-3 h-6 w-6 border-l border-t border-[#b45e43]/50" />

        <div className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 border-r border-t border-[#b45e43]/50" />

        <div className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 border-b border-l border-[#b45e43]/50" />

        <div className="pointer-events-none absolute -bottom-3 -right-3 h-6 w-6 border-b border-r border-[#b45e43]/50" />
      </div>
    </motion.div>
  );
}