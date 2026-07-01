import { MapPin, CheckCircle2, Clock } from "lucide-react";
import { temples } from "../components/data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Reveal } from "../components/Reveal";

export function DarshanSuchiPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-[var(--dd-maroon)] py-16 text-[var(--dd-cream)]">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <span className="font-deva text-xl text-[var(--dd-gold)]">
            दर्शन सूची
          </span>
          <h1 className="font-display mt-2 text-[2.4rem] md:text-[3rem]">
            Darshan Suchi
          </h1>
          <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-sand)]/85">
            The complete list of sacred temples available for immersive VR
            darshan — Jyotirlingas, Shakti Peeths and Char Dhams across Bharat.
          </p>
        </div>
      </section>

      {/* Full list */}
      <section className="bg-[var(--dd-cream)] py-16">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <h2 className="font-display text-center text-[2rem] text-[var(--dd-maroon)]">
              Complete temple list
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {temples.map((t, i) => {
              const isAvailable = t.status === "Available";
              return (
                <Reveal
                  key={t.id}
                  delay={(i % 3) * 0.08}
                  className="group flex gap-4 rounded-2xl border border-[var(--dd-gold)]/30 bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <ImageWithFallback
                      src={t.image}
                      alt={t.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-[1.2rem] leading-tight text-[var(--dd-maroon)]">
                        {t.name}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-[var(--dd-saffron)]">
                      {t.deity}
                    </p>
                    <p className="font-body mt-1 flex items-center gap-1.5 text-sm text-[var(--dd-ink)]/60">
                      <MapPin className="h-3.5 w-3.5" /> {t.location}
                    </p>
                    <span
                      className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs ${
                        isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-[var(--dd-sand)] text-[var(--dd-ink)]/60"
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Available
                        </>
                      ) : (
                        <>
                          <Clock className="h-3.5 w-3.5" /> Coming soon
                        </>
                      )}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
