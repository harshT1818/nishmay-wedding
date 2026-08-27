import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hashInvitationToken } from "@/lib/invitations/token";

export type RSVPStatus =
  | "attending"
  | "not_attending";

export async function saveRSVP(
  token: string,
  status: RSVPStatus,
) {
  const supabase = createServerSupabaseClient();

  const tokenHash = hashInvitationToken(token);

  const {
    data: invitation,
    error: invitationError,
  } = await supabase
    .from("invitations")
    .select("id, status, expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (invitationError) {
    throw new Error(invitationError.message);
  }

  if (!invitation) {
    throw new Error("Invitation not found.");
  }

  if (invitation.status !== "active") {
    throw new Error("Invitation is not active.");
  }

  if (
    invitation.expires_at &&
    new Date(invitation.expires_at).getTime() < Date.now()
  ) {
    throw new Error("Invitation has expired.");
  }

  const { error: rsvpError } = await supabase
    .from("rsvps")
    .upsert(
      {
        invitation_id: invitation.id,
        status,
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "invitation_id",
      },
    );

  if (rsvpError) {
    throw new Error(rsvpError.message);
  }
}