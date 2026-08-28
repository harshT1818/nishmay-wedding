"use client";

import { motion } from "framer-motion";

type MusicWaveformProps = {
  playing: boolean;
};

const bars = [
  0.55,
  0.9,
  0.7,
  1,
  0.65,
];

export default function MusicWaveform({
  playing,
}: MusicWaveformProps) {
  return (
    <div
      className="flex h-4 w-5 items-center justify-center gap-[2px]"
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <motion.span
          key={index}
          animate={
            playing
              ? {
                  scaleY: [
                    0.35,
                    height,
                    0.5,
                    Math.min(
                      height + 0.25,
                      1,
                    ),
                    0.35,
                  ],
                }
              : {
                  scaleY: 0.3,
                }
          }
          transition={
            playing
              ? {
                  duration:
                    0.75 +
                    index * 0.06,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.04,
                }
              : {
                  duration: 0.25,
                }
          }
          className="h-4 w-[1.5px] origin-center rounded-full bg-[#e2c28e]"
        />
      ))}
    </div>
  );
}