"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  { value: 25, label: "Coffee Varieties", suffix: "+" },
  { value: 1500, label: "Happy Customers", suffix: "+" },
  { value: 12, label: "Professional Baristas", suffix: "+" },
  { value: 10, label: "Years Experience", suffix: "+" },
];

export function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section className="py-24 bg-cafe-bg dark:bg-[#1a1110] relative z-10 border-t border-cafe-brown/10">
      <div className="container mx-auto px-6 md:px-12">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center space-y-2 group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-cafe-gold group-hover:scale-110 transition-transform duration-300">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>
              <p className="font-sans text-sm md:text-base text-cafe-text/70 dark:text-cafe-cream/70 tracking-widest uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
