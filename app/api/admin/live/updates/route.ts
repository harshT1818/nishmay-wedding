import { NextResponse } from "next/server";

import {
  getAdminUser,
} from "@/lib/auth/getAdminUser";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

const VALID_TYPES = [
  "update",
  "announcement",
  "schedule",
  "food",
  "transport",
  "highlight",
];

export async function POST(
  request: Request,
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

  const body =
    await request.json();

  const title =
    typeof body.title ===
    "string"
      ? body.title.trim()
      : "";

  const message =
    typeof body.message ===
    "string"
      ? body.message.trim() ||
        null
      : null;

  const eventId =
    typeof body.eventId ===
    "string" &&
    body.eventId.length > 0
      ? body.eventId
      : null;

  const updateType =
    typeof body.updateType ===
      "string" &&
    VALID_TYPES.includes(
      body.updateType,
    )
      ? body.updateType
      : "update";

  const isPinned =
    body.isPinned === true;

  if (!title) {
    return NextResponse.json(
      {
        error:
          "Title is required.",
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
    .from("wedding_updates")
    .insert({
      event_id: eventId,
      title,
      message,
      update_type:
        updateType,
      is_pinned: isPinned,
      is_active: true,
    })
    .select(
      `
        id,
        event_id,
        title,
        message,
        update_type,
        is_pinned,
        published_at
      `,
    )
    .single();

  if (error) {
    console.error(
      "Wedding update insert failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to publish update.",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    update: {
      id: data.id,
      eventId:
        data.event_id,
      title:
        data.title,
      message:
        data.message,
      updateType:
        data.update_type,
      isPinned:
        data.is_pinned,
      publishedAt:
        data.published_at,
    },
  });
}