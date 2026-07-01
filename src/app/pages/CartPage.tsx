import { useState } from "react";
import { Link, Navigate } from "react-router";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear, count } = useCart();
  const { user } = useAuth();
  const [placed, setPlaced] = useState(false);

  // Cart is only accessible to signed-in devotees.
  if (!user) return <Navigate to="/login" replace />;

  const shipping = subtotal > 0 && subtotal < 2000 ? 99 : 0;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <section className="bg-[var(--dd-cream)] py-24">
        <div className="mx-auto max-w-lg px-5 text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.span>
          <h1 className="font-display mt-6 text-[2rem] text-[var(--dd-maroon)]">
            Order placed successfully
          </h1>
          <p className="font-body mt-3 text-[var(--dd-ink)]/70">
            Thank you, {user?.name.split(" ")[0]}! Your VR darshan kit is on its
            way. A confirmation has been sent to {user?.email}.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-[var(--dd-saffron)] px-7 py-3 font-body text-white transition-transform hover:-translate-y-0.5"
          >
            Continue exploring
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-[var(--dd-maroon)] py-14 text-[var(--dd-cream)]">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <span className="font-deva text-xl text-[var(--dd-gold)]">
            आपकी टोकरी
          </span>
          <h1 className="font-display mt-2 text-[2.4rem] md:text-[2.8rem]">
            Your Cart
          </h1>
          <p className="font-body mt-2 text-[var(--dd-sand)]/85">
            {count > 0
              ? `${count} item${count > 1 ? "s" : ""} ready for checkout`
              : "Your cart is waiting to be filled"}
          </p>
        </div>
      </section>

      <section className="bg-[var(--dd-cream)] py-14">
        <div className="mx-auto max-w-7xl px-5">
          {items.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-[var(--dd-gold)]/30 bg-white p-10 text-center shadow-sm">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--dd-sand)] text-[var(--dd-maroon)]">
                <ShoppingBag className="h-8 w-8" />
              </span>
              <h2 className="font-display mt-5 text-[1.5rem] text-[var(--dd-maroon)]">
                Your cart is empty
              </h2>
              <p className="font-body mt-2 text-[var(--dd-ink)]/60">
                Explore our VR kits and devotional products to begin.
              </p>
              <Link
                to="/store"
                className="mt-6 inline-block rounded-full bg-[var(--dd-saffron)] px-7 py-3 font-body text-white transition-transform hover:-translate-y-0.5"
              >
                Browse the Store
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* Items */}
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 rounded-2xl border border-[var(--dd-gold)]/30 bg-white p-4 shadow-sm"
                    >
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--dd-sand)]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-[1.15rem] leading-tight text-[var(--dd-maroon)]">
                              {item.name}
                            </h3>
                            {item.meta && (
                              <p className="font-body text-xs text-[var(--dd-saffron)]">
                                {item.meta}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--dd-ink)]/40 transition-colors hover:text-red-500"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-1 rounded-full border border-[var(--dd-gold)]/40 p-1">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--dd-maroon)] transition-colors hover:bg-[var(--dd-sand)]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-body text-[var(--dd-maroon)]">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--dd-maroon)] transition-colors hover:bg-[var(--dd-sand)]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-display text-[1.2rem] text-[var(--dd-maroon)]">
                            {inr(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button
                  onClick={clear}
                  className="font-body text-sm text-[var(--dd-ink)]/50 transition-colors hover:text-red-500"
                >
                  Clear cart
                </button>
              </div>

              {/* Summary */}
              <div className="h-fit rounded-2xl border border-[var(--dd-gold)]/30 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                <h2 className="font-display text-[1.4rem] text-[var(--dd-maroon)]">
                  Order Summary
                </h2>
                <div className="mt-5 space-y-3 font-body text-[var(--dd-ink)]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{inr(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
                  </div>
                  <div className="my-2 border-t border-[var(--dd-gold)]/20" />
                  <div className="flex justify-between text-[var(--dd-maroon)]">
                    <span className="font-display text-[1.15rem]">Total</span>
                    <span className="font-display text-[1.3rem]">
                      {inr(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setPlaced(true)}
                  className="mt-6 w-full rounded-full bg-[var(--dd-saffron)] py-3.5 font-body text-white shadow-lg shadow-[var(--dd-saffron)]/30 transition-transform hover:-translate-y-0.5"
                >
                  Proceed to checkout
                </button>

                <div className="mt-5 space-y-2.5 font-body text-sm text-[var(--dd-ink)]/60">
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[var(--dd-saffron)]" />
                    Secure & encrypted payment
                  </p>
                  <p className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[var(--dd-saffron)]" />
                    Free shipping over ₹2,000
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
