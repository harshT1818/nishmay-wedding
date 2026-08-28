import {
  notFound,
} from "next/navigation";

import Opening from "@/components/invitation/Opening";
import Greeting from "@/components/invitation/Greeting";
import DateReveal from "@/components/invitation/DateReveal";
import WeddingHero from "@/components/invitation/WeddingHero";
import Countdown from "@/components/invitation/Countdown";
import EventCard from "@/components/invitation/EventCard";
import RSVP from "@/components/invitation/RSVP";
import Closing from "@/components/invitation/Closing";

import FloatingControls from "@/components/invitation/FloatingControls";
import SectionDivider from "@/components/invitation/SectionDivider";
import CoupleStory from "@/components/invitation/CoupleStory";
import GujaratiInterlude from "@/components/invitation/GujaratiInterlude";
import PhotoStrip from "@/components/invitation/PhotoStrip";
import EntranceCurtain from "@/components/invitation/EntranceCurtain";
import FestiveAtmosphere from "@/components/invitation/FestiveAtmosphere";

import {
  WeddingExperienceProvider,
} from "@/components/invitation/WeddingExperience";

import {
  getInvitationByToken,
} from "@/lib/invitations/getInvitationByToken";

import {
  getRSVPStatus,
} from "@/lib/rsvp/getRSVPStatus";

type InvitationPageProps = {
  params: Promise<{
    invitationId: string;
  }>;
};

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { invitationId } =
    await params;

  const invitation =
    await getInvitationByToken(
      invitationId,
    );

  if (!invitation) {
    notFound();
  }

  const rsvpStatus =
    await getRSVPStatus(
      invitation.id,
    );

  return (
    <WeddingExperienceProvider>
      <EntranceCurtain />

      <FestiveAtmosphere />

      <main className="min-h-screen overflow-hidden bg-[#f6f0e6] text-[#261b1d]">
        <Opening />

        <Greeting
          guestName={
            invitation.guestName
          }
        />

        <SectionDivider />

        <DateReveal />

        <WeddingHero />

        <PhotoStrip />

        <GujaratiInterlude />

        <CoupleStory />

        <Countdown />

        <section
          id="events"
          className="px-6 pt-18 pb-6 sm:pt-24 sm:pb-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-[9px] uppercase tracking-[0.38em] text-[#b45e43]">
                  Come celebrate
                  with us
                </p>

                <h2 className="font-display mt-4 text-5xl tracking-[-0.05em] sm:text-6xl">
                  Please join us.
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-[#76686a]">
                We would be
                delighted to
                celebrate these
                moments together
                with you.
              </p>
            </div>

            <div className="border-b border-[#35151c]/10">
              {invitation.events.map(
                (
                  event,
                  index,
                ) => (
                  <EventCard
                    key={
                      event.id
                    }
                    event={
                      event
                    }
                    index={
                      index
                    }
                  />
                ),
              )}
            </div>
          </div>
        </section>

        <RSVP
          token={
            invitationId
          }
          initialStatus={
            rsvpStatus
          }
        />

        <Closing />

        <FloatingControls />
      </main>
    </WeddingExperienceProvider>
  );
}