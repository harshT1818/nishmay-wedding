import {
  NextRequest,
  NextResponse,
} from "next/server";

import { getAdminUser } from "@/lib/auth/getAdminUser";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    eventId: string;
  }>;
};

type UpdateEventBody = {
  name?: string;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  locationName?: string | null;
  venueName?: string | null;
  address?: string | null;
  mapsUrl?: string | null;
  description?: string | null;
  dressCode?: string | null;
  instructions?: string | null;
  isActive?: boolean;
  sortOrder?: number;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const { eventId } = await context.params;

    const body =
      (await request.json()) as UpdateEventBody;

    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json(
        { error: "Event name is required." },
        { status: 400 },
      );
    }

    if (
      body.mapsUrl &&
      !isValidUrl(body.mapsUrl)
    ) {
      return NextResponse.json(
        { error: "Maps URL must be valid." },
        { status: 400 },
      );
    }

    const supabase =
      createServerSupabaseClient();

    const {
      data: existing,
      error: existingError,
    } = await supabase
      .from("events")
      .select("id")
      .eq("id", eventId)
      .maybeSingle();

    if (existingError) {
      throw new Error(
        existingError.message,
      );
    }

    if (!existing) {
      return NextResponse.json(
        { error: "Event not found." },
        { status: 404 },
      );
    }

    const {
      data: updatedEvent,
      error,
    } = await supabase
      .from("events")
      .update({
        name,
        date:
          body.date || null,
        start_time:
          body.startTime || null,
        end_time:
          body.endTime || null,
        location_name:
          body.locationName?.trim() ||
          null,
        venue_name:
          body.venueName?.trim() ||
          null,
        address:
          body.address?.trim() ||
          null,
        maps_url:
          body.mapsUrl?.trim() ||
          null,
        description:
          body.description?.trim() ||
          null,
        dress_code:
          body.dressCode?.trim() ||
          null,
        instructions:
          body.instructions?.trim() ||
          null,
        is_active:
          body.isActive ?? true,
        sort_order:
          body.sortOrder ?? 0,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", eventId)
      .select()
      .single();

    if (error) {
      throw new Error(
        error.message,
      );
    }

    return NextResponse.json({
      success: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.error(
      "Update event failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update event.",
      },
      { status: 500 },
    );
  }
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}