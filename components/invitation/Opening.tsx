"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { useWeddingExperience } from "@/components/invitation/WeddingExperience";

export default function Opening() {
  const { startExperience } =
    useWeddingExperience();

  return (
    <section className="wedding-grain relative flex min-h-[100svh] overflow-hidden bg-[#35151c] text-[#f8f0e4]">
      {/* Ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-[-18%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#b45e43]/18 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-180px] right-[-160px] h-[420px] w-[420px] rounded-full bg-[#d49a52]/10 blur-[120px]" />

      {/* Inner frame */}
      <div className="pointer-events-none absolute inset-4 rounded-[26px] border border-[#d8bd8c]/18 sm:inset-6" />

      {/* Corners */}
      <div className="absolute left-7 top-7 text-lg text-[#d8bd8c]/55">
        ✦
      </div>

      <div className="absolute right-7 top-7 text-lg text-[#d8bd8c]/55">
        ✦
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-7 pb-9 pt-9 sm:px-12">
        {/* Top metadata */}
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-[#d8bd8c]/80"
        >
          <span>NishMay</span>

          <span>15 · 02 · 2027</span>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
              duration: 0.75,
            }}
            className="mb-6 text-[9px] uppercase tracking-[0.42em] text-[#d8bd8c]/85"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.62,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-[clamp(4.2rem,14vw,9rem)] leading-[0.8] tracking-[-0.06em]"
          >
            Nishita
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              delay: 1.02,
              duration: 0.7,
            }}
            className="my-5 flex w-full max-w-xs items-center gap-4"
          >
            <div className="h-px flex-1 bg-[#d8bd8c]/25" />

            <span className="font-editorial text-3xl text-[#d8bd8c]">
              &
            </span>

            <div className="h-px flex-1 bg-[#d8bd8c]/25" />
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1.08,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-[clamp(4.2rem,14vw,9rem)] leading-[0.8] tracking-[-0.06em]"
          >
            Mayur
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.5,
              duration: 0.8,
            }}
            className="mt-8 text-[10px] tracking-[0.26em] text-[#d8bd8c]/80"
          >
            #NishMayKiShaadi
          </motion.p>

          {/* Enter invitation */}
          <motion.button
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.7,
              duration: 0.7,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="button"
            onClick={startExperience}
            className="group mt-9 flex items-center gap-3 rounded-full border border-[#d8bd8c]/35 bg-[#f8f0e4] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#35151c] transition-all duration-500 hover:bg-white"
          >
            Open Invitation

            <ArrowDown
              size={14}
              className="transition-transform duration-500 group-hover:translate-y-1"
            />
          </motion.button>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 2,
            }}
            className="mt-4 text-[8px] uppercase tracking-[0.22em] text-[#d8bd8c]/40"
          >
            Best experienced with sound
          </motion.p>
        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2.1,
          }}
          className="text-center text-[8px] uppercase tracking-[0.28em] text-[#d8bd8c]/45"
        >
          Mumbai → Airoli
        </motion.div>
      </div>
    </section>
  );
}