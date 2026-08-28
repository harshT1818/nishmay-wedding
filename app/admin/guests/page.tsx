import { redirect } from "next/navigation";

import GuestAdmin from "@/components/admin/GuestAdmin";
import LogoutButton from "@/components/admin/LogoutButton";

import { getAdminUser } from "@/lib/auth/getAdminUser";
import { decryptInvitationToken } from "@/lib/invitations/encryption";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function GuestsAdminPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createServerSupabaseClient();

  const { data: guests, error: guestsError } =
    await supabase
      .from("guests")
      .select(`
        id,
        display_name,
        household_name,
        max_guests,
        is_active,
        created_at
      `)
      .order("created_at", {
        ascending: false,
      });

  if (guestsError) {
    throw new Error(guestsError.message);
  }

  const { data: events, error: eventsError } =
    await supabase
      .from("events")
      .select(`
        id,
        name,
        slug,
        date,
        location_name,
        sort_order,
        is_active
      `)
      .eq("is_active", true)
      .order("sort_order", {
        ascending: true,
      });

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  const {
    data: invitations,
    error: invitationsError,
  } = await supabase
    .from("invitations")
    .select(`
      id,
      guest_id,
      token_encrypted,
      status,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    });

  if (invitationsError) {
    throw new Error(invitationsError.message);
  }

  const {
    data: invitationEvents,
    error: invitationEventsError,
  } = await supabase
    .from("invitation_events")
    .select(`
      invitation_id,
      event_id
    `);

  if (invitationEventsError) {
    throw new Error(invitationEventsError.message);
  }

  const { data: rsvps, error: rsvpError } =
    await supabase
      .from("rsvps")
      .select(`
        invitation_id,
        status
      `);

  if (rsvpError) {
    throw new Error(rsvpError.message);
  }

  // Latest invitation per guest.
  const invitationByGuest = new Map<
    string,
    (typeof invitations)[number]
  >();

  for (const invitation of invitations ?? []) {
    if (!invitationByGuest.has(invitation.guest_id)) {
      invitationByGuest.set(
        invitation.guest_id,
        invitation,
      );
    }
  }

  const eventIdsByInvitation = new Map<
    string,
    string[]
  >();

  for (const relation of invitationEvents ?? []) {
    const current =
      eventIdsByInvitation.get(
        relation.invitation_id,
      ) ?? [];

    current.push(relation.event_id);

    eventIdsByInvitation.set(
      relation.invitation_id,
      current,
    );
  }

  const rsvpByInvitation = new Map<
    string,
    string
  >();

  for (const rsvp of rsvps ?? []) {
    rsvpByInvitation.set(
      rsvp.invitation_id,
      rsvp.status,
    );
  }

  const managedGuests = (guests ?? []).map(
    (guest) => {
      const invitation =
        invitationByGuest.get(guest.id);

      if (!invitation) {
        return {
          ...guest,
          invitation: null,
        };
      }

      let invitationUrl: string | null = null;

      if (invitation.token_encrypted) {
        try {
          const token =
            decryptInvitationToken(
              invitation.token_encrypted,
            );

          invitationUrl = `/i/${token}`;
        } catch (error) {
          console.error(
            "Failed to decrypt invitation token:",
            invitation.id,
            error,
          );
        }
      }

      return {
        ...guest,

        invitation: {
          id: invitation.id,
          status: invitation.status,
          url: invitationUrl,

          eventIds:
            eventIdsByInvitation.get(
              invitation.id,
            ) ?? [],

          rsvpStatus:
            rsvpByInvitation.get(
              invitation.id,
            ) ?? null,
        },
      };
    },
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
              Guests & Invitations
            </h1>

            <p className="mt-3 max-w-2xl text-[#6f6265]">
              Manage guests, invitation access and
              RSVP responses.
            </p>

            {admin.email && (
              <p className="mt-2 text-xs text-[#8b7b7e]">
                Signed in as {admin.email}
              </p>
            )}
          </div>

          <LogoutButton />
        </div>
            <div className="mb-8 flex gap-3">
                <a
                    href="/admin/guests"
                    className="rounded-xl bg-[#321f24] px-4 py-2 text-sm text-white"
                >
                    Guests
                </a>

                <a
                    href="/admin/events"
                    className="rounded-xl border border-[#d8cbc5] bg-white px-4 py-2 text-sm"
                >
                    Events
                </a>
</div>
        <GuestAdmin
          guests={managedGuests}
          events={events ?? []}
        />
      </div>
    </main>
  );
}