"use client";

import {
  useEffect,
  useMemo,
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
  Sparkles,
} from "lucide-react";

const SHARE_TEXT =
  "Save the Date ✨\n\nNishita Thaker weds Mayur Gami\n14 & 15 February 2027\nMumbai\n\n#NishMayKiShaadi";

const CELEBRATION_COLORS = [
  "#f2aa2a",
  "#e58a24",
  "#d95e44",
  "#c9374b",
  "#b92f3d",
  "#f3c661",
];

function RangoliFlower({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      >
        <circle cx="80" cy="80" r="18" />

        <circle
          cx="80"
          cy="80"
          r="39"
          strokeDasharray="2 5"
        />

        {[0, 45, 90, 135].map(
          (rotation) => (
            <g
              key={rotation}
              transform={`rotate(${rotation} 80 80)`}
            >
              <path d="M80 16 C96 35 97 51 80 67 C63 51 64 35 80 16Z" />
              <path d="M80 93 C97 109 96 125 80 144 C64 125 63 109 80 93Z" />
            </g>
          ),
        )}
      </g>
    </svg>
  );
}

function MarigoldString({
  left,
  delay = 0,
}: {
  left: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 flex flex-col items-center"
      style={{ left }}
      initial={{
        y: -120,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1.15,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="h-12 w-px bg-[#b99155]/50 sm:h-16" />

      {Array.from({
        length: 5,
      }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            x: [-1, 2, -1],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 3 + index * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`-mt-[2px] h-4 w-4 rounded-full shadow-[0_2px_7px_rgba(0,0,0,0.08)] sm:h-5 sm:w-5 ${
            index % 2 === 0
              ? "bg-[#efa82e]"
              : "bg-[#d95e44]"
          }`}
        />
      ))}
    </motion.div>
  );
}

