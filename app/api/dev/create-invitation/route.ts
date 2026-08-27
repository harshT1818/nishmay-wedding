import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createInvitation } from "@/lib/invitations/createInvitation";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production." },
      { status: 403 },
    );
  }

  const supabase = createServerSupabaseClient();

  const {
    data: guest,
    error: guestError,
  } = await supabase
    .from("guests")
    .insert({
      display_name: "Random Demo Guest",
      household_name: "Random Demo Guest",
      max_guests: 2,
    })
    .select("id")
    .single();

  if (guestError) {
    return NextResponse.json(
      { error: guestError.message },
      { status: 500 },
    );
  }

  const {
    data: events,
    error: eventsError,
  } = await supabase
    .from("events")
    .select("id")
    .eq("is_active", true);

  if (eventsError) {
    return NextResponse.json(
      { error: eventsError.message },
      { status: 500 },
    );
  }

  try {
    const invitation = await createInvitation({
      guestId: guest.id,
      eventIds: events?.map((event) => event.id) ?? [],
    });

    return NextResponse.json({
      guestId: guest.id,
      invitationId: invitation.invitationId,
      token: invitation.token,
      url: `/i/${invitation.token}`,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}