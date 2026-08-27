"use client";

import { useState } from "react";

type RSVPStatus = "yes" | "no" | null;

export default function RSVP() {
  const [status, setStatus] = useState<RSVPStatus>(null);

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
          RSVP
        </p>

        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Will you celebrate with us?
        </h2>

        <p className="mx-auto mt-5 max-w-md leading-7 text-[#6f6265]">
          We would love to know if you'll be joining Nishita & Mayur for
          the celebrations.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setStatus("yes")}
            className={`rounded-2xl border px-6 py-5 font-medium transition ${
              status === "yes"
                ? "border-[#321f24] bg-[#321f24] text-white"
                : "border-[#d8cbc5] bg-white hover:border-[#321f24]"
            }`}
          >
            Yes ❤️
          </button>

          <button
            type="button"
            onClick={() => setStatus("no")}
            className={`rounded-2xl border px-6 py-5 font-medium transition ${
              status === "no"
                ? "border-[#321f24] bg-[#321f24] text-white"
                : "border-[#d8cbc5] bg-white hover:border-[#321f24]"
            }`}
          >
            Unfortunately, I can't make it
          </button>
        </div>

        {status && (
          <div
            aria-live="polite"
            className="mt-8 rounded-2xl bg-[#efe5da] p-5 text-sm leading-6"
          >
            {status === "yes" ? (
              <p>
                We'd be delighted to celebrate with you. ❤️
                <br />
                <span className="text-[#74666a]">
                  Your response is currently only stored on this screen.
                </span>
              </p>
            ) : (
              <p>
                We'll miss you, but thank you for letting us know.
                <br />
                <span className="text-[#74666a]">
                  Your response is currently only stored on this screen.
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}