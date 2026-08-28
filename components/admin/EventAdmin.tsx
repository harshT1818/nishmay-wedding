"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
  Pencil,
} from "lucide-react";

type WeddingEvent = {
  id: string;
  name: string;
  slug: string;

  date: string | null;
  start_time: string | null;
  end_time: string | null;

  location_name: string | null;
  venue_name: string | null;
  address: string | null;
  maps_url: string | null;

  description: string | null;
  dress_code: string | null;
  instructions: string | null;

  is_active: boolean;
  sort_order: number;
};

type EventAdminProps = {
  events: WeddingEvent[];
};

export default function EventAdmin({
  events: initialEvents,
}: EventAdminProps) {
  const [events, setEvents] =
    useState(initialEvents);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [draft, setDraft] =
    useState<WeddingEvent | null>(null);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  function startEditing(
    event: WeddingEvent,
  ) {
    setEditingId(event.id);

    setDraft({
      ...event,
    });

    setError(null);
  }

  function cancelEditing() {
    setEditingId(null);
    setDraft(null);
    setError(null);
  }

  function updateDraft<
    K extends keyof WeddingEvent,
  >(
    key: K,
    value: WeddingEvent[K],
  ) {
    setDraft((current) => {
      if (!current) return current;

      return {
        ...current,
        [key]: value,
      };
    });
  }

  async function saveEvent() {
    if (!draft) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/events/${draft.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: draft.name,
            date: draft.date || null,
            startTime:
              draft.start_time || null,
            endTime:
              draft.end_time || null,

            locationName:
              draft.location_name || null,

            venueName:
              draft.venue_name || null,

            address:
              draft.address || null,

            mapsUrl:
              draft.maps_url || null,

            description:
              draft.description || null,

            dressCode:
              draft.dress_code || null,

            instructions:
              draft.instructions || null,

            isActive:
              draft.is_active,

            sortOrder:
              draft.sort_order,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to update event.",
        );
      }

      setEvents((current) =>
        current.map((event) =>
          event.id === draft.id
            ? {
                ...draft,
              }
            : event,
        ),
      );

      setEditingId(null);
      setDraft(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save event.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {events.map((event) => {
        const editing =
          editingId === event.id;

        const current =
          editing && draft
            ? draft
            : event;

        return (
          <article
            key={event.id}
            className="overflow-hidden rounded-[28px] border border-[#ddd1c8] bg-white"
          >
            <div className="p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#9b8589]">
                      {event.slug}
                    </p>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        current.is_active
                          ? "bg-[#edf6ef] text-[#347044]"
                          : "bg-[#f1eeee] text-[#756a6c]"
                      }`}
                    >
                      {current.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif text-2xl tracking-[-0.025em] text-[#321f24] sm:text-[28px]">
                    {event.name}
                  </h2>
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() =>
                      startEditing(event)
                    }
                    className="flex w-fit items-center gap-2 rounded-full border border-[#d8cbc5] px-4 py-2 text-xs font-medium text-[#321f24] transition hover:border-[#321f24]"
                  >
                    <Pencil size={13} />
                    Edit event
                  </button>
                )}
              </div>

              {!editing && (
                <>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <DetailRow
                      icon={
                        <CalendarDays
                          size={17}
                        />
                      }
                      label="Date"
                      value={
                        event.date
                          ? formatDate(
                              event.date,
                            )
                          : "Date TBD"
                      }
                    />

                    <DetailRow
                      icon={
                        <Clock3 size={17} />
                      }
                      label="Time"
                      value={formatTimeRange(
                        event.start_time,
                        event.end_time,
                      )}
                    />
                  </div>

                  <div className="mt-7 border-t border-[#eee4dd] pt-7">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#b45e43]">
                      Venue
                    </p>

                    <div className="mt-4 flex gap-3">
                      <MapPin
                        size={19}
                        strokeWidth={1.5}
                        className="mt-1 shrink-0 text-[#b45e43]"
                      />

                      <div className="min-w-0">
                        <p className="font-serif text-xl text-[#321f24]">
                          {event.venue_name ??
                            "Venue TBD"}
                        </p>

                        {event.location_name && (
                          <p className="mt-1 text-sm font-medium text-[#6f6265]">
                            {
                              event.location_name
                            }
                          </p>
                        )}

                        {event.address && (
                          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#8a7a7d]">
                            {event.address}
                          </p>
                        )}

                        {event.maps_url && (
                          <a
                            href={
                              event.maps_url
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#b45e43] transition hover:text-[#321f24]"
                          >
                            Open in Google
                            Maps
                            <ExternalLink
                              size={12}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {(event.dress_code ||
                    event.description ||
                    event.instructions) && (
                    <div className="mt-7 border-t border-[#eee4dd] pt-7">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {event.dress_code && (
                          <Info
                            label="Dress code"
                            value={
                              event.dress_code
                            }
                          />
                        )}

                        {event.description && (
                          <Info
                            label="Description"
                            value={
                              event.description
                            }
                          />
                        )}

                        {event.instructions && (
                          <Info
                            label="Instructions"
                            value={
                              event.instructions
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {editing && draft && (
                <div className="mt-8 space-y-7 border-t border-[#eee4dd] pt-7">
                  <div>
                    <SectionLabel>
                      Event details
                    </SectionLabel>

                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Event name"
                        value={current.name}
                        onChange={(value) =>
                          updateDraft(
                            "name",
                            value,
                          )
                        }
                      />

                      <Field
                        label="Date"
                        type="date"
                        value={
                          current.date ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "date",
                            value || null,
                          )
                        }
                      />

                      <Field
                        label="Start time"
                        type="time"
                        value={
                          current.start_time ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "start_time",
                            value || null,
                          )
                        }
                      />

                      <Field
                        label="End time"
                        type="time"
                        value={
                          current.end_time ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "end_time",
                            value || null,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#eee4dd] pt-7">
                    <SectionLabel>
                      Venue & directions
                    </SectionLabel>

                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Venue name"
                        placeholder="e.g. Samaj Hall Bhavan"
                        value={
                          current.venue_name ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "venue_name",
                            value || null,
                          )
                        }
                      />

                      <Field
                        label="Location / Area"
                        placeholder="e.g. Airoli, Navi Mumbai"
                        value={
                          current.location_name ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "location_name",
                            value || null,
                          )
                        }
                      />
                    </div>

                    <div className="mt-5">
                      <TextArea
                        label="Exact address"
                        placeholder="Full venue address"
                        rows={3}
                        value={
                          current.address ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "address",
                            value || null,
                          )
                        }
                      />
                    </div>

                    <div className="mt-5">
                      <Field
                        label="Google Maps URL"
                        placeholder="https://maps.app.goo.gl/..."
                        value={
                          current.maps_url ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "maps_url",
                            value || null,
                          )
                        }
                      />

                      {current.maps_url && (
                        <a
                          href={
                            current.maps_url
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#b45e43]"
                        >
                          Test map link
                          <ExternalLink
                            size={11}
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-[#eee4dd] pt-7">
                    <SectionLabel>
                      Guest information
                    </SectionLabel>

                    <div className="mt-4 space-y-5">
                      <TextArea
                        label="Description"
                        value={
                          current.description ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "description",
                            value || null,
                          )
                        }
                      />

                      <Field
                        label="Dress code"
                        value={
                          current.dress_code ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "dress_code",
                            value || null,
                          )
                        }
                      />

                      <TextArea
                        label="Instructions"
                        value={
                          current.instructions ??
                          ""
                        }
                        onChange={(value) =>
                          updateDraft(
                            "instructions",
                            value || null,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#eee4dd] pt-7">
                    <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-[#4e4144]">
                      <input
                        type="checkbox"
                        checked={
                          current.is_active
                        }
                        onChange={(event) =>
                          updateDraft(
                            "is_active",
                            event.target
                              .checked,
                          )
                        }
                        className="h-4 w-4 accent-[#321f24]"
                      />

                      Event is active
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-[#eee4dd] pt-6">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={saveEvent}
                      className="rounded-full bg-[#321f24] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#4b2b33] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving
                        ? "Saving..."
                        : "Save changes"}
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={
                        cancelEditing
                      }
                      className="rounded-full border border-[#d8cbc5] px-6 py-3 text-sm text-[#4e4144] transition hover:border-[#321f24]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f3] px-4 py-3.5">
      <div className="text-[#b45e43]">
        {icon}
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-[#9b898c]">
          {label}
        </p>

        <p className="mt-1 text-sm text-[#392b2f]">
          {value}
        </p>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-[#9b898c]">
        {label}
      </p>

      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#625356]">
        {value}
      </p>
    </div>
  );
}

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#b45e43]">
      {children}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-[#4e4144]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-[#d8cbc5] bg-white px-4 py-3 text-sm text-[#321f24] outline-none transition placeholder:text-[#b9acad] focus:border-[#321f24]"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-[#4e4144]">
        {label}
      </label>

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full resize-y rounded-xl border border-[#d8cbc5] bg-white px-4 py-3 text-sm leading-6 text-[#321f24] outline-none transition placeholder:text-[#b9acad] focus:border-[#321f24]"
      />
    </div>
  );
}

function formatDate(
  dateString: string,
) {
  const [year, month, day] =
    dateString.split("-").map(Number);

  const date = new Date(
    year,
    month - 1,
    day,
  );

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function formatTimeRange(
  startTime: string | null,
  endTime: string | null,
) {
  if (!startTime) {
    return "Time TBD";
  }

  const start = formatTime(startTime);

  if (!endTime) {
    return start;
  }

  return `${start} – ${formatTime(
    endTime,
  )}`;
}

function formatTime(time: string) {
  const [hourString, minuteString] =
    time.split(":");

  const hour = Number(hourString);
  const minute = Number(minuteString);

  const date = new Date();

  date.setHours(
    hour,
    minute,
    0,
    0,
  );

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  ).format(date);
}