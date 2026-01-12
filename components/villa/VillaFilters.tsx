'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function VillaFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: '',
  })

  useEffect(() => {
    setFilters({
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      location: searchParams.get('location') || '',
    })
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms)
    if (filters.location) params.set('location', filters.location)
    router.push(`/villas?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({ minPrice: '', maxPrice: '', bedrooms: '', location: '' })
    router.push('/villas')
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
        
        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g., Candolim, Anjuna"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Price Range (₹/night)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
          <Button onClick={clearFilters} variant="outline" className="flex-1">Clear</Button>
        </div>
      </Card>
    </div>
  )
}

