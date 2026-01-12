import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminVillasPage() {
  let villas: any[] = []

  try {
    villas = await prisma.villa.findMany({
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Database error:', error)
    // Continue with empty array if database is not available
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Villas</h1>
          <p className="text-neutral-600">Manage your villa listings</p>
        </div>
        <Button>Add New Villa</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villas.map((villa) => (
          <Card key={villa.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={villa.images[0]?.url || villa.coverImage || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'}
                alt={villa.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {villa.isFeatured && (
                <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Featured
                </div>
              )}
              {!villa.isAvailable && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Unavailable
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{villa.name}</h3>
              <p className="text-sm text-neutral-600 mb-2">{villa.location}</p>
              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                <span>{villa.bedrooms} Bed</span>
                <span>{villa.bathrooms} Bath</span>
                <span>₹{villa.pricePerNight.toLocaleString()}/night</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/villas/${villa.slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">View</Button>
                </Link>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {villas.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-neutral-500 mb-4">No villas found</p>
          <Button>Add Your First Villa</Button>
        </Card>
      )}
    </div>
  )
}

