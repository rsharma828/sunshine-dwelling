import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default async function InquirySuccessPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  let inquiry = null

  if (searchParams.id) {
    inquiry = await prisma.inquiry.findUnique({
      where: { id: searchParams.id },
      include: {
        villa: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    })
  }

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center">
      <div className="container-custom max-w-2xl">
        <Card className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Inquiry Submitted Successfully!
          </h1>

          <p className="text-lg text-neutral-600 mb-8">
            Thank you for your interest. We've received your inquiry and will get back to you within 24 hours.
          </p>

          {inquiry && (
            <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">Inquiry Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Villa:</span>
                  <span className="font-medium">{inquiry.villa.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-in:</span>
                  <span className="font-medium">
                    {new Date(inquiry.checkIn).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-out:</span>
                  <span className="font-medium">
                    {new Date(inquiry.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Guests:</span>
                  <span className="font-medium">{inquiry.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Status:</span>
                  <span className="font-medium capitalize">{inquiry.status.toLowerCase()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/villas">
              <Button size="lg">Browse More Villas</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">Back to Home</Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-neutral-500">
            Need immediate assistance?{' '}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Contact us on WhatsApp
            </a>
          </p>
        </Card>
      </div>
    </div>
  )
}

