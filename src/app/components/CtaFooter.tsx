import { Sparkles, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export function CtaFooter() {
  return (
    <>
      <section className="bg-[var(--dd-saffron)] py-16 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-[2.2rem] md:text-[2.6rem]">
            Begin your virtual pilgrimage today
          </h2>
          <p className="font-body mx-auto mt-3 max-w-xl text-white/90">
            Join thousands of devotees experiencing sacred darshan from the
            comfort of home.
          </p>
          <form
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-full border-0 bg-white px-5 py-3 font-body text-[var(--dd-ink)] outline-none"
            />
            <button className="rounded-full bg-[var(--dd-maroon)] px-7 py-3 font-body text-white transition-transform hover:-translate-y-0.5">
              Notify me
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[var(--dd-ink)] py-14 text-[var(--dd-sand)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dd-gold)] text-[var(--dd-maroon)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-deva text-[1.15rem] text-[var(--dd-gold)]">
                पवन दर्शन
              </span>
            </div>
            <p className="font-body mt-4 text-sm text-[var(--dd-sand)]/70">
              Redefining access to India's sacred heritage through immersive
              virtual reality.
            </p>
          </div>

          {[
            {
              h: "Explore",
              items: [
                { label: "Darshan Suchi", to: "/darshan-suchi" },
                { label: "How it Works", to: "/how-it-works" },
                { label: "Store", to: "/store" },
                { label: "Home", to: "/" },
              ],
            },
            {
              h: "Store",
              items: [
                { label: "VR Kits", to: "/store" },
                { label: "Subscriptions", to: "/store" },
                { label: "Pooja Kits", to: "/store" },
                { label: "Track Order", to: "/store" },
              ],
            },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="font-display text-[var(--dd-gold)]">{col.h}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      className="font-body text-sm text-[var(--dd-sand)]/70 transition-colors hover:text-[var(--dd-gold)]"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-[var(--dd-gold)]">Contact</h4>
            <ul className="mt-4 space-y-3 font-body text-sm text-[var(--dd-sand)]/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Akriti Eco City,
                Salaiya, Bhopal, M.P. 462042
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> care@pawandarshan.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +91 90000 00000
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-[var(--dd-sand)]/15 px-5 pt-6 text-center font-body text-xs text-[var(--dd-sand)]/50">
          © 2026 Pawan Darshan · A devotional VR experience. This is a concept
          demo inspired by the spiritual-tech category.
        </div>
      </footer>
    </>
  );
}
