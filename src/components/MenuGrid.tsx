"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { getMenuItems, getAllCategories } from "@/app/actions/menu";

export function MenuGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  const addItem = useCartStore((state) => state.addItem);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [menuCategories, setMenuCategories] = useState<string[]>(["All"]);

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    async function loadData() {
      const [menuRes, catRes] = await Promise.all([getMenuItems(), getAllCategories()]);
      if (menuRes.success && menuRes.data) setAllProducts(menuRes.data);
      if (catRes.success && catRes.data) setMenuCategories(["All", ...catRes.data]);
    }
    loadData();
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleAddToCart = (product: any) => {
    addItem(product);
    setToastMessage(`Added ${product.name} to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section className="py-24 bg-bakery-bg relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 relative">
        
        {/* Header & Filters */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-bakery-chocolate mb-8 text-center"
          >
            The Patisserie Menu
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(10);
                }}
                className={`px-6 py-2 rounded-full font-sans text-sm font-semibold tracking-wide transition-all duration-300 hover-target ${
                  activeCategory === cat 
                    ? "bg-bakery-chocolate text-white shadow-md" 
                    : "bg-white text-bakery-chocolate border border-bakery-chocolate/10 hover:border-bakery-gold hover:text-bakery-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          <AnimatePresence>
            {displayedProducts.map((product) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg shadow-bakery-pink/10 hover:shadow-2xl hover:shadow-[#DE9BA9]/30 hover:-translate-y-3 transition-all duration-500 border border-white/60"
              >
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-bakery-bg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button className="w-10 h-10 rounded-full bg-white text-bakery-chocolate flex items-center justify-center hover:bg-bakery-gold hover:text-white transition-colors hover-target shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                      <Heart size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white text-bakery-chocolate flex items-center justify-center hover:bg-bakery-gold hover:text-white transition-colors hover-target shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow text-center px-2">
                  <span className="font-sans text-xs uppercase tracking-widest text-bakery-gold mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-heading text-xl text-bakery-chocolate font-bold mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-bakery-chocolate/10">
                    <span className="font-subheading text-xl text-bakery-chocolate font-medium">
                      {product.price}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-10 h-10 rounded-full bg-bakery-section text-bakery-chocolate flex items-center justify-center hover:bg-bakery-chocolate hover:text-white transition-colors hover-target group/btn shadow-sm active:scale-95"
                    >
                      <ShoppingBag size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setVisibleCount(v => v + 10)}
              className="px-10 py-3 border border-bakery-chocolate text-bakery-chocolate rounded-full font-sans font-semibold hover:bg-bakery-chocolate hover:text-white transition-colors duration-300 hover-target"
            >
              Load More Menu
            </button>
          </div>
        )}

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-10 right-10 bg-bakery-chocolate text-white px-6 py-4 rounded-2xl shadow-2xl z-[9999] flex items-center gap-3 font-sans"
            >
              <div className="w-8 h-8 rounded-full bg-bakery-gold flex items-center justify-center text-white">
                <ShoppingBag size={14} />
              </div>
              <p className="font-medium text-sm md:text-base">{toastMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
