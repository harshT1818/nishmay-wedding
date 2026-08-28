import Reveal from "@/components/invitation/Reveal";
import GujaratiMotif from "@/components/invitation/GujaratiMotif";

type GreetingProps = {
  guestName: string;
};

export default function Greeting({
  guestName,
}: GreetingProps) {
  return (
    <section
      id="greeting"
      className="relative overflow-hidden px-6 py-20 sm:py-28"
    >
      <GujaratiMotif className="absolute right-[-60px] top-8 h-44 w-44 text-[#b99155]/20 sm:h-56 sm:w-56" />
      <div className="absolute left-[-100px] top-20 h-60 w-60 rounded-full border border-[#b99155]/10" />

      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.38em] text-[#b45e43]">
            With love
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display mt-7 text-4xl leading-tight tracking-[-0.03em] sm:text-6xl">
            Dear{" "}
            <span className="font-editorial text-[#8e4438]">
              {guestName}
            </span>
            ,
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="gold-line mx-auto my-9 w-32" />
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mx-auto max-w-xl text-base leading-8 text-[#76686a] sm:text-lg sm:leading-9">
            A celebration of love, family and a new beginning.
            With immense joy, we invite you to be part of
            Nishita and Mayur&apos;s wedding celebrations.
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <p className="font-editorial mt-10 text-xl text-[#8e4438]">
            Your presence would make it even more special.
          </p>
        </Reveal>
      </div>
    </section>
  );
}