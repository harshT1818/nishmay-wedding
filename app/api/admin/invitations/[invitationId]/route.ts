import { NextRequest, NextResponse } from "next/server";

import { getAdminUser } from "@/lib/auth/getAdminUser";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    invitationId: string;
  }>;
};

type UpdateInvitationBody = {
  eventIds?: string[];
  status?: "active" | "inactive";
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const { invitationId } = await context.params;
    const body = (await request.json()) as UpdateInvitationBody;

    const supabase = createServerSupabaseClient();

    const {
      data: invitation,
      error: invitationError,
    } = await supabase
      .from("invitations")
      .select("id, status")
      .eq("id", invitationId)
      .maybeSingle();

    if (invitationError) {
      throw new Error(invitationError.message);
    }

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found." },
        { status: 404 },
      );
    }

    // ---------------------------------------------------------
    // Update event permissions
    // ---------------------------------------------------------

    if (body.eventIds !== undefined) {
      if (!Array.isArray(body.eventIds)) {
        return NextResponse.json(
          { error: "eventIds must be an array." },
          { status: 400 },
        );
      }

      const desiredEventIds = [...new Set(body.eventIds)];

      if (desiredEventIds.length === 0) {
        return NextResponse.json(
          {
            error: "Invitation must contain at least one event.",
          },
          { status: 400 },
        );
      }

      const {
        data: validEvents,
        error: validEventsError,
      } = await supabase
        .from("events")
        .select("id")
        .in("id", desiredEventIds)
        .eq("is_active", true);

      if (validEventsError) {
        throw new Error(validEventsError.message);
      }

      if ((validEvents?.length ?? 0) !== desiredEventIds.length) {
        return NextResponse.json(
          {
            error:
              "One or more selected events are invalid or inactive.",
          },
          { status: 400 },
        );
      }

      const {
        data: currentRelations,
        error: relationsError,
      } = await supabase
        .from("invitation_events")
        .select("event_id")
        .eq("invitation_id", invitationId);

      if (relationsError) {
        throw new Error(relationsError.message);
      }

      const currentEventIds =
        currentRelations?.map((row) => row.event_id) ?? [];

      const toAdd = desiredEventIds.filter(
        (eventId) => !currentEventIds.includes(eventId),
      );

      const toRemove = currentEventIds.filter(
        (eventId) => !desiredEventIds.includes(eventId),
      );

      // Add first so an insert failure doesn't destroy
      // existing invitation permissions.
      if (toAdd.length > 0) {
        const { error: addError } = await supabase
          .from("invitation_events")
          .insert(
            toAdd.map((eventId) => ({
              invitation_id: invitationId,
              event_id: eventId,
            })),
          );

        if (addError) {
          throw new Error(addError.message);
        }
      }

      if (toRemove.length > 0) {
        const { error: removeError } = await supabase
          .from("invitation_events")
          .delete()
          .eq("invitation_id", invitationId)
          .in("event_id", toRemove);

        if (removeError) {
          throw new Error(removeError.message);
        }
      }
    }

    // ---------------------------------------------------------
    // Activate / deactivate
    // ---------------------------------------------------------

    if (body.status !== undefined) {
      if (
        body.status !== "active" &&
        body.status !== "inactive"
      ) {
        return NextResponse.json(
          { error: "Invalid invitation status." },
          { status: 400 },
        );
      }

      const { error: statusError } = await supabase
        .from("invitations")
        .update({
          status: body.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", invitationId);

      if (statusError) {
        throw new Error(statusError.message);
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Update invitation failed:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update invitation.",
      },
      { status: 500 },
    );
  }
}