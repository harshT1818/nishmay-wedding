import { NextRequest, NextResponse } from "next/server";

import {
  saveRSVP,
  type RSVPStatus,
} from "@/lib/rsvp/saveRSVP";

type RouteContext = {
  params: Promise<{
    token: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { token } = await context.params;

    const body = await request.json();

    const status = body.status as RSVPStatus;

    if (
      status !== "attending" &&
      status !== "not_attending"
    ) {
      return NextResponse.json(
        { error: "Invalid RSVP status." },
        { status: 400 },
      );
    }

    await saveRSVP(token, status);

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to save RSVP.";

    return NextResponse.json(
      { error: message },
      { status: 400 },
    );
  }
}