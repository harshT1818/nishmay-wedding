type GreetingProps = {
  guestName: string;
};

export default function Greeting({ guestName }: GreetingProps) {
  return (
    <section className="px-6 py-24 text-center">
      <p className="text-3xl font-medium">
        Dear {guestName},
      </p>

      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
        With hearts full of happiness, we invite you to celebrate
        the beginning of a beautiful new chapter with Nishita & Mayur.
      </p>
    </section>
  );
}