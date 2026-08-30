import {
  NextResponse,
} from "next/server";

import {
  createServerSupabaseClient,
} from "@/lib/supabase/server";

const VALID_REACTIONS = [
  "heart",
  "fire",
  "laugh",
  "wow",
];

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      mediaId: string;
    }>;
  },
) {
  const {
    mediaId,
  } = await context.params;

  const supabase =
    createServerSupabaseClient();

  const {
    data,
    error,
  } = await supabase
    .from("media_reactions")
    .select("reaction")
    .eq(
      "media_id",
      mediaId,
    );

  if (error) {
    console.error(
      "Reaction fetch failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to load reactions.",
      },
      {
        status: 500,
      },
    );
  }

  const counts = {
    heart: 0,
    fire: 0,
    laugh: 0,
    wow: 0,
  };

  for (const item of data ?? []) {
    const reaction =
      item.reaction as keyof typeof counts;

    if (
      reaction in counts
    ) {
      counts[reaction] += 1;
    }
  }

  return NextResponse.json({
    counts,
  });
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      mediaId: string;
    }>;
  },
) {
  const {
    mediaId,
  } = await context.params;

  const body =
    await request.json();

  const reaction =
    typeof body.reaction ===
    "string"
      ? body.reaction
      : "";

  if (
    !VALID_REACTIONS.includes(
      reaction,
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid reaction.",
      },
      {
        status: 400,
      },
    );
  }

  const supabase =
    createServerSupabaseClient();

  const {
    error,
  } = await supabase
    .from("media_reactions")
    .insert({
      media_id: mediaId,
      reaction,
    });

  if (error) {
    console.error(
      "Reaction insert failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to save reaction.",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    success: true,
  });
}