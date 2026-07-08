import { SignatureCollection } from "@/components/SignatureCollection";

export const metadata = {
  title: "Custom Cakes | Patisserie",
  description: "Order our signature custom cakes for your special moments.",
};

export default function CakesPage() {
  return (
    <main className="min-h-screen bg-bakery-bg flex flex-col font-sans selection:bg-[#DE9BA9] selection:text-white relative">
      
      {/* Page Header */}
      <section className="pt-64 md:pt-72 pb-20 relative bg-bakery-bg z-10 border-b border-bakery-pink/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10 mt-8">
          <h1 className="font-heading text-6xl md:text-8xl text-bakery-chocolate mb-6 drop-shadow-sm">
            Signature Cakes
          </h1>
          <p className="font-subheading text-xl md:text-2xl text-bakery-gold italic max-w-2xl mx-auto mb-12">
            The centerpiece of any celebration. Handcrafted with precision, love, and the finest ingredients in the world.
          </p>
          
          <img 
            src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1200&auto=format&fit=crop" 
            alt="Signature Wedding Cake"
            className="w-full max-w-4xl mx-auto h-[400px] object-cover rounded-[3rem] shadow-2xl border-4 border-white"
          />
        </div>
      </section>

      {/* Signature Collection */}
      <div className="pb-32 bg-bakery-bg">
        <SignatureCollection />
      </div>
    </main>
  );
}
