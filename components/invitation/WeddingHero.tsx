"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";

export default function WeddingHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-3%", "3%"],
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [10, -10],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 sm:grid-cols-[1.25fr_0.75fr] sm:items-end">
          {/* LEFT SIDE */}

          <motion.div
            style={{
              y: textY,
            }}
          >
            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[10px] uppercase tracking-[0.38em] text-[#b45e43]"
            >
              The wedding
            </motion.p>

            {/* COUPLE NAMES */}

            <div className="mt-4">
              <motion.h2
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 38,
                        filter: "blur(5px)",
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-6xl leading-[0.88] tracking-[-0.055em] sm:text-8xl lg:text-9xl"
              >
                Nishita
              </motion.h2>

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 40,
                        filter: "blur(5px)",
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.95,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-1 flex items-baseline gap-3 sm:gap-4"
              >
                <span className="font-editorial text-5xl leading-none text-[#8e4438] sm:text-7xl lg:text-8xl">
                  &
                </span>

                <h2 className="font-display text-6xl leading-[0.88] tracking-[-0.055em] sm:text-8xl lg:text-9xl">
                  Mayur
                </h2>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              delay: 0.18,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="sm:pb-1"
          >
            <p className="max-w-sm text-sm leading-6 text-[#76686a]">
              Two families, countless memories and one beginning
              we would love to celebrate with you.
            </p>

            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#a18f8c]">
                  When
                </p>

                <p className="mt-2 text-sm text-[#261b1d]">
                  15 Feb 2027
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#a18f8c]">
                  Where
                </p>

                <p className="mt-2 text-sm text-[#261b1d]">
                  Airoli
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HERO PHOTO */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.985,
                  clipPath:
                    "inset(6% 6% 6% 6% round 22px)",
                }
          }
          whileInView={{
            opacity: 1,
            scale: 1,
            clipPath:
              "inset(0% 0% 0% 0% round 22px)",
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="premium-shadow relative mt-10 aspect-[4/3] overflow-hidden rounded-[22px] sm:aspect-[16/8]"
        >
          <motion.img
            src="/images/couple/hero.jpg"
            alt="Nishita and Mayur"
            style={{
              y: imageY,
            }}
            initial={
              reduceMotion
                ? false
                : {
                    scale: 1.08,
                  }
            }
            whileInView={{
              scale: 1.015,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              scale: {
                duration: 7,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="absolute -inset-y-[6%] left-0 h-[112%] w-full object-cover object-center"
          />

          {/* CINEMATIC OVERLAY */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#241216]/70 via-[#241216]/5 to-black/5" />

          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

          {/* PHOTO COPY */}

          <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-28 text-white sm:px-7 sm:pb-7">
            <div className="flex items-end justify-between gap-5">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 16,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#ead4ae]">
                  NishMay
                </p>

                <p className="font-display mt-2 text-2xl sm:text-3xl">
                  A beginning worth remembering.
                </p>
              </motion.div>

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -10,
                        y: -10,
                      }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.7,
                }}
              >
                <ArrowDownRight
                  size={24}
                  strokeWidth={1}
                  className="shrink-0 text-[#ead4ae]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}