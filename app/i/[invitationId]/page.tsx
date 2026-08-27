import { notFound } from "next/navigation";
import Opening from "@/components/invitation/Opening";
import Greeting from "@/components/invitation/Greeting";
import EventCard from "@/components/invitation/EventCard";
import Closing from "@/components/invitation/Closing";
import { getInvitation } from "@/data/invitations";

type InvitationPageProps = {
  params: Promise<{
    invitationId: string;
  }>;
};

export default async function InvitationPage({
  params,
}: InvitationPageProps) {
  const { invitationId } = await params;

  const invitation = getInvitation(invitationId);

  if (!invitation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#321f24]">
      <Opening />

      <Greeting guestName={invitation.guestName} />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Nishita Weds Mayur
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Your Celebrations
            </h2>
          </div>

          <div className="space-y-5">
            {invitation.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <Closing />
    </main>
  );
}