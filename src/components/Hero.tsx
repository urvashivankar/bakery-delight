"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-32 pb-24 md:pb-0 overflow-hidden bg-transparent">

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl px-6 mt-16 md:mt-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 2.5 }} // After loader
          className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] text-bakery-chocolate leading-tight mb-6 drop-shadow-sm"
        >
          Delight in<br />every bite!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="font-sans text-xs md:text-sm text-bakery-chocolate/60 max-w-md mx-auto mb-10 leading-relaxed tracking-wide"
        >
          Experience the finest artisan pastries, handcrafted with love and the highest quality ingredients. Perfect for every occasion.
        </motion.p>

        <Link href="/menu">
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 3 }}
            className="bg-[#D88A96] text-white px-10 py-3 rounded-full font-sans font-bold tracking-widest uppercase hover:bg-bakery-chocolate transition-colors shadow-[0_8px_20px_rgba(216,138,150,0.4)] hover-target"
          >
            Order Now
          </motion.button>
        </Link>

        {/* Mobile-Only Showcase Images */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="mt-10 md:hidden flex items-center justify-center w-full"
        >
          <img 
            src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Premium Signature Cake" 
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full drop-shadow-2xl border-8 border-white"
          />
        </motion.div>
      </div>

      {/* Absolutely Positioned Imagery matching the Reference Layout */}

      {/* 1. Far Left Large Cake */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 2.6 }}
        className="absolute left-[-5%] lg:left-[5%] top-[30%] w-64 h-80 z-10 hidden md:block"
      >
        <img 
          src="https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=800" 
          alt="Tall Pink Drip Cake" 
          className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          style={{ clipPath: "inset(0 0 10% 0)" }} // Simulate sitting on the stand
        />
      </motion.div>

      {/* 2. Left Foreground Small Cake */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.8 }}
        className="absolute left-[5%] lg:left-[15%] bottom-[5%] w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 z-30 hidden md:block"
      >
        <img 
          src="https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Small Cake" 
          className="w-full h-full object-cover rounded-full drop-shadow-2xl border-[8px] border-white hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* 3. Right Large White Cake with Roses */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 2.7 }}
        className="absolute right-[-5%] lg:right-[5%] top-[25%] w-72 h-96 z-10 hidden md:block"
      >
        <img 
          src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=800" 
          alt="Layered Berry Cake" 
          className="w-full h-full object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          style={{ clipPath: "circle(45% at 50% 50%)" }} // Make it look like a rounded cake top
        />
      </motion.div>

      {/* 4. Right Foreground Cupcakes */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.9 }}
        className="absolute right-[5%] lg:right-[15%] bottom-[10%] w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-40 z-30 hidden md:flex gap-2"
      >
        <img src="https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Cupcake" className="w-1/3 h-full object-cover rounded-t-full drop-shadow-xl border-4 border-white" />
        <img src="https://images.pexels.com/photos/808923/pexels-photo-808923.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Cupcake" className="w-1/3 h-full object-cover rounded-t-full drop-shadow-xl border-4 border-white mt-4" />
        <img src="https://images.pexels.com/photos/2684556/pexels-photo-2684556.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Cupcake" className="w-1/3 h-full object-cover rounded-t-full drop-shadow-xl border-4 border-white" />
      </motion.div>

    </section>
  );
}
