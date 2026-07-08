"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, ShoppingBag, MessageSquare, Menu as MenuIcon, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Reservations", href: "/admin/reservations", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-[#FDF8F7] flex font-sans text-bakery-chocolate selection:bg-[#DE9BA9] selection:text-white">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-bakery-pink/20 p-4 z-40 flex justify-between items-center shadow-sm">
        <Link href="/admin">
          <h1 className="font-heading text-2xl text-bakery-chocolate leading-none">
            Patisserie
          </h1>
          <span className="text-[10px] font-bold tracking-widest text-bakery-gold uppercase block">Admin Portal</span>
        </Link>
        <Link href="/" className="text-bakery-chocolate/70 hover:text-red-500">
          <LogOut size={20} />
        </Link>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-bakery-pink/20 flex-col fixed h-full z-20">
        <div className="p-8 border-b border-bakery-pink/20">
          <Link href="/admin" className="inline-block">
            <h1 className="font-heading text-4xl text-bakery-chocolate leading-none">
              Patisserie
            </h1>
            <span className="text-xs font-bold tracking-widest text-bakery-gold uppercase mt-2 block">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-[#DE9BA9] text-white shadow-md shadow-[#DE9BA9]/20 font-bold" 
                    : "text-bakery-chocolate/70 hover:bg-bakery-bg hover:text-bakery-chocolate font-medium"
                }`}>
                  <Icon size={20} className={isActive ? "text-white" : "text-bakery-gold"} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-bakery-pink/20">
          <Link href="/">
            <div className="flex items-center gap-4 px-4 py-4 rounded-2xl text-bakery-chocolate/70 hover:bg-bakery-bg hover:text-red-500 font-medium transition-all duration-300">
              <LogOut size={20} />
              Exit Admin
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-bakery-pink/20 z-50 flex justify-around p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1 p-2">
              <Icon size={20} className={isActive ? "text-[#DE9BA9]" : "text-bakery-chocolate/40"} />
              <span className={`text-[10px] font-bold ${isActive ? "text-[#DE9BA9]" : "text-bakery-chocolate/40"}`}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative pt-20 md:pt-0 pb-24 md:pb-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        <div className="p-6 md:p-10 relative z-10 h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
