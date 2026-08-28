"use client";

import { useState } from "react";

type WeddingEvent = {
  id: string;
  name: string;
  slug: string;
  date: string | null;
  location_name: string | null;
  sort_order: number;
  is_active: boolean;
};

type ManagedInvitation = {
  id: string;
  status: string;
  url: string | null;
  eventIds: string[];
  rsvpStatus: string | null;
};

type ManagedGuest = {
  id: string;
  display_name: string;
  household_name: string | null;
  max_guests: number;
  is_active: boolean;
  created_at: string;

  invitation: ManagedInvitation | null;
};

type GuestAdminProps = {
  guests: ManagedGuest[];
  events: WeddingEvent[];
};

export default function GuestAdmin({
  guests: initialGuests,
  events,
}: GuestAdminProps) {
  const [guests, setGuests] =
    useState(initialGuests);

  const [displayName, setDisplayName] =
    useState("");

  const [householdName, setHouseholdName] =
    useState("");

  const [maxGuests, setMaxGuests] =
    useState(1);

  const [
    selectedEvents,
    setSelectedEvents,
  ] = useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [copiedGuestId, setCopiedGuestId] =
  useState<string | null>(null);

  const [editingGuestId, setEditingGuestId] =
    useState<string | null>(null);

  const [
    editingEventIds,
    setEditingEventIds,
  ] = useState<string[]>([]);

  const [savingGuestId, setSavingGuestId] =
    useState<string | null>(null);

  function toggleCreateEvent(
    eventId: string,
  ) {
    setSelectedEvents((current) =>
      current.includes(eventId)
        ? current.filter(
            (id) => id !== eventId,
          )
        : [...current, eventId],
    );
  }

  function toggleEditEvent(
    eventId: string,
  ) {
    setEditingEventIds((current) =>
      current.includes(eventId)
        ? current.filter(
            (id) => id !== eventId,
          )
        : [...current, eventId],
    );
  }

  async function createGuest() {
    setError(null);

    if (!displayName.trim()) {
      setError("Guest name is required.");
      return;
    }

    if (selectedEvents.length === 0) {
      setError(
        "Select at least one event.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/guests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            displayName:
              displayName.trim(),

            householdName:
              householdName.trim() ||
              null,

            maxGuests,

            eventIds:
              selectedEvents,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to create guest.",
        );
      }

      const newGuest: ManagedGuest = {
        ...data.guest,

        invitation: {
          id:
            data.invitation
              .invitationId,

          status: "active",

          url:
            data.invitation.url,

          eventIds:
            selectedEvents,

          rsvpStatus: null,
        },
      };

      setGuests((current) => [
        newGuest,
        ...current,
      ]);

      setDisplayName("");
      setHouseholdName("");
      setMaxGuests(1);
      setSelectedEvents([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create guest.",
      );
    } finally {
      setLoading(false);
    }
  }

  function startEditing(
    guest: ManagedGuest,
  ) {
    if (!guest.invitation) return;

    setEditingGuestId(guest.id);

    setEditingEventIds(
      guest.invitation.eventIds,
    );
  }

  async function saveEvents(
    guest: ManagedGuest,
  ) {
    if (!guest.invitation) return;

    if (editingEventIds.length === 0) {
      setError(
        "Invitation must contain at least one event.",
      );
      return;
    }

    setSavingGuestId(guest.id);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/invitations/${guest.invitation.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            eventIds:
              editingEventIds,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to update events.",
        );
      }

      setGuests((current) =>
        current.map((item) => {
          if (
            item.id !== guest.id ||
            !item.invitation
          ) {
            return item;
          }

          return {
            ...item,

            invitation: {
              ...item.invitation,

              eventIds: [
                ...editingEventIds,
              ],
            },
          };
        }),
      );

      setEditingGuestId(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update events.",
      );
    } finally {
      setSavingGuestId(null);
    }
  }

  async function toggleStatus(
    guest: ManagedGuest,
  ) {
    if (!guest.invitation) return;

    const nextStatus =
      guest.invitation.status ===
      "active"
        ? "inactive"
        : "active";

    setSavingGuestId(guest.id);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/invitations/${guest.invitation.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: nextStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to update invitation.",
        );
      }

      setGuests((current) =>
        current.map((item) => {
          if (
            item.id !== guest.id ||
            !item.invitation
          ) {
            return item;
          }

          return {
            ...item,

            invitation: {
              ...item.invitation,
              status: nextStatus,
            },
          };
        }),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update invitation.",
      );
    } finally {
      setSavingGuestId(null);
    }
  }

  function absoluteInvitationUrl(
    relativeUrl: string,
  ) {
    return `${window.location.origin}${relativeUrl}`;
  }

  async function copyInvitation(
    guestId: string,
    relativeUrl: string,
  ) {
    try {
      await navigator.clipboard.writeText(
        absoluteInvitationUrl(
          relativeUrl,
        ),
      );

      setCopiedGuestId(
        guestId,
      );

      window.setTimeout(() => {
        setCopiedGuestId(
          (current) =>
            current === guestId
              ? null
              : current,
        );
      }, 1800);
    } catch {
      setError(
        "Unable to copy invitation link.",
      );
    }
  }

  function openWhatsApp(
    guest: ManagedGuest,
  ) {
    if (
      !guest.invitation?.url ||
      guest.invitation.status !==
        "active"
    ) {
      return;
    }

    const invitationUrl =
      absoluteInvitationUrl(
        guest.invitation.url,
      );

    const message =
      `Hi ${guest.display_name}! 💛\n\n` +
      `We'd love for you to be a part of Nishita & Mayur's wedding celebrations.\n\n` +
      `We've made a little invitation for you ✨\n` +
      `${invitationUrl}\n\n` +
      `15 February 2027\n` +
      `#NishMayKiShaadi`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function rsvpLabel(
    status: string | null,
  ) {
    if (status === "attending") {
      return "Attending ❤️";
    }

    if (
      status === "not_attending"
    ) {
      return "Not attending";
    }

    return "Pending";
  }

  return (
    <>
      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[400px_1fr]">
        {/* ===================================================
            CREATE GUEST
        =================================================== */}

        <section className="h-fit rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">
            Add Guest
          </h2>

          <p className="mt-2 text-sm text-[#76696b]">
            Create a guest and generate
            their private invitation.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="displayName"
                className="text-sm font-medium"
              >
                Display name
              </label>

              <input
                id="displayName"
                value={displayName}
                onChange={(event) =>
                  setDisplayName(
                    event.target.value,
                  )
                }
                placeholder="Shah Family"
                className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
              />
            </div>

            <div>
              <label
                htmlFor="householdName"
                className="text-sm font-medium"
              >
                Household
              </label>

              <input
                id="householdName"
                value={householdName}
                onChange={(event) =>
                  setHouseholdName(
                    event.target.value,
                  )
                }
                placeholder="Shah Family"
                className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
              />
            </div>

            <div>
              <label
                htmlFor="maxGuests"
                className="text-sm font-medium"
              >
                Maximum guests
              </label>

              <input
                id="maxGuests"
                type="number"
                min={1}
                value={maxGuests}
                onChange={(event) =>
                  setMaxGuests(
                    Math.max(
                      1,
                      Number(
                        event.target.value,
                      ) || 1,
                    ),
                  )
                }
                className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3"
              />
            </div>

            <div>
              <p className="text-sm font-medium">
                Invited celebrations
              </p>

              <div className="mt-3 space-y-2">
                {events.map(
                  (event) => (
                    <label
                      key={event.id}
                      className="flex cursor-pointer gap-3 rounded-xl border border-[#e3d8d0] p-3"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(
                          event.id,
                        )}
                        onChange={() =>
                          toggleCreateEvent(
                            event.id,
                          )
                        }
                      />

                      <div>
                        <p className="text-sm font-medium">
                          {event.name}
                        </p>

                        <p className="mt-1 text-xs text-[#786a6d]">
                          {event.location_name ??
                            "Venue TBD"}
                        </p>
                      </div>
                    </label>
                  ),
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={createGuest}
              className="w-full rounded-xl bg-[#321f24] px-5 py-3 font-medium text-white disabled:opacity-60"
            >
              {loading
                ? "Creating..."
                : "Create Invitation"}
            </button>
          </div>
        </section>

        {/* ===================================================
            EXISTING GUESTS
        =================================================== */}

        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8b646d]">
                Directory
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Guests
              </h2>
            </div>

            <p className="text-sm text-[#786a6d]">
              {guests.length} total
            </p>
          </div>

          <div className="space-y-4">
            {guests.map((guest) => {
              const invitation =
                guest.invitation;

              const editing =
                editingGuestId ===
                guest.id;

              return (
                <article
                  key={guest.id}
                  className="rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-5 sm:flex-row">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {
                          guest.display_name
                        }
                      </h3>

                      {guest.household_name && (
                        <p className="mt-1 text-sm text-[#786a6d]">
                          {
                            guest.household_name
                          }
                        </p>
                      )}

                      <p className="mt-2 text-xs text-[#8b7b7e]">
                        Up to{" "}
                        {guest.max_guests}{" "}
                        guest
                        {guest.max_guests !==
                        1
                          ? "s"
                          : ""}
                      </p>
                    </div>

                    {invitation && (
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            invitation.status ===
                            "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {
                            invitation.status
                          }
                        </span>

                        <span className="rounded-full bg-[#f4ede5] px-3 py-1 text-xs">
                          {rsvpLabel(
                            invitation.rsvpStatus,
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {!invitation && (
                    <p className="mt-5 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800">
                      No invitation found for
                      this guest.
                    </p>
                  )}

                  {invitation && (
                    <>
                      <div className="mt-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8b7b7e]">
                          Events
                        </p>

                        {!editing && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {events
                              .filter(
                                (event) =>
                                  invitation.eventIds.includes(
                                    event.id,
                                  ),
                              )
                              .map(
                                (event) => (
                                  <span
                                    key={
                                      event.id
                                    }
                                    className="rounded-full bg-[#f4ede5] px-3 py-1.5 text-xs"
                                  >
                                    {
                                      event.name
                                    }
                                  </span>
                                ),
                              )}
                          </div>
                        )}

                        {editing && (
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {events.map(
                              (event) => (
                                <label
                                  key={
                                    event.id
                                  }
                                  className="flex cursor-pointer gap-2 rounded-xl border border-[#e4dad3] p-3 text-sm"
                                >
                                  <input
                                    type="checkbox"
                                    checked={editingEventIds.includes(
                                      event.id,
                                    )}
                                    onChange={() =>
                                      toggleEditEvent(
                                        event.id,
                                      )
                                    }
                                  />

                                  {
                                    event.name
                                  }
                                </label>
                              ),
                            )}
                          </div>
                        )}
                      </div>

                        <div className="mt-6 border-t border-[#eee5df] pt-5">
                          {/* Invitation sharing */}
                          {invitation.url &&
                            invitation.status ===
                              "active" && (
                              <div>
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b7b7e]">
                                  Send invitation
                                </p>

                                <p className="mt-1 text-xs text-[#9b8c8f]">
                                  Private invitation for{" "}
                                  {guest.display_name}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openWhatsApp(
                                        guest,
                                      )
                                    }
                                    className="
                                      rounded-xl
                                      bg-[#321f24]
                                      px-4
                                      py-2.5
                                      text-sm
                                      font-medium
                                      text-white
                                      transition
                                      hover:bg-[#4a2d35]
                                      active:scale-[0.98]
                                    "
                                  >
                                    Send on WhatsApp
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      copyInvitation(
                                        guest.id,
                                        invitation.url!,
                                      )
                                    }
                                    className="
                                      rounded-xl
                                      border
                                      border-[#d8cbc5]
                                      px-4
                                      py-2.5
                                      text-sm
                                      transition
                                      hover:bg-[#f8f3ee]
                                    "
                                  >
                                    {copiedGuestId ===
                                    guest.id
                                      ? "Copied ✓"
                                      : "Copy Link"}
                                  </button>

                                  <a
                                    href={
                                      invitation.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                      rounded-xl
                                      border
                                      border-[#d8cbc5]
                                      px-4
                                      py-2.5
                                      text-sm
                                      transition
                                      hover:bg-[#f8f3ee]
                                    "
                                  >
                                    Preview
                                  </a>
                                </div>
                              </div>
                            )}

                          {/* Inactive invitation warning */}
                          {invitation.url &&
                            invitation.status !==
                              "active" && (
                              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                                <p className="text-sm font-medium text-amber-900">
                                  Invitation inactive
                                </p>

                                <p className="mt-1 text-xs leading-5 text-amber-700">
                                  Reactivate this
                                  invitation before
                                  sharing it with the
                                  guest.
                                </p>
                              </div>
                            )}

                          {/* Legacy invitation */}
                          {!invitation.url && (
                            <div className="rounded-xl bg-yellow-50 px-4 py-3">
                              <p className="text-xs text-yellow-800">
                                Legacy invitation:
                                secure link unavailable
                              </p>
                            </div>
                          )}

                          {/* Administration */}
                          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#eee5df] pt-4">
                            {!editing ? (
                              <button
                                type="button"
                                onClick={() =>
                                  startEditing(
                                    guest,
                                  )
                                }
                                className="rounded-xl border border-[#d8cbc5] px-4 py-2 text-sm transition hover:bg-[#f8f3ee]"
                              >
                                Edit Events
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  disabled={
                                    savingGuestId ===
                                    guest.id
                                  }
                                  onClick={() =>
                                    saveEvents(
                                      guest,
                                    )
                                  }
                                  className="rounded-xl bg-[#321f24] px-4 py-2 text-sm text-white disabled:opacity-60"
                                >
                                  {savingGuestId ===
                                  guest.id
                                    ? "Saving..."
                                    : "Save Events"}
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    savingGuestId ===
                                    guest.id
                                  }
                                  onClick={() =>
                                    setEditingGuestId(
                                      null,
                                    )
                                  }
                                  className="rounded-xl border border-[#d8cbc5] px-4 py-2 text-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                            <button
                              type="button"
                              disabled={
                                savingGuestId ===
                                guest.id
                              }
                              onClick={() =>
                                toggleStatus(
                                  guest,
                                )
                              }
                              className={
                                invitation.status ===
                                "active"
                                  ? "rounded-xl border border-red-200 px-4 py-2 text-sm text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                                  : "rounded-xl border border-green-200 px-4 py-2 text-sm text-green-700 transition hover:bg-green-50 disabled:opacity-60"
                              }
                            >
                              {savingGuestId ===
                              guest.id
                                ? "Updating..."
                                : invitation.status ===
                                    "active"
                                  ? "Deactivate"
                                  : "Reactivate"}
                            </button>
                          </div>
                        </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}