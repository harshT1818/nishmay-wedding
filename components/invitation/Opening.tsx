type OpeningProps = {
  onOpen?: () => void;
};

export default function Opening({ onOpen }: OpeningProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em]">
        An Invitation
      </p>

      <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
        Nishita
      </h1>

      <p className="my-3 text-2xl italic">&</p>

      <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
        Mayur
      </h1>

      <p className="mt-8 text-sm tracking-[0.2em]">
        #NishMayKiShaadi
      </p>

      <button
        type="button"
        onClick={onOpen}
        className="mt-12 rounded-full bg-[#321f24] px-8 py-3 text-sm font-medium text-white transition hover:scale-105"
      >
        Open Invitation
      </button>
    </section>
  );
}