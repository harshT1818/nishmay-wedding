"use client";

import { motion } from "framer-motion";

const journey = [
  {
    number: "01",
    title: "Kankotri",
    place: "Mumbai",
  },
  {
    number: "02",
    title: "Mehendi",
    place: "Mumbai",
  },
  {
    number: "03",
    title: "Haldi · Mameru",
    place: "Mumbai",
  },
  {
    number: "04",
    title: "Sangeet",
    place: "Mumbai",
  },
  {
    number: "05",
    title: "Marriage",
    place: "Airoli",
  },
];

export default function WeddingJourney() {
  return (
    <section className="overflow-hidden bg-[#ede1d2] px-6 py-18 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 sm:grid-cols-[1.2fr_0.8fr] sm:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.38em] text-[#b45e43]">
              The journey
            </p>

            <h2 className="font-display mt-4 text-5xl tracking-[-0.05em] sm:text-6xl">
              Mumbai
              <span className="mx-3 font-editorial text-[#8e4438]">
                to
              </span>
              Airoli
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#76686a]">
            One celebration unfolding through familiar places,
            family rituals and unforgettable moments.
          </p>
        </div>

        <div className="mt-10 border-y border-[#35151c]/10">
          {journey.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{
                opacity: 0,
                x: -14,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.6,
              }}
              className="grid grid-cols-[42px_1fr_auto] items-center gap-3 border-b border-[#35151c]/10 py-5 last:border-b-0 sm:grid-cols-[70px_1fr_auto]"
            >
              <span className="text-[9px] tracking-[0.2em] text-[#b99155]">
                {item.number}
              </span>

              <p className="font-display text-2xl tracking-[-0.03em] sm:text-3xl">
                {item.title}
              </p>

              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8d7c7e]">
                {item.place}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="font-editorial mt-8 text-center text-lg text-[#8e4438]">
          And then, forever.
        </p>
      </div>
    </section>
  );
}