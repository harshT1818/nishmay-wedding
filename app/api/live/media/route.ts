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
      "string"
        ? body.mediaType
        : "";

    const guestName =
      typeof body.guestName ===
      "string"
        ? body.guestName.trim()
        : null;

    const caption =
      typeof body.caption ===
      "string"
        ? body.caption.trim()
        : null;

    const eventId =
      typeof body.eventId ===
      "string" &&
      body.eventId.trim()
        ? body.eventId.trim()
        : null;

    if (!mediaUrl) {
      return NextResponse.json(
        {
          error:
            "Media URL is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !VALID_MEDIA_TYPES.includes(
        mediaType,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid media type.",
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
      .from(
        "wedding_media",
      )
      .insert({
        event_id:
          eventId,
        media_type:
          mediaType,
        media_url:
          mediaUrl,
        guest_name:
          guestName || null,
        caption:
          caption || null,
        source:
          "guest",
        status:
          "pending",
        is_featured:
          false,
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
        "Wedding media submission failed:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Unable to submit media.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        submission:
          data,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Wedding media API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Invalid request.",
      },
      {
        status: 400,
      },
    );
  }
}