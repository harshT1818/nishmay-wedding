import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hashInvitationToken } from "@/lib/invitations/token";
import type { Invitation, WeddingEvent } from "@/types/invitation";

function formatDate(date: string | null): string {
  if (!date) {
    return "Date TBD";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T00:00:00+05:30`));
}

function formatTime(time: string | null): string {
  if (!time) {
    return "Time TBD";
  }

  const [hours, minutes] = time.split(":");

  const date = new Date();

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0,
  );

  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export async function getInvitationByToken(
  token: string,
): Promise<Invitation | null> {
  const supabase = createServerSupabaseClient();

  const tokenHash = hashInvitationToken(token);

  // =========================================================
  // 1. Resolve invitation
  // =========================================================

  const {
    data: invitation,
    error: invitationError,
  } = await supabase
    .from("invitations")
    .select(`
      id,
      guest_id,
      status,
      expires_at
    `)
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (invitationError) {
    console.error(
      "Invitation query failed:",
      JSON.stringify(invitationError, null, 2),
    );

    return null;
  }

  if (!invitation) {
    console.log("Invitation not found for token.");

    return null;
  }

  // =========================================================
  // 2. Validate invitation
  // =========================================================

  if (invitation.status !== "active") {
    console.log("Invitation is not active.");

    return null;
  }

  if (
    invitation.expires_at &&
    new Date(invitation.expires_at).getTime() < Date.now()
  ) {
    console.log("Invitation has expired.");

    return null;
  }

  // =========================================================
  // 3. Fetch guest
  // =========================================================

  const {
    data: guest,
    error: guestError,
  } = await supabase
    .from("guests")
    .select(`
      id,
      display_name,
      is_active
    `)
    .eq("id", invitation.guest_id)
    .maybeSingle();

  if (guestError) {
    console.error(
      "Guest query failed:",
      JSON.stringify(guestError, null, 2),
    );

    return null;
  }

  if (!guest || !guest.is_active) {
    console.log("Guest does not exist or is inactive.");

    return null;
  }

  // =========================================================
  // 4. Fetch event permissions
  // =========================================================

  const {
    data: invitationEvents,
    error: invitationEventsError,
  } = await supabase
    .from("invitation_events")
    .select("event_id")
    .eq("invitation_id", invitation.id);

  if (invitationEventsError) {
    console.error(
      "Invitation events query failed:",
      JSON.stringify(invitationEventsError, null, 2),
    );

    return null;
  }

  const eventIds =
    invitationEvents?.map((item) => item.event_id) ?? [];

  // Invitation with zero permitted events is valid.
  if (eventIds.length === 0) {
    return {
      id: invitation.id,
      guestName: guest.display_name,
      events: [],
    };
  }

  // =========================================================
  // 5. Fetch permitted events
  // =========================================================

  const {
    data: events,
    error: eventsError,
  } = await supabase
    .from("events")
    .select(`
      id,
      name,
      date,
      start_time,
      location_name,
      venue_name,
      address,
      maps_url,
      description,
      dress_code,
      instructions,
      sort_order,
      is_active
    `)
    .in("id", eventIds)
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    });

  if (eventsError) {
    console.error(
      "Events query failed:",
      JSON.stringify(eventsError, null, 2),
    );

    return null;
  }

  // =========================================================
  // 6. Convert database rows → frontend model
  // =========================================================

  const weddingEvents: WeddingEvent[] =
    events?.map((event) => ({
      id: event.id,

      name: event.name,

      date: formatDate(event.date),

      time: formatTime(event.start_time),

      location:
        event.location_name ??
        "Venue TBD",

      venue:
        event.venue_name ??
        undefined,

      address:
        event.address ??
        undefined,

      mapsUrl:
        event.maps_url ??
        undefined,

      description:
        event.description ??
        undefined,

      dressCode:
        event.dress_code ??
        undefined,

      instructions:
        event.instructions ??
        undefined,
    })) ?? [];

  return {
    id: invitation.id,
    guestName: guest.display_name,
    events: weddingEvents,
  };
}