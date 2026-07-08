"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu as MenuIcon, X } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      key={pathname}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 w-full"
    >
      {/* Top Pink Bar */}
      <div className="w-full bg-[#DE9BA9] text-white px-6 md:px-12 py-2 flex justify-between items-center text-xs font-sans tracking-wide">
        <div className="flex items-center gap-4 font-medium">
          <span>Contact us +91 9510972650</span>
        </div>

        <div className="hidden md:flex items-center gap-6 font-medium">
          <span>Free delivery on orders above ₹1000</span>
        </div>
      </div>

      {/* Main White Navbar */}
      <div className="relative w-full bg-white h-20 md:h-24 flex items-center justify-between md:grid md:grid-cols-3 px-6 md:px-10 lg:px-16 shadow-[0_4px_20px_rgba(222,155,169,0.15)]">
        
        {/* SVG Decorative Center Curve */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[450px] h-[80px] overflow-hidden pointer-events-none drop-shadow-[0_8px_15px_rgba(222,155,169,0.12)] z-0 hidden md:block">
          <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="w-full h-full text-white fill-current">
            <path d="M0,0 C80,0 120,70 200,70 C280,70 320,0 400,0 L400,-10 L0,-10 Z" />
          </svg>
        </div>

        {/* Desktop Links (Left) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 justify-start z-10 overflow-visible">
          {["HOME", "MENU", "CAKES", "TRACK"].map((item) => (
            <Link 
              key={item} 
              href={item === "HOME" ? "/" : item === "TRACK" ? "/track" : `/${item.toLowerCase()}`}
              className="font-sans font-extrabold text-bakery-chocolate tracking-[0.25em] text-[11px] lg:text-[13px] hover:text-[#DE9BA9] transition-colors hover-target whitespace-nowrap"
            >
              {item === "TRACK" ? "TRACK ORDER" : item}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex flex-col items-center justify-center z-20 hover-target cursor-pointer relative md:-top-1">
          <Link href="/">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-bakery-chocolate leading-none">
              Patisserie
            </h1>
          </Link>
          {/* Decorative hearts matching the reference */}
          <span className="absolute -left-6 lg:-left-8 top-[35%] text-[#DE9BA9] text-sm hidden md:block">♥</span>
          <span className="absolute -right-6 lg:-right-8 top-[35%] text-[#DE9BA9] text-sm hidden md:block">♥</span>
        </div>

        {/* Desktop Links (Right) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 justify-end z-10 overflow-visible">
          <Link 
            href="#footer"
            className="font-sans font-extrabold text-bakery-chocolate tracking-[0.25em] text-[11px] lg:text-[13px] hover:text-[#DE9BA9] transition-colors hover-target whitespace-nowrap"
          >
            CONTACT
          </Link>
          <div className="flex items-center gap-4 lg:gap-6 ml-2">
            <Link href="/cart">
              <button className="relative text-bakery-chocolate hover:text-[#DE9BA9] transition-colors hover-target">
                <ShoppingCart size={24} strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 bg-bakery-chocolate text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {mounted ? totalItems : 0}
                </span>
              </button>
            </Link>
            <Link href="/reservation">
              <button className="bg-[#DE9BA9] text-white px-5 py-2.5 lg:px-6 lg:py-2.5 rounded-full font-sans font-bold text-[10px] lg:text-[11px] uppercase tracking-widest shadow-md hover:bg-bakery-chocolate hover:-translate-y-0.5 transition-all hover-target whitespace-nowrap">
                Reservation
              </button>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden z-20 text-bakery-chocolate ml-auto">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[116px] left-0 w-full bg-white shadow-xl flex flex-col items-center py-8 gap-6 md:hidden z-10 border-t border-bakery-pink/10"
        >
          {["HOME", "MENU", "CAKES", "TRACK", "CONTACT", "RESERVATION"].map((item) => (
            <Link
              key={item}
              href={item === "HOME" ? "/" : item === "CONTACT" ? "#footer" : `/${item.toLowerCase()}`}
              className="font-sans font-extrabold text-bakery-chocolate tracking-[0.25em] text-lg hover:text-[#DE9BA9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item === "TRACK" ? "TRACK ORDER" : item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
