"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowLeft,
  Check,
  Heart,
  Loader2,
} from "lucide-react";

import { useState } from "react";

type RSVPStatus =
  | "attending"
  | "not_attending"
  | null;

type RSVPProps = {
  token: string;
  initialStatus: RSVPStatus;
};

export default function RSVP({
  token,
  initialStatus,
}: RSVPProps) {
  const reduceMotion =
    useReducedMotion();

  const [status, setStatus] =
    useState<RSVPStatus>(
      initialStatus,
    );

  const [loading, setLoading] =
    useState(false);

  const [saved, setSaved] =
    useState(
      initialStatus !== null,
    );

  const [editing, setEditing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null,
    );

  async function submit(
    nextStatus: Exclude<
      RSVPStatus,
      null
    >,
  ) {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response =
        await fetch(
          `/api/rsvp/${encodeURIComponent(
            token,
          )}`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status:
                nextStatus,
            }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to save RSVP.",
        );
      }

      setStatus(nextStatus);
      setSaved(true);
      setEditing(false);
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

  function updateResponse() {
    setEditing(true);
    setError(null);
  }

  function cancelUpdate() {
    setEditing(false);
    setError(null);
  }

  const showChoices =
    !saved || editing;

  const transition =
    reduceMotion
      ? {
          duration: 0,
        }
      : {
          duration: 0.65,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ] as [
            number,
            number,
            number,
            number,
          ],
        };

  return (
    <section
      id="rsvp"
      className="
        relative
        overflow-hidden
        px-5
        py-16
        sm:px-6
        sm:py-24
        lg:py-28
      "
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-16 h-72 w-72 rounded-full border border-[#b99155]/10 sm:-right-28" />

      <div className="pointer-events-none absolute -left-44 bottom-8 h-80 w-80 rounded-full border border-[#35151c]/5 sm:-left-36" />

      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={
            transition
          }
          className="text-center"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#b99155]/25">
            <Heart
              size={17}
              strokeWidth={1.3}
              className="text-[#b45e43]"
            />
          </div>

          <p className="mt-5 text-[8px] uppercase tracking-[0.36em] text-[#b45e43] sm:mt-6 sm:text-[9px] sm:tracking-[0.4em]">
            RSVP
          </p>

          <h2
            className="
              font-display
              mt-4
              text-[2.75rem]
              leading-[0.98]
              tracking-[-0.05em]
              text-[#261b1d]
              min-[390px]:text-5xl
              sm:mt-5
              sm:text-7xl
              sm:leading-[0.96]
            "
          >
            Will you be
            <br />

            <span className="font-editorial text-[#8e4438]">
              celebrating with us?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-[13px] leading-6 text-[#76686a] sm:mt-7 sm:text-base sm:leading-7">
            We&apos;d love to
            know if you can join
            us.
          </p>
        </motion.div>

        <div className="mt-9 sm:mt-14">
          <AnimatePresence
            mode="wait"
          >
            {showChoices ? (
              <motion.div
                key="choices"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity:
                          0,
                        y: 10,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity:
                          0,
                        y: -8,
                      }
                }
                transition={
                  transition
                }
              >
                {editing && (
                  <button
                    type="button"
                    disabled={
                      loading
                    }
                    onClick={
                      cancelUpdate
                    }
                    className="
                      mx-auto
                      mb-4
                      flex
                      min-h-11
                      items-center
                      justify-center
                      gap-1.5
                      rounded-full
                      px-4
                      text-xs
                      text-[#8a787b]
                      transition
                      hover:text-[#35151c]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#b99155]/60
                    "
                  >
                    <ArrowLeft
                      size={13}
                    />

                    Keep current
                    response
                  </button>
                )}

                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {/* ATTENDING */}
                  <motion.button
                    type="button"
                    disabled={
                      loading
                    }
                    whileHover={
                      reduceMotion ||
                      loading
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    whileTap={
                      reduceMotion ||
                      loading
                        ? undefined
                        : {
                            scale:
                              0.985,
                          }
                    }
                    onClick={() =>
                      submit(
                        "attending",
                      )
                    }
                    className={`
                      group
                      relative
                      min-h-[128px]
                      overflow-hidden
                      rounded-[22px]
                      border
                      p-5
                      text-left
                      transition-colors
                      duration-500
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:min-h-[176px]
                      sm:rounded-[26px]
                      sm:p-7
                      ${
                        status ===
                          "attending" &&
                        editing
                          ? "border-[#35151c]/40 bg-[#f4e8de]"
                          : "border-[#35151c]/14 bg-[#fbf7f0] hover:border-[#35151c]/40"
                      }
                    `}
                  >
                    <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full border border-[#b99155]/15 transition-transform duration-700 group-hover:scale-125" />

                    <div className="relative flex h-full items-center justify-between gap-4 sm:flex-col sm:items-stretch">
                      <div className="min-w-0">
                        <p className="text-[8px] uppercase tracking-[0.27em] text-[#a18f8c] sm:text-[9px] sm:tracking-[0.3em]">
                          Count me in
                        </p>

                        <p className="font-display mt-3 text-[1.7rem] leading-[0.98] tracking-[-0.035em] text-[#35151c] sm:mt-7 sm:text-3xl sm:leading-none">
                          Yes, I&apos;ll
                          be there
                        </p>

                        <p className="mt-2 text-[11px] leading-4 text-[#8a787b] sm:mt-3 sm:text-xs sm:leading-5">
                          Save my RSVP
                          as attending
                        </p>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#35151c]/12 sm:absolute sm:right-0 sm:top-0 sm:h-10 sm:w-10">
                        {loading ? (
                          <Loader2
                            size={15}
                            className="animate-spin text-[#8a787b]"
                          />
                        ) : status ===
                            "attending" &&
                          editing ? (
                          <Check
                            size={16}
                            className="text-[#b45e43]"
                          />
                        ) : (
                          <Heart
                            size={16}
                            strokeWidth={
                              1.4
                            }
                            className="text-[#b45e43]"
                          />
                        )}
                      </div>
                    </div>
                  </motion.button>

                  {/* NOT ATTENDING */}
                  <motion.button
                    type="button"
                    disabled={
                      loading
                    }
                    whileHover={
                      reduceMotion ||
                      loading
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    whileTap={
                      reduceMotion ||
                      loading
                        ? undefined
                        : {
                            scale:
                              0.985,
                          }
                    }
                    onClick={() =>
                      submit(
                        "not_attending",
                      )
                    }
                    className={`
                      group
                      relative
                      min-h-[128px]
                      overflow-hidden
                      rounded-[22px]
                      border
                      p-5
                      text-left
                      transition-colors
                      duration-500
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:min-h-[176px]
                      sm:rounded-[26px]
                      sm:p-7
                      ${
                        status ===
                          "not_attending" &&
                        editing
                          ? "border-[#35151c]/40 bg-[#f4e8de]"
                          : "border-[#35151c]/14 bg-transparent hover:border-[#35151c]/40 hover:bg-[#fbf7f0]"
                      }
                    `}
                  >
                    <div className="relative flex h-full items-center justify-between gap-4 sm:flex-col sm:items-stretch">
                      <div className="min-w-0">
                        <p className="text-[8px] uppercase tracking-[0.27em] text-[#a18f8c] sm:text-[9px] sm:tracking-[0.3em]">
                          With love
                        </p>

                        <p className="font-display mt-3 text-[1.7rem] leading-[0.98] tracking-[-0.035em] text-[#35151c] sm:mt-7 sm:text-3xl sm:leading-none">
                          I can&apos;t
                          make it
                        </p>

                        <p className="mt-2 text-[11px] leading-4 text-[#8a787b] sm:mt-3 sm:text-xs sm:leading-5">
                          Let the family
                          know
                        </p>
                      </div>

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#35151c]/10 sm:absolute sm:right-0 sm:top-0 sm:h-10 sm:w-10">
                        {loading ? (
                          <Loader2
                            size={15}
                            className="animate-spin text-[#8a787b]"
                          />
                        ) : status ===
                            "not_attending" &&
                          editing ? (
                          <Check
                            size={16}
                            className="text-[#b45e43]"
                          />
                        ) : null}
                      </div>
                    </div>
                  </motion.button>
                </div>

                {loading && (
                  <motion.p
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity:
                              0,
                          }
                    }
                    animate={{
                      opacity: 1,
                    }}
                    className="mt-5 text-center text-xs text-[#8a787b]"
                  >
                    Saving your
                    response…
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="confirmation"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity:
                          0,
                        scale:
                          0.98,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity:
                          0,
                        scale:
                          0.98,
                      }
                }
                transition={
                  transition
                }
                className="mx-auto max-w-xl"
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#b99155]/25
                    bg-[#f3e9dc]
                    px-5
                    py-8
                    text-center
                    sm:rounded-[30px]
                    sm:px-10
                    sm:py-12
                  "
                >
                  <div className="pointer-events-none absolute left-1/2 top-0 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#b99155] to-transparent sm:w-32" />

                  <motion.div
                    initial={
                      reduceMotion
                        ? false
                        : {
                            scale:
                              0.75,
                            opacity:
                              0,
                          }
                    }
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={
                      reduceMotion
                        ? {
                            duration:
                              0,
                          }
                        : {
                            delay:
                              0.12,
                            duration:
                              0.5,
                            ease: [
                              0.16,
                              1,
                              0.3,
                              1,
                            ],
                          }
                    }
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#35151c] text-white sm:h-12 sm:w-12"
                  >
                    <Check
                      size={18}
                      strokeWidth={
                        1.6
                      }
                    />
                  </motion.div>

                  <p className="mt-6 text-[8px] uppercase tracking-[0.28em] text-[#9d7b61] sm:mt-7 sm:text-[9px] sm:tracking-[0.3em]">
                    RSVP saved
                  </p>

                  {status ===
                  "attending" ? (
                    <>
                      <h3 className="font-display mt-3 text-[1.85rem] leading-[1.02] tracking-[-0.04em] text-[#35151c] sm:mt-4 sm:text-4xl">
                        We can&apos;t
                        wait to see you.
                      </h3>

                      <p className="font-editorial mx-auto mt-3 max-w-sm text-base leading-6 text-[#8e4438] sm:mt-4 sm:text-lg sm:leading-7">
                        That just made
                        us smile.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display mt-3 text-[1.85rem] leading-[1.02] tracking-[-0.04em] text-[#35151c] sm:mt-4 sm:text-4xl">
                        We&apos;ll miss
                        you.
                      </h3>

                      <p className="font-editorial mx-auto mt-3 max-w-sm text-base leading-6 text-[#8e4438] sm:mt-4 sm:text-lg sm:leading-7">
                        Thank you for
                        letting us know.
                      </p>
                    </>
                  )}

                  <div className="mx-auto mt-6 h-px w-14 bg-[#35151c]/10 sm:mt-7 sm:w-16" />

                  <p className="mt-5 text-[11px] leading-5 text-[#837275] sm:mt-6 sm:text-xs">
                    Changed plans?
                    You can update
                    your response.
                  </p>

                  <button
                    type="button"
                    onClick={
                      updateResponse
                    }
                    className="
                      mt-2
                      min-h-11
                      rounded-full
                      px-4
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-[#35151c]
                      underline
                      decoration-[#b99155]/60
                      underline-offset-4
                      transition
                      hover:text-[#b45e43]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#b99155]/60
                      sm:mt-3
                      sm:text-[11px]
                      sm:tracking-[0.17em]
                    "
                  >
                    Update response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 6,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mx-auto mt-5 max-w-lg rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-center sm:mt-6 sm:px-5 sm:py-4"
            >
              <p className="text-xs leading-5 text-red-700">
                {error}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}