"use client";

import { motion } from "framer-motion";
import { Coffee, Award, Leaf, Clock } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const timeline = [
  { icon: Leaf, title: "Organic Beans", desc: "Sourced from fair-trade farms globally." },
  { icon: Clock, title: "Fresh Roasting", desc: "Roasted daily in small batches." },
  { icon: Coffee, title: "Artisan Brewing", desc: "Crafted by award-winning baristas." },
  { icon: Award, title: "Premium Quality", desc: "Uncompromising taste in every cup." },
];

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-32 bg-cafe-cream dark:bg-cafe-dark relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="relative group h-[600px] w-full rounded-[2rem] overflow-hidden" ref={ref}>
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cafe-brown/20 z-10"
            />
            {/* Using a placeholder for now. Replace with actual premium image later */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cafe-brown to-[#8A5A44] transition-transform duration-700 group-hover:scale-105" />
            <motion.img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
              alt="Barista pouring coffee"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -right-8 bottom-12 md:right-8 bg-cafe-gold text-cafe-dark p-8 rounded-full w-40 h-40 flex flex-col items-center justify-center text-center shadow-2xl z-20 hidden md:flex"
            >
              <span className="font-heading font-bold text-4xl">10+</span>
              <span className="font-sans text-xs font-bold tracking-widest uppercase">Years</span>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col space-y-8">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-sans text-cafe-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
              >
                Our Story
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Redefining the <br /> Coffee Experience
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-cafe-text/70 dark:text-cafe-cream/70 text-lg leading-relaxed max-w-xl"
            >
              We believe that every cup of coffee tells a story. From the high-altitude farms where our organic beans are handpicked, to the meticulous roasting process in our local facility, we are dedicated to perfection.
            </motion.p>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-cafe-gold/10 text-cafe-gold flex items-center justify-center shrink-0 group-hover:bg-cafe-gold group-hover:text-cafe-dark transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xl mb-1">{item.title}</h4>
                    <p className="font-sans text-sm text-cafe-text/60 dark:text-cafe-cream/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="pt-8"
            >
              <button className="font-sans text-cafe-text dark:text-cafe-cream font-semibold uppercase tracking-widest text-sm border-b-2 border-cafe-gold pb-1 hover:text-cafe-gold transition-colors hover-target">
                Discover Our Process
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
