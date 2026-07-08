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
      <div className="relative w-full bg-white h-24 md:h-28 grid grid-cols-3 items-center px-4 md:px-10 lg:px-16 shadow-[0_4px_20px_rgba(222,155,169,0.15)]">

        {/* SVG Decorative Center Curve */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] sm:w-[320px] md:w-[450px] h-[40px] sm:h-[60px] md:h-[80px] overflow-hidden pointer-events-none drop-shadow-[0_8px_15px_rgba(222,155,169,0.12)] z-0 block">
          <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="w-full h-full text-white fill-current">
            <path d="M0,0 C80,0 120,70 200,70 C280,70 320,0 400,0 L400,-10 L0,-10 Z" />
          </svg>
        </div>

        {/* Left Column: Desktop Links or Mobile Toggle */}
        <div className="flex items-center justify-start z-10">
          {/* Desktop Links (Left) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 overflow-visible">
            {["HOME", "MENU", "CAKES"].map((item) => (
              <Link
                key={item}
                href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                className="font-sans font-extrabold text-bakery-chocolate tracking-[0.25em] text-[13px] lg:text-[15px] hover:text-[#DE9BA9] transition-colors hover-target whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </nav>
          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-bakery-chocolate hover-target p-1"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Center Column: Logo */}
        <div className="flex flex-col items-center justify-center z-20 hover-target cursor-pointer relative">
          <Link href="/">
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[76px] text-bakery-chocolate leading-none whitespace-nowrap pt-1">
              Patisserie
            </h1>
          </Link>
          {/* Decorative hearts matching the reference */}
          <span className="absolute -left-8 lg:-left-12 top-[35%] text-[#DE9BA9] text-sm hidden md:block">♥</span>
          <span className="absolute -right-8 lg:-right-12 top-[35%] text-[#DE9BA9] text-sm hidden md:block">♥</span>
        </div>

        {/* Right Column: Desktop Links/Buttons or Mobile Cart */}
        <div className="flex items-center justify-end z-10">
          {/* Desktop Links (Right) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10 overflow-visible">
            <Link
              href="#footer"
              className="font-sans font-extrabold text-bakery-chocolate tracking-[0.25em] text-[13px] lg:text-[15px] hover:text-[#DE9BA9] transition-colors hover-target whitespace-nowrap"
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
                <button className="bg-[#DE9BA9] text-white px-5 py-2.5 lg:px-6 lg:py-2.5 rounded-full font-sans font-bold text-[11px] lg:text-[13px] uppercase tracking-widest shadow-md hover:bg-bakery-chocolate hover:-translate-y-0.5 transition-all hover-target whitespace-nowrap">
                  Reservation
                </button>
              </Link>
            </div>
          </nav>

          {/* Mobile Cart */}
          <div className="md:hidden flex items-center">
            <Link href="/cart">
              <button className="relative text-bakery-chocolate hover:text-[#DE9BA9] transition-colors p-1">
                <ShoppingCart size={24} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 bg-bakery-chocolate text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {mounted ? totalItems : 0}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[116px] left-0 w-full bg-white shadow-xl flex flex-col items-center py-8 gap-6 md:hidden z-10 border-t border-bakery-pink/10"
        >
          {["HOME", "MENU", "CAKES", "CONTACT", "RESERVATION"].map((item) => (
            <Link
              key={item}
              href={item === "HOME" ? "/" : item === "CONTACT" ? "#footer" : `/${item.toLowerCase()}`}
              className="font-sans font-extrabold text-bakery-chocolate tracking-[0.25em] text-lg hover:text-[#DE9BA9] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
