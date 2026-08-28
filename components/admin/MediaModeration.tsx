"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Check,
  EyeOff,
  Loader2,
  Star,
  X,
} from "lucide-react";

type ModerationStatus =
  | "pending"
  | "approved"
  | "hidden"
  | "rejected";

type ModerationMedia = {
  id: string;

  mediaType:
    | "photo"
    | "video"
    | "reel";

  mediaUrl: string;

  guestName:
    | string
    | null;

  caption:
    | string
    | null;

  status:
    ModerationStatus;

  isFeatured: boolean;

  createdAt: string;
};

type Props = {
  initialMedia:
    ModerationMedia[];
};

const FILTERS:
  ModerationStatus[] = [
    "pending",
    "approved",
    "hidden",
    "rejected",
  ];

export default function MediaModeration({
  initialMedia,
}: Props) {
  const [media, setMedia] =
    useState(initialMedia);

  const [filter, setFilter] =
    useState<ModerationStatus>(
      "pending",
    );

  const [savingId, setSavingId] =
    useState<string | null>(
      null,
    );

  const [error, setError] =
    useState<string | null>(
      null,
    );

  const visibleMedia =
    useMemo(
      () =>
        media.filter(
          (item) =>
            item.status ===
            filter,
        ),
      [media, filter],
    );

  const pendingCount =
    media.filter(
      (item) =>
        item.status ===
        "pending",
    ).length;

  async function moderate(
    mediaId: string,
    action:
      | "approve"
      | "feature"
      | "reject"
      | "hide",
  ) {
    setSavingId(
      mediaId,
    );

    setError(null);

    try {
      const response =
        await fetch(
          `/api/admin/live/media/${mediaId}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                action,
              }),
          },
        );

      const contentType =
  response.headers.get(
    "content-type",
  );

if (
  !contentType?.includes(
    "application/json",
  )
) {
  const text =
    await response.text();

  console.error(
    "Moderation API returned non-JSON:",
    response.status,
    text.slice(
      0,
      500,
    ),
  );

  throw new Error(
    `Moderation API failed (${response.status}). Check the terminal for the actual server error.`,
  );
}

const data =
  await response.json();

if (!response.ok) {
  throw new Error(
    data.error ??
      "Unable to moderate media.",
  );
}

      setMedia(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              mediaId
                ? {
                    ...item,

                    status:
                      data
                        .media
                        .status,

                    isFeatured:
                      data
                        .media
                        .is_featured,
                  }
                : item,
          ),
      );
    } catch (error) {
      setError(
        error instanceof
          Error
          ? error.message
          : "Unable to moderate media.",
      );
    } finally {
      setSavingId(
        null,
      );
    }
  }

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b646d]">
            Guest content
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Media moderation
          </h2>

          <p className="mt-2 text-sm text-[#786a6d]">
            {pendingCount}{" "}
            awaiting review
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map(
            (status) => (
              <button
                key={
                  status
                }
                type="button"
                onClick={() =>
                  setFilter(
                    status,
                  )
                }
                className={`min-h-10 rounded-full border px-4 text-xs capitalize ${
                  filter ===
                  status
                    ? "border-[#35151c] bg-[#35151c] text-white"
                    : "border-[#35151c]/15 bg-white text-[#35151c]"
                }`}
              >
                {status}

                {status ===
                  "pending" &&
                  ` (${pendingCount})`}
              </button>
            ),
          )}
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {visibleMedia.length ===
      0 ? (
        <div className="mt-6 rounded-2xl border border-[#ddd1c8] bg-white p-7 text-sm text-[#786a6d]">
          Nothing here.
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {visibleMedia.map(
            (item) => (
              <article
                key={
                  item.id
                }
                className="overflow-hidden rounded-2xl border border-[#ddd1c8] bg-white"
              >
                <div className="bg-[#261b1d]">
                  {item.mediaType ===
                    "photo" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        item.mediaUrl
                      }
                      alt="Guest submission"
                      className="max-h-[440px] w-full object-contain"
                    />
                  ) : (
                    <video
                      src={
                        item.mediaUrl
                      }
                      controls
                      playsInline
                      className="max-h-[440px] w-full"
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#f4ede5] px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
                      {
                        item.mediaType
                      }
                    </span>

                    {item.isFeatured && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-700">
                        Featured
                      </span>
                    )}
                  </div>

                  {item.guestName && (
                    <p className="mt-4 font-medium text-[#35151c]">
                      {
                        item.guestName
                      }
                    </p>
                  )}

                  {item.caption && (
                    <p className="mt-2 text-sm leading-6 text-[#786a6d]">
                      {
                        item.caption
                      }
                    </p>
                  )}

                  <p className="mt-3 text-xs text-[#9a8b8d]">
                    {new Date(
                      item.createdAt,
                    ).toLocaleString(
                      "en-IN",
                    )}
                  </p>

                  {savingId ===
                  item.id ? (
                    <div className="mt-5 flex min-h-11 items-center gap-2 text-sm text-[#786a6d]">
                      <Loader2
                        size={
                          16
                        }
                        className="animate-spin"
                      />

                      Saving
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.status !==
                        "approved" && (
                        <button
                          type="button"
                          onClick={() =>
                            moderate(
                              item.id,
                              "approve",
                            )
                          }
                          className="flex min-h-11 items-center gap-2 rounded-xl bg-[#35151c] px-4 text-sm text-white"
                        >
                          <Check
                            size={
                              15
                            }
                          />

                          Approve
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          moderate(
                            item.id,
                            "feature",
                          )
                        }
                        className="flex min-h-11 items-center gap-2 rounded-xl border border-amber-300 px-4 text-sm text-amber-800"
                      >
                        <Star
                          size={
                            15
                          }
                        />

                        Feature
                      </button>

                      {item.status ===
                      "approved" ? (
                        <button
                          type="button"
                          onClick={() =>
                            moderate(
                              item.id,
                              "hide",
                            )
                          }
                          className="flex min-h-11 items-center gap-2 rounded-xl border border-[#ddd1c8] px-4 text-sm"
                        >
                          <EyeOff
                            size={
                              15
                            }
                          />

                          Hide
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            moderate(
                              item.id,
                              "reject",
                            )
                          }
                          className="flex min-h-11 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm text-red-700"
                        >
                          <X
                            size={
                              15
                            }
                          />

                          Reject
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      )}
    </section>
  );
}