"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2027-02-15T00:00:00+05:30");

function getTimeLeft(): TimeLeft {
  const now = new Date();

  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TickerNumber({
  value,
}: {
  value: number;
}) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="relative flex h-[52px] items-center justify-center overflow-hidden sm:h-[72px]">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={formatted}
          initial={{
            y: 12,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -12,
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute font-display text-4xl tracking-[-0.04em] sm:text-6xl"
        >
          {formatted}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TimeUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="relative px-2 py-6 text-center sm:px-6 sm:py-8">
      <TickerNumber value={value} />

      <p className="mt-2 text-[8px] uppercase tracking-[0.28em] text-[#d7c1a5]/65 sm:text-[9px]">
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const complete = useMemo(() => {
    if (!timeLeft) {
      return false;
    }

    return (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    );
  }, [timeLeft]);

  return (
    <section className="relative overflow-hidden bg-[#35151c] px-5 py-20 text-[#f6f0e6] sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#b45e43]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.75,
            }}
            className="text-[9px] uppercase tracking-[0.42em] text-[#d8bd8c]"
          >
            Counting down
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
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.08,
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display mt-4 text-4xl tracking-[-0.04em] sm:text-5xl"
          >
            Until the big day.
          </motion.h2>
        </div>

        {!timeLeft ? (
          <div className="mt-10 h-28" />
        ) : complete ? (
          <div className="mt-10 border-y border-white/10 py-10 text-center">
            <p className="font-editorial text-2xl text-[#d8bd8c]">
              The celebrations have begun.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-4 divide-x divide-white/10 border-y border-white/10">
            <TimeUnit
              value={timeLeft.days}
              label="Days"
            />

            <TimeUnit
              value={timeLeft.hours}
              label="Hours"
            />

            <TimeUnit
              value={timeLeft.minutes}
              label="Minutes"
            />

            <TimeUnit
              value={timeLeft.seconds}
              label="Seconds"
            />
          </div>
        )}

        <p className="font-editorial mt-8 text-center text-sm text-[#d8bd8c]/80">
          15 February 2027
        </p>
      </div>
    </section>
  );
}