"use client";

import { useMemo, useState } from "react";

type LiveStatus =
  | "upcoming"
  | "live"
  | "completed"
  | "delayed";

type LiveEvent = {
  id: string;
  name: string;
  slug: string;
  liveStatus: LiveStatus;
  liveMessage: string | null;
};

type WeddingUpdate = {
  id: string;
  title: string;
  message: string | null;
  updateType: string;
  isPinned: boolean;
  publishedAt: string;
};

type LiveAdminProps = {
  initialEvents: LiveEvent[];
  initialUpdates: WeddingUpdate[];
};

const UPDATE_TYPES = [
  "update",
  "announcement",
  "schedule",
  "food",
  "transport",
  "highlight",
];

export default function LiveAdmin({
  initialEvents,
  initialUpdates,
}: LiveAdminProps) {
  const [events, setEvents] =
    useState(initialEvents);

  const [updates, setUpdates] =
    useState(initialUpdates);

  const [selectedEventId, setSelectedEventId] =
    useState(
      initialEvents.find(
        (event) =>
          event.liveStatus === "live",
      )?.id ??
        initialEvents[0]?.id ??
        "",
    );

  const [liveMessage, setLiveMessage] =
    useState(
      initialEvents.find(
        (event) =>
          event.id === selectedEventId,
      )?.liveMessage ?? "",
    );

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [updateType, setUpdateType] =
    useState("announcement");

  const [isPinned, setIsPinned] =
    useState(false);

  const [savingEvent, setSavingEvent] =
    useState(false);

  const [publishing, setPublishing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const selectedEvent = useMemo(
    () =>
      events.find(
        (event) =>
          event.id === selectedEventId,
      ) ?? null,
    [events, selectedEventId],
  );

  function selectEvent(eventId: string) {
    setSelectedEventId(eventId);

    const event =
      events.find(
        (item) =>
          item.id === eventId,
      );

    setLiveMessage(
      event?.liveMessage ?? "",
    );

    setError(null);
  }

  async function updateEventStatus(
    status: LiveStatus,
  ) {
    if (!selectedEvent) return;

    setSavingEvent(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/live/events/${selectedEvent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
            liveMessage:
              liveMessage.trim() ||
              null,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to update live event.",
        );
      }

      setEvents((current) =>
        current.map(
          (event) => {
            if (
              status === "live" &&
              event.id !==
                selectedEvent.id &&
              event.liveStatus ===
                "live"
            ) {
              return {
                ...event,
                liveStatus:
                  "upcoming",
              };
            }

            if (
              event.id ===
              selectedEvent.id
            ) {
              return {
                ...event,
                liveStatus:
                  status,
                liveMessage:
                  liveMessage.trim() ||
                  null,
              };
            }

            return event;
          },
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update live event.",
      );
    } finally {
      setSavingEvent(false);
    }
  }

  async function saveLiveMessage() {
    if (!selectedEvent) return;

    setSavingEvent(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/live/events/${selectedEvent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status:
              selectedEvent.liveStatus,
            liveMessage:
              liveMessage.trim() ||
              null,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to save live message.",
        );
      }

      setEvents((current) =>
        current.map(
          (event) =>
            event.id ===
            selectedEvent.id
              ? {
                  ...event,
                  liveMessage:
                    liveMessage.trim() ||
                    null,
                }
              : event,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save live message.",
      );
    } finally {
      setSavingEvent(false);
    }
  }

  async function publishUpdate() {
    if (!title.trim()) {
      setError(
        "Update title is required.",
      );
      return;
    }

    setPublishing(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/admin/live/updates",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            eventId:
              selectedEventId ||
              null,
            title:
              title.trim(),
            message:
              message.trim() ||
              null,
            updateType,
            isPinned,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to publish update.",
        );
      }

      setUpdates((current) => [
        data.update,
        ...current,
      ]);

      setTitle("");
      setMessage("");
      setUpdateType(
        "announcement",
      );
      setIsPinned(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to publish update.",
      );
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b646d]">
          Wedding control room
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Current event
        </h2>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Event
          </label>

          <select
            value={selectedEventId}
            onChange={(event) =>
              selectEvent(
                event.target.value,
              )
            }
            className="mt-2 w-full rounded-xl border border-[#d8cbc5] bg-white px-4 py-3"
          >
            {events.map(
              (event) => (
                <option
                  key={event.id}
                  value={event.id}
                >
                  {event.name}
                </option>
              ),
            )}
          </select>
        </div>

        {selectedEvent && (
          <>
            <div className="mt-6">
              <p className="text-sm font-medium">
                Live status
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(
                  [
                    "upcoming",
                    "live",
                    "delayed",
                    "completed",
                  ] as LiveStatus[]
                ).map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={
                        savingEvent
                      }
                      onClick={() =>
                        updateEventStatus(
                          status,
                        )
                      }
                      className={`min-h-11 rounded-xl border px-3 py-2 text-sm capitalize transition disabled:opacity-60 ${
                        selectedEvent.liveStatus ===
                        status
                          ? status ===
                            "live"
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-[#321f24] bg-[#f4ede5] text-[#321f24]"
                          : "border-[#ddd1c8] text-[#76696b] hover:bg-[#faf6f1]"
                      }`}
                    >
                      {status ===
                      "live"
                        ? "● Live"
                        : status}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="liveMessage"
                className="text-sm font-medium"
              >
                Live message
              </label>

              <textarea
                id="liveMessage"
                rows={3}
                value={liveMessage}
                onChange={(event) =>
                  setLiveMessage(
                    event.target.value,
                  )
                }
                placeholder="The couple is about to enter..."
                className="mt-2 w-full resize-none rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
              />

              <button
                type="button"
                disabled={
                  savingEvent
                }
                onClick={
                  saveLiveMessage
                }
                className="mt-3 rounded-xl border border-[#321f24] px-4 py-2.5 text-sm font-medium disabled:opacity-60"
              >
                {savingEvent
                  ? "Saving..."
                  : "Save message"}
              </button>
            </div>
          </>
        )}
      </section>

      <section className="rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b646d]">
          Publish
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Post wedding update
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="updateTitle"
              className="text-sm font-medium"
            >
              Title
            </label>

            <input
              id="updateTitle"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              placeholder="Couple entry in 10 minutes"
              className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
            />
          </div>

          <div>
            <label
              htmlFor="updateMessage"
              className="text-sm font-medium"
            >
              Message
            </label>

            <textarea
              id="updateMessage"
              rows={4}
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value,
                )
              }
              placeholder="Find your seats and get ready."
              className="mt-2 w-full resize-none rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
            />
          </div>

          <div>
            <label
              htmlFor="updateType"
              className="text-sm font-medium"
            >
              Type
            </label>

            <select
              id="updateType"
              value={updateType}
              onChange={(event) =>
                setUpdateType(
                  event.target.value,
                )
              }
              className="mt-2 w-full rounded-xl border border-[#d8cbc5] bg-white px-4 py-3"
            >
              {UPDATE_TYPES.map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ),
              )}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e3d8d0] p-4">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(event) =>
                setIsPinned(
                  event.target.checked,
                )
              }
            />

            <div>
              <p className="text-sm font-medium">
                Pin this update
              </p>

              <p className="mt-1 text-xs text-[#786a6d]">
                Important updates
                appear first.
              </p>
            </div>
          </label>

          <button
            type="button"
            disabled={publishing}
            onClick={publishUpdate}
            className="w-full rounded-xl bg-[#321f24] px-5 py-3 font-medium text-white disabled:opacity-60"
          >
            {publishing
              ? "Publishing..."
              : "Publish Update"}
          </button>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b646d]">
              Timeline
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Recent updates
            </h2>
          </div>

          <p className="text-sm text-[#786a6d]">
            {updates.length}
          </p>
        </div>

        <div className="space-y-3">
          {updates.length ===
          0 ? (
            <div className="rounded-2xl border border-[#ddd1c8] bg-white p-5 text-sm text-[#786a6d]">
              No updates yet.
            </div>
          ) : (
            updates.map(
              (update) => (
                <article
                  key={update.id}
                  className="rounded-2xl border border-[#ddd1c8] bg-white p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f4ede5] px-3 py-1 text-[10px] uppercase tracking-[0.12em]">
                      {
                        update.updateType
                      }
                    </span>

                    {update.isPinned && (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-700">
                        Pinned
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold">
                    {update.title}
                  </h3>

                  {update.message && (
                    <p className="mt-2 text-sm leading-6 text-[#786a6d]">
                      {
                        update.message
                      }
                    </p>
                  )}

                  <p className="mt-3 text-xs text-[#9a8b8d]">
                    {new Date(
                      update.publishedAt,
                    ).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </article>
              ),
            )
          )}
        </div>
      </section>
    </div>
  );
}