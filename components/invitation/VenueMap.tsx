"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ExternalLink,
  MapPin,
} from "lucide-react";

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
  mapsUrl,
}: VenueMapProps) {
  const reduceMotion =
    useReducedMotion();

  const apiKey =
    process.env
      .NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

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
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={
        reduceMotion
          ? {
              duration: 0,
            }
          : {
              duration: 0.85,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }
      }
      className="min-w-0"
    >
      {/* Venue details */}
      <div className="mb-4 min-w-0">
        <p className="text-[8px] uppercase tracking-[0.28em] text-[#b45e43] sm:tracking-[0.3em]">
          The venue
        </p>

        {venue && (
          <h4
            className="
              font-display
              mt-2
              break-words
              text-[1.45rem]
              leading-[1.05]
              tracking-[-0.035em]
              text-[#261b1d]
              sm:text-3xl
            "
          >
            {venue}
          </h4>
        )}

        {(address ||
          location) && (
          <div className="mt-3 flex min-w-0 max-w-2xl items-start gap-2.5">
            <MapPin
              size={15}
              strokeWidth={1.4}
              className="mt-[2px] shrink-0 text-[#b45e43]"
            />

            <p className="min-w-0 break-words text-[11px] leading-5 text-[#76686a] sm:text-[13px]">
              {address ||
                location}
            </p>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="relative min-w-0">
        {/* Decorative frame */}
        <div className="pointer-events-none absolute -inset-1.5 rounded-[23px] border border-[#b99155]/20 sm:-inset-2 sm:rounded-[26px]" />

        <div className="pointer-events-none absolute -inset-[3px] rounded-[21px] border border-[#35151c]/10 sm:-inset-[5px] sm:rounded-[24px]" />

        <div
          className="
            relative
            min-w-0
            overflow-hidden
            rounded-[18px]
            border
            border-[#b99155]/30
            bg-[#eadfd3]
            p-1
            shadow-[0_12px_35px_rgba(53,21,28,0.08)]
            sm:rounded-[20px]
            sm:p-[5px]
          "
        >
          <div className="relative min-w-0 overflow-hidden rounded-[14px] border border-white/30 sm:rounded-[15px]">
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
                className="block h-[170px] w-full border-0 sm:h-[195px]"
              />
            ) : (
              <div className="flex min-h-[170px] items-center justify-center px-5 py-7 text-center sm:min-h-[195px] sm:px-6">
                <div className="min-w-0">
                  <MapPin
                    size={26}
                    strokeWidth={1.2}
                    className="mx-auto text-[#b45e43]"
                  />

                  <p className="font-display mt-3 break-words text-xl text-[#261b1d]">
                    {venue ||
                      location}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#76686a]">
                    Map preview
                    unavailable.
                  </p>

                  {mapsUrl && (
                    <a
                      href={
                        mapsUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="
                        mx-auto
                        mt-4
                        inline-flex
                        min-h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        border
                        border-[#35151c]/15
                        px-4
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-[#35151c]
                        transition
                        hover:border-[#35151c]/35
                        hover:bg-white/40
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#b99155]
                      "
                    >
                      Open in Maps

                      <ExternalLink
                        size={12}
                      />
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#35151c]/5" />
          </div>
        </div>

        {/* Decorative corners */}
        <div className="pointer-events-none absolute -left-2 -top-2 h-5 w-5 border-l border-t border-[#b45e43]/45 sm:-left-3 sm:-top-3 sm:h-6 sm:w-6" />

        <div className="pointer-events-none absolute -right-2 -top-2 h-5 w-5 border-r border-t border-[#b45e43]/45 sm:-right-3 sm:-top-3 sm:h-6 sm:w-6" />

        <div className="pointer-events-none absolute -bottom-2 -left-2 h-5 w-5 border-b border-l border-[#b45e43]/45 sm:-bottom-3 sm:-left-3 sm:h-6 sm:w-6" />

        <div className="pointer-events-none absolute -bottom-2 -right-2 h-5 w-5 border-b border-r border-[#b45e43]/45 sm:-bottom-3 sm:-right-3 sm:h-6 sm:w-6" />
      </div>
    </motion.div>
  );
}