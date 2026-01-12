'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import InquiryForm from '@/components/inquiry/InquiryForm'

interface BookingCardProps {
  villa: {
    id: string
    name: string
    pricePerNight: number
    weekendPrice?: number | null
    cleaningFee: number
    securityDeposit: number
    maxGuests: number
  }
}

export default function BookingCard({ villa }: BookingCardProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    if (nights === 0) return villa.pricePerNight

    const basePrice = villa.pricePerNight * nights
    const cleaning = villa.cleaningFee || 0
    const deposit = villa.securityDeposit || 0
    return basePrice + cleaning + deposit
  }

  return (
    <Card className="p-6 sticky top-24">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-primary-600">₹{villa.pricePerNight.toLocaleString()}</span>
          <span className="text-neutral-500">/night</span>
        </div>
        {villa.weekendPrice && (
          <p className="text-sm text-neutral-600">Weekend: ₹{villa.weekendPrice.toLocaleString()}/night</p>
        )}
      </div>

      {!showInquiryForm ? (
        <>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Check-in</label>
              <Input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Check-out</label>
              <Input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {Array.from({ length: villa.maxGuests }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {calculateNights() > 0 && (
            <div className="border-t border-neutral-200 pt-4 mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">₹{villa.pricePerNight.toLocaleString()} × {calculateNights()} nights</span>
                  <span>₹{(villa.pricePerNight * calculateNights()).toLocaleString()}</span>
                </div>
                {villa.cleaningFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Cleaning fee</span>
                    <span>₹{villa.cleaningFee.toLocaleString()}</span>
                  </div>
                )}
                {villa.securityDeposit > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Security deposit</span>
                    <span>₹{villa.securityDeposit.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => setShowInquiryForm(true)}
            className="w-full"
            size="lg"
          >
            Send Inquiry
          </Button>

          <div className="mt-4 text-center">
            <a
              href={`https://wa.me/919876543210?text=Hi, I'm interested in ${villa.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Contact via WhatsApp
            </a>
          </div>
        </>
      ) : (
        <InquiryForm
          villaId={villa.id}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuests={guests}
          onCancel={() => setShowInquiryForm(false)}
        />
      )}
    </Card>
  )
}

