"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const particles = [
  {
    left: "5%",
    delay: 0,
    duration: 14,
    size: 12,
    type: "petal",
  },
  {
    left: "14%",
    delay: 5,
    duration: 17,
    size: 8,
    type: "heart",
  },
  {
    left: "25%",
    delay: 2,
    duration: 18,
    size: 10,
    type: "petal",
  },
  {
    left: "38%",
    delay: 8,
    duration: 15,
    size: 9,
    type: "petal",
  },
  {
    left: "52%",
    delay: 3,
    duration: 20,
    size: 8,
    type: "heart",
  },
  {
    left: "64%",
    delay: 10,
    duration: 16,
    size: 11,
    type: "petal",
  },
  {
    left: "76%",
    delay: 1,
    duration: 19,
    size: 8,
    type: "petal",
  },
  {
    left: "87%",
    delay: 6,
    duration: 15,
    size: 10,
    type: "heart",
  },
  {
    left: "94%",
    delay: 11,
    duration: 18,
    size: 9,
    type: "petal",
  },
];

function Petal({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size * 1.45}
      viewBox="0 0 20 30"
      fill="none"
    >
      <path
        d="M10 1C17 7 20 16 10 29C0 16 3 7 10 1Z"
        fill="#d49a52"
      />

      <path
        d="M10 3C12 10 12 19 10 27"
        stroke="#b45e43"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function Heart({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 21C12 21 3 15.6 3 8.7C3 5.5 5.3 3.5 8 3.5C9.7 3.5 11.2 4.4 12 5.7C12.8 4.4 14.3 3.5 16 3.5C18.7 3.5 21 5.5 21 8.7C21 15.6 12 21 12 21Z"
        fill="#b45e43"
      />
    </svg>
  );
}

export default function FestiveAtmosphere() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* FALLING DETAILS */}

      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[35] overflow-hidden"
        >
          {particles.map(
            (
              particle,
              index,
            ) => (
              <motion.div
                key={index}
                initial={{
                  y: "-8vh",
                  x: 0,
                  rotate: 0,
                  opacity: 0,
                }}
                animate={{
                  y: "108vh",
                  x: [
                    0,
                    index % 2 === 0
                      ? 18
                      : -15,
                    index % 2 === 0
                      ? -12
                      : 12,
                    0,
                  ],
                  rotate: [
                    0,
                    90,
                    200,
                    320,
                  ],
                  opacity: [
                    0,
                    0.5,
                    0.42,
                    0,
                  ],
                }}
                transition={{
                  duration:
                    particle.duration,
                  delay:
                    particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [
                    0,
                    0.08,
                    0.9,
                    1,
                  ],
                }}
                style={{
                  position:
                    "absolute",
                  top: 0,
                  left: particle.left,
                }}
              >
                {particle.type ===
                "heart" ? (
                  <Heart
                    size={
                      particle.size
                    }
                  />
                ) : (
                  <Petal
                    size={
                      particle.size
                    }
                  />
                )}
              </motion.div>
            ),
          )}
        </div>
      )}

      {/* LEFT DECORATIVE BORDER */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-[22%] z-20 hidden opacity-[0.24] lg:block"
      >
        <svg
          width="78"
          height="310"
          viewBox="0 0 78 310"
          fill="none"
        >
          <path
            d="M2 4C42 30 45 65 18 83C-6 99 4 130 31 134C55 138 61 163 42 177C21 192 22 218 44 228C62 237 59 268 29 277C15 282 8 293 7 306"
            stroke="#b99155"
            strokeWidth="1.1"
          />

          <path
            d="M19 83C30 75 38 67 41 55"
            stroke="#b99155"
            strokeWidth="0.8"
          />

          <path
            d="M31 134C20 126 14 118 13 108"
            stroke="#b99155"
            strokeWidth="0.8"
          />

          <path
            d="M42 177C52 167 57 156 56 146"
            stroke="#b99155"
            strokeWidth="0.8"
          />

          <path
            d="M44 228C33 219 29 209 30 198"
            stroke="#b99155"
            strokeWidth="0.8"
          />

          <circle
            cx="41"
            cy="54"
            r="2"
            fill="#d49a52"
          />

          <circle
            cx="13"
            cy="107"
            r="2"
            fill="#b45e43"
          />

          <circle
            cx="56"
            cy="145"
            r="2"
            fill="#d49a52"
          />

          <circle
            cx="30"
            cy="197"
            r="2"
            fill="#b45e43"
          />
        </svg>
      </div>

      {/* RIGHT DECORATIVE BORDER */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-[54%] z-20 hidden scale-x-[-1] opacity-[0.2] lg:block"
      >
        <svg
          width="78"
          height="310"
          viewBox="0 0 78 310"
          fill="none"
        >
          <path
            d="M2 4C42 30 45 65 18 83C-6 99 4 130 31 134C55 138 61 163 42 177C21 192 22 218 44 228C62 237 59 268 29 277C15 282 8 293 7 306"
            stroke="#b99155"
            strokeWidth="1.1"
          />

          <path
            d="M19 83C30 75 38 67 41 55"
            stroke="#b99155"
            strokeWidth="0.8"
          />

          <path
            d="M31 134C20 126 14 118 13 108"
            stroke="#b99155"
            strokeWidth="0.8"
          />

          <circle
            cx="41"
            cy="54"
            r="2"
            fill="#d49a52"
          />

          <circle
            cx="13"
            cy="107"
            r="2"
            fill="#b45e43"
          />
        </svg>
      </div>
    </>
  );
}