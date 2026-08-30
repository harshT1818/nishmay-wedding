"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Play,
  Star,
} from "lucide-react";

import type {
  LiveMedia,
} from "@/lib/live/getLiveWeddingData";

import MediaLightbox from "@/components/live/MediaLightbox";

type MediaWallProps = {
  media: LiveMedia[];
};

type MediaRowProps = {
  media: LiveMedia[];
  direction:
    | "left"
    | "right";
  duration: number;
  onOpen: (
    item: LiveMedia,
  ) => void;
};

function MediaItem({
  item,
  onOpen,
}: {
  item: LiveMedia;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open wedding moment"
      className="group relative h-[112px] shrink-0 overflow-hidden rounded-[8px] bg-[#e9e0d7] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#b45e43] sm:h-[145px] lg:h-[165px]"
    >
      {item.mediaType ===
      "photo" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.mediaUrl}
          alt={
            item.caption ??
            "Wedding moment"
          }
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-[1.015]"
        />
      ) : (
        <>
          <video
            src={item.mediaUrl}
            muted
            playsInline
            preload="metadata"
            className="h-full w-auto max-w-none object-contain"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm">
              <Play
                size={14}
                fill="currentColor"
              />
            </div>
          </div>
        </>
      )}

      {(item.caption ||
        item.guestName) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-2.5 pb-2 pt-7">
          {item.caption && (
            <p className="max-w-[220px] truncate text-[10px] leading-4 text-white">
              {item.caption}
            </p>
          )}

          {item.guestName && (
            <p className="mt-0.5 text-[7px] uppercase tracking-[0.14em] text-white/65">
              {item.guestName}
            </p>
          )}
        </div>
      )}

      {item.isFeatured && (
        <div className="pointer-events-none absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#f6f0e6]/90 text-[#b45e43] backdrop-blur-sm">
          <Star
            size={11}
            fill="currentColor"
          />
        </div>
      )}
    </button>
  );
}

function MediaRow({
  media,
  direction,
  duration,
  onOpen,
}: MediaRowProps) {
  if (media.length === 0) {
    return null;
  }

  return (
    <div className="media-row relative overflow-hidden">
      <div
        className={`flex w-max items-center gap-2 sm:gap-2.5 ${
          direction ===
          "left"
            ? "media-track-left"
            : "media-track-right"
        }`}
        style={{
          animationDuration:
            `${duration}s`,
        }}
      >
        {media.map(
          (item) => (
            <MediaItem
              key={item.id}
              item={item}
              onOpen={() =>
                onOpen(item)
              }
            />
          ),
        )}
      </div>
    </div>
  );
}

export default function MediaWall({
  media,
}: MediaWallProps) {
  const [
    lightboxIndex,
    setLightboxIndex,
  ] = useState<
    number | null
  >(null);

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

  const rows =
    useMemo(() => {
      const row1:
        LiveMedia[] =
        [];

      const row2:
        LiveMedia[] =
        [];

      const row3:
        LiveMedia[] =
        [];

      sortedMedia.forEach(
        (
          item,
          index,
        ) => {
          if (
            index % 3 ===
            0
          ) {
            row1.push(
              item,
            );
          } else if (
            index % 3 ===
            1
          ) {
            row2.push(
              item,
            );
          } else {
            row3.push(
              item,
            );
          }
        },
      );

      return [
        row1,
        row2,
        row3,
      ];
    }, [
      sortedMedia,
    ]);

  function openMedia(
    item: LiveMedia,
  ) {
    const index =
      sortedMedia.findIndex(
        (mediaItem) =>
          mediaItem.id ===
          item.id,
      );

    if (index !== -1) {
      setLightboxIndex(
        index,
      );
    }
  }

  if (
    sortedMedia.length ===
    0
  ) {
    return null;
  }

  return (
    <>
      <section className="overflow-hidden py-7 sm:py-9">
        <div className="px-5 sm:px-6">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#b45e43]">
              Captured today
            </p>

            <h2 className="font-display mt-2 text-3xl tracking-[-0.04em] text-[#35151c] sm:text-4xl">
              Moments from the celebration.
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-[#76686a]">
              Shared by friends
              and family as the
              celebration unfolds.
            </p>
          </div>
        </div>

        <div className="relative mt-6 sm:mt-7">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#f6f0e6] to-transparent sm:w-20" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#f6f0e6] to-transparent sm:w-20" />

          <div className="space-y-2 sm:space-y-2.5">
            <MediaRow
              media={rows[0]}
              direction="left"
              duration={70}
              onOpen={
                openMedia
              }
            />

            <MediaRow
              media={rows[1]}
              direction="right"
              duration={76}
              onOpen={
                openMedia
              }
            />

            <MediaRow
              media={rows[2]}
              direction="left"
              duration={64}
              onOpen={
                openMedia
              }
            />
          </div>
        </div>

        <style jsx global>{`
          @keyframes mediaTrackLeft {
            from {
              transform: translateX(
                100vw
              );
            }

            to {
              transform: translateX(
                -100%
              );
            }
          }

          @keyframes mediaTrackRight {
            from {
              transform: translateX(
                -100%
              );
            }

            to {
              transform: translateX(
                100vw
              );
            }
          }

          .media-track-left {
            animation-name:
              mediaTrackLeft;

            animation-timing-function:
              linear;

            animation-iteration-count:
              infinite;

            will-change:
              transform;
          }

          .media-track-right {
            animation-name:
              mediaTrackRight;

            animation-timing-function:
              linear;

            animation-iteration-count:
              infinite;

            will-change:
              transform;
          }

          @media (
            prefers-reduced-motion:
              reduce
          ) {
            .media-track-left,
            .media-track-right {
              animation: none;
            }

            .media-row {
              overflow-x: auto;
            }
          }
        `}</style>
      </section>

      <MediaLightbox
        media={
          sortedMedia
        }
        activeIndex={
          lightboxIndex
        }
        onClose={() =>
          setLightboxIndex(
            null,
          )
        }
        onChange={
          setLightboxIndex
        }
      />
    </>
  );
}