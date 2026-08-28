import Reveal from "@/components/invitation/Reveal";

export default function Closing() {
  return (
    <section className="wedding-grain relative flex min-h-[80svh] items-center overflow-hidden bg-[#35151c] px-6 pb-36 pt-28 text-center text-[#f8f0e4]">
      <div className="absolute left-1/2 top-[-200px] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#b45e43]/20 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#d8bd8c]">
            With love
          </p>

          <h2 className="font-display mt-8 text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">
            We can&apos;t wait
            <br />
            to celebrate
            <br />
            <span className="font-editorial text-[#d8bd8c]">
              with you.
            </span>
          </h2>

          <div className="gold-line mx-auto my-12 w-40" />

          <p className="font-display text-3xl">
            Nishita & Mayur
          </p>

          <p className="mt-5 text-xs tracking-[0.3em] text-[#d8bd8c]">
            15 · 02 · 2027
          </p>

          <p className="mt-12 text-[10px] uppercase tracking-[0.32em] text-[#d8bd8c]/60">
            #NishMayKiShaadi
          </p>
        </Reveal>
      </div>
    </section>
  );
}