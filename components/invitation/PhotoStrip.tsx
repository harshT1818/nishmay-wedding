"use client";

import { motion } from "framer-motion";

const photos = [
  {
    src: "/images/couple/portrait.jpg",
    alt: "Nishita and Mayur portrait",
    className: "aspect-[4/5]",
  },
  {
    src: "/images/couple/hero.jpg",
    alt: "Nishita and Mayur together",
    className: "aspect-[4/5] sm:translate-y-8",
  },
  {
    src: "/images/couple/detail.jpg",
    alt: "A moment from Nishita and Mayur's story",
    className: "aspect-[4/5]",
  },
];

export default function PhotoStrip() {
  return (
    <section className="overflow-hidden px-5 py-18 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.38em] text-[#b45e43]">
              A few moments
            </p>

            <h2 className="font-display mt-4 text-4xl tracking-[-0.04em] sm:text-5xl">
              Before forever.
            </h2>
          </div>

          <p className="hidden max-w-xs text-right text-xs leading-6 text-[#76686a] sm:block">
            A glimpse into the story before the celebrations begin.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.src}
              initial={{
                opacity: 0,
                y: 22,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                delay: index * 0.07,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative overflow-hidden rounded-[14px] sm:rounded-[20px] ${photo.className}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.035]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2d161b]/25 via-transparent to-transparent" />

              <span className="absolute bottom-3 left-3 text-[7px] uppercase tracking-[0.22em] text-white/70 sm:bottom-4 sm:left-4 sm:text-[8px]">
                0{index + 1}
              </span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}