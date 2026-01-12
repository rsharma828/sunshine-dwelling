import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface VillaCardProps {
  villa: {
    id: string
    name: string
    slug: string
    tagline: string
    location: string
    pricePerNight: number
    bedrooms: number
    bathrooms: number
    maxGuests: number
    isFeatured: boolean
    coverImage: string
    images: Array<{ url: string; alt: string }>
  }
}

export default function VillaCard({ villa }: VillaCardProps) {
  const imageUrl = villa.images?.[0]?.url || villa.coverImage || 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'

  return (
    <Link href={`/villas/${villa.slug}`}>
      <Card className="group cursor-pointer h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={villa.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {villa.isFeatured && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary">Featured</Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-2">
            <h3 className="font-serif text-2xl font-bold mb-1 group-hover:text-primary-600 transition-colors">
              {villa.name}
            </h3>
            <p className="text-sm text-neutral-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {villa.location}
            </p>
          </div>

          <p className="text-neutral-600 mb-4 line-clamp-2 flex-1">{villa.tagline}</p>

          <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{villa.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{villa.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{villa.maxGuests} Guests</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div>
              <span className="text-2xl font-bold text-primary-600">₹{villa.pricePerNight.toLocaleString()}</span>
              <span className="text-neutral-500 text-sm">/night</span>
            </div>
            <span className="text-primary-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}

