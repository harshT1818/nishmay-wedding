"use client";

import type {
  WeddingUpdate,
} from "@/lib/live/getLiveWeddingData";

type LiveFeedProps = {
  updates: WeddingUpdate[];
};

function formatPublishedTime(
  value: string,
) {
  return new Date(
    value,
  ).toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  );
}

export default function LiveFeed({
  updates,
}: LiveFeedProps) {
  return (
    <section className="px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-[9px] uppercase tracking-[0.28em] text-[#b45e43]">
          From the celebration
        </p>

        <h2 className="font-display mt-4 text-4xl tracking-[-0.045em] text-[#35151c] sm:text-5xl">
          Live updates
        </h2>

        {updates.length === 0 ? (
          <p className="mt-8 text-sm leading-6 text-[#76686a]">
            Updates will appear
            here once celebrations
            begin.
          </p>
        ) : (
          <div className="mt-9">
            {updates.map(
              (
                update,
                index,
              ) => (
                <article
                  key={
                    update.id
                  }
                  className={`relative grid grid-cols-[70px_1fr] gap-4 py-6 sm:grid-cols-[90px_1fr] ${
                    index !==
                    updates.length -
                      1
                      ? "border-b border-[#35151c]/10"
                      : ""
                  }`}
                >
                  <div>
                    <p className="text-xs font-medium text-[#8e4438]">
                      {formatPublishedTime(
                        update.publishedAt,
                      )}
                    </p>

                    {update.isPinned && (
                      <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#b99155]">
                        Pinned
                      </p>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-display break-words text-xl tracking-[-0.03em] text-[#35151c] sm:text-2xl">
                      {update.title}
                    </h3>

                    {update.message && (
                      <p className="mt-2 break-words text-sm leading-6 text-[#76686a]">
                        {
                          update.message
                        }
                      </p>
                    )}
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}