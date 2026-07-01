import { MapPin, Headset } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--dd-maroon)] text-[var(--dd-cream)]"
    >
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1632962237468-0705d7e7b534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Ancient stone temple shikhara against the sky"
          className="h-full w-full object-cover"
        />
        {/* warm brand scrim: readable text on the left, image shining through on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--dd-deep)]/90 via-[var(--dd-maroon)]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dd-deep)]/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--dd-gold)]/40 bg-[var(--dd-gold)]/10 px-4 py-1.5 font-body text-sm text-[var(--dd-gold)]">
            <Headset className="h-4 w-4" /> Immersive 3D / 360° VR Darshan
          </span>
          <h1 className="font-display mt-6 text-[2.6rem] leading-[1.1] text-[var(--dd-cream)] md:text-[3.6rem]">
            The temple sanctum,
            <br />
            <span className="text-[var(--dd-gold)]">brought to your home.</span>
          </h1>
          <p className="font-deva mt-3 text-xl text-[var(--dd-sand)]">
            गर्भगृह से जी भर के दर्शन — अब आपके घर पर।
          </p>
          <p className="font-body mt-5 max-w-md text-[1.05rem] leading-relaxed text-[var(--dd-sand)]/90">
            Stand inside the garbhagriha of India's most revered Jyotirlingas and
            Shakti Peeths. Witness live aartis with spatial sound — no queues, no
            crowds, just devotion.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/store"
              className="rounded-full bg-[var(--dd-saffron)] px-7 py-3.5 font-body text-white shadow-xl shadow-[var(--dd-saffron)]/30 transition-transform hover:-translate-y-0.5"
            >
              Get your VR Kit
            </Link>
            <Link
              to="/darshan-suchi"
              className="flex items-center gap-2 rounded-full border border-[var(--dd-gold)]/50 px-6 py-3.5 font-body text-[var(--dd-cream)] transition-colors hover:bg-[var(--dd-gold)]/10"
            >
              <MapPin className="h-4 w-4" /> View Darshan Suchi
            </Link>
          </div>

          <div className="mt-10 flex gap-8">
            {[
              ["12+", "Sacred temples"],
              ["50K+", "Devotees served"],
              ["360°", "Sanctum access"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-[1.8rem] text-[var(--dd-gold)]">
                  {n}
                </div>
                <div className="font-body text-sm text-[var(--dd-sand)]/80">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative hidden md:block"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-[3/4] w-[80%] overflow-hidden rounded-[2rem] border border-[var(--dd-gold)]/30 shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Devotional temple architecture under a clear sky"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
