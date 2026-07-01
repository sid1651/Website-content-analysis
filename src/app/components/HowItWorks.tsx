import { Package, Headset, Hand } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: Package,
    title: "Order your kit",
    text: "Receive a VR headset and app subscription delivered to your doorstep, ready to use.",
  },
  {
    icon: Headset,
    title: "Wear & connect",
    text: "Slip on the headset and open the Durlabh Darshan app. Pick a temple or a live aarti.",
  },
  {
    icon: Hand,
    title: "Take darshan",
    text: "Stand in the sanctum, look around in 360°, and offer your prayers from anywhere.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-[var(--dd-sand)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-[var(--dd-saffron)]">
            How it works
          </span>
          <h2 className="font-display mt-3 text-[2.2rem] text-[var(--dd-maroon)] md:text-[2.6rem]">
            Three simple steps to divine presence
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.12}
              className="relative rounded-2xl border border-[var(--dd-gold)]/30 bg-[var(--dd-cream)] p-7 text-center"
            >
              <span className="font-display absolute right-5 top-4 text-[2.5rem] text-[var(--dd-gold)]/30">
                {i + 1}
              </span>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--dd-maroon)] text-[var(--dd-gold)]">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="font-display mt-5 text-[1.4rem] text-[var(--dd-maroon)]">
                {s.title}
              </h3>
              <p className="font-body mt-2 text-[var(--dd-ink)]/70">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
