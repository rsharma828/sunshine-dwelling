import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
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
        <h1 className="font-serif text-3xl font-bold mb-2">Inquiries</h1>
        <p className="text-neutral-600">Manage guest inquiries</p>
      </div>

      <Card className="p-6">
        {inquiries.length === 0 ? (
          <p className="text-neutral-500 text-center py-8">No inquiries yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Guest</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Villa</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Check-in</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Check-out</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Guests</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4 text-sm font-medium">{inquiry.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <a href={`mailto:${inquiry.email}`} className="text-primary-600 hover:underline">
                        {inquiry.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <a href={`tel:${inquiry.phone}`} className="text-primary-600 hover:underline">
                        {inquiry.phone}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Link href={`/villas/${inquiry.villa.slug}`} className="text-primary-600 hover:underline">
                        {inquiry.villa.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm">{new Date(inquiry.checkIn).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm">{new Date(inquiry.checkOut).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm">{inquiry.guests}</td>
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

