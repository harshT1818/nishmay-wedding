import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type RSVPStatus =
  | "attending"
  | "not_attending"
  | null;

export async function getRSVPStatus(
  invitationId: string,
): Promise<RSVPStatus> {
  const supabase =
    createServerSupabaseClient();

  const { data, error } =
    await supabase
      .from("rsvps")
      .select("status")
      .eq(
        "invitation_id",
        invitationId,
      )
      .maybeSingle();

  if (error) {
    console.error(
      "RSVP status query failed:",
      JSON.stringify(
        error,
        null,
        2,
      ),
    );

    return null;
  }

  if (!data) {
    return null;
  }

  if (
    data.status !== "attending" &&
    data.status !==
      "not_attending"
  ) {
    console.error(
      "Unexpected RSVP status:",
      data.status,
    );

    return null;
  }

  return data.status;
}