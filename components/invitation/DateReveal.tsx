"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const SCRATCH_THRESHOLD = 0.42;

export default function DateReveal() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const [revealed, setRevealed] =
    useState(false);

  const [scratching, setScratching] =
    useState(false);

  const initialiseCanvas =
    useCallback(() => {
      const canvas = canvasRef.current;
      const container =
        containerRef.current;

      if (!canvas || !container) {
        return;
      }

      const rect =
        container.getBoundingClientRect();

      const dpr =
        window.devicePixelRatio || 1;

      canvas.width =
        rect.width * dpr;

      canvas.height =
        rect.height * dpr;

      canvas.style.width =
        `${rect.width}px`;

      canvas.style.height =
        `${rect.height}px`;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      );

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          rect.width,
          rect.height,
        );

      gradient.addColorStop(
        0,
        "#35151c",
      );

      gradient.addColorStop(
        0.5,
        "#4b2029",
      );

      gradient.addColorStop(
        1,
        "#2b1117",
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height,
      );

      ctx.save();

      ctx.strokeStyle =
        "rgba(216, 189, 140, 0.12)";

      ctx.lineWidth = 1;

      for (
        let x = -rect.height;
        x < rect.width;
        x += 18
      ) {
        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(
          x + rect.height,
          rect.height,
        );

        ctx.stroke();
      }

      ctx.restore();

      ctx.fillStyle =
        "rgba(246, 240, 230, 0.75)";

      ctx.textAlign = "center";

      ctx.font =
        "11px Arial, sans-serif";

      ctx.fillText(
        "SCRATCH TO REVEAL",
        rect.width / 2,
        rect.height / 2 + 26,
      );

      ctx.fillStyle =
        "rgba(246, 240, 230, 0.9)";

      ctx.font =
        "24px Georgia, serif";

      ctx.fillText(
        "Something special awaits",
        rect.width / 2,
        rect.height / 2 - 5,
      );
    }, []);

  useEffect(() => {
    initialiseCanvas();

    window.addEventListener(
      "resize",
      initialiseCanvas,
    );

    return () => {
      window.removeEventListener(
        "resize",
        initialiseCanvas,
      );
    };
  }, [initialiseCanvas]);

  function scratchAt(
    clientX: number,
    clientY: number,
  ) {
    if (revealed) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const rect =
      canvas.getBoundingClientRect();

    const x =
      clientX - rect.left;

    const y =
      clientY - rect.top;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const radius =
      window.innerWidth < 640
        ? 24
        : 30;

    ctx.save();

    ctx.globalCompositeOperation =
      "destination-out";

    const gradient =
      ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius,
      );

    gradient.addColorStop(
      0,
      "rgba(0,0,0,1)",
    );

    gradient.addColorStop(
      0.7,
      "rgba(0,0,0,0.95)",
    );

    gradient.addColorStop(
      1,
      "rgba(0,0,0,0)",
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2,
    );

    ctx.fill();

    ctx.restore();
  }

  function checkScratchProgress() {
    if (revealed) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const width =
      canvas.width;

    const height =
      canvas.height;

    const imageData =
      ctx.getImageData(
        0,
        0,
        width,
        height,
      );

    const pixels =
      imageData.data;

    let transparent = 0;

    let sampled = 0;

    const sampleStep = 48;

    for (
      let i = 3;
      i < pixels.length;
      i += 4 * sampleStep
    ) {
      sampled++;

      if (pixels[i] < 80) {
        transparent++;
      }
    }

    if (sampled === 0) {
      return;
    }

    const scratchedRatio =
      transparent / sampled;

    if (
      scratchedRatio >=
      SCRATCH_THRESHOLD
    ) {
      setRevealed(true);
      setScratching(false);
    }
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLCanvasElement>,
  ) {
    if (revealed) {
      return;
    }

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    setScratching(true);

    scratchAt(
      event.clientX,
      event.clientY,
    );
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLCanvasElement>,
  ) {
    if (
      !scratching ||
      revealed
    ) {
      return;
    }

    scratchAt(
      event.clientX,
      event.clientY,
    );

    checkScratchProgress();
  }

  function handlePointerUp(
    event: React.PointerEvent<HTMLCanvasElement>,
  ) {
    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    setScratching(false);

    checkScratchProgress();
  }

  function revealManually() {
    setRevealed(true);
    setScratching(false);
  }

  return (
    <section className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-7 text-center">
          <p className="text-[9px] uppercase tracking-[0.38em] text-[#b45e43]">
            Save the date
          </p>

          <h2 className="font-display mt-4 text-4xl tracking-[-0.04em] sm:text-5xl">
            A date worth revealing.
          </h2>
        </div>

        <div
          ref={containerRef}
          className="premium-shadow relative mx-auto aspect-[5/4] max-w-2xl overflow-hidden rounded-[22px] bg-[#f0e3d2] sm:aspect-[16/9]"
        >
          {/* REVEALED CONTENT */}

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="font-display text-6xl leading-none tracking-[-0.06em] text-[#35151c] sm:text-7xl">
              15
            </p>

            <p className="font-editorial mt-1 text-4xl text-[#b99155] sm:text-5xl">
              February
            </p>

            <p className="font-display mt-1 text-2xl tracking-[0.08em] text-[#35151c]/80 sm:text-3xl">
              2027
            </p>

            <div className="my-5 h-px w-20 bg-[#b99155]/45" />

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#76686a]">
              Airoli ✦ Navi Mumbai
            </p>
          </div>

          {/* SCRATCH LAYER */}

          <canvas
            ref={canvasRef}
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={
              handlePointerUp
            }
            onPointerCancel={
              handlePointerUp
            }
            className={`absolute inset-0 touch-none transition-opacity duration-700 ${
              revealed
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
          />
        </div>

        {!revealed && (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={
                revealManually
              }
              className="text-[9px] uppercase tracking-[0.2em] text-[#8d7c7e] underline decoration-[#b99155]/40 underline-offset-4 transition-colors hover:text-[#35151c]"
            >
              Tap to reveal instead
            </button>
          </div>
        )}

        {revealed && (
          <p className="font-editorial mt-5 text-center text-sm text-[#8e4438]">
            Mark your calendar.
          </p>
        )}
      </div>
    </section>
  );
}