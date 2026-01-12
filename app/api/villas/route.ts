import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'

    const where: any = {
      isAvailable: true,
    }

    if (featured) {
      where.isFeatured = true
    }

    const villas = await prisma.villa.findMany({
      where,
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: featured ? 6 : 100,
    })

    return NextResponse.json({ villas })
  } catch (error) {
    console.error('Error fetching villas:', error)
    return NextResponse.json(
      { error: 'Failed to fetch villas' },
      { status: 500 }
    )
  }
}

