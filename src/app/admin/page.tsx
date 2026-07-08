import { getDashboardStats } from "@/app/actions/admin";
import { DollarSign, ShoppingBag, CalendarDays } from "lucide-react";
import { OrderStatusDropdown } from "@/components/admin/OrderStatusDropdown";

export const metadata = {
  title: "Admin Dashboard | Patisserie",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { stats, recentOrders } = await getDashboardStats();

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-100 text-green-600" },
    { title: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
    { title: "Reservations", value: stats.reservations, icon: CalendarDays, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <>
      <header className="mb-10">
        <h2 className="font-heading text-4xl text-bakery-chocolate">Dashboard Overview</h2>
        <p className="font-sans text-bakery-chocolate/60 mt-2">Welcome back to the admin portal.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-md border border-bakery-pink/20 flex items-center gap-6 hover:-translate-y-1 transition-transform duration-300">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon size={28} />
              </div>
              <div>
                <p className="font-sans text-bakery-chocolate/60 text-sm font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                <h3 className="font-heading text-3xl text-bakery-chocolate">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl shadow-md border border-bakery-pink/20 p-8 flex-grow">
        <h3 className="font-heading text-2xl text-bakery-chocolate mb-6 border-b border-bakery-pink/10 pb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-bakery-chocolate/50 font-sans italic">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="text-bakery-chocolate/50 uppercase tracking-widest border-b border-bakery-pink/10">
                  <th className="pb-4 font-bold">Order ID</th>
                  <th className="pb-4 font-bold">Customer</th>
                  <th className="pb-4 font-bold">Total</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-bakery-chocolate divide-y divide-bakery-pink/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-bakery-bg/50 transition-colors">
                    <td className="py-5 font-mono text-xs">{order.id.split('-')[0]}...</td>
                    <td className="py-5 font-medium">{order.customerName}</td>
                    <td className="py-5 font-bold text-bakery-gold">₹{order.totalAmount}</td>
                    <td className="py-5">
                      <OrderStatusDropdown id={order.id} currentStatus={order.status} />
                    </td>
                    <td className="py-5 text-right text-bakery-chocolate/60">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
