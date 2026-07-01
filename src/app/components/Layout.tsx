import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { CtaFooter } from "./CtaFooter";
import { PromoMarquee } from "./PromoMarquee";

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="font-body min-h-screen bg-[var(--dd-cream)]">
      <PromoMarquee />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <CtaFooter />
    </div>
  );
}
