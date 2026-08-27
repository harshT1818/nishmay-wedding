export default function WeddingHero() {
  return (
    <section className="px-6 py-28 text-center">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8b646d]">
          Together with their families
        </p>

        <h2 className="mt-8 text-5xl font-semibold tracking-tight sm:text-7xl">
          Nishita
          <span className="mx-3 font-light italic text-[#9a7179]">&</span>
          Mayur
        </h2>

        <p className="mt-7 text-xl">
          15 February 2027
        </p>

        <p className="mt-3 text-sm tracking-[0.2em] text-[#76666a]">
          AIROLI · NAVI MUMBAI
        </p>

        <div className="mt-12 flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-[#dfd5ca] bg-[#eee5dc] sm:aspect-[16/10]">
          <div className="text-center text-[#907d78]">
            <p className="text-sm uppercase tracking-[0.25em]">
              Couple Photo
            </p>

            <p className="mt-2 text-xs">
              Nishita × Mayur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}