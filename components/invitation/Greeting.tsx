type GreetingProps = {
  guestName: string;
};

export default function Greeting({ guestName }: GreetingProps) {
  return (
    <section
      id="greeting"
      className="flex min-h-[70vh] scroll-mt-0 items-center justify-center px-6 py-24 text-center"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#8b646d]">
          With love
        </p>

        <h2 className="mt-5 text-3xl font-medium sm:text-4xl">
          Dear {guestName},
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#6f6265] sm:text-lg">
          With hearts full of happiness, we invite you to celebrate the
          beginning of a beautiful new chapter with Nishita & Mayur.
        </p>
      </div>
    </section>
  );
}