import type { WeddingEvent } from "@/types/invitation";

type EventCardProps = {
  event: WeddingEvent;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-3xl border border-[#dfd5ca] bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
        Celebration
      </p>

      <h3 className="mt-3 text-2xl font-semibold">
        {event.name}
      </h3>

      <div className="mt-5 space-y-1 text-sm text-gray-600">
        <p>{event.date}</p>
        <p>{event.time}</p>
        <p>{event.location}</p>
      </div>

      {event.description && (
        <p className="mt-5 leading-7 text-gray-600">
          {event.description}
        </p>
      )}

      {event.mapsUrl && (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full border border-[#321f24] px-5 py-2 text-sm font-medium transition hover:bg-[#321f24] hover:text-white"
        >
          Get Directions
        </a>
      )}
    </article>
  );
}