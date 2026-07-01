import type { ReactNode } from "react";
import { Link } from "react-router";
import { Sparkles, Headset, MapPin, Bell } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const perks = [
  { icon: Headset, text: "Immersive 360° VR darshan" },
  { icon: MapPin, text: "12+ sacred temples across India" },
  { icon: Bell, text: "Live aarti reminders" },
];

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="grid min-h-screen md:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden md:block">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Sacred temple architecture"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--dd-deep)]/95 via-[var(--dd-maroon)]/80 to-[var(--dd-deep)]/95" />
        <div className="relative flex h-full flex-col justify-between p-10 text-[var(--dd-cream)]">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dd-gold)] text-[var(--dd-maroon)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-deva text-[1.25rem] text-[var(--dd-gold)]">
              पवन दर्शन
            </span>
          </Link>

          <div>
            <h2 className="font-display text-[2.4rem] leading-tight">
              Devotion,
              <br />
              without distance.
            </h2>
            <p className="font-body mt-3 max-w-sm text-[var(--dd-sand)]/85">
              Join thousands of devotees taking sacred darshan from the comfort
              of home.
            </p>
            <ul className="mt-7 space-y-3">
              {perks.map((p) => (
                <li key={p.text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dd-gold)]/20 text-[var(--dd-gold)]">
                    <p.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="font-body text-[var(--dd-sand)]">
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-body text-sm text-[var(--dd-sand)]/60">
            © 2026 Pawan Darshan
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-[var(--dd-cream)] px-5 py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center md:hidden">
            <span className="font-deva text-[1.4rem] text-[var(--dd-maroon)]">
              पवन दर्शन
            </span>
          </div>
          <h1 className="font-display text-[2rem] text-[var(--dd-maroon)]">
            {title}
          </h1>
          <p className="font-body mt-2 text-[var(--dd-ink)]/60">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
