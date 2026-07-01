import { QRCodeSVG } from "qrcode.react";
import { Smartphone, ScanLine, Headset, Bell, Heart } from "lucide-react";
import { Reveal } from "../components/Reveal";

// Replace with your real listing once the app is published.
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.pawandarshan.app";
const APP_STORE_URL = "https://apps.apple.com/app/pawan-darshan/id000000000";

const features = [
  {
    icon: Headset,
    title: "VR Darshan on the go",
    text: "Step into the sanctum in immersive 360° from your phone or headset.",
  },
  {
    icon: Bell,
    title: "Aarti reminders",
    text: "Get notified before every live aarti so you never miss a ceremony.",
  },
  {
    icon: Heart,
    title: "Your favourite shrines",
    text: "Save temples and build your personal daily darshan routine.",
  },
];

export function DownloadPage() {
  return (
    <>
      <section className="bg-[var(--dd-maroon)] py-16 text-[var(--dd-cream)]">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <span className="font-deva text-xl text-[var(--dd-gold)]">
            ऐप डाउनलोड करें
          </span>
          <h1 className="font-display mt-2 text-[2.4rem] md:text-[3rem]">
            Download the App
          </h1>
          <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-sand)]/85">
            Scan the QR code with your phone camera to install Pawan Darshan
            straight from the Google Play Store.
          </p>
        </div>
      </section>

      <section className="bg-[var(--dd-sand)] py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 md:grid-cols-2">
          {/* QR card */}
          <Reveal>
            <div className="mx-auto max-w-sm rounded-3xl border border-[var(--dd-gold)]/30 bg-white p-8 text-center shadow-lg">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--dd-sand)] px-4 py-1.5 font-body text-sm text-[var(--dd-maroon)]">
                <ScanLine className="h-4 w-4" /> Scan to install
              </div>

              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-2xl border-2 border-[var(--dd-gold)]/30 p-4 transition-transform hover:-translate-y-0.5"
                aria-label="Open the Pawan Darshan listing on Google Play"
              >
                <QRCodeSVG
                  value={PLAY_STORE_URL}
                  size={208}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#5c160d"
                  className="mx-auto h-auto w-full max-w-[208px]"
                />
              </a>

              <p className="font-body mt-5 flex items-center justify-center gap-2 text-sm text-[var(--dd-ink)]/60">
                <Smartphone className="h-4 w-4" /> Point your camera at the code
              </p>
            </div>
          </Reveal>

          {/* Copy + store buttons */}
          <Reveal delay={0.15}>
            <h2 className="font-display text-[2rem] text-[var(--dd-maroon)]">
              The temple, in your pocket
            </h2>
            <p className="font-body mt-3 text-[var(--dd-ink)]/70">
              Take darshan, attend live aartis and explore sacred sanctums
              anytime, anywhere. Available now for Android, with iOS arriving
              soon.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[var(--dd-maroon)] px-6 py-3 text-left text-[var(--dd-cream)] transition-transform hover:-translate-y-0.5"
              >
                <PlayIcon />
                <span>
                  <span className="font-body block text-xs text-[var(--dd-sand)]/80">
                    GET IT ON
                  </span>
                  <span className="font-display block text-[1.1rem]">
                    Google Play
                  </span>
                </span>
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-[var(--dd-maroon)]/25 bg-white px-6 py-3 text-left text-[var(--dd-maroon)] transition-transform hover:-translate-y-0.5"
              >
                <AppleIcon />
                <span>
                  <span className="font-body block text-xs text-[var(--dd-ink)]/60">
                    COMING SOON
                  </span>
                  <span className="font-display block text-[1.1rem]">
                    App Store
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* App features */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 px-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.1}
              className="rounded-2xl border border-[var(--dd-gold)]/30 bg-[var(--dd-cream)] p-6 text-center"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--dd-maroon)] text-[var(--dd-gold)]">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="font-display mt-4 text-[1.25rem] text-[var(--dd-maroon)]">
                {f.title}
              </h3>
              <p className="font-body mt-2 text-sm text-[var(--dd-ink)]/70">
                {f.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 512 512" className="h-7 w-7" aria-hidden="true">
      <path fill="#00d4ff" d="M48 32l232 224L48 480c-9-5-16-15-16-27V59c0-12 7-22 16-27z" />
      <path fill="#00f076" d="M48 32c4-2 9-3 14-2l268 150-66 64L48 32z" />
      <path fill="#ffce00" d="M414 215l-84-47-66 64 66 64 84-47c20-11 20-23 0-34z" />
      <path fill="#ff3a44" d="M264 256l66-64 66 23-66 41-66-0z" />
      <path fill="#ff3a44" d="M62 482c-5 1-10 0-14-2l232-224 66 64L62 482z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="h-7 w-7 fill-current" aria-hidden="true">
      <path d="M318 268c-1-58 47-86 49-87-27-39-68-44-83-45-35-4-69 21-87 21-18 0-46-20-75-20-39 1-74 22-94 57-40 70-10 173 29 230 19 27 42 58 71 57 29-1 39-18 74-18 34 0 44 18 74 17 31-1 50-28 69-55 21-31 30-61 30-63-1-1-58-22-59-88zM262 80c16-19 27-46 24-72-23 1-51 15-67 34-15 17-28 44-25 70 26 2 52-13 68-32z" />
    </svg>
  );
}
