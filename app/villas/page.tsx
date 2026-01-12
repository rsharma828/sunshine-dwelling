import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import VillaCard from '@/components/villa/VillaCard'
import VillaFilters from '@/components/villa/VillaFilters'

export const metadata = {
  title: 'Luxury Villas in Goa | Browse Our Collection',
  description: 'Discover our curated collection of luxury villas in Goa. Find the perfect villa for your dream vacation.',
}

export const dynamic = 'force-dynamic'

export default async function VillasPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined
  const bedrooms = searchParams.bedrooms ? parseInt(searchParams.bedrooms) : undefined
  const location = searchParams.location
  const guests = searchParams.guests ? parseInt(searchParams.guests) : undefined

  const where: any = {
    isAvailable: true,
  }

  if (minPrice || maxPrice) {
    where.pricePerNight = {}
    if (minPrice) where.pricePerNight.gte = minPrice
    if (maxPrice) where.pricePerNight.lte = maxPrice
  }

  if (bedrooms) {
    where.bedrooms = { gte: bedrooms }
  }

  if (location) {
    where.location = { contains: location, mode: 'insensitive' }
  }

  if (guests) {
    where.maxGuests = { gte: guests }
  }

  const villas = await prisma.villa.findMany({
    where,
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    orderBy: searchParams.sort === 'price-low' 
      ? { pricePerNight: 'asc' }
      : searchParams.sort === 'price-high'
      ? { pricePerNight: 'desc' }
      : { createdAt: 'desc' },
  })

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Luxury Villas in Goa
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mb-4">
            Discover our curated collection of premium villas, each offering unique experiences and world-class amenities.
          </p>
          {(searchParams.location || searchParams.checkIn || searchParams.checkOut) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-neutral-500">Search results for:</span>
              {searchParams.location && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  📍 {searchParams.location}
                </span>
              )}
              {searchParams.checkIn && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  📅 Check-in: {new Date(searchParams.checkIn).toLocaleDateString()}
                </span>
              )}
              {searchParams.checkOut && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  📅 Check-out: {new Date(searchParams.checkOut).toLocaleDateString()}
                </span>
              )}
              {searchParams.guests && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  👥 {searchParams.guests} {parseInt(searchParams.guests) === 1 ? 'Guest' : 'Guests'}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Suspense fallback={
              <div className="space-y-4">
                <div className="p-6 border border-neutral-200 rounded-lg animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-24 mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-neutral-200 rounded w-16"></div>
                    <div className="h-10 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-20"></div>
                    <div className="h-10 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-16"></div>
                    <div className="h-10 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            }>
              <VillaFilters />
            </Suspense>
          </aside>

          {/* Villa Grid */}
          <main className="lg:col-span-3">
            {villas.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-neutral-600 mb-4">No villas found matching your criteria.</p>
                <p className="text-neutral-500">Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-neutral-600">
                    {villas.length} {villas.length === 1 ? 'villa' : 'villas'} found
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {villas.map((villa) => (
                    <VillaCard key={villa.id} villa={villa} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

