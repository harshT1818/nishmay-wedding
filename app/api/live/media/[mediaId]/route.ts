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
];

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      mediaId: string;
    }>;
  },
) {
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

  const body =
    await request.json();

  const action =
    typeof body.action ===
    "string"
      ? body.action
      : "";

  if (
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

  let update:
    Record<string, unknown>;

  switch (action) {
    case "approve":
      update = {
        status:
          "approved",
        is_featured:
          false,
      };
      break;

    case "feature":
      update = {
        status:
          "approved",
        is_featured:
          true,
      };
      break;

    case "reject":
      update = {
        status:
          "rejected",
        is_featured:
          false,
      };
      break;

    case "hide":
      update = {
        status:
          "hidden",
        is_featured:
          false,
      };
      break;

    default:
      return NextResponse.json(
        {
          error:
            "Invalid action.",
        },
        {
          status: 400,
        },
      );
  }

  update.moderated_at =
    new Date().toISOString();

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
}