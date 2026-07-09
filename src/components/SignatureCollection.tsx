"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useState } from "react";

const signatureItems = [
  {
    name: "Classic New York Cheesecake",
    description: "Rich, creamy, and baked to perfection with a buttery graham cracker crust.",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop",
    bestSeller: true
  },
  {
    name: "Belgian Chocolate Truffle",
    description: "Layers of moist chocolate sponge and premium Belgian chocolate ganache.",
    price: "₹1200",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    bestSeller: false
  },
  {
    name: "Red Velvet Romance",
    description: "Signature red velvet sponge frosted with our airy cream cheese frosting.",
    price: "₹950",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop",
    bestSeller: true
  }
];

export function SignatureCollection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const addItem = useCartStore((state) => state.addItem);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (item: any) => {
    addItem({
      name: item.name,
      category: "Signature Cake",
      price: item.price,
      image: item.image
    });
    setToastMessage(`Added ${item.name} to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section className="py-24 bg-bakery-section relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-bakery-chocolate mb-4"
            >
              Signature Collection
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-subheading text-lg text-bakery-chocolate/70 italic max-w-lg"
            >
              Our most celebrated creations, masterfully crafted by our expert pâtissiers.
            </motion.p>
          </div>
          <Link href="/menu">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 font-sans font-semibold text-bakery-chocolate hover:text-bakery-gold transition-colors hover-target group"
            >
              View All Signature Cakes
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {signatureItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className="group flex flex-col hover-target hover:-translate-y-3 transition-transform duration-500"
            >
              <div className="relative w-full aspect-[3/2] rounded-[2rem] overflow-hidden mb-6 shadow-xl shadow-bakery-pink/20 group-hover:shadow-2xl group-hover:shadow-[#DE9BA9]/40 transition-shadow duration-500 border border-white/60">
                {item.bestSeller && (
                  <div className="absolute top-6 right-6 z-20 bg-[#DE9BA9] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Star size={12} fill="currentColor" /> Best Seller
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <h3 className="font-heading text-3xl text-bakery-chocolate mb-3 group-hover:text-bakery-gold transition-colors">
                {item.name}
              </h3>
              <p className="font-sans text-sm text-bakery-chocolate/60 leading-relaxed mb-4 flex-grow">
                {item.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto border-t border-bakery-chocolate/10 pt-4">
                <span className="font-subheading text-2xl text-bakery-chocolate font-medium">{item.price}</span>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="text-sm font-sans font-semibold uppercase tracking-widest text-bakery-gold hover:text-bakery-chocolate transition-colors hover-target"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-10 right-10 bg-bakery-chocolate text-white px-6 py-4 rounded-2xl shadow-2xl z-[9999] flex items-center gap-3 font-sans"
            >
              <div className="w-8 h-8 rounded-full bg-bakery-gold flex items-center justify-center text-white">
                <Star size={14} />
              </div>
              <p className="font-medium text-sm md:text-base">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
