"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2027-02-15T00:00:00+05:30");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft {
  const difference = WEDDING_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = timeLeft
    ? [
        {
          value: timeLeft.days,
          label: "Days",
        },
        {
          value: timeLeft.hours,
          label: "Hours",
        },
        {
          value: timeLeft.minutes,
          label: "Minutes",
        },
        {
          value: timeLeft.seconds,
          label: "Seconds",
        },
      ]
    : [
        { value: "—", label: "Days" },
        { value: "—", label: "Hours" },
        { value: "—", label: "Minutes" },
        { value: "—", label: "Seconds" },
      ];

  return (
    <section className="relative overflow-hidden bg-[#35151c] px-6 py-20 text-[#f8f0e4] sm:py-24">
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[380px] w-[380px] rounded-full bg-[#b45e43]/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-180px] right-[-100px] h-[420px] w-[420px] rounded-full bg-[#d49a52]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.42em] text-[#d8bd8c]">
            Until forever begins
          </p>

          <h2 className="font-display mt-6 text-4xl tracking-[-0.04em] sm:text-6xl">
            The countdown is on.
          </h2>

          <p className="mt-4 text-sm text-[#d8bd8c]/65">
            15 February 2027
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-[#d8bd8c]/15 bg-[#d8bd8c]/15 sm:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
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
                delay: index * 0.08,
                duration: 0.7,
              }}
              className="bg-[#35151c] px-5 py-7 text-center sm:py-9"
            >
              <p className="font-display text-4xl tabular-nums tracking-[-0.05em] sm:text-6xl">
                {item.value}
              </p>

              <p className="mt-3 text-[9px] uppercase tracking-[0.32em] text-[#d8bd8c]/65">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="font-editorial text-xl text-[#d8bd8c]">
            One celebration. A lifetime of stories.
          </p>
        </div>
      </div>
    </section>
  );
}