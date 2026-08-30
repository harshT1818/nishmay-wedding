"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const REFRESH_INTERVAL_MS =
  12_000;

export default function LiveAutoRefresh() {
  const router =
    useRouter();

  const reduceMotion =
    useReducedMotion();

  const [refreshing, setRefreshing] =
    useState(false);

  const mounted =
    useRef(true);

  useEffect(() => {
    mounted.current = true;

    const interval =
      window.setInterval(
        async () => {
          if (
            document.visibilityState !==
            "visible"
          ) {
            return;
          }

          setRefreshing(true);

          router.refresh();

          window.setTimeout(
            () => {
              if (
                mounted.current
              ) {
                setRefreshing(
                  false,
                );
              }
            },
            900,
          );
        },
        REFRESH_INTERVAL_MS,
      );

    return () => {
      mounted.current =
        false;

      window.clearInterval(
        interval,
      );
    };
  }, [router]);

  return (
    <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <div className="flex items-center gap-2 rounded-full border border-[#35151c]/10 bg-[#f6f0e6]/85 px-3 py-2 shadow-sm backdrop-blur-md">
        <motion.span
          animate={
            refreshing &&
            !reduceMotion
              ? {
                  scale: [
                    1,
                    1.35,
                    1,
                  ],
                }
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 0.8,
          }}
          className="relative block h-2 w-2 rounded-full bg-[#b45e43]"
        >
          {!reduceMotion && (
            <motion.span
              animate={{
                opacity: [
                  0.5,
                  0,
                ],
                scale: [
                  1,
                  2.2,
                ],
              }}
              transition={{
                duration: 1.8,
                repeat:
                  Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full bg-[#b45e43]"
            />
          )}
        </motion.span>

        <span className="text-[9px] uppercase tracking-[0.18em] text-[#6f6062]">
          {refreshing
            ? "Updating"
            : "Live"}
        </span>
      </div>
    </div>
  );
}