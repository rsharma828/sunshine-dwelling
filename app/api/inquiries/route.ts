import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, checkIn, checkOut, guests, message, specialRequests, villaId } = body

    // Validation
    if (!name || !email || !phone || !checkIn || !checkOut || !guests || !villaId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if villa exists
    const villa = await prisma.villa.findUnique({
      where: { id: villaId },
    })

    if (!villa) {
      return NextResponse.json(
        { error: 'Villa not found' },
        { status: 404 }
      )
    }

    // Create inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests: parseInt(guests),
        message: message || null,
        specialRequests: specialRequests || null,
        villaId,
        status: 'PENDING',
      },
      include: {
        villa: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    })

    // TODO: Send email notifications here
    // await sendInquiryEmail(inquiry)

    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
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
      take: 100,
    })

    return NextResponse.json({ inquiries })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

