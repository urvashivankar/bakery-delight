"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitReservation } from "@/app/actions/forms";

export default function ReservationPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const res = await submitReservation(formData);
    if (res.success) {
      setStatus("success");
      setMessage(res.message);
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setMessage(res.message);
    }
  };

  return (
    <main className="min-h-screen bg-bakery-bg flex flex-col font-sans selection:bg-[#DE9BA9] selection:text-white relative">
      
      {/* Page Header */}
      <section className="pt-48 pb-20 relative bg-gradient-to-b from-white to-bakery-bg z-10">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-6xl md:text-8xl text-bakery-chocolate mb-6 drop-shadow-sm"
          >
            Reservations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-subheading text-xl md:text-2xl text-bakery-gold italic max-w-2xl mx-auto"
          >
            Book a table for afternoon tea or schedule a custom cake consultation.
          </motion.p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="pb-32 bg-bakery-bg">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-bakery-pink/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-pink/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DE9BA9]/10 rounded-full blur-[60px]" />
            
            <div className="relative z-10">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center h-full gap-6"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-4xl text-bakery-chocolate font-bold">Booking Confirmed!</h3>
                  <p className="font-sans text-bakery-chocolate/70 text-lg">{message}</p>
                  <p className="font-sans text-bakery-chocolate/60 max-w-sm mx-auto">We look forward to seeing you. A confirmation text has been sent to your phone number.</p>
                  <button onClick={() => setStatus("idle")} className="mt-8 px-8 py-3 bg-[#DE9BA9] text-white rounded-full font-bold uppercase tracking-wider hover:bg-bakery-chocolate transition-colors">Book Another Table</button>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                  
                  {/* Form Group */}
                  <div>
                    <h3 className="font-heading text-2xl text-bakery-chocolate mb-6 font-bold border-b border-bakery-pink/20 pb-4">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Full Name" 
                        className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                      />
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="Phone Number" 
                        className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                      />
                      <input 
                        type="email"
                        name="email"
                        required 
                        placeholder="Email Address" 
                        className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors md:col-span-2"
                      />
                    </div>
                  </div>

                  {/* Form Group */}
                  <div>
                    <h3 className="font-heading text-2xl text-bakery-chocolate mb-6 font-bold border-b border-bakery-pink/20 pb-4">Booking Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <select name="type" required defaultValue="" className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors appearance-none cursor-pointer">
                        <option value="" disabled>Reservation Type</option>
                        <option value="table">Table Reservation (Afternoon Tea)</option>
                        <option value="cake">Custom Cake Consultation</option>
                        <option value="event">Private Event</option>
                      </select>
                      
                      <select name="guests" required defaultValue="" className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors appearance-none cursor-pointer">
                        <option value="" disabled>Number of Guests</option>
                        <option value="1-2">1 - 2 People</option>
                        <option value="3-4">3 - 4 People</option>
                        <option value="5-8">5 - 8 People</option>
                        <option value="9+">9+ People</option>
                      </select>

                      <input 
                        type="date"
                        name="date"
                        required 
                        className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                      />
                      <input 
                        type="time" 
                        name="time"
                        required
                        className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Form Group */}
                  <div>
                    <h3 className="font-heading text-2xl text-bakery-chocolate mb-6 font-bold border-b border-bakery-pink/20 pb-4">Special Requests</h3>
                    <textarea 
                      name="requests"
                      placeholder="Any allergies, dietary requirements, or specific requests for your custom cake?" 
                      rows={4}
                      className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors resize-none"
                    />
                  </div>
                  
                  {status === "error" && <p className="text-red-500 font-sans">{message}</p>}

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="bg-[#DE9BA9] text-white px-12 py-5 rounded-full font-sans font-bold uppercase tracking-widest shadow-md hover:bg-bakery-chocolate hover:-translate-y-1 transition-all w-full mt-4 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : "Confirm Reservation"}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
}
