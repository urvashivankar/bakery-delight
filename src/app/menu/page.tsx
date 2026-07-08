import { MenuGrid } from "@/components/MenuGrid";
import { CategoryCards } from "@/components/CategoryCards";
import { SignatureCollection } from "@/components/SignatureCollection";

export const metadata = {
  title: "Menu | Patisserie",
  description: "Explore our full menu of artisanal cakes, pastries, and macarons.",
};

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-bakery-bg flex flex-col font-sans selection:bg-[#DE9BA9] selection:text-white relative">
      
      {/* Page Header */}
      <section className="pt-64 md:pt-72 pb-20 relative bg-gradient-to-b from-[#FDF8F7] to-bakery-bg z-10 border-b border-bakery-pink/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10 mt-8">
          <h1 className="font-heading text-6xl md:text-8xl text-bakery-chocolate mb-6 drop-shadow-sm">
            Our Full Menu
          </h1>
          <p className="font-subheading text-xl md:text-2xl text-bakery-gold italic max-w-2xl mx-auto">
            From classic French macarons to rich chocolate truffles, discover our entire collection of handcrafted delights.
          </p>
        </div>
      </section>

      {/* Categories & Full Grid */}
      <SignatureCollection />
      <CategoryCards />
      <div className="pb-32">
        <MenuGrid />
      </div>
    </main>
  );
}
