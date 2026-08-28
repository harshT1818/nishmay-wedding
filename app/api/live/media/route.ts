import {
  NextResponse,
} from "next/server";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

const VALID_MEDIA_TYPES = [
  "photo",
  "video",
  "reel",
];

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const mediaUrl =
      typeof body.mediaUrl ===
      "string"
        ? body.mediaUrl.trim()
        : "";

    const mediaType =
      typeof body.mediaType ===
        "string" &&
      VALID_MEDIA_TYPES.includes(
        body.mediaType,
      )
        ? body.mediaType
        : null;

    const guestName =
      typeof body.guestName ===
      "string"
        ? body.guestName
            .trim()
            .slice(0, 120) ||
          null
        : null;

    const caption =
      typeof body.caption ===
      "string"
        ? body.caption
            .trim()
            .slice(0, 500) ||
          null
        : null;

    const eventId =
      typeof body.eventId ===
        "string" &&
      body.eventId.length > 0
        ? body.eventId
        : null;

    if (
      !mediaUrl ||
      !mediaType
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid media submission.",
        },
        {
          status: 400,
        },
      );
    }

    const supabase =
      createServerSupabaseClient();

    const {
      data,
      error,
    } = await supabase
      .from("wedding_media")
      .insert({
        event_id: eventId,
        media_type:
          mediaType,
        media_url:
          mediaUrl,
        guest_name:
          guestName,
        caption,
        source: "guest",

        // Mandatory moderation.
        status: "pending",

        is_featured: false,
      })
      .select(
        `
          id,
          status
        `,
      )
      .single();

    if (error) {
      console.error(
        "Wedding media insert failed:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Unable to submit your moment.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      submission: data,
    });
  } catch (error) {
    console.error(
      "Wedding media API failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to submit your moment.",
      },
      {
        status: 500,
      },
    );
  }
}