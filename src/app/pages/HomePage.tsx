import { Hero } from "../components/Hero";
import { ProductsSection } from "../components/ProductsSection";
import { TempleGrid } from "../components/TempleGrid";
import { HowItWorks } from "../components/HowItWorks";
import { StoreSection } from "../components/StoreSection";

export function HomePage() {
  return (
    <>
      <Hero />
      <StoreSection />
      <TempleGrid limit={6} showViewAll />
      <HowItWorks />
      <ProductsSection />
    </>
  );
}
