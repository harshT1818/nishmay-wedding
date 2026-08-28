import {
  redirect,
} from "next/navigation";

import LiveAdmin from "@/components/admin/LiveAdmin";
import MediaModeration from "@/components/admin/MediaModeration";

import {
  getAdminUser,
} from "@/lib/auth/getAdminUser";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

export const dynamic =
  "force-dynamic";

export default async function AdminLivePage() {
  const admin =
    await getAdminUser();

  if (!admin) {
    redirect(
      "/admin/login",
    );
  }

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
          "published_at",
          {
            ascending:
              false,
          },
        )
        .limit(25),

      supabase
        .from(
          "wedding_media",
        )
        .select(
          `
            id,
            media_type,
            media_url,
            guest_name,
            caption,
            status,
            is_featured,
            created_at
          `,
        )
        .order(
          "created_at",
          {
            ascending:
              false,
          },
        )
        .limit(100),
    ]);

  if (
    eventsResult.error
  ) {
    console.error(
      "Admin live events query failed:",
      eventsResult.error,
    );
  }

  if (
    updatesResult.error
  ) {
    console.error(
      "Admin live updates query failed:",
      updatesResult.error,
    );
  }

  if (
    mediaResult.error
  ) {
    console.error(
      "Admin media query failed:",
      mediaResult.error,
    );
  }

  const events =
    (
      eventsResult.data ??
      []
    ).map(
      (event) => ({
        id: event.id,

        name:
          event.name,

        slug:
          event.slug,

        liveStatus:
          event.live_status ??
          "upcoming",

        liveMessage:
          event.live_message,
      }),
    );

  const updates =
    (
      updatesResult.data ??
      []
    ).map(
      (update) => ({
        id: update.id,

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

  const media =
    (
      mediaResult.data ??
      []
    ).map(
      (item) => ({
        id:
          item.id,

        mediaType:
          item.media_type,

        mediaUrl:
          item.media_url,

        guestName:
          item.guest_name,

        caption:
          item.caption,

        status:
          item.status,

        isFeatured:
          item.is_featured,

        createdAt:
          item.created_at,
      }),
    );

  return (
    <main className="min-h-screen bg-[#f6f0e6] px-5 py-8 text-[#261b1d] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b646d]">
            #NishMayKiShaadi
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Wedding Live
          </h1>

          <p className="mt-2 text-sm text-[#786a6d]">
            Control live events,
            updates and guest
            content.
          </p>
        </div>

        <LiveAdmin
          initialEvents={
            events
          }
          initialUpdates={
            updates
          }
        />

        <MediaModeration
          initialMedia={
            media
          }
        />
      </div>
    </main>
  );
}