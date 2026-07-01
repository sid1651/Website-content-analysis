import { Sparkles } from "lucide-react";

const messages = [
  "🎉 Mega Sale is LIVE",
  "₹200 OFF on your first order",
  "⚡ Instant discount on all VR kits",
  "🚚 Free shipping over ₹2,000",
  "🕉️ Complimentary Abhimantrit Rudraksha",
  "✨ Limited time — grab your Darshan kit today",
];

export function PromoMarquee() {
  // Duplicated once so the loop is seamless.
  const loop = [...messages, ...messages];

  return (
    <div className="overflow-hidden bg-[var(--dd-saffron)] py-2 text-white">
      <div className="flex w-max animate-[promo_18s_linear_infinite] gap-10 whitespace-nowrap">
        {loop.map((m, i) => (
          <span
            key={i}
            className="flex items-center gap-2 font-body text-sm tracking-wide"
          >
            <Sparkles className="h-4 w-4 text-[var(--dd-cream)]" />
            {m}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes promo {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
