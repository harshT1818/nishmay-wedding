"use client";

import { useState } from "react";
import { Check, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type RSVPProps = {
  token: string;
};

type RSVPStatus = "attending" | "not_attending" | null;

export default function RSVP({
  token,
}: RSVPProps) {
  const [status, setStatus] = useState<RSVPStatus>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(
    nextStatus: Exclude<RSVPStatus, null>,
  ) {
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const response = await fetch(
        `/api/rsvp/${encodeURIComponent(token)}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: nextStatus,
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
      setSaved(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save RSVP.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-6 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute right-[-120px] top-10 h-72 w-72 rounded-full border border-[#b99155]/10" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center"
        >
          <Heart
            size={20}
            strokeWidth={1.3}
            className="mx-auto text-[#b45e43]"
          />

          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#b45e43]">
            RSVP
          </p>

          <h2 className="font-display mt-5 text-5xl tracking-[-0.045em] sm:text-7xl">
            Will you be
            <br />
            <span className="font-editorial text-[#8e4438]">
              celebrating with us?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-[#76686a] sm:text-base">
            A simple yes or no is all we need.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => submit("attending")}
            className={`group relative overflow-hidden rounded-[24px] border p-7 text-left transition-all duration-500 ${
              status === "attending"
                ? "border-[#35151c] bg-[#35151c] text-white"
                : "border-[#35151c]/15 bg-[#fbf7f0] hover:border-[#35151c]/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-60">
                  Count me in
                </p>

                <p className="font-display mt-3 text-3xl">
                  Yes, absolutely
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                  status === "attending"
                    ? "border-white/20 bg-white/10"
                    : "border-[#35151c]/15"
                }`}
              >
                {status === "attending" ? (
                  <Check size={18} />
                ) : (
                  <Heart
                    size={17}
                    strokeWidth={1.5}
                  />
                )}
              </div>
            </div>
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              submit("not_attending")
            }
            className={`group rounded-[24px] border p-7 text-left transition-all duration-500 ${
              status === "not_attending"
                ? "border-[#35151c] bg-[#35151c] text-white"
                : "border-[#35151c]/15 bg-[#fbf7f0] hover:border-[#35151c]/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] opacity-60">
                  With love
                </p>

                <p className="font-display mt-3 text-3xl">
                  Can&apos;t make it
                </p>
              </div>

              {status === "not_attending" && (
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Check size={18} />
                </div>
              )}
            </div>
          </button>
        </div>

        {loading && (
          <div className="mt-7 flex items-center justify-center gap-2 text-sm text-[#76686a]">
            <Loader2
              size={16}
              className="animate-spin"
            />

            Saving your response...
          </div>
        )}

        {saved && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#b99155]/20 bg-[#efe4d4] px-6 py-5 text-center"
          >
            <p className="font-editorial text-lg text-[#8e4438]">
              {status === "attending"
                ? "That just made us smile. See you there."
                : "We'll miss you, but thank you for letting us know."}
            </p>
          </motion.div>
        )}

        {error && (
          <p className="mt-6 text-center text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}