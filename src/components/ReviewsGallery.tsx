"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Sophie Laurent", rating: 5, text: "The macarons are literally out of this world. The pistachio flavor transported me straight back to Paris.", role: "Food Critic" },
  { name: "Emma Thompson", rating: 5, text: "We ordered our wedding cake from L'Artisan. Not only was it stunning, but it was the best cake I have ever tasted.", role: "Happy Bride" },
  { name: "Julian Rossi", rating: 5, text: "The perfect balance of sweetness and texture in their cheesecakes. A luxury experience from start to finish.", role: "Regular Customer" },
  { name: "Isabella Chen", rating: 5, text: "Every pastry is a work of art. The attention to detail and premium ingredients really shine through.", role: "Pastry Chef" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
  "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop",
];

export function ReviewsGallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <section className="py-24 bg-bakery-bg relative z-10" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 mb-24">
        
        {/* Reviews Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-bakery-chocolate mb-4"
          >
            Love from Our Guests
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-bakery-gold mb-2"
          >
            {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-sm font-semibold tracking-widest uppercase text-bakery-chocolate/50"
          >
            4.9 / 5.0 Google Rating
          </motion.p>
        </div>

        {/* Reviews Infinite Slider */}
        <div className="relative overflow-hidden w-full -mx-4 px-4 md:mx-0 md:px-0">
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-bakery-bg to-transparent z-10 hidden md:block" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-bakery-bg to-transparent z-10 hidden md:block" />
          
          <div className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[...reviews, ...reviews].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + (i % 4) * 0.1 }}
                className="min-w-[260px] md:min-w-[420px] bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-bakery-pink/10 border border-bakery-pink/5 snap-center flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-bakery-gold/20 w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-4" />
                  <p className="font-subheading text-lg md:text-xl text-bakery-chocolate italic mb-4 md:mb-6 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 md:gap-4 border-t border-bakery-chocolate/10 pt-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bakery-section flex items-center justify-center font-heading text-lg md:text-xl text-bakery-chocolate font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm md:text-base text-bakery-chocolate">{review.name}</h4>
                    <p className="font-sans text-[10px] md:text-xs text-bakery-chocolate/60">{review.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 md:gap-1 text-bakery-gold">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={12} className="md:w-3.5 md:h-3.5" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto px-6 md:px-12 pt-16 border-t border-bakery-pink/20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-heading text-4xl md:text-5xl text-bakery-chocolate font-bold mb-2"
            >
              The Patisserie Gallery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-subheading text-lg text-bakery-chocolate/70 italic"
            >
              Follow us @lartisanbakery
            </motion.p>
          </div>
        </div>

        {/* Pinterest Style Grid */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.15 }}
              className="relative overflow-hidden rounded-3xl group break-inside-avoid cursor-pointer shadow-lg shadow-bakery-pink/10 hover-target"
            >
              <div className="absolute inset-0 bg-bakery-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
              <img 
                src={src} 
                alt="Bakery gallery"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
