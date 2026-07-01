import { useMemo, useState } from "react";
import { Star, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { shopItems, shopCategories, type ShopItem } from "./data";
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

export function ProductsSection() {
  const [active, setActive] = useState<(typeof shopCategories)[number]>("All");
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAdd = (item: ShopItem) => {
    if (!user) {
      toast.info("Please sign in to add items to your cart.");
      navigate("/login");
      return;
    }
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      meta: item.category,
    });
    toast.success(`${item.name} added to cart`);
  };

  const filtered = useMemo(
    () =>
      active === "All"
        ? shopItems
        : shopItems.filter((it) => it.category === active),
    [active]
  );

  return (
    <section id="products" className="bg-[var(--dd-sand)] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="text-center">
          <span className="font-body text-sm uppercase tracking-[0.3em] text-[var(--dd-saffron)]">
            Devotional Store
          </span>
          <h2 className="font-display mt-3 text-[2.2rem] text-[var(--dd-maroon)] md:text-[2.6rem]">
            Sacred products for every devotee
          </h2>
          <p className="font-body mx-auto mt-3 max-w-2xl text-[var(--dd-ink)]/70">
            Abhimantrit rudraksha, pooja kits, murtis and VR experiences —
            blessed and delivered to your doorstep.
          </p>
        </Reveal>

        <div className="mt-9 flex flex-wrap justify-center gap-2.5">
          {shopCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 font-body text-sm transition-colors ${
                active === cat
                  ? "bg-[var(--dd-maroon)] text-[var(--dd-gold)]"
                  : "border border-[var(--dd-maroon)]/20 bg-[var(--dd-cream)] text-[var(--dd-maroon)] hover:bg-[var(--dd-gold)]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--dd-gold)]/30 bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-[var(--dd-sand)]">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--dd-saffron)] px-3 py-1 font-body text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="font-body text-xs uppercase tracking-wider text-[var(--dd-saffron)]">
                    {item.category}
                  </span>
                  <h3 className="font-display mt-1 text-[1.1rem] leading-snug text-[var(--dd-maroon)]">
                    {item.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1 text-[var(--dd-gold)]">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-body text-sm text-[var(--dd-ink)]/70">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-baseline gap-2 pt-3">
                    <span className="font-display text-[1.3rem] text-[var(--dd-maroon)]">
                      {inr(item.price)}
                    </span>
                    {item.original && (
                      <span className="font-body text-sm text-[var(--dd-ink)]/40 line-through">
                        {inr(item.original)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAdd(item)}
                    className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[var(--dd-saffron)] py-2.5 font-body text-sm text-white transition-transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
