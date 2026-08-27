"use client";

import { useState } from "react";

export default function DateReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
          Save the date
        </p>

        <h2 className="mt-4 text-3xl font-semibold">
          Something special is waiting...
        </h2>

        <button
          type="button"
          onClick={() => setRevealed(true)}
          aria-expanded={revealed}
          className="relative mt-10 min-h-[320px] w-full overflow-hidden rounded-[2rem] border border-[#dbcac2] bg-[#efe5da] p-8 shadow-sm"
        >
          {revealed ? (
            <div className="flex min-h-[250px] flex-col items-center justify-center">
              <span className="text-7xl font-semibold sm:text-8xl">
                15
              </span>

              <span className="mt-3 text-3xl">
                February
              </span>

              <span className="mt-2 text-xl tracking-[0.2em]">
                2027
              </span>

              <span className="mt-8 text-sm uppercase tracking-[0.3em] text-[#8b646d]">
                Save the Date
              </span>
            </div>
          ) : (
            <div className="flex min-h-[250px] flex-col items-center justify-center">
              <span className="text-5xl">✦</span>

              <span className="mt-6 text-xl font-medium">
                Tap to reveal
              </span>

              <span className="mt-3 text-sm text-[#76666a]">
                A little surprise awaits you
              </span>
            </div>
          )}
        </button>

        <p className="mt-5 text-sm text-[#76666a]">
          Wedding · 15 February 2027
        </p>
      </div>
    </section>
  );
}