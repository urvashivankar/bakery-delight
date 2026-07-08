import { getReservations } from "@/app/actions/admin";

export const metadata = {
  title: "Reservations | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminReservations() {
  const reservations = await getReservations();

  return (
    <>
      <header className="mb-10">
        <h2 className="font-heading text-4xl text-bakery-chocolate">Reservations</h2>
        <p className="font-sans text-bakery-chocolate/60 mt-2">Manage table bookings and cake consultations.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-md border border-bakery-pink/20 p-8 flex-grow">
        {reservations.length === 0 ? (
          <p className="text-bakery-chocolate/50 font-sans italic py-10 text-center">No reservations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((res) => (
              <div key={res.id} className="border border-bakery-pink/20 p-6 rounded-2xl bg-bakery-bg shadow-sm">
                <div className="flex justify-between items-start mb-4 border-b border-bakery-pink/20 pb-4">
                  <div>
                    <h3 className="font-heading text-2xl text-bakery-chocolate">{res.name}</h3>
                    <p className="font-sans text-sm text-bakery-chocolate/60">{res.email}</p>
                    <p className="font-sans text-sm text-bakery-chocolate/60">{res.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-bakery-gold font-sans text-lg">{res.date}</span>
                    <span className="block font-medium text-bakery-chocolate">{res.time}</span>
                  </div>
                </div>
                <div className="font-sans text-sm text-bakery-chocolate space-y-2">
                  <p><strong className="text-bakery-chocolate/70">Guests:</strong> {res.guests}</p>
                  {res.requests && (
                    <div className="bg-white p-3 rounded-lg border border-bakery-pink/10 mt-2">
                      <strong className="text-bakery-chocolate/70 text-xs block mb-1 uppercase tracking-wider">Requests:</strong> 
                      {res.requests}
                    </div>
                  )}
                </div>
                <p className="text-xs text-bakery-chocolate/40 mt-4 text-right">Booked on: {new Date(res.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
