import {
  Clock3,
  MapPin,
  Navigation,
  Radio,
} from "lucide-react";

type LiveEvent = {
  id: string;
  name: string;
  slug: string;
  date: string | null;
  startTime: string | null;
  endTime?: string | null;
  venueName: string | null;
  locationName: string | null;
  address: string | null;
  mapsUrl: string | null;
  liveStatus:
    | "upcoming"
    | "live"
    | "completed"
    | "delayed";
  liveMessage: string | null;
};

type HappeningNowProps = {
  event: LiveEvent | null;
  events?: LiveEvent[];
};

function formatTime(
  time: string | null | undefined,
) {
  if (!time) {
    return null;
  }

  const [
    rawHour,
    rawMinute,
  ] = time.split(":");

  const hour =
    Number(rawHour);

  const minute =
    Number(rawMinute);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute)
  ) {
    return time;
  }

  const suffix =
    hour >= 12
      ? "PM"
      : "AM";

  const displayHour =
    hour % 12 || 12;

  return `${displayHour}:${String(
    minute,
  ).padStart(2, "0")} ${suffix}`;
}

function findNextEvent(
  currentEvent: LiveEvent | null,
  events: LiveEvent[],
) {
  const available =
    events.filter(
      (item) =>
        item.liveStatus !==
          "completed" &&
        item.id !==
          currentEvent?.id,
    );

  if (
    available.length === 0
  ) {
    return null;
  }

  const statusPriority: Record<
    LiveEvent["liveStatus"],
    number
  > = {
    live: 0,
    delayed: 1,
    upcoming: 2,
    completed: 3,
  };

  return [...available].sort(
    (a, b) => {
      const statusDifference =
        statusPriority[
          a.liveStatus
        ] -
        statusPriority[
          b.liveStatus
        ];

      if (
        statusDifference !== 0
      ) {
        return statusDifference;
      }

      const aDate =
        a.date ?? "";

      const bDate =
        b.date ?? "";

      if (aDate !== bDate) {
        return aDate.localeCompare(
          bDate,
        );
      }

      return (
        a.startTime ?? ""
      ).localeCompare(
        b.startTime ?? "",
      );
    },
  )[0];
}

export default function HappeningNow({
  event,
  events = [],
}: HappeningNowProps) {
  const nextEvent =
    findNextEvent(
      event,
      events,
    );

  /*
   * Nothing is currently live.
   * Still show a compact "Coming Up" state
   * instead of a giant empty section.
   */
  if (!event) {
    if (!nextEvent) {
      return null;
    }

    const nextTime =
      formatTime(
        nextEvent.startTime,
      );

    return (
      <section className="px-5 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <div className="border-y border-[#35151c]/10 py-5 sm:py-6">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#b45e43]">
              Coming up
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-3xl tracking-[-0.04em] text-[#35151c] sm:text-4xl">
                  {
                    nextEvent.name
                  }
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#76686a]">
                  {nextTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock3
                        size={
                          13
                        }
                      />

                      {
                        nextTime
                      }
                    </span>
                  )}

                  {nextEvent.locationName && (
                    <span>
                      {
                        nextEvent.locationName
                      }
                    </span>
                  )}
                </div>
              </div>

              {nextEvent.mapsUrl && (
                <a
                  href={
                    nextEvent.mapsUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 border-b border-[#35151c] pb-1 text-[10px] uppercase tracking-[0.18em] text-[#35151c]"
                >
                  <Navigation
                    size={
                      13
                    }
                  />

                  Open maps
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isDelayed =
    event.liveStatus ===
    "delayed";

  const startTime =
    formatTime(
      event.startTime,
    );

  const nextTime =
    formatTime(
      nextEvent?.startTime,
    );

  return (
    <section
      id="happening-now"
      className="px-5 py-6 sm:px-6 sm:py-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Main live command center */}
        <div className="relative overflow-hidden border-y border-[#35151c]/15 py-6 sm:py-8">
          <div className="flex items-center gap-2">
            <span
              className={`relative flex h-2 w-2 ${
                isDelayed
                  ? "text-[#d49a52]"
                  : "text-[#b45e43]"
              }`}
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#b45e43]">
              {isDelayed
                ? "Schedule update"
                : "Happening now"}
            </p>
          </div>

          <div className="mt-4 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="flex items-start gap-3">
                {!isDelayed && (
                  <Radio
                    size={
                      18
                    }
                    className="mt-2 shrink-0 text-[#b45e43]"
                  />
                )}

                <div>
                  <h1 className="font-display text-[clamp(2.25rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.055em] text-[#35151c]">
                    {
                      event.name
                    }
                  </h1>

                  {event.liveMessage && (
                    <p className="font-editorial mt-3 max-w-2xl text-lg leading-6 text-[#5b2631] sm:text-xl">
                      {
                        event.liveMessage
                      }
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#76686a]">
                {startTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock3
                      size={13}
                    />

                    {
                      startTime
                    }
                  </span>
                )}

                {(event.venueName ||
                  event.locationName) && (
                  <span className="flex items-center gap-1.5">
                    <MapPin
                      size={13}
                    />

                    <span>
                      {[
                        event.venueName,
                        event.locationName,
                      ]
                        .filter(
                          Boolean,
                        )
                        .join(
                          " · ",
                        )}
                    </span>
                  </span>
                )}
              </div>

              {event.address && (
                <p className="mt-2 max-w-xl text-[11px] leading-5 text-[#76686a]/80">
                  {
                    event.address
                  }
                </p>
              )}
            </div>

            {event.mapsUrl && (
              <a
                href={
                  event.mapsUrl
                }
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#35151c] px-5 text-[9px] uppercase tracking-[0.18em] text-[#f6f0e6] transition-transform active:scale-[0.98]"
              >
                <Navigation
                  size={13}
                />

                Get directions
              </a>
            )}
          </div>
        </div>

        {/* Coming next */}
        {nextEvent && (
          <div className="flex flex-col justify-between gap-2 border-b border-[#35151c]/10 py-4 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-baseline gap-3">
              <span className="shrink-0 text-[8px] uppercase tracking-[0.22em] text-[#b45e43]">
                Up next
              </span>

              <span className="truncate font-display text-lg text-[#35151c]">
                {
                  nextEvent.name
                }
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-3 text-[10px] text-[#76686a]">
              {nextTime && (
                <span>
                  {
                    nextTime
                  }
                </span>
              )}

              {nextEvent.locationName && (
                <>
                  <span className="text-[#b99155]">
                    •
                  </span>

                  <span>
                    {
                      nextEvent.locationName
                    }
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}