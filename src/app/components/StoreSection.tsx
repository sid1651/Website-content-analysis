import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { products, type Product } from "./data";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Reveal } from "./Reveal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export function StoreSection() {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAdd = (p: Product) => {
    if (!user) {
      toast.info("Please sign in to add items to your cart.");
      navigate("/login");
      return;
    }
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image });
    toast.success(`${p.name} added to cart`);
  };

  return (
    <section id="store" className="bg-[var(--dd-cream)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-[var(--dd-saffron)]">
            Store
          </span>
          <h2 className="font-display mt-3 text-[2.2rem] text-[var(--dd-maroon)] md:text-[2.6rem]">
            Bring the temple home
          </h2>
          <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-ink)]/70">
            Choose a VR kit and subscription. Each pack is curated for a complete
            devotional experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 0.12}
              className="flex flex-col overflow-hidden rounded-2xl border border-[var(--dd-gold)]/30 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--dd-sand)]">
                <ImageWithFallback
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-contain"
                />
                {p.badge && (
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[var(--dd-saffron)] px-3 py-1 font-body text-xs text-white">
                    <Star className="h-3.5 w-3.5" /> {p.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[1.3rem] text-[var(--dd-maroon)]">
                  {p.name}
                </h3>
                <p className="font-body mt-2 flex-1 text-sm text-[var(--dd-ink)]/70">
                  {p.description}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-[1.6rem] text-[var(--dd-maroon)]">
                    {inr(p.price)}
                  </span>
                  {p.original && (
                    <span className="font-body text-sm text-[var(--dd-ink)]/40 line-through">
                      {inr(p.original)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--dd-saffron)] py-3 font-body text-white transition-transform hover:-translate-y-0.5"
                >
                  <Check className="h-4 w-4" /> Add to cart
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
