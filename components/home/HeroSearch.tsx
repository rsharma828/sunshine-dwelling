'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { MapPinIcon, CalendarDaysIcon, UserGroupIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function HeroSearch() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    
    if (searchData.location) {
      params.set('location', searchData.location)
    }
    if (searchData.checkIn) {
      params.set('checkIn', searchData.checkIn)
    }
    if (searchData.checkOut) {
      params.set('checkOut', searchData.checkOut)
    }
    if (searchData.guests) {
      params.set('guests', searchData.guests.toString())
    }

    router.push(`/villas?${params.toString()}`)
  }

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const popularLocations = [
    { name: 'Candolim', icon: '🏖️' },
    { name: 'Anjuna', icon: '🌊' },
    { name: 'Baga', icon: '🌴' },
    { name: 'Vagator', icon: '🌅' },
    { name: 'Assagao', icon: '🏡' },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Search Card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
        <form onSubmit={handleSearch}>
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center">
            {/* Location Field */}
            <div 
              className={`flex-1 border-r border-neutral-200 px-4 py-3 cursor-pointer transition-all min-w-[180px] ${
                focusedField === 'location' ? 'bg-primary-50' : 'bg-white hover:bg-neutral-50'
              }`}
              onClick={() => document.getElementById('location-input')?.focus()}
            >
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                <MapPinIcon className="w-3.5 h-3.5 text-primary-600" />
                <span>Where</span>
              </label>
              <input
                id="location-input"
                type="text"
                placeholder="Search destinations"
                value={searchData.location}
                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField(null)}
                className="w-full text-sm font-medium text-neutral-900 placeholder:text-neutral-400 bg-transparent border-0 focus:outline-none focus:ring-0 h-6"
                style={{ color: '#171717' }}
              />
              {!searchData.location && (
                <p className="text-[10px] text-neutral-400 mt-0.5">Goa, India</p>
              )}
            </div>

            {/* Check-in Field */}
            <div 
              className={`flex-1 border-r border-neutral-200 px-4 py-3 cursor-pointer transition-all min-w-[160px] ${
                focusedField === 'checkIn' ? 'bg-primary-50' : 'bg-white hover:bg-neutral-50'
              }`}
              onClick={() => document.getElementById('checkin-input')?.focus()}
            >
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                <CalendarDaysIcon className="w-3.5 h-3.5 text-primary-600" />
                <span>Check-in</span>
              </label>
              <input
                id="checkin-input"
                type="date"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                onFocus={() => setFocusedField('checkIn')}
                onBlur={() => setFocusedField(null)}
                min={today}
                className="w-full text-sm font-medium text-neutral-900 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer h-6"
                style={{ color: '#171717' }}
              />
              {searchData.checkIn ? (
                <p className="text-[10px] text-neutral-600 mt-0.5 font-medium">{formatDate(searchData.checkIn)}</p>
              ) : (
                <p className="text-[10px] text-neutral-400 mt-0.5">Add dates</p>
              )}
            </div>

            {/* Check-out Field */}
            <div 
              className={`flex-1 border-r border-neutral-200 px-4 py-3 cursor-pointer transition-all min-w-[160px] ${
                focusedField === 'checkOut' ? 'bg-primary-50' : 'bg-white hover:bg-neutral-50'
              }`}
              onClick={() => document.getElementById('checkout-input')?.focus()}
            >
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                <CalendarDaysIcon className="w-3.5 h-3.5 text-primary-600" />
                <span>Check-out</span>
              </label>
              <input
                id="checkout-input"
                type="date"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                onFocus={() => setFocusedField('checkOut')}
                onBlur={() => setFocusedField(null)}
                min={searchData.checkIn || tomorrow}
                className="w-full text-sm font-medium text-neutral-900 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer h-6"
                style={{ color: '#171717' }}
              />
              {searchData.checkOut ? (
                <p className="text-[10px] text-neutral-600 mt-0.5 font-medium">{formatDate(searchData.checkOut)}</p>
              ) : (
                <p className="text-[10px] text-neutral-400 mt-0.5">Add dates</p>
              )}
            </div>

            {/* Guests Field */}
            <div 
              className={`flex-1 border-r border-neutral-200 px-4 py-3 cursor-pointer transition-all min-w-[140px] ${
                focusedField === 'guests' ? 'bg-primary-50' : 'bg-white hover:bg-neutral-50'
              }`}
              onClick={() => document.getElementById('guests-select')?.focus()}
            >
              <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                <UserGroupIcon className="w-3.5 h-3.5 text-primary-600" />
                <span>Guests</span>
              </label>
              <select
                id="guests-select"
                value={searchData.guests}
                onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                onFocus={() => setFocusedField('guests')}
                onBlur={() => setFocusedField(null)}
                className="w-full text-sm font-medium text-neutral-900 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer appearance-none pr-6 h-6"
                style={{ color: '#171717' }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num} style={{ color: '#171717', backgroundColor: '#ffffff' }}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-neutral-600 mt-0.5 font-medium">{searchData.guests} {searchData.guests === 1 ? 'Guest' : 'Guests'}</p>
            </div>

            {/* Search Button */}
            <div className="px-4 py-3 flex items-center">
              <Button
                type="submit"
                className="h-10 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
                <span>Search</span>
              </Button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden p-4 space-y-3">
            <div className="space-y-3">
              {/* Location */}
              <div 
                className={`p-3 rounded-xl border-2 transition-all ${
                  focusedField === 'location' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 bg-white hover:border-primary-300'
                }`}
                onClick={() => document.getElementById('location-input-mobile')?.focus()}
              >
                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                  <MapPinIcon className="w-3.5 h-3.5 text-primary-600" />
                  <span>Where</span>
                </label>
                <input
                  id="location-input-mobile"
                  type="text"
                  placeholder="Search destinations"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full text-sm font-medium text-neutral-900 placeholder:text-neutral-400 bg-transparent border-0 focus:outline-none h-6"
                  style={{ color: '#171717' }}
                />
                {!searchData.location && (
                  <p className="text-[10px] text-neutral-400 mt-0.5">Goa, India</p>
                )}
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`p-3 rounded-xl border-2 transition-all ${
                    focusedField === 'checkIn' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 bg-white hover:border-primary-300'
                  }`}
                  onClick={() => document.getElementById('checkin-input-mobile')?.focus()}
                >
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                    <CalendarDaysIcon className="w-3.5 h-3.5 text-primary-600" />
                    <span>Check-in</span>
                  </label>
                  <input
                    id="checkin-input-mobile"
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    onFocus={() => setFocusedField('checkIn')}
                    onBlur={() => setFocusedField(null)}
                    min={today}
                    className="w-full text-sm font-medium text-neutral-900 bg-transparent border-0 focus:outline-none h-6"
                    style={{ color: '#171717' }}
                  />
                  {searchData.checkIn && (
                    <p className="text-[10px] text-neutral-600 mt-0.5 font-medium">{formatDate(searchData.checkIn)}</p>
                  )}
                </div>

                <div 
                  className={`p-3 rounded-xl border-2 transition-all ${
                    focusedField === 'checkOut' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 bg-white hover:border-primary-300'
                  }`}
                  onClick={() => document.getElementById('checkout-input-mobile')?.focus()}
                >
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                    <CalendarDaysIcon className="w-3.5 h-3.5 text-primary-600" />
                    <span>Check-out</span>
                  </label>
                  <input
                    id="checkout-input-mobile"
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    onFocus={() => setFocusedField('checkOut')}
                    onBlur={() => setFocusedField(null)}
                    min={searchData.checkIn || tomorrow}
                    className="w-full text-sm font-medium text-neutral-900 bg-transparent border-0 focus:outline-none h-6"
                    style={{ color: '#171717' }}
                  />
                  {searchData.checkOut && (
                    <p className="text-[10px] text-neutral-600 mt-0.5 font-medium">{formatDate(searchData.checkOut)}</p>
                  )}
                </div>
              </div>

              {/* Guests */}
              <div 
                className={`p-3 rounded-xl border-2 transition-all ${
                  focusedField === 'guests' 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-neutral-200 bg-white hover:border-primary-300'
                }`}
                onClick={() => document.getElementById('guests-select-mobile')?.focus()}
              >
                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-600 mb-1 uppercase tracking-wide">
                  <UserGroupIcon className="w-3.5 h-3.5 text-primary-600" />
                  <span>Guests</span>
                </label>
                <select
                  id="guests-select-mobile"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                  onFocus={() => setFocusedField('guests')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full text-sm font-medium text-neutral-900 bg-transparent border-0 focus:outline-none h-6"
                  style={{ color: '#171717' }}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num} style={{ color: '#171717', backgroundColor: '#ffffff' }}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Search Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Search Villas</span>
            </Button>
          </div>
        </form>

        {/* Popular Locations */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-3">
          <p className="text-[10px] font-semibold text-neutral-700 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
            <span>✨</span>
            <span>Popular Destinations</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {popularLocations.map((location) => (
              <button
                key={location.name}
                type="button"
                onClick={() => {
                  setSearchData({ ...searchData, location: location.name })
                  setFocusedField('location')
                }}
                className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-700 rounded-full border border-neutral-200 hover:border-primary-300 transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md"
              >
                <span>{location.icon}</span>
                <span>{location.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
