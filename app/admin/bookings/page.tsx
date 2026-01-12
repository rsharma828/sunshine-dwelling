import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      villa: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Bookings</h1>
        <p className="text-neutral-600">Manage all bookings</p>
      </div>

      <Card className="p-6">
        {bookings.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Booking Ref</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Villa</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Check-in</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Check-out</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Nights</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Total Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-sm font-medium">{booking.bookingRef}</td>
                    <td className="py-3 px-4 text-sm">{booking.guestName}</td>
                    <td className="py-3 px-4 text-sm">{booking.villa.name}</td>
                    <td className="py-3 px-4 text-sm">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm">{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm">{booking.nights}</td>
                    <td className="py-3 px-4 text-sm">₹{booking.totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-neutral-100 text-neutral-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

