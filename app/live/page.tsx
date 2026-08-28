import {
  getLiveWeddingData,
} from "@/lib/live/getLiveWeddingData";

import HappeningNow from "@/components/live/HappeningNow";
import LiveFeed from "@/components/live/LiveFeed";
import UploadMoment from "@/components/live/UploadMoment";
import MediaWall from "@/components/live/MediaWall";

export const dynamic =
  "force-dynamic";

export default async function LivePage() {
  const {
    liveEvent,
    updates,
    media,
  } = await getLiveWeddingData();

  return (
    <main className="min-h-screen bg-[#f6f0e6] text-[#261b1d]">
      <header className="px-5 pb-4 pt-7 sm:px-6 sm:pt-9">
        <div className="mx-auto flex max-w-4xl items-center justify-between border-b border-[#35151c]/10 pb-5">
          <div>
            <p className="font-display text-2xl tracking-[-0.04em] text-[#35151c]">
              Nishita × Mayur
            </p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.24em] text-[#b45e43]">
              #NishMayKiShaadi
            </p>
          </div>

          <p className="text-[9px] uppercase tracking-[0.2em] text-[#76686a]">
            Wedding Live
          </p>
        </div>
      </header>

      <HappeningNow
        event={liveEvent}
      />

      <MediaWall
        media={media}
      />

      <LiveFeed
        updates={updates}
      />
      

<UploadMoment
  eventId={
    liveEvent?.id ??
    null
  }
/>
    </main>
  );
}