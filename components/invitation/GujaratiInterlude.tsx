"use client";

import { motion } from "framer-motion";

const dots = Array.from({ length: 28 });

export default function GujaratiInterlude() {
  return (
    <section className="relative overflow-hidden bg-[#b45e43] px-6 py-16 text-[#fff7ec] sm:py-20">
      {/* Bandhani-inspired dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
      >
        <div className="grid h-full grid-cols-7 gap-6 p-6 sm:grid-cols-14">
          {dots.map((_, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: (index % 7) * 0.035,
                duration: 0.5,
              }}
              className="mx-auto h-1.5 w-1.5 rounded-full border border-current"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
          }}
          className="text-[9px] uppercase tracking-[0.42em] text-[#f4d7aa]"
        >
          પ્રેમ · પરિવાર · ઉજવણી
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.08,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display mt-5 text-4xl leading-tight tracking-[-0.04em] sm:text-6xl"
        >
          A little tradition.
          <br />
          <span className="font-editorial text-[#f4d7aa]">
            A lot of celebration.
          </span>
        </motion.h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[#f4d7aa]/50" />

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#fff7ec]/75">
          From familiar rituals to loud laughter, from Mumbai to Airoli,
          this celebration carries the warmth of family with it.
        </p>
      </div>
    </section>
  );
}