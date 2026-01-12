import { prisma } from '@/lib/prisma'
import VillaCard from './VillaCard'

interface SimilarVillasProps {
  currentVillaId: string
}

export default async function SimilarVillas({ currentVillaId }: SimilarVillasProps) {
  let currentVilla
  let similarVillas: any[] = []

  try {
    currentVilla = await prisma.villa.findUnique({
      where: { id: currentVillaId },
      select: { location: true, pricePerNight: true },
    })

    if (!currentVilla) return null

    similarVillas = await prisma.villa.findMany({
    where: {
      id: { not: currentVillaId },
      isAvailable: true,
      OR: [
        { location: { contains: currentVilla.location.split(',')[0], mode: 'insensitive' } },
        {
          pricePerNight: {
            gte: currentVilla.pricePerNight * 0.7,
            lte: currentVilla.pricePerNight * 1.3,
          },
        },
      ],
    },
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1,
      },
    },
    take: 3,
    })
  } catch (error) {
    console.error('Database error in SimilarVillas:', error)
    return null
  }

  if (similarVillas.length === 0) return null

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold mb-8">Similar Villas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarVillas.map((villa) => (
          <VillaCard key={villa.id} villa={villa} />
        ))}
      </div>
    </div>
  )
}

