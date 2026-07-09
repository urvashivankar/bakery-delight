"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed z-[10000]">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#DE9BA9] text-white pointer-events-auto"
          >
            {/* Subtle spinning rings and logo */}
            <div className="relative flex items-center justify-center w-40 h-40 mb-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                className="absolute top-0 left-0 w-full h-full border border-white/40 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] border border-dashed border-white/60 rounded-full"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-20 h-20 bg-white text-[#DE9BA9] rounded-full flex items-center justify-center font-heading text-4xl italic shadow-lg"
              >
                L
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-3xl md:text-5xl font-sans tracking-[0.3em] font-extrabold uppercase text-white"
              >
                L'Artisan
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-4 font-subheading text-white/90 italic tracking-[0.2em] text-sm md:text-lg"
            >
              VADODARA
            </motion.p>

            <motion.div
              className="mt-12 w-64 h-[1px] bg-white/30 overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
