import { NextResponse } from "next/server";

import {
  getAdminUser,
} from "@/lib/auth/getAdminUser";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

const VALID_STATUSES = [
  "upcoming",
  "live",
  "completed",
  "delayed",
];

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      eventId: string;
    }>;
  },
) {
  const admin =
    await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const { eventId } =
    await context.params;

  const body =
    await request.json();

  const status =
    body.status as string;

  const liveMessage =
    typeof body.liveMessage ===
    "string"
      ? body.liveMessage.trim() ||
        null
      : null;

  if (
    !VALID_STATUSES.includes(
      status,
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid live status.",
      },
      {
        status: 400,
      },
    );
  }

  const supabase =
    createServerSupabaseClient();

  if (status === "live") {
    const {
      error:
        clearLiveError,
    } = await supabase
      .from("events")
      .update({
        live_status:
          "upcoming",
      })
      .eq(
        "live_status",
        "live",
      )
      .neq("id", eventId);

    if (clearLiveError) {
      console.error(
        "Unable to clear previous live event:",
        clearLiveError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to switch live event.",
        },
        {
          status: 500,
        },
      );
    }
  }

  const {
    data,
    error,
  } = await supabase
    .from("events")
    .update({
      live_status: status,
      live_message:
        liveMessage,
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", eventId)
    .select(
      `
        id,
        live_status,
        live_message
      `,
    )
    .single();

  if (error) {
    console.error(
      "Live event update failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to update event.",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    event: data,
  });
}