import { useState } from "react";
import { MapPin, ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router";
import { temples } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Reveal } from "./Reveal";
import { Video360Viewer } from "./Video360Viewer";
import vaishnoVideo from "../../imports/document_6208741329380319605.mp4";
import goldenTempleVideo from "../../imports/untitled-design.mp4";

type TempleGridProps = {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
};

// Temples that have an immersive 360° VR video available.
const VR_TEMPLE_VIDEOS: Record<string, string> = {
  vaishno: vaishnoVideo,
  "golden-temple": goldenTempleVideo,
};

export function TempleGrid({
  limit,
  showHeader = true,
  showViewAll = false,
}: TempleGridProps) {
  const list = limit ? temples.slice(0, limit) : temples;
  const [viewer, setViewer] = useState<{
    name: string;
    location: string;
    videoSrc: string;
  } | null>(null);

  return (
    <section id="temples" className="bg-[var(--dd-cream)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        {showHeader && (
          <Reveal className="text-center">
            <span className="font-body text-sm uppercase tracking-[0.3em] text-[var(--dd-saffron)]">
              Sanctum Tours
            </span>
            <h2 className="font-display mt-3 text-[2.2rem] text-[var(--dd-maroon)] md:text-[2.6rem]">
              Darshan of the Jyotirlingas & Shakti Peeths
            </h2>
            <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-ink)]/70">
              Explore the inner sanctum of each temple in immersive 360°. Move,
              look around, and feel present — as if you were truly there.
            </p>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <Reveal
              key={t.id}
              delay={(i % 3) * 0.1}
              className="group overflow-hidden rounded-2xl border border-[var(--dd-gold)]/30 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={t.image}
                  alt={`${t.name} temple`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--dd-maroon)]/85 px-3 py-1 font-body text-xs text-[var(--dd-gold)] backdrop-blur">
                  {t.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-[1.35rem] text-[var(--dd-maroon)]">
                  {t.name}
                </h3>
                <p className="font-body mt-1 text-sm text-[var(--dd-saffron)]">
                  {t.deity}
                </p>
                <p className="font-body mt-2 flex items-center gap-1.5 text-sm text-[var(--dd-ink)]/60">
                  <MapPin className="h-4 w-4" /> {t.location}
                </p>
                {VR_TEMPLE_VIDEOS[t.id] ? (
                  <button
                    onClick={() =>
                      setViewer({
                        name: t.name,
                        location: t.location,
                        videoSrc: VR_TEMPLE_VIDEOS[t.id],
                      })
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--dd-saffron)] py-2.5 font-body text-sm text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Play className="h-4 w-4" /> Enter 360° sanctum
                  </button>
                ) : (
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--dd-sand)] py-2.5 font-body text-sm text-[var(--dd-maroon)] transition-colors hover:bg-[var(--dd-gold)]/40">
                    Enter sanctum <ArrowUpRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-10 text-center">
            <Link
              to="/darshan-suchi"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--dd-maroon)] px-7 py-3 font-body text-[var(--dd-gold)] transition-transform hover:-translate-y-0.5"
            >
              View full Darshan Suchi <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {viewer && (
        <Video360Viewer
          title={viewer.name}
          subtitle={viewer.location}
          videoSrc={viewer.videoSrc}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
