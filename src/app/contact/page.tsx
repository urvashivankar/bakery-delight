"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { submitContactMessage } from "@/app/actions/forms";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const res = await submitContactMessage(formData);
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
            Say Hello
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-subheading text-xl md:text-2xl text-bakery-gold italic max-w-2xl mx-auto"
          >
            We’d love to hear from you. Drop by for a fresh croissant or send us a message!
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-32 bg-bakery-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-bakery-pink/20 relative overflow-hidden flex flex-col lg:flex-row gap-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-pink/20 rounded-full blur-[80px]" />
            
            {/* Contact Info */}
            <div className="lg:w-1/3 relative z-10 flex flex-col gap-10">
              <div>
                <h3 className="font-heading text-3xl text-bakery-chocolate mb-8 font-bold">Get In Touch</h3>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#DE9BA9]/10 flex items-center justify-center text-[#DE9BA9] shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-bakery-chocolate text-lg">Visit Us</h4>
                      <p className="font-sans text-bakery-chocolate/70">vadodara<br/>gujrat, india</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#DE9BA9]/10 flex items-center justify-center text-[#DE9BA9] shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-bakery-chocolate text-lg">Call Us</h4>
                      <p className="font-sans text-bakery-chocolate/70">9510972650</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#DE9BA9]/10 flex items-center justify-center text-[#DE9BA9] shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-bakery-chocolate text-lg">Email</h4>
                      <p className="font-sans text-bakery-chocolate/70">urvasshiparmar1603@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#DE9BA9]/10 flex items-center justify-center text-[#DE9BA9] shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-bakery-chocolate text-lg">Opening Hours</h4>
                      <p className="font-sans text-bakery-chocolate/70">Mon - Fri: 8am - 8pm<br/>Sat - Sun: 9am - 9pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 relative z-10">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full gap-4"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl text-bakery-chocolate font-bold">Message Sent!</h3>
                  <p className="font-sans text-bakery-chocolate/70">{message}</p>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-[#DE9BA9] font-bold hover:underline">Send another message</button>
                </motion.div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Your Name" 
                      className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                    />
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Email Address" 
                      className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                    />
                  </div>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    placeholder="Subject" 
                    className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors"
                  />
                  <textarea 
                    name="message"
                    required
                    placeholder="Your Message" 
                    rows={6}
                    className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors resize-none"
                  />
                  {status === "error" && <p className="text-red-500 font-sans">{message}</p>}
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="bg-[#DE9BA9] text-white px-8 py-5 rounded-full font-sans font-bold uppercase tracking-widest shadow-md hover:bg-bakery-chocolate hover:-translate-y-1 transition-all w-full md:w-auto self-start disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
                  >
                    {status === "loading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : "Send Message"}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] md:h-[500px] w-full relative bg-bakery-section/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221669!2d73.17308625!3d22.32210265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1714493123456!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale-[0.8] contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        ></iframe>
      </section>
    </main>
  );
}
