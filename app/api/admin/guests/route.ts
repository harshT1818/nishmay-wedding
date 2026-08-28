import { getAdminUser } from "@/lib/auth/getAdminUser";

import { NextRequest, NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createInvitation } from "@/lib/invitations/createInvitation";

type CreateGuestBody = {
  displayName?: string;
  householdName?: string | null;
  maxGuests?: number;
  eventIds?: string[];
};

export async function POST(request: NextRequest) {
 const admin = await getAdminUser();

if (!admin) {
  return NextResponse.json(
    {
      error: "Unauthorized.",
    },
    {
      status: 401,
    },
  );
}

  try {
    const body = (await request.json()) as CreateGuestBody;

    const displayName = body.displayName?.trim();
    const householdName =
      body.householdName?.trim() || null;

    const maxGuests = Math.max(
      1,
      Math.floor(body.maxGuests ?? 1),
    );

    const eventIds = Array.isArray(body.eventIds)
      ? [...new Set(body.eventIds)]
      : [];

    if (!displayName) {
      return NextResponse.json(
        { error: "Guest name is required." },
        { status: 400 },
      );
    }

    if (eventIds.length === 0) {
      return NextResponse.json(
        { error: "Select at least one event." },
        { status: 400 },
      );
    }

    const supabase = createServerSupabaseClient();

    const { data: validEvents, error: eventError } =
      await supabase
        .from("events")
        .select("id")
        .in("id", eventIds)
        .eq("is_active", true);

    if (eventError) {
      throw new Error(eventError.message);
    }

    if ((validEvents?.length ?? 0) !== eventIds.length) {
      return NextResponse.json(
        {
          error:
            "One or more selected events are invalid.",
        },
        { status: 400 },
      );
    }

    const { data: guest, error: guestError } =
      await supabase
        .from("guests")
        .insert({
          display_name: displayName,
          household_name: householdName,
          max_guests: maxGuests,
          is_active: true,
        })
        .select(`
          id,
          display_name,
          household_name,
          max_guests,
          is_active,
          created_at
        `)
        .single();

    if (guestError) {
      throw new Error(guestError.message);
    }

    try {
      const invitation =
        await createInvitation({
          guestId: guest.id,
          eventIds,
        });

      return NextResponse.json(
        {
          guest,
          invitation: {
            guestId: guest.id,
            invitationId:
              invitation.invitationId,
            token: invitation.token,
            url: `/i/${invitation.token}`,
          },
        },
        { status: 201 },
      );
    } catch (invitationError) {
      await supabase
        .from("guests")
        .delete()
        .eq("id", guest.id);

      throw invitationError;
    }
  } catch (error) {
    console.error(
      "Create guest failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create guest.",
      },
      { status: 500 },
    );
  }
}