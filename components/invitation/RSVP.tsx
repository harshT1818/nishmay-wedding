"use client";

import { useState } from "react";

type RSVPStatus = "yes" | "no" | null;

type RSVPProps = {
  token: string;
};

export default function RSVP({
  token,
}: RSVPProps) {
  const [status, setStatus] =
    useState<RSVPStatus>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleRSVP(
    nextStatus: Exclude<RSVPStatus, null>,
  ) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/rsvp/${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status:
              nextStatus === "yes"
                ? "attending"
                : "not_attending",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Unable to save RSVP.",
        );
      }

      setStatus(nextStatus);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save RSVP.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="rsvp"
      className="px-6 py-28"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
          RSVP
        </p>

        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Will you celebrate with us?
        </h2>

        <p className="mx-auto mt-5 max-w-md leading-7 text-[#6f6265]">
          We would love to know if you'll be joining
          Nishita & Mayur for the celebrations.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleRSVP("yes")}
            className={`rounded-2xl border px-6 py-5 font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
              status === "yes"
                ? "border-[#321f24] bg-[#321f24] text-white"
                : "border-[#d8cbc5] bg-white hover:border-[#321f24]"
            }`}
          >
            Yes ❤️
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleRSVP("no")}
            className={`rounded-2xl border px-6 py-5 font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
              status === "no"
                ? "border-[#321f24] bg-[#321f24] text-white"
                : "border-[#d8cbc5] bg-white hover:border-[#321f24]"
            }`}
          >
            Unfortunately, I can't make it
          </button>
        </div>

        {loading && (
          <p className="mt-6 text-sm text-[#74666a]">
            Saving your response...
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mt-6 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {status && !loading && (
          <div
            aria-live="polite"
            className="mt-8 rounded-2xl bg-[#efe5da] p-5 text-sm leading-6"
          >
            {status === "yes"
              ? "We'd be delighted to celebrate with you. ❤️"
              : "We'll miss you, but thank you for letting us know."}
          </div>
        )}
      </div>
    </section>
  );
}