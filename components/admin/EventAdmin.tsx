"use client";

import { useState } from "react";

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

  function updateDraft<K extends keyof WeddingEvent>(
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
              draft.location_name ||
              null,

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
              draft.instructions ||
              null,

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
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
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
            className="rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8b7b7e]">
                  {event.slug}
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {event.name}
                </h2>
              </div>

              <span
                className={`h-fit rounded-full px-3 py-1 text-xs ${
                  current.is_active
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {current.is_active
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            {!editing && (
              <>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <Info
                    label="Date"
                    value={
                      event.date ??
                      "Date TBD"
                    }
                  />

                  <Info
                    label="Time"
                    value={
                      event.start_time ??
                      "Time TBD"
                    }
                  />

                  <Info
                    label="Venue"
                    value={
                      event.venue_name ??
                      "Venue TBD"
                    }
                  />

                  <Info
                    label="Location"
                    value={
                      event.location_name ??
                      "Location TBD"
                    }
                  />

                  <Info
                    label="Dress Code"
                    value={
                      event.dress_code ??
                      "Not set"
                    }
                  />

                  <Info
                    label="Directions"
                    value={
                      event.maps_url
                        ? "Google Maps configured"
                        : "Not set"
                    }
                  />
                </div>

                {event.description && (
                  <p className="mt-6 text-sm leading-7 text-[#6f6265]">
                    {event.description}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    startEditing(event)
                  }
                  className="mt-6 rounded-xl border border-[#321f24] px-4 py-2 text-sm"
                >
                  Edit Event
                </button>
              </>
            )}

            {editing && draft && (
              <div className="mt-7 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
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
                      current.date ?? ""
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

                  <Field
                    label="Venue name"
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
                    label="Location"
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

                <Field
                  label="Address"
                  value={
                    current.address ?? ""
                  }
                  onChange={(value) =>
                    updateDraft(
                      "address",
                      value || null,
                    )
                  }
                />

                <Field
                  label="Google Maps URL"
                  value={
                    current.maps_url ?? ""
                  }
                  onChange={(value) =>
                    updateDraft(
                      "maps_url",
                      value || null,
                    )
                  }
                />

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
                  label="Dress Code"
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

                <div>
                  <label className="flex items-center gap-3 text-sm">
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
                    />

                    Event is active
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={saveEvent}
                    className="rounded-xl bg-[#321f24] px-5 py-2.5 text-sm text-white disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      cancelEditing
                    }
                    className="rounded-xl border border-[#d8cbc5] px-5 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </article>
        );
      })}
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
      <p className="text-xs uppercase tracking-[0.18em] text-[#8b7b7e]">
        {label}
      </p>

      <p className="mt-2 text-sm">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <textarea
        rows={4}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full resize-y rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
      />
    </div>
  );
}