"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="footer" className="bg-white pt-16 pb-8 md:pt-32 md:pb-12 relative overflow-hidden border-t border-bakery-pink/20">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-bakery-pink/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-bakery-bg rounded-[2rem] md:rounded-[3rem] p-6 sm:p-12 md:p-16 mb-16 md:mb-24 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 border border-bakery-pink/20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h3 className="font-heading text-3xl md:text-5xl text-bakery-chocolate font-bold mb-4">
              Join Our Sweet Club
            </h3>
            <p className="font-sans text-base md:text-lg text-bakery-chocolate/70">
              Subscribe and receive 10% OFF your first custom cake order.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <form className="flex flex-col sm:flex-row w-full gap-4 sm:gap-0 sm:relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full bg-white border border-bakery-pink/30 rounded-full px-6 sm:px-8 py-4 sm:py-5 sm:pr-40 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors font-sans text-sm sm:text-base"
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-2 sm:bottom-2 bg-[#DE9BA9] text-white py-4 sm:py-0 px-8 rounded-full font-sans font-bold uppercase tracking-widest shadow-md hover:bg-bakery-chocolate transition-colors hover-target text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 hover-target w-fit">
              <div className="w-12 h-12 rounded-full bg-[#DE9BA9] flex items-center justify-center text-white font-heading font-bold text-2xl shadow-md">
                L
              </div>
              <span className="font-heading font-bold text-3xl tracking-wide text-bakery-chocolate">
                L'Artisan
              </span>
            </Link>
            <p className="font-sans text-bakery-chocolate/70 leading-relaxed text-sm">
              A premium luxury French bakery offering handcrafted desserts, custom cakes, and artisanal pastries made with the finest ingredients.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-bakery-bg flex items-center justify-center text-bakery-chocolate hover:bg-[#DE9BA9] hover:text-white transition-colors hover-target shadow-sm">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bakery-bg flex items-center justify-center text-bakery-chocolate hover:bg-[#DE9BA9] hover:text-white transition-colors hover-target shadow-sm">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-bakery-bg flex items-center justify-center text-bakery-chocolate hover:bg-[#DE9BA9] hover:text-white transition-colors hover-target shadow-sm">
                <FaPinterestP size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-sm tracking-[0.2em] uppercase text-bakery-chocolate font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="font-sans text-bakery-chocolate/70 hover:text-[#DE9BA9] transition-colors hover-target text-sm">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="font-sans text-bakery-chocolate/70 hover:text-[#DE9BA9] transition-colors hover-target text-sm">Our Menu</Link>
              </li>
              <li>
                <Link href="/cakes" className="font-sans text-bakery-chocolate/70 hover:text-[#DE9BA9] transition-colors hover-target text-sm">Custom Cakes</Link>
              </li>
              <li>
                <Link href="/reservation" className="font-sans text-bakery-chocolate/70 hover:text-[#DE9BA9] transition-colors hover-target text-sm">Reservations</Link>
              </li>
              <li>
                <Link href="/contact" className="font-sans text-bakery-chocolate/70 hover:text-[#DE9BA9] transition-colors hover-target text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-sm tracking-[0.2em] uppercase text-bakery-chocolate font-bold mb-8">Contact Us</h4>
            <ul className="space-y-4 font-sans text-bakery-chocolate/70 text-sm">
              <li>vadodara</li>
              <li>gujrat, india</li>
              <li className="pt-2 text-[#DE9BA9] font-semibold">9510972650</li>
              <li className="text-[#DE9BA9] font-semibold">urvasshiparmar1603@gmail.com</li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-sans text-sm tracking-[0.2em] uppercase text-bakery-chocolate font-bold mb-8">Opening Hours</h4>
            <ul className="space-y-4 font-sans text-bakery-chocolate/70 text-sm">
              <li className="flex justify-between border-b border-bakery-pink/20 pb-2">
                <span>Mon - Fri</span> 
                <span className="font-medium text-bakery-chocolate">07:00 - 20:00</span>
              </li>
              <li className="flex justify-between border-b border-bakery-pink/20 pb-2">
                <span>Saturday</span> 
                <span className="font-medium text-bakery-chocolate">08:00 - 21:00</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sunday</span> 
                <span className="font-bold text-[#DE9BA9]">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-bakery-pink/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-bakery-chocolate/50">
            © {new Date().getFullYear()} L'Artisan Bakery. All rights reserved.
          </p>
          <div className="flex gap-8 font-sans text-sm text-bakery-chocolate/50">
            <Link href="#" className="hover:text-[#DE9BA9] hover-target transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#DE9BA9] hover-target transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
