import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ImageGallery from '@/components/villa/ImageGallery'
import BookingCard from '@/components/villa/BookingCard'
import SimilarVillas from '@/components/villa/SimilarVillas'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const villa = await prisma.villa.findUnique({
    where: { slug: params.slug },
    select: { name: true, tagline: true, metaTitle: true, metaDescription: true },
  })

  if (!villa) return {}

  return {
    title: villa.metaTitle || `${villa.name} - Luxury Villa in Goa`,
    description: villa.metaDescription || villa.tagline,
  }
}

export default async function VillaDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const villa = await prisma.villa.findUnique({
    where: { slug: params.slug },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!villa) notFound()

  return (
    <div className="pt-20">
      {/* Image Gallery */}
      <div className="h-[70vh] relative">
        <ImageGallery images={villa.images.length > 0 ? villa.images : [{ url: villa.coverImage, alt: villa.name, id: 'cover', order: 0 }]} />
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">{villa.name}</h1>
                  <p className="text-lg text-neutral-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {villa.location}
                  </p>
                </div>
                {villa.isFeatured && <Badge variant="primary">Featured</Badge>}
              </div>
              <p className="text-xl text-neutral-700">{villa.tagline}</p>
            </div>

            {/* Quick Facts */}
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">{villa.bedrooms}</div>
                  <div className="text-sm text-neutral-600">Bedrooms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">{villa.bathrooms}</div>
                  <div className="text-sm text-neutral-600">Bathrooms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">{villa.maxGuests}</div>
                  <div className="text-sm text-neutral-600">Max Guests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 mb-1">₹{villa.pricePerNight.toLocaleString()}</div>
                  <div className="text-sm text-neutral-600">Per Night</div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4">About this Villa</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{villa.description}</p>
              </div>
            </div>

            {/* Highlights */}
            {villa.highlights && villa.highlights.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {villa.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {villa.amenities && villa.amenities.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">Amenities</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {villa.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* House Rules */}
            {villa.houseRules && villa.houseRules.length > 0 && (
              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">House Rules</h2>
                <ul className="space-y-2">
                  {villa.houseRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-neutral-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location */}
            <div>
              <h2 className="font-serif text-3xl font-bold mb-4">Location</h2>
              <Card className="p-6">
                <p className="text-neutral-700 mb-4">{villa.address}</p>
                {villa.latitude && villa.longitude ? (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${villa.latitude},${villa.longitude}`}
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <p className="text-neutral-500">Map not available</p>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard villa={villa} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Villas */}
      <div className="bg-neutral-50 py-16">
        <div className="container-custom">
          <SimilarVillas currentVillaId={villa.id} />
        </div>
      </div>
    </div>
  )
}

