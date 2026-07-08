"use client";

import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { submitCheckout } from "@/app/actions/checkout";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = getSubtotal() + Math.round(getSubtotal() * 0.05) + (getSubtotal() > 1000 ? 0 : 50);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get("name") as string,
      customerEmail: formData.get("email") as string,
      customerPhone: formData.get("phone") as string,
      address: formData.get("address") as string,
      totalAmount: total,
      items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.numericPrice }))
    };

    const res = await submitCheckout(data);
    if (res.success) {
      setStatus("success");
      clearCart();
    } else {
      setStatus("error");
      setErrorMsg(res.error || "Checkout failed");
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-bakery-bg flex flex-col font-sans selection:bg-[#DE9BA9] selection:text-white pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 flex-grow">
        
        {/* Header */}
        <div className="mb-12 mt-10">
          <h1 className="font-heading text-4xl md:text-6xl text-bakery-chocolate">
            {status === "success" ? "Order Confirmed" : isCheckout ? "Checkout" : "Your Cart"}
          </h1>
          <p className="font-subheading text-bakery-gold text-lg md:text-xl mt-2 italic">
            {status === "success" ? "Thank you for your order!" : isCheckout ? "Complete your order details" : "Review your sweet selections"}
          </p>
        </div>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-20 bg-green-50 rounded-3xl border border-green-200 shadow-sm"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-md mb-6 text-green-600">
              <CheckCircle size={48} />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-bakery-chocolate mb-4">Your order is on the way!</h2>
            <p className="font-sans text-bakery-chocolate/60 max-w-md mx-auto mb-8">
              We've received your order and our bakers are preparing it fresh for you.
            </p>
            <Link href="/menu">
              <button className="bg-bakery-chocolate text-white px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest shadow-md hover:bg-bakery-gold transition-colors">
                Back to Menu
              </button>
            </Link>
          </motion.div>
        ) : items.length === 0 ? (
          // Empty State
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-20 bg-white/50 rounded-3xl border border-bakery-pink/20 shadow-sm"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-bakery-chocolate/30">
              <ShoppingCart size={40} />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-bakery-chocolate mb-4">Your Cart is Empty</h2>
            <p className="font-sans text-bakery-chocolate/60 max-w-md mx-auto mb-8">
              Looks like you haven't added any sweet treats to your cart yet.
            </p>
            <Link href="/menu">
              <button className="bg-[#DE9BA9] text-white px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest shadow-md hover:bg-bakery-chocolate transition-colors">
                Explore Our Menu
              </button>
            </Link>
          </motion.div>
        ) : (
          // Filled Cart State
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {isCheckout ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-md border border-white"
                >
                  <button onClick={() => setIsCheckout(false)} className="flex items-center gap-2 text-bakery-chocolate/60 hover:text-bakery-chocolate mb-6 font-bold transition-colors">
                    <ArrowLeft size={18} /> Back to Cart
                  </button>
                  <form id="checkout-form" onSubmit={handleCheckout} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" name="name" required placeholder="Full Name" className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors" />
                      <input type="email" name="email" required placeholder="Email Address" className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors" />
                      <input type="tel" name="phone" required placeholder="Phone Number" className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors md:col-span-2" />
                      <textarea name="address" required placeholder="Delivery Address" rows={3} className="w-full bg-bakery-bg border border-bakery-pink/30 rounded-2xl px-6 py-4 text-bakery-chocolate focus:outline-none focus:border-[#DE9BA9] transition-colors md:col-span-2 resize-none" />
                    </div>
                    {status === "error" && <p className="text-red-500 font-sans">{errorMsg}</p>}
                  </form>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: -50 }}
                      className="flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 bg-white rounded-3xl shadow-md border border-white hover:border-bakery-pink/30 transition-colors"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-sm"
                      />
                      
                      <div className="flex-grow text-center sm:text-left flex flex-col justify-between h-full">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-bakery-gold mb-1">{item.category}</p>
                          <h3 className="font-heading text-xl sm:text-2xl text-bakery-chocolate">{item.name}</h3>
                          <p className="font-sans text-bakery-chocolate/60 mt-1">{item.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 sm:gap-8 mt-4 sm:mt-0">
                        <div className="flex items-center bg-bakery-bg rounded-full p-1 border border-bakery-chocolate/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-bakery-chocolate hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-bold text-bakery-chocolate">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-bakery-chocolate hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <p className="font-heading text-xl text-bakery-chocolate">
                            ₹{item.numericPrice * item.quantity}
                          </p>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-bakery-pink/20 sticky top-32">
                <h2 className="font-heading text-3xl text-bakery-chocolate mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-bakery-chocolate/80 font-sans">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-bakery-chocolate/80 font-sans">
                    <span>Taxes</span>
                    <span className="font-semibold">₹{Math.round(getSubtotal() * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-bakery-chocolate/80 font-sans">
                    <span>Delivery</span>
                    <span className="font-semibold">₹{getSubtotal() > 1000 ? 0 : 50}</span>
                  </div>
                  
                  <div className="h-px w-full bg-bakery-chocolate/10 my-4" />
                  
                  <div className="flex justify-between text-bakery-chocolate font-sans text-xl font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {isCheckout ? (
                  <button form="checkout-form" type="submit" disabled={status === "loading"} className="w-full bg-[#DE9BA9] text-white py-4 rounded-full font-sans font-bold uppercase tracking-widest shadow-lg hover:bg-bakery-chocolate hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none">
                    {status === "loading" ? "Processing..." : "Place Order"}
                  </button>
                ) : (
                  <button onClick={() => setIsCheckout(true)} className="w-full bg-[#DE9BA9] text-white py-4 rounded-full font-sans font-bold uppercase tracking-widest shadow-lg hover:bg-bakery-chocolate hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
