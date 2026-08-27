import { MapPin, Navigation } from "lucide-react";
import type { WeddingEvent } from "@/types/invitation";

type EventCardProps = {
  event: WeddingEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-3xl border border-[#dfd5ca] bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-[#8b7b7e]">
        Celebration
      </p>

      <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
        {event.name}
      </h3>

      <div className="mt-6 space-y-2 text-sm text-[#6f6265]">
        {event.date && <p>{event.date}</p>}

        {event.time && <p>{event.time}</p>}

        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

          <div>
            {event.venue && (
              <p className="font-medium text-[#321f24]">
                {event.venue}
              </p>
            )}

            <p>{event.location}</p>

            {event.address && (
              <p className="mt-1">{event.address}</p>
            )}
          </div>
        </div>
      </div>

      {event.description && (
        <p className="mt-6 leading-7 text-[#6f6265]">
          {event.description}
        </p>
      )}

      {event.dressCode && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8b7b7e]">
            Dress Code
          </p>

          <p className="mt-1 text-sm">
            {event.dressCode}
          </p>
        </div>
      )}

      {event.instructions && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8b7b7e]">
            Good to know
          </p>

          <p className="mt-1 text-sm leading-6 text-[#6f6265]">
            {event.instructions}
          </p>
        </div>
      )}

      {event.mapsUrl && (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#321f24] px-5 py-2.5 text-sm font-medium transition hover:bg-[#321f24] hover:text-white"
        >
          <Navigation className="h-4 w-4" />
          Get Directions
        </a>
      )}
    </article>
  );
}