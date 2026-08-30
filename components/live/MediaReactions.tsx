"use client";

import {
  useEffect,
  useState,
} from "react";

type Reaction =
  | "heart"
  | "fire"
  | "laugh"
  | "wow";

type ReactionCounts = {
  heart: number;
  fire: number;
  laugh: number;
  wow: number;
};

type MediaReactionsProps = {
  mediaId: string;
};

const REACTIONS: {
  key: Reaction;
  emoji: string;
}[] = [
  {
    key: "heart",
    emoji: "❤️",
  },
  {
    key: "fire",
    emoji: "🔥",
  },
  {
    key: "laugh",
    emoji: "😂",
  },
  {
    key: "wow",
    emoji: "😮",
  },
];

const EMPTY_COUNTS: ReactionCounts = {
  heart: 0,
  fire: 0,
  laugh: 0,
  wow: 0,
};

export default function MediaReactions({
  mediaId,
}: MediaReactionsProps) {
  const [
    counts,
    setCounts,
  ] = useState<ReactionCounts>(
    EMPTY_COUNTS,
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    let cancelled =
      false;

    async function loadReactions() {
      setLoading(true);

      try {
        const response =
          await fetch(
            `/api/live/media/${mediaId}/reactions`,
            {
              cache:
                "no-store",
            },
          );

        if (!response.ok) {
          return;
        }

        const data =
          await response.json();

        if (!cancelled) {
          setCounts(
            data.counts ??
              EMPTY_COUNTS,
          );
        }
      } catch (error) {
        console.error(
          "Failed to load reactions:",
          error,
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReactions();

    return () => {
      cancelled = true;
    };
  }, [mediaId]);

  async function react(
    reaction: Reaction,
  ) {
    if (loading) {
      return;
    }

    setCounts(
      (current) => ({
        ...current,
        [reaction]:
          current[reaction] +
          1,
      }),
    );

    try {
      const response =
        await fetch(
          `/api/live/media/${mediaId}/reactions`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              reaction,
            }),
          },
        );

      if (!response.ok) {
        throw new Error(
          "Reaction request failed",
        );
      }
    } catch (error) {
      console.error(
        "Failed to save reaction:",
        error,
      );

      setCounts(
        (current) => ({
          ...current,
          [reaction]:
            Math.max(
              0,
              current[
                reaction
              ] - 1,
            ),
        }),
      );
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {REACTIONS.map(
        ({
          key,
          emoji,
        }) => (
          <button
            key={key}
            type="button"
            disabled={
              loading
            }
            onClick={() =>
              react(key)
            }
            className="flex min-h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 text-white backdrop-blur-md transition hover:bg-white/[0.12] active:scale-95 disabled:cursor-default disabled:opacity-50"
          >
            <span className="text-base leading-none">
              {emoji}
            </span>

            {counts[key] >
              0 && (
              <span className="text-[10px] tabular-nums text-white/60">
                {
                  counts[
                    key
                  ]
                }
              </span>
            )}
          </button>
        ),
      )}
    </div>
  );
}