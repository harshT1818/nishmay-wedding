"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

import {
  useWeddingExperience,
} from "@/components/invitation/WeddingExperience";

export default function Opening() {
  const {
    startExperience,
  } = useWeddingExperience();

  const reduceMotion =
    useReducedMotion();

  const motionProps = (
    delay: number,
  ) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 12,
        },

    animate: {
      opacity: 1,
      y: 0,
    },

    transition: reduceMotion
      ? {
          duration: 0,
        }
      : {
          duration: 0.8,
          delay,
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
        },
  });

  return (
    <section
      className="
        wedding-grain
        relative
        flex
        min-h-[100svh]
        min-h-[100dvh]
        overflow-hidden
        bg-[#35151c]
        text-[#f8f0e4]
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-14%]
          h-[360px]
          w-[360px]
          -translate-x-1/2
          rounded-full
          bg-[#b45e43]/18
          blur-[100px]
          sm:h-[520px]
          sm:w-[520px]
          sm:blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-150px]
          right-[-170px]
          h-[340px]
          w-[340px]
          rounded-full
          bg-[#d49a52]/10
          blur-[100px]
          sm:h-[420px]
          sm:w-[420px]
          sm:blur-[120px]
        "
      />

      {/* Inner frame */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-3
          top-[calc(12px+env(safe-area-inset-top))]
          bottom-[calc(12px+env(safe-area-inset-bottom))]
          rounded-[22px]
          border
          border-[#d8bd8c]/18
          sm:inset-x-6
          sm:top-[calc(24px+env(safe-area-inset-top))]
          sm:bottom-[calc(24px+env(safe-area-inset-bottom))]
          sm:rounded-[26px]
        "
      />

      {/* Decorative corners */}
      <div
        className="
          pointer-events-none
          absolute
          left-6
          top-[calc(22px+env(safe-area-inset-top))]
          text-sm
          text-[#d8bd8c]/50
          sm:left-9
          sm:top-[calc(34px+env(safe-area-inset-top))]
          sm:text-lg
        "
      >
        ✦
      </div>

      <div
        className="
          pointer-events-none
          absolute
          right-6
          top-[calc(22px+env(safe-area-inset-top))]
          text-sm
          text-[#d8bd8c]/50
          sm:right-9
          sm:top-[calc(34px+env(safe-area-inset-top))]
          sm:text-lg
        "
      >
        ✦
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[100svh]
          min-h-[100dvh]
          w-full
          max-w-7xl
          flex-col
          px-6
          pb-[calc(24px+env(safe-area-inset-bottom))]
          pt-[calc(26px+env(safe-area-inset-top))]
          sm:px-12
          sm:pb-[calc(36px+env(safe-area-inset-bottom))]
          sm:pt-[calc(36px+env(safe-area-inset-top))]
        "
      >
        {/* Top metadata */}
        <motion.div
          {...motionProps(
            0.2,
          )}
          className="
            flex
            items-center
            justify-between
            px-1
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#d8bd8c]/80
            sm:text-[9px]
            sm:tracking-[0.3em]
          "
        >
          <span>
            NishMay
          </span>

          <span>
            15 · 02 · 2027
          </span>
        </motion.div>

        {/* Main content */}
        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            items-center
            justify-center
            py-6
            text-center
            sm:py-10
          "
        >
          <motion.p
            {...motionProps(
              0.4,
            )}
            className="
              mb-5
              text-[8px]
              uppercase
              tracking-[0.32em]
              text-[#d8bd8c]/85
              sm:mb-6
              sm:text-[9px]
              sm:tracking-[0.42em]
            "
          >
            Together with
            their families
          </motion.p>

          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,
                    scale:
                      0.985,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={
              reduceMotion
                ? {
                    duration:
                      0,
                  }
                : {
                    delay:
                      0.58,
                    duration:
                      1,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }
            }
            className="
              font-display
              text-[clamp(3.6rem,18vw,9rem)]
              leading-[0.82]
              tracking-[-0.055em]
              sm:text-[clamp(4.6rem,14vw,9rem)]
              sm:leading-[0.8]
              sm:tracking-[-0.06em]
            "
          >
            Nishita
          </motion.h1>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,
                    scaleX:
                      0,
                  }
            }
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={
              reduceMotion
                ? {
                    duration:
                      0,
                  }
                : {
                    delay:
                      0.95,
                    duration:
                      0.7,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }
            }
            className="
              my-4
              flex
              w-full
              max-w-[250px]
              items-center
              gap-4
              sm:my-5
              sm:max-w-xs
            "
          >
            <div className="h-px flex-1 bg-[#d8bd8c]/25" />

            <span className="font-editorial text-2xl text-[#d8bd8c] sm:text-3xl">
              &
            </span>

            <div className="h-px flex-1 bg-[#d8bd8c]/25" />
          </motion.div>

          <motion.h1
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,
                    scale:
                      0.985,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={
              reduceMotion
                ? {
                    duration:
                      0,
                  }
                : {
                    delay:
                      1.02,
                    duration:
                      1,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }
            }
            className="
              font-display
              text-[clamp(3.6rem,18vw,9rem)]
              leading-[0.82]
              tracking-[-0.055em]
              sm:text-[clamp(4.6rem,14vw,9rem)]
              sm:leading-[0.8]
              sm:tracking-[-0.06em]
            "
          >
            Mayur
          </motion.h1>

          <motion.p
            {...motionProps(
              1.4,
            )}
            className="
              mt-6
              text-[9px]
              tracking-[0.2em]
              text-[#d8bd8c]/80
              sm:mt-8
              sm:text-[10px]
              sm:tracking-[0.26em]
            "
          >
            #NishMayKiShaadi
          </motion.p>

          {/* Open invitation */}
          <motion.button
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,
                    y: 16,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={
              reduceMotion
                ? {
                    duration:
                      0,
                  }
                : {
                    delay:
                      1.6,
                    duration:
                      0.7,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }
            }
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale:
                      0.98,
                  }
            }
            type="button"
            onClick={
              startExperience
            }
            className="
              group
              mt-7
              flex
              min-h-12
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-[#d8bd8c]/35
              bg-[#f8f0e4]
              px-6
              py-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#35151c]
              transition-colors
              duration-500
              hover:bg-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#d8bd8c]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#35151c]
              sm:mt-9
              sm:text-[10px]
              sm:tracking-[0.16em]
            "
          >
            Open Invitation

            <ArrowDown
              size={14}
              className="
                transition-transform
                duration-500
                group-hover:translate-y-1
                group-active:translate-y-1
              "
            />
          </motion.button>

          <motion.p
            {...motionProps(
              1.85,
            )}
            className="
              mt-3
              text-[7px]
              uppercase
              tracking-[0.18em]
              text-[#d8bd8c]/40
              sm:mt-4
              sm:text-[8px]
              sm:tracking-[0.22em]
            "
          >
            Best experienced
            with sound
          </motion.p>
        </div>

        {/* Bottom location */}
        <motion.div
          {...motionProps(
            2,
          )}
          className="
            px-1
            text-center
            text-[7px]
            uppercase
            tracking-[0.22em]
            text-[#d8bd8c]/45
            sm:text-[8px]
            sm:tracking-[0.28em]
          "
        >
          Mumbai → Airoli
        </motion.div>
      </div>
    </section>
  );
}