import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  generateInvitationToken,
  hashInvitationToken,
} from "@/lib/invitations/token";

type CreateInvitationInput = {
  guestId: string;
  eventIds: string[];
  expiresAt?: string | null;
};

type CreatedInvitation = {
  invitationId: string;
  token: string;
};

export async function createInvitation({
  guestId,
  eventIds,
  expiresAt = null,
}: CreateInvitationInput): Promise<CreatedInvitation> {
  const supabase = createServerSupabaseClient();

  const token = generateInvitationToken();
  const tokenHash = hashInvitationToken(token);

  const {
    data: invitation,
    error: invitationError,
  } = await supabase
    .from("invitations")
    .insert({
      guest_id: guestId,
      token_hash: tokenHash,
      status: "active",
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (invitationError) {
    throw new Error(
      `Failed to create invitation: ${invitationError.message}`,
    );
  }

  if (eventIds.length > 0) {
    const rows = eventIds.map((eventId) => ({
      invitation_id: invitation.id,
      event_id: eventId,
    }));

    const { error: eventsError } = await supabase
      .from("invitation_events")
      .insert(rows);

    if (eventsError) {
      await supabase
        .from("invitations")
        .delete()
        .eq("id", invitation.id);

      throw new Error(
        `Failed to attach events: ${eventsError.message}`,
      );
    }
  }

  return {
    invitationId: invitation.id,
    token,
  };
}