import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function AdminDashboardPage() {
  const stats = {
    totalVillas: await prisma.villa.count(),
    availableVillas: await prisma.villa.count({ where: { isAvailable: true } }),
    totalInquiries: await prisma.inquiry.count(),
    pendingInquiries: await prisma.inquiry.count({ where: { status: 'PENDING' } }),
    totalBookings: await prisma.booking.count(),
  }

  const recentInquiries = await prisma.inquiry.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      villa: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-neutral-600">Welcome to the admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className="p-6">
          <div className="text-2xl font-bold text-primary-600 mb-1">{stats.totalVillas}</div>
          <div className="text-sm text-neutral-600">Total Villas</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.availableVillas}</div>
          <div className="text-sm text-neutral-600">Available</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalInquiries}</div>
          <div className="text-sm text-neutral-600">Total Inquiries</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats.pendingInquiries}</div>
          <div className="text-sm text-neutral-600">Pending</div>
        </Card>
        <Card className="p-6">
          <div className="text-2xl font-bold text-purple-600 mb-1">{stats.totalBookings}</div>
          <div className="text-sm text-neutral-600">Bookings</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/villas">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2">Manage Villas</h3>
            <p className="text-sm text-neutral-600">View, add, or edit villa listings</p>
          </Card>
        </Link>
        <Link href="/admin/inquiries">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2">View Inquiries</h3>
            <p className="text-sm text-neutral-600">Manage guest inquiries and bookings</p>
          </Card>
        </Link>
        <Link href="/admin/bookings">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-2">Bookings</h3>
            <p className="text-sm text-neutral-600">View and manage all bookings</p>
          </Card>
        </Link>
      </div>

      {/* Recent Inquiries */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Recent Inquiries</h2>
          <Link href="/admin/inquiries">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">No inquiries yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Villa</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Dates</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-sm">{inquiry.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <Link href={`/villas/${inquiry.villa.slug}`} className="text-primary-600 hover:underline">
                        {inquiry.villa.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(inquiry.checkIn).toLocaleDateString()} - {new Date(inquiry.checkOut).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                        inquiry.status === 'CONTACTED' ? 'bg-blue-100 text-blue-700' :
                        inquiry.status === 'CONVERTED' ? 'bg-green-100 text-green-700' :
                        'bg-neutral-100 text-neutral-700'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-neutral-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
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

