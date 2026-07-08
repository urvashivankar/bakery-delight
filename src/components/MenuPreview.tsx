"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, Heart } from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    id: 1,
    name: "Espresso Romano",
    category: "Coffee",
    price: "$5.50",
    cals: "15 cals",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop",
    special: true
  },
  {
    id: 2,
    name: "Matcha Latte",
    category: "Tea",
    price: "$6.00",
    cals: "120 cals",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop",
    special: false
  },
  {
    id: 3,
    name: "Almond Croissant",
    category: "Desserts",
    price: "$4.50",
    cals: "350 cals",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop",
    special: false
  },
  {
    id: 4,
    name: "Nitro Cold Brew",
    category: "Cold Coffee",
    price: "$6.50",
    cals: "5 cals",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
    special: true
  }
];

export function MenuPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-32 bg-cafe-bg dark:bg-[#1a1110] relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-sans text-cafe-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              Discover
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Signature Menu
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="font-sans text-cafe-text dark:text-cafe-cream font-semibold uppercase tracking-widest text-sm border-b-2 border-cafe-gold pb-1 hover:text-cafe-gold transition-colors hover-target">
              View Full Menu
            </button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative rounded-3xl p-6 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl hover:-translate-y-4 transition-transform duration-500 hover:shadow-2xl hover:shadow-cafe-gold/10"
            >
              {/* Special Badge */}
              {item.special && (
                <div className="absolute top-4 left-4 z-20 bg-cafe-gold text-cafe-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-sans">
                  Best Seller
                </div>
              )}
              
              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-cafe-text dark:text-cafe-cream hover:text-red-500 hover:bg-white transition-colors hover-target">
                <Heart size={16} />
              </button>

              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <motion.img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs tracking-widest uppercase text-cafe-gold font-bold">{item.category}</span>
                  <span className="font-sans text-xs text-cafe-text/50 dark:text-cafe-cream/50">{item.cals}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold">{item.name}</h3>
                
                <div className="flex justify-between items-center pt-4">
                  <span className="font-heading text-xl font-bold">{item.price}</span>
                  <button className="w-10 h-10 rounded-full bg-cafe-dark text-cafe-cream dark:bg-cafe-cream dark:text-cafe-dark flex items-center justify-center hover:bg-cafe-gold hover:text-cafe-dark transition-colors hover-target group/btn">
                    <ShoppingBag size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
