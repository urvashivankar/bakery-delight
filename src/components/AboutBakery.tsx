"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import { submitCustomCake } from "@/app/actions/forms";

export function AboutBakery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-bakery-section relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        {/* Story & Ingredients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-bakery-pink/20"
          >
            <img 
              src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop" 
              alt="Baker making pastries"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bakery-chocolate/10" />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 -bottom-8 w-40 h-40 bg-bakery-bg rounded-full flex flex-col items-center justify-center border-8 border-bakery-section shadow-xl hidden md:flex"
            >
              <span className="font-heading text-4xl text-bakery-gold">10+</span>
              <span className="font-sans text-xs uppercase tracking-widest text-bakery-chocolate font-bold text-center">Years of<br/>Excellence</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-2"
            >
              <h2 className="font-heading text-5xl lg:text-6xl text-bakery-chocolate font-bold mb-4">
                Our Sweet Story
              </h2>
              <p className="font-subheading text-2xl text-bakery-gold italic">
                Crafting perfection since 2010.
              </p>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-bakery-chocolate/70 leading-relaxed text-lg"
            >
              L'Artisan began as a small family dream in Paris, driven by a passion for the art of French pâtisserie. Today, we bring that same dedication to every single dessert we bake, using traditional techniques passed down through generations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {["Organic Flour", "Premium Butter", "Belgian Chocolate", "Fresh Cream", "Handcrafted", "Made with Love"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#DE9BA9] flex items-center justify-center text-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="font-sans font-medium text-bakery-chocolate">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Reservation / Booking Form */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-bakery-pink/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-bakery-pink/20 rounded-full blur-[60px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
            <div className="overflow-visible">
              <motion.h3 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-heading text-4xl md:text-5xl text-bakery-chocolate font-bold mb-4 py-2"
              >
                Book a Custom Cake
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-subheading text-xl text-bakery-gold italic mb-8"
              >
                For birthdays, weddings, and special moments.
              </motion.p>
              <motion.img 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop" 
                alt="Custom Cake"
                className="w-full h-[250px] object-cover rounded-3xl shadow-lg border-4 border-white"
              />
            </div>
            
            <motion.form 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              action={async (formData) => {
                const res = await submitCustomCake(formData);
                alert(res.message || res.error);
                if (res.success) {
                  const form = document.getElementById("custom-cake-form") as HTMLFormElement;
                  if (form) form.reset();
                }
              }}
              id="custom-cake-form"
              className="flex flex-col space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" required placeholder="Your Name" className="w-full px-6 py-4 rounded-full bg-white border border-bakery-pink/30 focus:border-bakery-gold focus:outline-none font-sans text-bakery-chocolate" />
                <input type="tel" name="phone" required placeholder="Phone Number" className="w-full px-6 py-4 rounded-full bg-white border border-bakery-pink/30 focus:border-bakery-gold focus:outline-none font-sans text-bakery-chocolate" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="occasion" placeholder="Occasion (e.g. Wedding)" className="w-full px-6 py-4 rounded-full bg-white border border-bakery-pink/30 focus:border-bakery-gold focus:outline-none font-sans text-bakery-chocolate" />
                <input type="date" name="date" required className="w-full px-6 py-4 rounded-full bg-white border border-bakery-pink/30 focus:border-bakery-gold focus:outline-none font-sans text-bakery-chocolate" />
              </div>
              <textarea name="message" placeholder="Special Request or Message" rows={4} className="w-full px-6 py-4 rounded-3xl bg-white border border-bakery-pink/30 focus:border-bakery-gold focus:outline-none font-sans text-bakery-chocolate resize-none"></textarea>
              <button type="submit" className="w-full py-4 bg-bakery-chocolate text-white rounded-full font-sans font-semibold tracking-wide hover:bg-bakery-gold transition-colors duration-300 shadow-lg shadow-bakery-chocolate/20 hover-target mt-4">
                Request Consultation
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
