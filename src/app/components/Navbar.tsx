import { useState } from "react";
import { Menu, X, ShoppingBag, Sparkles, LogOut, User } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Darshan Suchi", to: "/darshan-suchi" },
  { label: "Store", to: "/store" },
  { label: "How it Works", to: "/how-it-works" },
  { label: "Download", to: "/download" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user, logout } = useAuth();
  const { count } = useCart();

  const initials = user
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  const linkClass = (isActive: boolean) =>
    `font-body text-[0.95rem] underline-offset-8 decoration-2 transition-colors ${
      isActive
        ? "text-[var(--dd-gold)] underline decoration-[var(--dd-gold)]"
        : "text-[var(--dd-sand)] hover:text-[var(--dd-gold)] hover:underline hover:decoration-[var(--dd-gold)]/50"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--dd-gold)]/25 bg-gradient-to-r from-[var(--dd-deep)] via-[var(--dd-maroon)] to-[var(--dd-deep)] shadow-lg shadow-black/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--dd-gold)] text-[var(--dd-maroon)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="font-deva block text-[1.15rem] text-[var(--dd-gold)]">
              पवन दर्शन
            </span>
            <span className="font-display block text-[0.7rem] tracking-[0.25em] text-[var(--dd-sand)]/80">
              PAWAN DARSHAN
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => linkClass(isActive)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user && (
            <Link
              to="/cart"
              className="relative flex items-center gap-2 rounded-full border border-[var(--dd-gold)]/40 px-4 py-2 font-body text-sm text-[var(--dd-sand)] transition-colors hover:bg-[var(--dd-gold)]/10"
            >
              <ShoppingBag className="h-4 w-4" /> Cart
              {count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--dd-saffron)] px-1 font-body text-xs text-white">
                  {count}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenu((v) => !v)}
                className="flex items-center rounded-full border border-[var(--dd-gold)]/40 p-1 transition-colors hover:bg-[var(--dd-gold)]/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--dd-gold)] font-body text-sm text-[var(--dd-maroon)]">
                  {initials}
                </span>
              </button>
              {menu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenu(false)}
                  />
                  <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-[var(--dd-gold)]/30 bg-white shadow-xl">
                    <div className="border-b border-[var(--dd-gold)]/20 px-4 py-3">
                      <div className="font-body text-sm text-[var(--dd-maroon)]">
                        {user.name}
                      </div>
                      <div className="font-body text-xs text-[var(--dd-ink)]/50">
                        {user.email}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMenu(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 font-body text-sm text-[var(--dd-ink)]/80 transition-colors hover:bg-[var(--dd-sand)]"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm text-[var(--dd-sand)] transition-colors hover:text-[var(--dd-gold)]"
              >
                <User className="h-4 w-4" /> Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-[var(--dd-saffron)] px-5 py-2 font-body text-sm text-white shadow-lg shadow-[var(--dd-saffron)]/30 transition-transform hover:-translate-y-0.5"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="text-[var(--dd-sand)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--dd-gold)]/20 bg-[var(--dd-maroon)] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => linkClass(isActive)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-[var(--dd-gold)]/20 pt-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dd-gold)] font-body text-sm text-[var(--dd-maroon)]">
                      {initials}
                    </span>
                    <div>
                      <div className="font-body text-sm text-[var(--dd-sand)]">
                        {user.name}
                      </div>
                      <div className="font-body text-xs text-[var(--dd-sand)]/60">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/cart"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full border border-[var(--dd-gold)]/40 px-5 py-2.5 font-body text-sm text-[var(--dd-sand)]"
                  >
                    <ShoppingBag className="h-4 w-4" /> Cart{count > 0 ? ` (${count})` : ""}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 rounded-full border border-[var(--dd-gold)]/40 px-5 py-2.5 font-body text-sm text-[var(--dd-sand)]"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-[var(--dd-gold)]/40 px-5 py-2.5 text-center font-body text-[var(--dd-sand)]"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[var(--dd-saffron)] px-5 py-2.5 text-center font-body text-white"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
