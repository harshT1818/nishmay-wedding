import {
  NextResponse,
} from "next/server";

import {
  getAdminUser,
} from "@/lib/auth/getAdminUser";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

const VALID_ACTIONS = [
  "approve",
  "feature",
  "reject",
  "hide",
] as const;

type ModerationAction =
  (typeof VALID_ACTIONS)[number];

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      mediaId: string;
    }>;
  },
) {
  try {
    const admin =
      await getAdminUser();

    if (!admin) {
      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const {
      mediaId,
    } = await context.params;

    if (!mediaId) {
      return NextResponse.json(
        {
          error:
            "Media ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      await request.json();

    const action =
      body.action as
        | ModerationAction
        | undefined;

    if (
      !action ||
      !VALID_ACTIONS.includes(
        action,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid moderation action.",
        },
        {
          status: 400,
        },
      );
    }

    const update: {
      status:
        | "approved"
        | "rejected"
        | "hidden";

      is_featured: boolean;

      moderated_at: string;
    } = {
      status:
        "approved",

      is_featured:
        false,

      moderated_at:
        new Date().toISOString(),
    };

    if (
      action === "approve"
    ) {
      update.status =
        "approved";

      update.is_featured =
        false;
    }

    if (
      action === "feature"
    ) {
      update.status =
        "approved";

      update.is_featured =
        true;
    }

    if (
      action === "reject"
    ) {
      update.status =
        "rejected";

      update.is_featured =
        false;
    }

    if (
      action === "hide"
    ) {
      update.status =
        "hidden";

      update.is_featured =
        false;
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
      .update(update)
      .eq(
        "id",
        mediaId,
      )
      .select(
        `
          id,
          status,
          is_featured
        `,
      )
      .single();

    if (error) {
      console.error(
        "Media moderation failed:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Unable to moderate media.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      media: data,
    });
  } catch (error) {
    console.error(
      "Media moderation route crashed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unexpected moderation error.",
      },
      {
        status: 500,
      },
    );
  }
}