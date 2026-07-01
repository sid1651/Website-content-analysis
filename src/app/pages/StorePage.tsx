import { StoreSection } from "../components/StoreSection";

export function StorePage() {
  return (
    <>
      <section className="bg-[var(--dd-maroon)] py-16 text-[var(--dd-cream)]">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <span className="font-deva text-xl text-[var(--dd-gold)]">भंडार</span>
          <h1 className="font-display mt-2 text-[2.4rem] md:text-[3rem]">Store</h1>
          <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-sand)]/85">
            Choose a VR kit and subscription to bring the temple home.
          </p>
        </div>
      </section>
      <StoreSection />
    </>
  );
}
