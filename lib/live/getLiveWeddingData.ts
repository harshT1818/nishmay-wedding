import "server-only";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

export type LiveEvent = {
  id: string;
  name: string;
  slug: string;
  date: string | null;
  startTime: string | null;
  venueName: string | null;
  locationName: string | null;
  address: string | null;
  mapsUrl: string | null;

  liveStatus:
    | "upcoming"
    | "live"
    | "completed"
    | "delayed";

  liveMessage:
    | string
    | null;
};

export type WeddingUpdate = {
  id: string;
  eventId: string | null;
  title: string;
  message: string | null;
  updateType: string;
  isPinned: boolean;
  publishedAt: string;
};

export type LiveMedia = {
  id: string;

  eventId:
    | string
    | null;

  mediaType:
    | "photo"
    | "video"
    | "reel";

  mediaUrl: string;

  caption:
    | string
    | null;

  guestName:
    | string
    | null;

  isFeatured: boolean;

  createdAt: string;
};

export async function getLiveWeddingData() {
  const supabase =
    createServerSupabaseClient();

  const [
    eventsResult,
    updatesResult,
    mediaResult,
  ] =
    await Promise.all([
      supabase
        .from("events")
        .select(
          `
            id,
            name,
            slug,
            date,
            start_time,
            venue_name,
            location_name,
            address,
            maps_url,
            live_status,
            live_message
          `,
        )
        .eq(
          "is_active",
          true,
        )
        .order(
          "sort_order",
        ),

      supabase
        .from(
          "wedding_updates",
        )
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
        .eq(
          "is_active",
          true,
        )
        .order(
          "is_pinned",
          {
            ascending:
              false,
          },
        )
        .order(
          "published_at",
          {
            ascending:
              false,
          },
        )
        .limit(20),

      supabase
        .from(
          "wedding_media",
        )
        .select(
          `
            id,
            event_id,
            media_type,
            media_url,
            caption,
            guest_name,
            is_featured,
            created_at
          `,
        )

        // Critical:
        // pending content is
        // never shown here.
        .eq(
          "status",
          "approved",
        )
        .order(
          "is_featured",
          {
            ascending:
              false,
          },
        )
        .order(
          "created_at",
          {
            ascending:
              false,
          },
        )
        .limit(40),
    ]);

  if (
    eventsResult.error
  ) {
    console.error(
      "Live events query failed:",
      eventsResult.error,
    );
  }

  if (
    updatesResult.error
  ) {
    console.error(
      "Wedding updates query failed:",
      updatesResult.error,
    );
  }

  if (
    mediaResult.error
  ) {
    console.error(
      "Wedding media query failed:",
      mediaResult.error,
    );
  }

  const events: LiveEvent[] =
    (
      eventsResult.data ??
      []
    ).map(
      (event) => ({
        id: event.id,
        name: event.name,
        slug: event.slug,
        date: event.date,

        startTime:
          event.start_time,

        venueName:
          event.venue_name,

        locationName:
          event.location_name,

        address:
          event.address,

        mapsUrl:
          event.maps_url,

        liveStatus:
          event.live_status ??
          "upcoming",

        liveMessage:
          event.live_message,
      }),
    );

  const updates: WeddingUpdate[] =
    (
      updatesResult.data ??
      []
    ).map(
      (update) => ({
        id: update.id,

        eventId:
          update.event_id,

        title:
          update.title,

        message:
          update.message,

        updateType:
          update.update_type,

        isPinned:
          update.is_pinned,

        publishedAt:
          update.published_at,
      }),
    );

  const media: LiveMedia[] =
    (
      mediaResult.data ??
      []
    ).map(
      (item) => ({
        id: item.id,

        eventId:
          item.event_id,

        mediaType:
          item.media_type,

        mediaUrl:
          item.media_url,

        caption:
          item.caption,

        guestName:
          item.guest_name,

        isFeatured:
          item.is_featured,

        createdAt:
          item.created_at,
      }),
    );

  const liveEvent =
    events.find(
      (event) =>
        event.liveStatus ===
        "live",
    ) ?? null;

  return {
    events,
    updates,
    media,
    liveEvent,
  };
}