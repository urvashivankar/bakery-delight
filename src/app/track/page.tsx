"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Clock, CheckCircle, ChefHat, AlertCircle } from "lucide-react";
import { trackOrder } from "@/app/actions/track";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    const res = await trackOrder(orderId.trim());
    if (res.success) {
      setOrder(res.data);
    } else {
      setError(res.error || "Failed to track order.");
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-12 h-12 text-yellow-500 mb-4" />;
      case "PREPARING": return <ChefHat className="w-12 h-12 text-blue-500 mb-4" />;
      case "COMPLETED": return <CheckCircle className="w-12 h-12 text-green-500 mb-4" />;
      default: return <Package className="w-12 h-12 text-gray-500 mb-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING": return "We've received your order and are reviewing it.";
      case "PREPARING": return "Our pâtissiers are handcrafting your order.";
      case "COMPLETED": return "Your order is ready or has been delivered!";
      default: return "Order cancelled or status unknown.";
    }
  };

  return (
    <div className="min-h-screen bg-bakery-bg pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-6xl text-bakery-chocolate mb-4"
          >
            Track Your Order
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-bakery-chocolate/70"
          >
            Enter the Order ID you received after checkout to see the live status.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-bakery-pink/20"
        >
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bakery-chocolate/40" size={20} />
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. clzj..."
                className="w-full pl-12 pr-6 py-4 rounded-full bg-bakery-section/30 border border-bakery-pink/30 focus:border-[#DE9BA9] focus:bg-white focus:outline-none transition-all font-sans"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="py-4 px-8 rounded-full bg-[#DE9BA9] text-white font-sans font-bold tracking-wide hover:bg-bakery-chocolate transition-colors whitespace-nowrap shadow-md disabled:opacity-50"
            >
              {loading ? "SEARCHING..." : "TRACK ORDER"}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 font-sans overflow-hidden"
              >
                <AlertCircle size={20} />
                <p>{error}</p>
              </motion.div>
            )}

            {order && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-bakery-bg/50 rounded-3xl p-8 border border-bakery-pink/10 text-center"
              >
                <div className="flex justify-center">
                  {getStatusIcon(order.status)}
                </div>
                
                <h3 className="font-heading text-3xl text-bakery-chocolate mb-2">
                  Status: <span className="text-[#DE9BA9]">{order.status}</span>
                </h3>
                
                <p className="font-sans text-bakery-chocolate/70 mb-8 max-w-md mx-auto">
                  {getStatusText(order.status)}
                </p>

                <div className="bg-white rounded-2xl p-6 text-left border border-bakery-pink/20 shadow-sm">
                  <div className="flex justify-between items-end mb-4 pb-4 border-b border-bakery-pink/20">
                    <div>
                      <p className="font-sans text-xs text-bakery-chocolate/50 uppercase tracking-widest mb-1">Order for</p>
                      <p className="font-bold text-bakery-chocolate">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-xs text-bakery-chocolate/50 uppercase tracking-widest mb-1">Total</p>
                      <p className="font-bold text-bakery-gold">₹{order.totalAmount}</p>
                    </div>
                  </div>
                  
                  <div className="font-sans text-sm text-bakery-chocolate/80">
                    <p className="text-xs text-bakery-chocolate/50 uppercase tracking-widest mb-2">Items</p>
                    <ul className="space-y-1">
                      {JSON.parse(order.items).map((item: any, i: number) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
