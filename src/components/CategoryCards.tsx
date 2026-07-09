"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const categories = [
  { name: "Cheesecakes", image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop" },
  { name: "Macarons", image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop" },
  { name: "Croissants", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop" },
  { name: "Cupcakes", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop" },
  { name: "Cakes", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop" },
  { name: "Pastries", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=800&auto=format&fit=crop" },
  { name: "Waffles", image: "https://images.pexels.com/photos/2205270/pexels-photo-2205270.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Pancakes", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800" }
];

export function CategoryCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-transparent relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-bakery-chocolate mb-4"
          >
            Explore Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-subheading text-lg text-bakery-chocolate/70 italic max-w-2xl mx-auto"
          >
            Discover our artisanal creations crafted with the finest ingredients.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link href="/menu" key={category.name} className="block">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-lg shadow-bakery-pink/10 hover:shadow-2xl hover:shadow-[#DE9BA9]/40 hover:-translate-y-3 transition-all duration-500 hover-target border border-white/60 bg-white"
              >
                <div className="relative h-32 md:h-48 lg:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 md:bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bakery-chocolate/80 via-transparent to-transparent z-20 hidden md:block" />
                  
                  {/* Desktop Title (Absolute) */}
                  <div className="absolute bottom-6 left-6 z-30 hidden md:block">
                    <h3 className="font-heading text-2xl md:text-3xl text-white drop-shadow-md">
                      {category.name}
                    </h3>
                    <span className="font-sans text-xs uppercase tracking-widest text-bakery-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 block mt-2">
                      View Collection
                    </span>
                  </div>
                </div>

                {/* Mobile Title (Below Image) */}
                <div className="py-3 px-4 text-center md:hidden bg-white">
                  <h3 className="font-heading text-2xl text-bakery-chocolate">
                    {category.name}
                  </h3>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#DE9BA9] font-bold block mt-1">
                    View Collection
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
