"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function PromoBanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 bg-bakery-bg relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[3rem] overflow-hidden bg-bakery-pink/30 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 shadow-2xl shadow-bakery-pink/20"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/40 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-bakery-gold/20 rounded-full blur-[60px]" />
          </div>

          {/* Text Content */}
          <div className="relative z-10 md:w-1/2 flex flex-col space-y-6 text-center md:text-left mb-12 md:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white text-bakery-chocolate text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                Fresh Today
              </span>
              <h2 className="font-heading text-5xl lg:text-7xl text-bakery-chocolate font-bold mb-2">
                Strawberry <br/> Dream
              </h2>
              <p className="font-subheading text-2xl lg:text-3xl text-bakery-gold italic">
                30% OFF this weekend
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="px-8 py-4 bg-bakery-chocolate text-white rounded-full font-sans font-semibold tracking-wide hover:bg-bakery-gold transition-colors duration-300 shadow-lg shadow-bakery-chocolate/20 hover-target mt-4">
                Order Now
              </button>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop" 
                alt="Strawberry Cheesecake"
                className="w-full h-full object-cover rounded-full shadow-2xl border-[12px] border-white/50"
              />
              
              {/* Floating Berries / Decorations */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 -left-10 w-20 h-20 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center p-3"
              >
                <img src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover rounded-full" alt="berry" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-10 -right-5 w-16 h-16 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white flex items-center justify-center p-2"
              >
                <img src="https://images.pexels.com/photos/1630588/pexels-photo-1630588.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover rounded-full" alt="berry" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
