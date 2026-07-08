import { getOrders } from "@/app/actions/admin";
import { OrderStatusDropdown } from "@/components/admin/OrderStatusDropdown";

export const metadata = {
  title: "Orders | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminOrders() {
  const orders = await getOrders();

  return (
    <>
      <header className="mb-10">
        <h2 className="font-heading text-4xl text-bakery-chocolate">All Orders</h2>
        <p className="font-sans text-bakery-chocolate/60 mt-2">Manage customer orders and deliveries.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-md border border-bakery-pink/20 p-8 flex-grow">
        {orders.length === 0 ? (
          <p className="text-bakery-chocolate/50 font-sans italic py-10 text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="text-bakery-chocolate/50 uppercase tracking-widest border-b border-bakery-pink/10">
                  <th className="pb-4 font-bold">Order Details</th>
                  <th className="pb-4 font-bold">Customer</th>
                  <th className="pb-4 font-bold">Items</th>
                  <th className="pb-4 font-bold">Total</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-bakery-chocolate divide-y divide-bakery-pink/5">
                {orders.map((order) => {
                  const items = JSON.parse(order.items);
                  return (
                    <tr key={order.id} className="hover:bg-bakery-bg/50 transition-colors">
                      <td className="py-5">
                        <p className="font-mono text-xs text-bakery-chocolate/50 mb-1">ID: {order.id}</p>
                      </td>
                      <td className="py-5">
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-bakery-chocolate/60">{order.customerEmail}</p>
                        <p className="text-xs text-bakery-chocolate/60">{order.customerPhone}</p>
                      </td>
                      <td className="py-5">
                        <ul className="text-xs text-bakery-chocolate/80 list-disc pl-4 space-y-1">
                          {items.map((i: any, idx: number) => (
                            <li key={idx}>{i.quantity}x {i.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-5 font-bold text-bakery-gold">₹{order.totalAmount}</td>
                      <td className="py-5">
                        <OrderStatusDropdown id={order.id} currentStatus={order.status} />
                      </td>
                      <td className="py-5 text-right text-bakery-chocolate/60">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
