import { HowItWorks } from "../components/HowItWorks";

export function HowItWorksPage() {
  return (
    <>
      <section className="bg-[var(--dd-maroon)] py-16 text-[var(--dd-cream)]">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <span className="font-deva text-xl text-[var(--dd-gold)]">
            कैसे काम करता है
          </span>
          <h1 className="font-display mt-2 text-[2.4rem] md:text-[3rem]">
            How it Works
          </h1>
          <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-sand)]/85">
            From doorstep delivery to divine presence in three simple steps.
          </p>
        </div>
      </section>
      <HowItWorks />
    </>
  );
}