function FloatingSpark({
  left,
  top,
  delay,
  size = "text-xs",
}: {
  left: string;
  top: string;
  delay: number;
  size?: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute ${size} text-[#e79d27]`}
      style={{
        left,
        top,
      }}
      animate={{
        y: [0, -8, 0],
        scale: [0.65, 1.35, 0.65],
        rotate: [0, 50, 0],
        opacity: [0.25, 1, 0.25],
      }}
      transition={{
        duration: 2.8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ✦
    </motion.span>
  );
}

function FallingPetal({
  left,
  delay,
  duration,
  color,
  size = 8,
  drift = 18,
}: {
  left: string;
  delay: number;
  duration: number;
  color: string;
  size?: number;
  drift?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 rounded-[80%_20%_80%_20%]"
      style={{
        left,
        width: size,
        height: size * 1.6,
        background: color,
        boxShadow:
          "0 3px 9px rgba(89, 45, 36, 0.08)",
      }}
      animate={{
        y: ["0vh", "112vh"],
        x: [
          0,
          drift,
          -drift * 0.55,
          drift * 0.35,
        ],
        rotate: [
          0,
          110,
          260,
          430,
        ],
        opacity: [0, 0.9, 0.85, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function FlowerConfetti({
  index,
}: {
  index: number;
}) {
  const left =
    `${(index * 17 + 7) % 100}%`;

  const delay =
    1.3 + (index % 8) * 0.09;

  const duration =
    5.2 + (index % 6) * 0.5;

  const color =
    CELEBRATION_COLORS[
      index %
        CELEBRATION_COLORS.length
    ];

  const size =
    7 + (index % 5) * 2;

  const drift =
    20 + (index % 7) * 7;

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute -top-12 rounded-[90%_15%_90%_15%]"
      style={{
        left,
        width: size,
        height: size * 1.55,
        background:
          color,
        boxShadow:
          "0 4px 10px rgba(92,48,38,0.08)",
      }}
      initial={{
        y: "-8vh",
        opacity: 0,
        rotate: 0,
      }}
      animate={{
        y: "112vh",
        x: [
          0,
          drift,
          -drift * 0.65,
          drift * 0.25,
        ],
        rotate: [
          0,
          130,
          280,
          470,
        ],
        opacity: [
          0,
          1,
          0.95,
          0.85,
          0,
        ],
      }}
      transition={{
        delay,
        duration,
        ease: "linear",
      }}
    />
  );
}

function CelebrationBurst({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {Array.from({
        length: 42,
      }).map((_, index) => (
        <FlowerConfetti
          key={index}
          index={index}
        />
      ))}
    </div>
  );
}

function AmbientPetalShower({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {Array.from({
        length: 24,
      }).map((_, index) => (
        <FallingPetal
          key={index}
          left={`${(index * 23 + 11) % 100}%`}
          delay={
            4.5 +
            (index % 10) * 0.9
          }
          duration={
            10 +
            (index % 7) * 1.4
          }
          color={
            CELEBRATION_COLORS[
              index %
                CELEBRATION_COLORS.length
            ]
          }
          size={
            6 +
            (index % 4) * 2
          }
          drift={
            14 +
            (index % 6) * 6
          }
        />
      ))}
    </div>
  );
}

function DriftingFlower({
  left,
  top,
  delay,
  size,
  direction = 1,
}: {
  left: string;
  top: string;
  delay: number;
  size: number;
  direction?: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left,
        top,
        fontSize: size,
      }}
      initial={{
        opacity: 0,
        scale: 0.6,
      }}
      animate={{
        opacity: [
          0.15,
          0.8,
          0.4,
        ],
        y: [
          0,
          -14,
          0,
        ],
        x: [
          0,
          7 * direction,
          0,
        ],
        rotate: [
          0,
          12 * direction,
          0,
        ],
        scale: [
          0.8,
          1,
          0.8,
        ],
      }}
      transition={{
        delay,
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      ✿
    </motion.span>
  );
}

function WedsMoment({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  const petals = [
    {
      rotate: -10,
      color: "#e89e2a",
    },
    {
      rotate: 34,
      color: "#d65544",
    },
    {
      rotate: 76,
      color: "#e89e2a",
    },
    {
      rotate: 120,
      color: "#c9374b",
    },
    {
      rotate: 164,
      color: "#e89e2a",
    },
    {
      rotate: 206,
      color: "#d65544",
    },
    {
      rotate: 250,
      color: "#e89e2a",
    },
    {
      rotate: 296,
      color: "#c9374b",
    },
    {
      rotate: 336,
      color: "#e89e2a",
    },
  ];

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.7,
              rotate: -6,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        delay: 0.75,
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
      className="relative mx-auto my-1 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
    >
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-dashed border-[#d99a39]/35"
      />

      {petals.map(
        (petal, index) => (
          <motion.span
            key={index}
            aria-hidden="true"
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
                0.95 +
                index * 0.04,
              type: "spring",
              stiffness: 140,
            }}
            className="absolute left-1/2 top-1/2 h-[15px] w-[7px] origin-[50%_40px] rounded-[90%_10%_90%_10%]"
            style={{
              background:
                petal.color,
              transform: `translate(-50%, -50%) rotate(${petal.rotate}deg) translateY(-40px)`,
              opacity: 0.82,
            }}
          />
        ),
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
              }
        }
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#bf3341]/15 bg-[#fff8ea]/95 shadow-[0_8px_28px_rgba(113,45,43,0.12)] backdrop-blur-sm sm:h-16 sm:w-16"
      >
        <span className="font-editorial text-[23px] italic tracking-[-0.05em] text-[#b92f3d] sm:text-[26px]">
          weds
        </span>
      </motion.div>
    </motion.div>
  );
}

function DateSparkBurst({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return null;
  }

  const burst = [
    {
      x: -125,
      y: -34,
      delay: 1.65,
    },
    {
      x: 128,
      y: -28,
      delay: 1.75,
    },
    {
      x: -102,
      y: 44,
      delay: 1.8,
    },
    {
      x: 103,
      y: 48,
      delay: 1.9,
    },
    {
      x: -145,
      y: 12,
      delay: 2,
    },
    {
      x: 145,
      y: 10,
      delay: 2.05,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2"
    >
      {burst.map(
        (item, index) => (
          <motion.span
            key={index}
            className="absolute text-[#e3a02f]"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              x: item.x,
              y: item.y,
              opacity: [
                0,
                1,
                0,
              ],
              scale: [
                0.2,
                1.25,
                0.4,
              ],
              rotate:
                index % 2 === 0
                  ? 100
                  : -100,
            }}
            transition={{
              delay:
                item.delay,
              duration: 1.4,
              ease: "easeOut",
            }}
          >
            ✦
          </motion.span>
        ),
      )}
    </div>
  );
}

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
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto mt-5 max-w-xl"
    >
      <FloatingSpark
        left="3%"
        top="23%"
        delay={0}
        size="text-lg"
      />

      <FloatingSpark
        left="92%"
        top="6%"
        delay={0.8}
        size="text-base"
      />

      <FloatingSpark
        left="85%"
        top="80%"
        delay={1.6}
        size="text-xs"
      />

      <FloatingSpark
        left="12%"
        top="78%"
        delay={1.2}
        size="text-sm"
      />

      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [
                  1,
                  1.015,
                  1,
                ],
              }
        }
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative overflow-hidden rounded-[24px] border border-[#e59b2f]/30 bg-gradient-to-r from-[#a9273b] via-[#d44d47] to-[#d98a25] px-5 py-4 shadow-[0_14px_45px_rgba(155,50,49,0.18)]"
      >
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    "-130%",
                    "180%",
                  ],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-20 rotate-12 bg-white/15 blur-xl"
        />

        <p className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffe7ad]">
          Celebrate with us
        </p>

        <p className="relative mt-1 break-words text-[clamp(1.4rem,6vw,2.3rem)] font-black tracking-[-0.035em] text-white drop-shadow-sm">
          #NishMayKiShaadi
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function SaveTheDateExperience() {
  const reduceMotion =
    useReducedMotion();

  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    pageUrl,
    setPageUrl,
  ] = useState("");

  useEffect(() => {
    setPageUrl(
      window.location.href,
    );
  }, []);

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

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#fff8ec] text-[#3b1720]">
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute -left-24 top-[-9rem] h-[28rem] w-[28rem] rounded-full bg-[#f2aa2a]/20 blur-[100px]" />

        <div className="absolute -right-28 top-[22%] h-[28rem] w-[28rem] rounded-full bg-[#d84f67]/15 blur-[100px]" />

        <div className="absolute bottom-[-10rem] left-[20%] h-[30rem] w-[30rem] rounded-full bg-[#b62d3e]/10 blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(77,31,34,0.22) 0.6px, transparent 0.7px)",
            backgroundSize:
              "9px 9px",
          }}
        />
      </div>

      {/* CELEBRATION BURST AFTER ~1.5 SEC */}
      <CelebrationBurst
        reduceMotion={
          reduceMotion
        }
      />

      {/* CONTINUOUS PETAL SHOWER */}
      <AmbientPetalShower
        reduceMotion={
          reduceMotion
        }
      />

      {!reduceMotion && (
        <>
          <MarigoldString
            left="5%"
            delay={0.1}
          />

          <MarigoldString
            left="92%"
            delay={0.3}
          />

          <FloatingSpark
            left="15%"
            top="20%"
            delay={0.3}
          />

          <FloatingSpark
            left="81%"
            top="16%"
            delay={1.1}
          />

          <FloatingSpark
            left="88%"
            top="50%"
            delay={1.8}
          />

          <FloatingSpark
            left="9%"
            top="59%"
            delay={2.1}
          />

          <FloatingSpark
            left="25%"
            top="69%"
            delay={1.6}
            size="text-base"
          />

          <FloatingSpark
            left="71%"
            top="71%"
            delay={2.5}
            size="text-sm"
          />

          <DriftingFlower
            left="8%"
            top="36%"
            delay={0.7}
            size={18}
            direction={1}
          />

          <DriftingFlower
            left="87%"
            top="33%"
            delay={1.4}
            size={22}
            direction={-1}
          />

          <DriftingFlower
            left="17%"
            top="73%"
            delay={2}
            size={15}
            direction={1}
          />

          <DriftingFlower
            left="79%"
            top="68%"
            delay={1.2}
            size={17}
            direction={-1}
          />
        </>
      )}

      {/* MAIN HERO */}
      <section className="relative flex min-h-[90svh] items-center justify-center px-5 py-4 sm:px-8">
        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: 0.75,
            rotate: -20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.4,
          }}
          className="absolute -left-16 top-[17%] h-44 w-44 text-[#d95e44]/13 sm:h-56 sm:w-56"
        >
          <RangoliFlower className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: 18,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
          }}
          className="absolute -right-16 bottom-[9%] h-48 w-48 text-[#e79d27]/17 sm:h-60 sm:w-60"
        >
          <RangoliFlower className="h-full w-full" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          {/* SAVE THE DATE */}
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-[#c48a3d]/60" />

            <Sparkles
              size={14}
              className="text-[#d75a42]"
            />

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8f3636]">
              Save the Date
            </p>

            <Sparkles
              size={14}
              className="text-[#d75a42]"
            />

            <span className="h-px w-8 bg-[#c48a3d]/60" />
          </motion.div>

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
            className="mt-5"
          >
            <h1 className="font-display text-[clamp(3.5rem,14vw,7.6rem)] leading-[0.83] tracking-[-0.065em] text-[#49161f]">
              Nishita
            </h1>
          </motion.div>

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
              delay: 0.8,
              duration: 1,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >
            <h1 className="font-display text-[clamp(3.5rem,14vw,7.6rem)] leading-[0.83] tracking-[-0.065em] text-[#49161f]">
              Mayur
            </h1>
          </motion.div>

          <motion.div
            initial={{
              scaleX: 0,
              opacity: 0,
            }}
            animate={{
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              delay: 1.35,
            }}
            className="mx-auto mt-5 h-px max-w-xs origin-center bg-gradient-to-r from-transparent via-[#d6903c] to-transparent"
          />

          {/* DATE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.3,
              duration: 0.9,
            }}
            className="relative mt-5"
          >
            <DateSparkBurst
              reduceMotion={
                reduceMotion
              }
            />

            <motion.p
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 1.5,
                duration: 0.8,
              }}
              className="font-display relative z-10 mx-auto max-w-3xl text-[clamp(2.2rem,8vw,4.35rem)] leading-[1.08] tracking-[-0.045em] text-[#a92f3b]"
            >
              14 &amp; 15 February 2027
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.8,
              }}
              className="mt-3 flex items-center justify-center gap-2.5"
            >
              <MapPin
                size={18}
                strokeWidth={1.8}
                className="text-[#b8443d]"
              />

              <span className="text-base font-bold uppercase tracking-[0.18em] text-[#594441] sm:text-lg">
                Mumbai
              </span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.95,
            }}
            className="font-editorial mx-auto mt-4 max-w-md text-lg italic leading-7 text-[#654744]"
          >
            Keep these two days close.
            We can&apos;t wait to celebrate with you.
          </motion.p>
        </div>
      </section>

      {/* COMPACT FINAL SECTION */}
      <section className="relative z-10 border-t border-[#8f2633]/10 bg-[#fff8ec]/85 px-5 pb-7 pt-5 backdrop-blur-[2px] sm:px-8 sm:pb-9">
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
            duration: 0.75,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* FULL NAMES ONLY HERE */}
          <p className="font-display text-[clamp(1.45rem,5vw,2rem)] leading-tight text-[#4a1520]">
            Nishita Thaker
            <span className="mx-2 font-editorial italic text-[#c5453e]">
              weds
            </span>
            Mayur Gami
          </p>

          {/* VIBRANT HASHTAG */}
          <HashtagMoment
            reduceMotion={
              reduceMotion
            }
          />

          {/* SMALL CALENDAR */}
          <div className="mt-5 flex justify-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-full border border-[#8f2633]/15 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#755355] transition hover:bg-white/50 active:scale-[0.98]"
            >
              <CalendarDays
                size={12}
              />

              Add to calendar
            </a>
          </div>

          {/* SHARE */}
          <div className="mx-auto mt-3 grid max-w-xl gap-2.5 sm:grid-cols-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#8f2633] px-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#fff7ea] transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle
                size={16}
              />

              Share on WhatsApp
            </a>

            <button
              type="button"
              onClick={copyLink}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#8f2633]/25 bg-white/55 px-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#632b32] transition hover:bg-white active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check
                    size={16}
                  />
                  Link copied
                </>
              ) : (
                <>
                  <Copy
                    size={16}
                  />
                  Copy link
                </>
              )}
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}