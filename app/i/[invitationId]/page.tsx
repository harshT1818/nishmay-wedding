import { notFound } from "next/navigation";

import Opening from "@/components/invitation/Opening";
import Greeting from "@/components/invitation/Greeting";
import DateReveal from "@/components/invitation/DateReveal";
import WeddingHero from "@/components/invitation/WeddingHero";
import Countdown from "@/components/invitation/Countdown";
import EventCard from "@/components/invitation/EventCard";
import RSVP from "@/components/invitation/RSVP";
import Closing from "@/components/invitation/Closing";

import { getInvitationByToken } from "@/lib/invitations/getInvitationByToken";

type InvitationPageProps = {
  params: Promise<{
    invitationId: string;
  }>;
};

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { invitationId } = await params;

  const invitation = await getInvitationByToken(invitationId);

  if (!invitation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#321f24]">
      <Opening />

      <Greeting guestName={invitation.guestName} />

      <DateReveal />

      <WeddingHero />

      <Countdown />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
              You're invited to
            </p>

            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Your Celebrations
            </h2>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-[#6f6265]">
              These are the celebrations included in your invitation.
            </p>
          </div>

          <div className="space-y-5">
            {invitation.events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        </div>
      </section>

      <RSVP token={invitationId} />

      <Closing />
    </main>
  );
}