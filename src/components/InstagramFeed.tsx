"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, MessageCircle } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

const igPosts = [
  { id: 1, img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=800&auto=format&fit=crop", likes: 245, comments: 12 },
  { id: 2, img: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=800&auto=format&fit=crop", likes: 312, comments: 18 },
  { id: 3, img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop", likes: 489, comments: 34 },
  { id: 4, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop", likes: 156, comments: 8 },
  { id: 5, img: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=800&auto=format&fit=crop", likes: 521, comments: 45 },
  { id: 6, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop", likes: 289, comments: 15 },
];

export function InstagramFeed() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 bg-white relative z-10 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 md:px-12 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 mb-4"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-bakery-chocolate">
              <FaInstagram size={22} />
            </div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-bakery-chocolate">
            Follow our sweet journey
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-bakery-chocolate/70 mb-8"
        >
          <a href="#" className="font-bold hover:text-[#DE9BA9] transition-colors">@lartisan.patisserie</a>
        </motion.p>
      </div>

      <div className="relative w-full flex overflow-hidden bg-black/5 py-4">
        <motion.div 
          className="flex gap-4 px-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* Duplicate array for seamless infinite scroll */}
          {[...igPosts, ...igPosts].map((post, index) => (
            <Link href="#" key={`${post.id}-${index}`} className="block group relative w-64 md:w-80 aspect-square overflow-hidden bg-black rounded-3xl shrink-0 shadow-lg">
              <img
                src={post.img}
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-white font-sans font-bold">
                  <Heart fill="currentColor" size={20} />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-sans font-bold">
                  <MessageCircle fill="currentColor" size={20} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
