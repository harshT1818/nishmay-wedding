"use client";

import { motion } from "framer-motion";

export default function CoupleStory() {
  return (
    <section className="overflow-hidden px-5 pb-20 pt-4 sm:pb-28 sm:pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
          {/* Portrait image */}
          <motion.div
            initial={{
              opacity: 0,
              x: -24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative aspect-[4/5] overflow-hidden rounded-[20px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(30,12,16,0.03), rgba(30,12,16,0.18)), url('/images/couple/portrait.jpg'), linear-gradient(145deg,#d7c1b0,#aa8274)",
              }}
            />

            <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/10 px-4 py-2 text-[8px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
              Nishita × Mayur
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{
              opacity: 0,
              x: 24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              delay: 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col justify-between rounded-[20px] bg-[#35151c] px-7 py-9 text-[#f8f0e4] sm:px-10 sm:py-12"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.38em] text-[#d8bd8c]">
                Their story
              </p>

              <h2 className="font-display mt-5 text-5xl leading-[0.92] tracking-[-0.045em] sm:text-6xl">
                Two lives.
                <br />
                One beautiful
                <br />

                <span className="font-editorial text-[#d8bd8c]">
                  partnership.
                </span>
              </h2>
            </div>

            <div className="mt-12">
              <div className="gold-line mb-7 w-28" />

              <p className="max-w-lg text-sm leading-7 text-[#f8f0e4]/68">
                From conversations and shared ambitions to a celebration
                surrounded by family, this is the beginning of Nishita
                and Mayur&apos;s next chapter.
              </p>

              <p className="font-editorial mt-7 text-lg text-[#d8bd8c]">
                Two CAs. One perfectly balanced partnership.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Detail photograph */}
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
          className="relative mt-5 aspect-[16/7] overflow-hidden rounded-[20px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(30,12,16,0.02), rgba(30,12,16,0.16)), url('/images/couple/detail.jpg'), linear-gradient(100deg,#c9ab97,#e0d1c3)",
            }}
          />

          <div className="absolute bottom-5 left-5 text-white sm:bottom-7 sm:left-7">
            <p className="text-[8px] uppercase tracking-[0.3em] text-white/70">
              15 · 02 · 2027
            </p>

            <p className="font-display mt-2 text-2xl">
              #NishMayKiShaadi
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}