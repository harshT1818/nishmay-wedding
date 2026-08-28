"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

export default function EntranceCurtain() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      {/* LEFT CURTAIN */}

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-101%" }}
        transition={{
          delay: 0.75,
          duration: 1.15,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#35151c]"
      />

      {/* RIGHT CURTAIN */}

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "101%" }}
        transition={{
          delay: 0.75,
          duration: 1.15,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#35151c]"
      />

      {/* CENTER HAIRLINE */}

      <motion.div
        initial={{
          scaleY: 0,
          opacity: 0,
        }}
        animate={{
          scaleY: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-0 h-full w-px origin-center bg-[#d8bd8c]/40"
      />

      {/* MONOGRAM */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.9, 1, 1, 1.04],
          filter: [
            "blur(8px)",
            "blur(0px)",
            "blur(0px)",
            "blur(3px)",
          ],
        }}
        transition={{
          duration: 1.15,
          times: [0, 0.25, 0.68, 1],
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center text-[#f6f0e6]">
          <p className="font-display text-5xl tracking-[-0.05em] sm:text-6xl">
            N
            <span className="font-editorial mx-2 text-[#d8bd8c]">
              &
            </span>
            M
          </p>

          <p className="mt-4 text-[8px] uppercase tracking-[0.48em] text-[#d8bd8c]">
            15 · 02 · 2027
          </p>
        </div>
      </motion.div>
    </div>
  );
}