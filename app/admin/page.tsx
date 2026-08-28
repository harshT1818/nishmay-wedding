import { redirect } from "next/navigation";

import { getAdminUser } from "@/lib/auth/getAdminUser";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminDashboardPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createServerSupabaseClient();

const [
  guestsResult,
  invitationsResult,
  rsvpsResult,
  eventsResult,
] = await Promise.all([
  supabase
    .from("guests")
    .select(
      "id, display_name, max_guests, is_active",
    ),

  supabase
    .from("invitations")
    .select(`
      id,
      guest_id,
      status,
      created_at
    `),

  supabase
    .from("rsvps")
    .select(`
      invitation_id,
      status,
      submitted_at,
      updated_at
    `),

  supabase
    .from("events")
    .select("id")
    .eq("is_active", true),
]);

  if (guestsResult.error) {
    throw new Error(guestsResult.error.message);
  }

  if (invitationsResult.error) {
    throw new Error(invitationsResult.error.message);
  }

  if (rsvpsResult.error) {
    throw new Error(rsvpsResult.error.message);
  }

  if (eventsResult.error) {
  throw new Error(eventsResult.error.message);
  }

    const guests = guestsResult.data ?? [];
    const invitations = invitationsResult.data ?? [];
    const rsvps = rsvpsResult.data ?? [];
    const activeEvents = eventsResult.data ?? [];

  const activeGuests = guests.filter(
    (guest) => guest.is_active,
  );

  const activeInvitations =
    invitations.filter(
      (invitation) =>
        invitation.status === "active",
    );

  const rsvpByInvitation = new Map(
    rsvps.map((rsvp) => [
      rsvp.invitation_id,
      rsvp,
    ]),
  );

  const attending = activeInvitations.filter(
    (invitation) =>
      rsvpByInvitation.get(invitation.id)
        ?.status === "attending",
  ).length;

  const notAttending =
    activeInvitations.filter(
      (invitation) =>
        rsvpByInvitation.get(invitation.id)
          ?.status === "not_attending",
    ).length;

  const completed = attending + notAttending;

  const pending =
    activeInvitations.length - completed;

  const completionRate =
    activeInvitations.length === 0
      ? 0
      : Math.round(
          (completed /
            activeInvitations.length) *
            100,
        );

  const invitedCapacity =
    activeGuests.reduce(
      (total, guest) =>
        total + guest.max_guests,
      0,
    );

  const latestRsvps = [...rsvps]
    .sort(
      (a, b) =>
        new Date(
          b.updated_at ??
            b.submitted_at,
        ).getTime() -
        new Date(
          a.updated_at ??
            a.submitted_at,
        ).getTime(),
    )
    .slice(0, 8);

  const invitationById = new Map(
    invitations.map((invitation) => [
      invitation.id,
      invitation,
    ]),
  );

  const guestById = new Map(
    guests.map((guest) => [
      guest.id,
      guest,
    ]),
  );

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-6 py-10 text-[#321f24]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-start justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
              NishMay Admin
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Dashboard
            </h1>

            <p className="mt-3 text-[#6f6265]">
              Invitation and RSVP overview.
            </p>

            {admin.email && (
              <p className="mt-2 text-xs text-[#8b7b7e]">
                Signed in as {admin.email}
              </p>
            )}
          </div>

          <LogoutButton />
        </div>

        <nav className="mb-8 flex flex-wrap gap-3">
          <a
            href="/admin"
            className="rounded-xl bg-[#321f24] px-4 py-2 text-sm text-white"
          >
            Dashboard
          </a>

          <a
            href="/admin/guests"
            className="rounded-xl border border-[#d8cbc5] bg-white px-4 py-2 text-sm"
          >
            Guests
          </a>

          <a
            href="/admin/events"
            className="rounded-xl border border-[#d8cbc5] bg-white px-4 py-2 text-sm"
          >
            Events
          </a>
        </nav>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Active Guests"
            value={activeGuests.length}
          />

          <MetricCard
            label="Active Invitations"
            value={activeInvitations.length}
          />

          <MetricCard
            label="RSVP Completed"
            value={completed}
            detail={`${completionRate}% response rate`}
          />

          <MetricCard
            label="Invited Capacity"
            value={invitedCapacity}
            detail="Maximum possible guests"
          />

          <MetricCard
            label="Attending"
            value={attending}
          />

          <MetricCard
            label="Not Attending"
            value={notAttending}
          />

          <MetricCard
            label="Pending"
            value={pending}
          />

            <MetricCard
            label="Events"
            value={activeEvents.length}
            detail="Active wedding functions"
            />
        </section>

        <section className="mt-10 rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8b646d]">
                Activity
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Recent RSVPs
              </h2>
            </div>

            <a
              href="/admin/guests"
              className="text-sm underline underline-offset-4"
            >
              View guests
            </a>
          </div>

          {latestRsvps.length === 0 ? (
            <p className="mt-6 text-sm text-[#786a6d]">
              No RSVPs yet.
            </p>
          ) : (
            <div className="mt-6 divide-y divide-[#eee5df]">
              {latestRsvps.map((rsvp) => {
                const invitation =
                  invitationById.get(
                    rsvp.invitation_id,
                  );

                const guest =
                  invitation
                    ? guestById.get(
                        invitation.guest_id,
                      )
                    : null;

                return (
                  <div
                    key={rsvp.invitation_id}
                    className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {guest?.display_name ??
                        "Unknown Guest"}
                      </p>

                      <p className="mt-1 text-xs text-[#8b7b7e]">
                        Invitation{" "}
                        {rsvp.invitation_id.slice(
                          0,
                          8,
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          rsvp.status ===
                          "attending"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {rsvp.status ===
                        "attending"
                          ? "Attending ❤️"
                          : "Not attending"}
                      </span>

                      <span className="text-xs text-[#8b7b7e]">
                        {formatDateTime(
                          rsvp.updated_at ??
                            rsvp.submitted_at,
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: number | string;
  detail?: string;
}) {
  return (
    <div className="rounded-3xl border border-[#ddd1c8] bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-[#8b7b7e]">
        {label}
      </p>

      <p className="mt-4 text-4xl font-semibold">
        {value}
      </p>

      {detail && (
        <p className="mt-2 text-xs text-[#786a6d]">
          {detail}
        </p>
      )}
    </div>
  );
}

function formatDateTime(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    },
  ).format(new Date(value));
}