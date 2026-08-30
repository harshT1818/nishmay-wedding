"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  CalendarDays,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Music2,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const SHARE_TEXT =
  "\u2728 Save the Date \u2728\n\n" +
  "Nishita Thaker \u2764\uFE0F Mayur Gami\n\n" +
  "\uD83D\uDCC5 14 & 15 February 2027\n" +
  "\uD83D\uDCCD Mumbai\n\n" +
  "#NishMayKiShaadi \u2764\uFE0F";

const PETAL_COLORS = [
  "#f5a623",
  "#e05b3f",
  "#c93347",
  "#f0b52f",
  "#d94453",
];

/* -------------------------------------------------------------------------- */
/*                                  MANDALA                                   */
/* -------------------------------------------------------------------------- */

function Mandala({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
      >
        <circle
          cx="150"
          cy="150"
          r="22"
          strokeWidth="1.6"
        />

        <circle
          cx="150"
          cy="150"
          r="45"
          strokeWidth="1.1"
          strokeDasharray="3 6"
        />

        <circle
          cx="150"
          cy="150"
          r="78"
          strokeWidth="0.9"
        />

        <circle
          cx="150"
          cy="150"
          r="113"
          strokeWidth="0.7"
          strokeDasharray="2 7"
        />

        {Array.from({
          length: 16,
        }).map((_, index) => {
          const rotation =
            index * 22.5;

          return (
            <g
              key={rotation}
              transform={`rotate(${rotation} 150 150)`}
            >
              <path
                d="M150 55 C172 78 174 101 150 122 C126 101 128 78 150 55Z"
                strokeWidth="1"
              />

              <path
                d="M150 23 C160 40 160 52 150 66 C140 52 140 40 150 23Z"
                strokeWidth="0.8"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ORGANIC TORAN                                 */
/* -------------------------------------------------------------------------- */

function ToranFlower({
  color,
  size = 15,
}: {
  color: string;
  size?: number;
}) {
  return (
    <span
      className="block rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow:
          "0 2px 6px rgba(107,58,36,0.12)",
      }}
    />
  );
}

function MangoLeaf({
  rotate = 0,
  scale = 1,
}: {
  rotate?: number;
  scale?: number;
}) {
  return (
    <span
      className="block h-6 w-3 origin-top rounded-[70%_10%_70%_10%] bg-gradient-to-b from-[#b79a57] to-[#806335]"
      style={{
        rotate: `${rotate}deg`,
        scale,
      }}
    />
  );
}

function OrganicToran() {
  const groups = [
    {
      drop: 18,
      flowers: 3,
    },
    {
      drop: 28,
      flowers: 4,
    },
    {
      drop: 21,
      flowers: 3,
    },
    {
      drop: 34,
      flowers: 5,
    },
    {
      drop: 23,
      flowers: 4,
    },
    {
      drop: 37,
      flowers: 5,
    },
    {
      drop: 23,
      flowers: 4,
    },
    {
      drop: 34,
      flowers: 5,
    },
    {
      drop: 21,
      flowers: 3,
    },
    {
      drop: 28,
      flowers: 4,
    },
    {
      drop: 18,
      flowers: 3,
    },
  ];

  return (
    <motion.div
      aria-hidden="true"
      initial={{
        opacity: 0,
        y: -35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none absolute inset-x-0 top-0 z-10 overflow-hidden"
    >
      <div className="relative mx-auto h-[84px] w-full max-w-[820px]">
        <div className="absolute left-[3%] right-[3%] top-[9px] h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#8a5c39]/45 to-transparent" />

        <div className="flex justify-between px-[4%] pt-[6px]">
          {groups.map(
            (
              group,
              index,
            ) => (
              <motion.div
                key={index}
                animate={{
                  rotate: [
                    -1.5,
                    1.5,
                    -1.5,
                  ],
                }}
                transition={{
                  duration:
                    3.2 +
                    index * 0.09,
                  repeat:
                    Infinity,
                  ease:
                    "easeInOut",
                  delay:
                    index * 0.06,
                }}
                className="flex origin-top flex-col items-center"
              >
                <div
                  className="w-px bg-[#986d49]/45"
                  style={{
                    height:
                      group.drop *
                      0.45,
                  }}
                />

                <div className="flex flex-col items-center">
                  {Array.from({
                    length:
                      group.flowers,
                  }).map(
                    (
                      _,
                      flowerIndex,
                    ) => (
                      <ToranFlower
                        key={
                          flowerIndex
                        }
                        size={
                          flowerIndex %
                            2 ===
                          0
                            ? 14
                            : 12
                        }
                        color={
                          flowerIndex %
                            3 ===
                          0
                            ? "#f3a21d"
                            : flowerIndex %
                                  3 ===
                                1
                              ? "#e05f3f"
                              : "#efb02b"
                        }
                      />
                    ),
                  )}
                </div>

                <div className="mt-0.5 flex gap-[1px]">
                  <MangoLeaf
                    rotate={-15}
                    scale={0.85}
                  />

                  <MangoLeaf
                    rotate={15}
                    scale={0.85}
                  />
                </div>
              </motion.div>
            ),
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SIDE FOLIAGE                                  */
/* -------------------------------------------------------------------------- */

function FloralBranch({
  side,
}: {
  side: "left" | "right";
}) {
  const isLeft =
    side === "left";

  return (
    <motion.div
      aria-hidden="true"
      initial={{
        opacity: 0,
        x: isLeft
          ? -35
          : 35,
        rotate:
          isLeft
            ? -5
            : 5,
      }}
      animate={{
        opacity: 1,
        x: 0,
        rotate: 0,
      }}
      transition={{
        duration: 1.3,
        delay: 0.2,
      }}
      className={`pointer-events-none absolute top-[23%] z-[4] h-[52%] w-[92px] sm:w-[150px] ${
        isLeft
          ? "left-0"
          : "right-0 -scale-x-100"
      }`}
    >
      <svg
        viewBox="0 0 150 500"
        className="h-full w-full overflow-visible"
      >
        <path
          d="M18 475 C65 370 20 290 77 200 C105 155 94 90 122 30"
          fill="none"
          stroke="#8a6738"
          strokeWidth="3"
          opacity="0.43"
        />

        {[
          {
            x: 48,
            y: 410,
            r: -28,
          },
          {
            x: 62,
            y: 350,
            r: 34,
          },
          {
            x: 43,
            y: 300,
            r: -32,
          },
          {
            x: 76,
            y: 247,
            r: 28,
          },
          {
            x: 83,
            y: 190,
            r: -25,
          },
          {
            x: 101,
            y: 130,
            r: 35,
          },
          {
            x: 110,
            y: 77,
            r: -27,
          },
        ].map(
          (
            leaf,
            index,
          ) => (
            <g
              key={index}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="10"
                ry="25"
                fill={
                index % 2 === 0
                    ? "#b59a5c"
                    : "#8d6b3e"
                }
                opacity="0.66"
              />
            </g>
          ),
        )}

        {[
          {
            x: 31,
            y: 390,
            c: "#d5484a",
          },
          {
            x: 71,
            y: 330,
            c: "#ee9e20",
          },
          {
            x: 52,
            y: 267,
            c: "#c93448",
          },
          {
            x: 88,
            y: 218,
            c: "#f0a523",
          },
          {
            x: 94,
            y: 156,
            c: "#db5940",
          },
          {
            x: 117,
            y: 103,
            c: "#efab28",
          },
        ].map(
          (
            flower,
            index,
          ) => (
            <g
              key={index}
              transform={`translate(${flower.x} ${flower.y})`}
            >
              {[0, 72, 144, 216, 288].map(
                (rotation) => (
                  <ellipse
                    key={
                      rotation
                    }
                    cx="0"
                    cy="-8"
                    rx="5"
                    ry="10"
                    transform={`rotate(${rotation})`}
                    fill={
                      flower.c
                    }
                    opacity="0.8"
                  />
                ),
              )}

              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#efc15d"
              />
            </g>
          ),
        )}
      </svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   DIYA                                     */
/* -------------------------------------------------------------------------- */

function Diya({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.8,
      }}
    >
      <div className="relative flex h-16 w-16 items-end justify-center">
        <motion.div
          animate={{
            scaleY: [
              1,
              1.14,
              0.94,
              1,
            ],
            rotate: [
              -2,
              2,
              -1,
              -2,
            ],
          }}
          transition={{
            duration: 1.25,
            repeat:
              Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[23px] h-8 w-4 origin-bottom rounded-[80%_20%_75%_25%] bg-gradient-to-t from-[#f47c20] via-[#ffc74a] to-[#fff1a3]"
          style={{
            filter:
              "drop-shadow(0 0 10px rgba(244,145,33,0.65))",
          }}
        />

        <div className="relative h-5 w-12 overflow-hidden rounded-b-[90%] rounded-t-[35%] border border-[#a84838]/25 bg-gradient-to-b from-[#e96b3d] to-[#9d2937] shadow-[0_7px_17px_rgba(113,39,38,0.14)]">
          <div className="absolute left-1/2 top-1 h-[2px] w-7 -translate-x-1/2 rounded-full bg-[#ffd76e]/65" />
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                RANGOLI                                     */
/* -------------------------------------------------------------------------- */

function RangoliCorner({
  side,
}: {
  side: "left" | "right";
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute bottom-0 ${
        side === "left"
          ? "left-[-20px]"
          : "right-[-20px] -scale-x-100"
      } h-32 w-32 opacity-70 sm:h-40 sm:w-40`}
    >
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full"
      >
        <circle
          cx="80"
          cy="80"
          r="47"
          fill="none"
          stroke="#d69531"
          strokeWidth="1.2"
          strokeDasharray="3 5"
        />

        {[0, 45, 90, 135].map(
          (rotation) => (
            <g
              key={rotation}
              transform={`rotate(${rotation} 80 80)`}
            >
              <path
                d="M80 27 C96 45 96 59 80 72 C64 59 64 45 80 27Z"
                fill="#e9a32c"
                opacity="0.4"
              />

              <path
                d="M80 88 C96 101 96 115 80 133 C64 115 64 101 80 88Z"
                fill="#c93a48"
                opacity="0.3"
              />
            </g>
          ),
        )}

        <circle
          cx="80"
          cy="80"
          r="11"
          fill="#d04b42"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  SPARK                                     */
/* -------------------------------------------------------------------------- */

function Spark({
  left,
  top,
  delay,
  big = false,
}: {
  left: string;
  top: string;
  delay: number;
  big?: boolean;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute ${
        big
          ? "text-xl"
          : "text-xs"
      } text-[#e29b29]`}
      style={{
        left,
        top,
      }}
      animate={{
        scale: [
          0.6,
          1.45,
          0.6,
        ],
        opacity: [
          0.18,
          1,
          0.18,
        ],
        rotate: [
          0,
          50,
          0,
        ],
      }}
      transition={{
        duration: 2.6,
        delay,
        repeat:
          Infinity,
        ease: "easeInOut",
      }}
    >
      ✦
    </motion.span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PETAL                                    */
/* -------------------------------------------------------------------------- */

function FallingPetal({
  left,
  delay,
  duration,
  color,
  size = 7,
}: {
  left: string;
  delay: number;
  duration: number;
  color: string;
  size?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none fixed -top-8 z-10 rounded-[80%_20%_75%_25%]"
      style={{
        left,
        width: size,
        height:
          size * 1.5,
        background:
          color,
      }}
      animate={{
        y: [
          "-5vh",
          "110vh",
        ],
        x: [
          0,
          16,
          -10,
          12,
          -4,
        ],
        rotate: [
          0,
          100,
          220,
          350,
          470,
        ],
        opacity: [
          0,
          0.75,
          0.65,
          0.45,
          0,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat:
          Infinity,
        ease: "linear",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                           WEDDING INSTRUMENTS                              */
/* -------------------------------------------------------------------------- */

function WeddingInstruments() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.8,
        duration: 0.8,
      }}
      className="mt-3 flex items-center justify-center gap-4 opacity-75"
    >
      {/* Shehnai */}

      <motion.svg
        viewBox="0 0 80 32"
        className="h-6 w-14 text-[#b4473c]"
        animate={{
          rotate: [
            -2,
            2,
            -2,
          ],
          y: [
            0,
            -1,
            0,
          ],
        }}
        transition={{
          duration: 3,
          repeat:
            Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M8 14 L55 14"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M55 8 L72 16 L55 24 Z"
          fill="#d6942d"
        />

        <circle
          cx="21"
          cy="14"
          r="2"
          fill="#f0c56b"
        />

        <circle
          cx="31"
          cy="14"
          r="2"
          fill="#f0c56b"
        />

        <circle
          cx="41"
          cy="14"
          r="2"
          fill="#f0c56b"
        />
      </motion.svg>

      <span className="text-xs text-[#d89c31]">
        ✦
      </span>

      {/* Dhol */}

      <motion.svg
        viewBox="0 0 70 48"
        className="h-8 w-12"
        animate={{
          rotate: [
            2,
            -2,
            2,
          ],
        }}
        transition={{
          duration: 2.7,
          repeat:
            Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M16 12 C30 6 40 6 54 12 L54 36 C40 42 30 42 16 36Z"
          fill="#a82f3d"
        />

        <ellipse
          cx="16"
          cy="24"
          rx="7"
          ry="13"
          fill="#edbb5c"
        />

        <ellipse
          cx="54"
          cy="24"
          rx="7"
          ry="13"
          fill="#edbb5c"
        />

        <path
          d="M22 10 L47 38 M47 10 L22 38"
          stroke="#f4d58d"
          strokeWidth="2"
          opacity="0.75"
        />
      </motion.svg>

      <span className="text-xs text-[#d89c31]">
        ✦
      </span>

      <motion.svg
        viewBox="0 0 80 32"
        className="h-6 w-14 -scale-x-100 text-[#b4473c]"
        animate={{
          rotate: [
            2,
            -2,
            2,
          ],
          y: [
            0,
            -1,
            0,
          ],
        }}
        transition={{
          duration: 3.2,
          repeat:
            Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M8 14 L55 14"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M55 8 L72 16 L55 24 Z"
          fill="#d6942d"
        />

        <circle
          cx="21"
          cy="14"
          r="2"
          fill="#f0c56b"
        />

        <circle
          cx="31"
          cy="14"
          r="2"
          fill="#f0c56b"
        />

        <circle
          cx="41"
          cy="14"
          r="2"
          fill="#f0c56b"
        />
      </motion.svg>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FLORAL DIVIDER                               */
/* -------------------------------------------------------------------------- */

function FloralDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3"
    >
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d58d2d]" />

      <span className="text-[#e0a22f]">
        ✦
      </span>

      <span className="text-lg text-[#c63c46]">
        ❈
      </span>

      <span className="text-[#e0a22f]">
        ✦
      </span>

      <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d58d2d]" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              WEDS CENTERPIECE                              */
/* -------------------------------------------------------------------------- */

function WedsMoment({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const petals =
    Array.from({
      length: 12,
    });

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 0.7,
        type: "spring",
        stiffness: 110,
      }}
      className="relative mx-auto my-1 flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 26,
          repeat:
            Infinity,
          ease: "linear",
        }}
        className="absolute inset-[3px] rounded-full border border-dashed border-[#db9631]/55"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 39,
          repeat:
            Infinity,
          ease: "linear",
        }}
        className="absolute inset-[12px] rounded-full border border-[#bd3342]/15"
      />

      {petals.map(
        (_, index) => {
          const angle =
            index * 30;

          const color =
            PETAL_COLORS[
              index %
                PETAL_COLORS.length
            ];

          return (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay:
                  0.9 +
                  index *
                    0.04,
                type:
                  "spring",
              }}
              className="absolute left-1/2 top-1/2 h-[17px] w-[8px] origin-[50%_45px] rounded-[90%_10%_90%_10%]"
              style={{
                background:
                  color,
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-45px)`,
              }}
            />
          );
        },
      )}

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [
                  1,
                  1.05,
                  1,
                ],
                boxShadow: [
                  "0 8px 25px rgba(134,45,42,0.10)",
                  "0 12px 36px rgba(221,146,37,0.22)",
                  "0 8px 25px rgba(134,45,42,0.10)",
                ],
              }
        }
        transition={{
          duration: 3,
          repeat:
            Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[#bf3745]/20 bg-[#fff8ec]/95 sm:h-[68px] sm:w-[68px]"
      >
        <span className="font-editorial -rotate-3 text-[24px] italic text-[#b42d3b] sm:text-[27px]">
          weds
        </span>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                DATE MOMENT                                 */
/* -------------------------------------------------------------------------- */

function DateMoment({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 1.25,
        duration: 0.9,
      }}
      className="relative mx-auto mt-4 max-w-[700px]"
    >
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="text-sm text-[#d6922e]">
          ❈
        </span>

        <span className="h-px w-10 bg-[#d6922e]/45" />

        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#98653f]">
          Mark your calendar
        </span>

        <span className="h-px w-10 bg-[#d6922e]/45" />

        <span className="text-sm text-[#d6922e]">
          ❈
        </span>
      </div>

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  "0 10px 30px rgba(160,64,54,0.06)",
                  "0 16px 50px rgba(214,142,41,0.17)",
                  "0 10px 30px rgba(160,64,54,0.06)",
                ],
              }
        }
        transition={{
          duration: 4.2,
          repeat:
            Infinity,
        }}
        className="relative overflow-hidden rounded-[28px] border border-[#d79033]/30 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,242,214,0.7))] px-3 py-4 backdrop-blur-sm sm:px-8 sm:py-5"
      >
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    "-180%",
                    "220%",
                  ],
                }
          }
          transition={{
            duration: 4.5,
            repeat:
              Infinity,
            repeatDelay: 1.7,
          }}
          className="absolute inset-y-0 w-20 rotate-12 bg-white/30 blur-xl"
        />

        <div className="absolute left-2 top-2 h-7 w-7 rounded-tl-xl border-l-2 border-t-2 border-[#c83f47]/30" />
        <div className="absolute right-2 top-2 h-7 w-7 rounded-tr-xl border-r-2 border-t-2 border-[#c83f47]/30" />
        <div className="absolute bottom-2 left-2 h-7 w-7 rounded-bl-xl border-b-2 border-l-2 border-[#dc9c35]/35" />
        <div className="absolute bottom-2 right-2 h-7 w-7 rounded-br-xl border-b-2 border-r-2 border-[#dc9c35]/35" />

        <p className="font-display relative z-10 whitespace-nowrap text-[clamp(1.62rem,7.3vw,4.15rem)] leading-[1.05] tracking-[-0.045em] text-[#a42a39]">
          14 &amp; 15 February 2027
        </p>

        <div className="relative z-10 mt-2.5 flex items-center justify-center gap-2">
          <MapPin
            size={17}
            strokeWidth={2}
            className="text-[#c94b3f]"
          />

          <span className="text-sm font-extrabold uppercase tracking-[0.17em] text-[#57403f] sm:text-base">
            Mumbai
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HASHTAG CARD                                 */
/* -------------------------------------------------------------------------- */

function HashtagMoment({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative mx-auto mt-4 max-w-[590px]"
    >
      <Spark
        left="1%"
        top="-5%"
        delay={0}
        big
      />

      <Spark
        left="95%"
        top="5%"
        delay={0.7}
        big
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [
                  0,
                  -2,
                  0,
                ],
              }
        }
        transition={{
          duration: 3.2,
          repeat:
            Infinity,
        }}
        className="relative overflow-hidden rounded-[24px] border border-[#ffd56b]/35 bg-[linear-gradient(120deg,#8d2036_0%,#c52c40_33%,#df543c_68%,#df941f_100%)] px-4 py-3.5 shadow-[0_16px_45px_rgba(154,45,47,0.24)]"
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    "-170%",
                    "210%",
                  ],
                }
          }
          transition={{
            duration: 4,
            repeat:
              Infinity,
            repeatDelay: 2,
          }}
          className="absolute inset-y-0 w-24 rotate-12 bg-white/20 blur-xl"
        />

        <p className="relative text-[9px] font-black uppercase tracking-[0.24em] text-[#ffe8ad]">
          Two names. One celebration.
        </p>

        <motion.p
          animate={
            reduceMotion
              ? undefined
              : {
                  textShadow: [
                    "0 0 0px rgba(255,230,164,0)",
                    "0 0 16px rgba(255,230,164,0.34)",
                    "0 0 0px rgba(255,230,164,0)",
                  ],
                }
          }
          transition={{
            duration: 3,
            repeat:
              Infinity,
          }}
          className="relative mt-1 whitespace-nowrap text-[clamp(1.25rem,6.2vw,2.4rem)] font-black tracking-[-0.045em] text-white"
        >
          #NishMayKiShaadi
        </motion.p>

        <div className="relative mt-1 flex items-center justify-center gap-3 text-[#ffe2a1]">
          <span>✦</span>
          <span>❈</span>
          <span>✦</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                MUSIC CONTROL                               */
/* -------------------------------------------------------------------------- */

function MusicControl({
  playing,
  onToggle,
  reduceMotion,
}: {
  playing: boolean;
  onToggle: () => void;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.button
      type="button"
      onClick={
        onToggle
      }
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 1.5,
      }}
      aria-label={
        playing
          ? "Pause wedding music"
          : "Play wedding music"
      }
      className="fixed bottom-3 right-3 z-50 flex h-11 items-center gap-2 rounded-full border border-[#9e303b]/15 bg-[#fff8ec]/95 px-3 shadow-[0_8px_28px_rgba(87,36,39,0.15)] backdrop-blur-xl sm:bottom-5 sm:right-5"
    >
      <motion.span
        animate={
          playing &&
          !reduceMotion
            ? {
                rotate: [
                  -5,
                  5,
                  -5,
                ],
              }
            : undefined
        }
        transition={{
          duration: 1,
          repeat:
            Infinity,
        }}
      >
        {playing ? (
          <Volume2
            size={16}
            className="text-[#b4323f]"
          />
        ) : (
          <VolumeX
            size={16}
            className="text-[#745450]"
          />
        )}
      </motion.span>

      <span className="hidden text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#694243] sm:inline">
        {playing
          ? "Music on"
          : "Play music"}
      </span>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function SaveTheDateExperience() {
  const reduceMotion =
    useReducedMotion();

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null,
    );

  const [
    musicPlaying,
    setMusicPlaying,
  ] = useState(false);

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    pageUrl,
    setPageUrl,
  ] = useState("");

  /* ------------------------------------------------------------------------ */
  /*                                   URL                                    */
  /* ------------------------------------------------------------------------ */

useEffect(() => {
  const audio = audioRef.current;

  if (!audio) {
    return;
  }

  audio.volume = 0.42;

  const startMusic = async () => {
    if (!audio.paused) {
      return;
    }

    try {
      await audio.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
    }
  };

  // Try immediately.
  void startMusic();

  // Browsers blocking autoplay will allow it after
  // the guest's first interaction with the invitation.
  const handleFirstInteraction = () => {
    void startMusic();
  };

  document.addEventListener(
    "pointerdown",
    handleFirstInteraction,
    { once: true },
  );

  document.addEventListener(
    "touchstart",
    handleFirstInteraction,
    { once: true, passive: true },
  );

  document.addEventListener(
    "keydown",
    handleFirstInteraction,
    { once: true },
  );

  return () => {
    document.removeEventListener(
      "pointerdown",
      handleFirstInteraction,
    );

    document.removeEventListener(
      "touchstart",
      handleFirstInteraction,
    );

    document.removeEventListener(
      "keydown",
      handleFirstInteraction,
    );
  };
}, []);

  /* ------------------------------------------------------------------------ */
  /*                                  MUSIC                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.42;

    const tryAutoplay =
      async () => {
        try {
          await audio.play();

          setMusicPlaying(
            true,
          );
        } catch {
          // Most browsers block autoplay with sound.
        }
      };

    void tryAutoplay();

    const playAfterInteraction =
      () => {
        if (
          !audio.paused
        ) {
          return;
        }

        void audio
          .play()
          .then(() => {
            setMusicPlaying(
              true,
            );
          })
          .catch(() => {});
      };

    window.addEventListener(
      "pointerdown",
      playAfterInteraction,
      {
        once: true,
      },
    );

    window.addEventListener(
      "keydown",
      playAfterInteraction,
      {
        once: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointerdown",
        playAfterInteraction,
      );

      window.removeEventListener(
        "keydown",
        playAfterInteraction,
      );
    };
  }, []);

  const toggleMusic =
    useCallback(
      async () => {
        const audio =
          audioRef.current;

        if (!audio) {
          return;
        }

        if (audio.paused) {
          try {
            await audio.play();

            setMusicPlaying(
              true,
            );
          } catch {
            setMusicPlaying(
              false,
            );
          }

          return;
        }

        audio.pause();

        setMusicPlaying(
          false,
        );
      },
      [],
    );

  /* ------------------------------------------------------------------------ */
  /*                                   SHARE                                  */
  /* ------------------------------------------------------------------------ */

  const whatsappUrl =
    useMemo(() => {
      const message =
        pageUrl
          ? `${SHARE_TEXT}\n\n${pageUrl}`
          : SHARE_TEXT;

      return `https://wa.me/?text=${encodeURIComponent(
        message,
      )}`;
    }, [pageUrl]);

  const calendarUrl =
    useMemo(() => {
      const title =
        encodeURIComponent(
          "Nishita Thaker & Mayur Gami's Wedding",
        );

      const details =
        encodeURIComponent(
          "Save the Date — Nishita Thaker weds Mayur Gami. #NishMayKiShaadi",
        );

      const location =
        encodeURIComponent(
          "Mumbai, India",
        );

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270214/20270216&details=${details}&location=${location}`;
    }, []);

  async function copyLink() {
    if (!pageUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        pageUrl,
      );

      setCopied(true);

      window.setTimeout(
        () => {
          setCopied(false);
        },
        1800,
      );
    } catch {
      setCopied(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /*                                  RENDER                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#fff7e8] text-[#35141d]">
      <audio
        ref={audioRef}
        src="/audio/wedding-theme.mp3"
        loop
        preload="auto"
      />

      <MusicControl
        playing={
          musicPlaying
        }
        onToggle={
          toggleMusic
        }
        reduceMotion={
          reduceMotion
        }
      />

      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute -left-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-[#f4ab24]/24 blur-[105px]" />

        <div className="absolute -right-28 top-[22%] h-[30rem] w-[30rem] rounded-full bg-[#df455c]/16 blur-[110px]" />

        <div className="absolute -bottom-24 left-[20%] h-[33rem] w-[33rem] rounded-full bg-[#b82b3f]/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(92,34,36,0.27) 0.55px, transparent 0.7px)",
            backgroundSize:
              "9px 9px",
          }}
        />
      </div>

      {/* WEDDING DECOR */}

      <OrganicToran />

      <FloralBranch side="left" />

      <FloralBranch side="right" />

      {!reduceMotion && (
        <>
          {[
            [
              "7%",
              0,
              15,
              7,
            ],
            [
              "18%",
              5,
              18,
              6,
            ],
            [
              "31%",
              9,
              19,
              8,
            ],
            [
              "47%",
              2,
              17,
              6,
            ],
            [
              "63%",
              7,
              18,
              7,
            ],
            [
              "79%",
              4,
              16,
              8,
            ],
            [
              "91%",
              10,
              19,
              6,
            ],
          ].map(
            (
              item,
              index,
            ) => (
              <FallingPetal
                key={index}
                left={
                  item[0] as string
                }
                delay={
                  item[1] as number
                }
                duration={
                  item[2] as number
                }
                size={
                  item[3] as number
                }
                color={
                  PETAL_COLORS[
                    index %
                      PETAL_COLORS.length
                  ]
                }
              />
            ),
          )}
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*                                HERO                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative flex min-h-[87svh] items-center justify-center px-4 pb-5 pt-[94px] sm:px-8 sm:pt-[104px]">
        {/* LARGE CEREMONIAL HALO */}

        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: 0.86,
            rotate: -8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.6,
          }}
          className="absolute left-1/2 top-[47%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-[#cf4c42]/[0.075] sm:h-[620px] sm:w-[620px]"
        >
          <Mandala className="h-full w-full" />
        </motion.div>

        {/* BOTTOM CEREMONIAL CORNERS */}

        <RangoliCorner side="left" />

        <RangoliCorner side="right" />

        <Diya
          delay={1.2}
          className="absolute bottom-2 left-2 z-10 sm:left-6"
        />

        <Diya
          delay={1.35}
          className="absolute bottom-2 right-2 z-10 -scale-x-100 sm:right-6"
        />

        {/* SPARKS */}

        <Spark
          left="12%"
          top="28%"
          delay={0}
          big
        />

        <Spark
          left="86%"
          top="25%"
          delay={0.7}
          big
        />

        <Spark
          left="18%"
          top="63%"
          delay={1.5}
        />

        <Spark
          left="81%"
          top="66%"
          delay={2}
        />

        {/* CONTENT */}

        <div className="relative z-30 mx-auto w-full max-w-4xl text-center">
          {/* MAIN PURPOSE */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.75,
            }}
            className="relative z-40 mx-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-[#c34143]/18 bg-[#fff8ea]/95 px-4 py-2 shadow-[0_8px_28px_rgba(122,48,43,0.11)] backdrop-blur-md sm:px-5"
          >
            <span className="h-px w-5 bg-[#d49735]" />

            <Sparkles
              size={15}
              className="text-[#d64a42]"
            />

            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#892836] sm:text-sm">
              Save the Date
            </p>

            <Sparkles
              size={15}
              className="text-[#d64a42]"
            />

            <span className="h-px w-5 bg-[#d49735]" />
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.18,
            }}
            className="font-editorial mt-2 text-[13px] italic text-[#76504b] sm:text-base"
          >
            Two families. One beautiful beginning.
          </motion.p>

          {/* NISHITA */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    filter:
                      "blur(12px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="mt-4"
          >
            <h1 className="font-display text-[clamp(3.35rem,14vw,7.5rem)] leading-[0.82] tracking-[-0.067em] text-[#48141e]">
              Nishita
            </h1>
          </motion.div>

          {/* WEDS */}

          <WedsMoment
            reduceMotion={
              reduceMotion
            }
          />

          {/* MAYUR */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    filter:
                      "blur(12px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            transition={{
              delay: 0.76,
              duration: 1,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <h1 className="font-display text-[clamp(3.35rem,14vw,7.5rem)] leading-[0.82] tracking-[-0.067em] text-[#48141e]">
              Mayur
            </h1>
          </motion.div>

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
              delay: 1.05,
              duration: 0.75,
            }}
            className="mt-4"
          >
            <FloralDivider />
          </motion.div>

          {/* DATE */}

          <DateMoment
            reduceMotion={
              reduceMotion
            }
          />

          {/* HUMAN MESSAGE */}

          <motion.p
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.7,
            }}
            className="font-editorial mx-auto mt-3 max-w-md text-[14px] italic leading-6 text-[#664642] sm:text-lg"
          >
            Keep these two days close.
            We can&apos;t wait to celebrate with you.
          </motion.p>

          {/* VERY SMALL INSTRUMENT DETAIL */}

          <WeddingInstruments />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*                        COMPACT FINAL SECTION                        */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative border-t border-[#8d2936]/10 bg-[linear-gradient(180deg,rgba(255,248,235,0.7),rgba(255,241,218,0.92))] px-3 pb-7 pt-5 sm:px-6 sm:pb-9">
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          {/* FULL NAMES - NEVER WRAP */}

          <div className="w-full overflow-hidden px-1">
            <p className="font-display whitespace-nowrap text-[clamp(0.78rem,4.2vw,2rem)] font-semibold leading-tight tracking-[-0.045em] text-[#491620]">
              Nishita Thaker
              <span className="mx-[0.3em] font-editorial font-normal italic text-[#c54042]">
                weds
              </span>
              Mayur Gami
            </p>
          </div>

          <HashtagMoment
            reduceMotion={
              reduceMotion
            }
          />

          {/* UTILITY */}

          <div className="mt-4 flex justify-center">
            <a
              href={
                calendarUrl
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full border border-[#902c38]/15 bg-white/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.07em] text-[#72504e] transition hover:bg-white/65 active:scale-[0.97]"
            >
              <CalendarDays
                size={12}
              />

              Add to calendar
            </a>
          </div>

          {/* SHARE */}

          <div className="mx-auto mt-3 grid max-w-[590px] gap-2 sm:grid-cols-2">
            <a
              href={
                whatsappUrl
              }
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#922738] px-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#fff7e9] shadow-[0_8px_24px_rgba(142,38,53,0.15)] transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle
                size={15}
              />

              Share on WhatsApp
            </a>

            <button
              type="button"
              onClick={
                copyLink
              }
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#922738]/20 bg-white/60 px-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#652c33] transition hover:bg-white active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check
                    size={15}
                  />

                  Link copied
                </>
              ) : (
                <>
                  <Copy
                    size={15}
                  />

                  Copy link
                </>
              )}
            </button>
          </div>

          <div
            aria-hidden="true"
            className="mt-4 flex items-center justify-center gap-3 text-[#d68e27]"
          >
            <span>✦</span>

            <span className="text-[#bd3743]">
              ❈
            </span>

            <Music2
              size={14}
            />

            <span className="text-[#bd3743]">
              ❈
            </span>

            <span>✦</span>
          </div>
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-1/2 h-56 w-56 -translate-x-1/2 text-[#c94343]/[0.07]"
        >
          <Mandala className="h-full w-full" />
        </div>
      </section>
    </main>
  );
}