"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2027-02-15T00:00:00+05:30");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
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
    // Calculate only after the component reaches the browser.
    setTimeLeft(getTimeLeft());

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // Server and initial browser render now produce exactly the same markup.
  if (!timeLeft) {
    return (
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
            Counting down to
          </p>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            15 February 2027
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <div
                key={label}
                className="rounded-3xl border border-[#dfd5ca] bg-white px-4 py-7 shadow-sm"
              >
                <p className="text-4xl font-semibold tabular-nums">
                  —
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8b7b7e]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const weddingStarted =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (weddingStarted) {
    return (
      <section className="px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
          The day is here
        </p>

        <h2 className="mt-4 text-4xl font-semibold">
          Nishita & Mayur
        </h2>

        <p className="mt-4 text-lg text-[#6f6265]">
          Today, forever begins. ❤️
        </p>
      </section>
    );
  }

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
          Counting down to
        </p>

        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          15 February 2027
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-[#dfd5ca] bg-white px-4 py-7 shadow-sm"
            >
              <p className="text-4xl font-semibold tabular-nums">
                {item.value}
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8b7b7e]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}