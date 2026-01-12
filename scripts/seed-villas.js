const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const villas = [
  {
    name: 'Ocean Breeze Villa',
    slug: 'ocean-breeze-villa',
    tagline: 'Stunning beachfront property with panoramic ocean views',
    description: `Experience luxury like never before at Ocean Breeze Villa. This magnificent beachfront property offers direct access to pristine white sand beaches and crystal-clear waters. The villa features contemporary architecture with traditional Goan elements, creating a perfect blend of modern comfort and local charm.

The property boasts spacious living areas, a fully equipped modern kitchen, and multiple outdoor spaces perfect for entertaining. Wake up to breathtaking sunrise views from your private balcony, and end your day watching the sunset over the Arabian Sea.

With world-class amenities including a private pool, outdoor dining area, and dedicated staff, Ocean Breeze Villa ensures an unforgettable stay in paradise.`,
    location: 'Candolim, North Goa',
    address: 'Beach Road, Candolim, Goa 403515',
    latitude: 15.5189,
    longitude: 73.7656,
    pricePerNight: 25000,
    weekendPrice: 30000,
    cleaningFee: 2000,
    securityDeposit: 5000,
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    amenities: [
      'Swimming Pool',
      'Beach Access',
      'WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      'Private Parking',
      'BBQ Area',
      'Outdoor Dining',
      'Housekeeping',
      'Security',
    ],
    highlights: [
      'Direct beach access',
      'Private infinity pool',
      'Stunning ocean views',
      'Modern amenities',
      'Dedicated staff',
      'Prime location',
    ],
    houseRules: [
      'No smoking indoors',
      'No pets allowed',
      'No parties or events',
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Quiet hours: 10 PM - 7 AM',
    ],
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop', alt: 'Ocean Breeze Villa exterior', order: 0 },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', alt: 'Living room', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop', alt: 'Kitchen', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop', alt: 'Bedroom', order: 3 },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Pool area', order: 4 },
    ],
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: 'Serenity Hills Villa',
    slug: 'serenity-hills-villa',
    tagline: 'Peaceful hilltop retreat with panoramic valley views',
    description: `Nestled in the lush hills of South Goa, Serenity Hills Villa offers a tranquil escape from the hustle and bustle. This elegant property combines modern luxury with natural beauty, featuring floor-to-ceiling windows that frame breathtaking views of the surrounding landscape.

The villa's design emphasizes indoor-outdoor living, with spacious terraces and balconies perfect for morning yoga or evening relaxation. The interior is tastefully decorated with contemporary furnishings and local art pieces.

Perfect for families or groups seeking peace and privacy, Serenity Hills Villa provides a serene base to explore Goa's natural beauty while enjoying the comforts of a luxury home.`,
    location: 'Assagao, North Goa',
    address: 'Hill View Road, Assagao, Goa 403507',
    latitude: 15.6000,
    longitude: 73.7500,
    pricePerNight: 18000,
    weekendPrice: 22000,
    cleaningFee: 1500,
    securityDeposit: 4000,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    amenities: [
      'Swimming Pool',
      'WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      'Private Parking',
      'Garden',
      'BBQ Area',
      'Housekeeping',
      'Mountain Views',
      'Yoga Deck',
    ],
    highlights: [
      'Hilltop location',
      'Panoramic valley views',
      'Private pool',
      'Peaceful surroundings',
      'Modern architecture',
      'Eco-friendly design',
    ],
    houseRules: [
      'No smoking indoors',
      'Pets allowed (with prior notice)',
      'No loud music after 10 PM',
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Serenity Hills Villa exterior', order: 0 },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop', alt: 'Master bedroom', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Pool and garden', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop', alt: 'Dining area', order: 3 },
    ],
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: 'Royal Palms Estate',
    slug: 'royal-palms-estate',
    tagline: 'Luxurious estate with private chef and butler service',
    description: `Royal Palms Estate is the epitome of luxury living in Goa. This expansive property features multiple buildings, lush gardens, and world-class amenities designed for the most discerning guests.

The estate includes a main villa with grand living spaces, a separate guest house, and a dedicated entertainment pavilion. A private chef and butler service ensure every need is met, while the extensive grounds provide ample space for relaxation and recreation.

Perfect for large families, corporate retreats, or special celebrations, Royal Palms Estate offers an unparalleled level of luxury and service in one of Goa's most prestigious locations.`,
    location: 'Anjuna, North Goa',
    address: 'Estate Road, Anjuna, Goa 403509',
    latitude: 15.5833,
    longitude: 73.7500,
    pricePerNight: 45000,
    weekendPrice: 55000,
    cleaningFee: 5000,
    securityDeposit: 10000,
    bedrooms: 6,
    bathrooms: 6,
    maxGuests: 12,
    amenities: [
      'Swimming Pool',
      'Private Chef',
      'Butler Service',
      'WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      'Private Parking',
      'Garden',
      'BBQ Area',
      'Home Theater',
      'Gym',
      'Tennis Court',
    ],
    highlights: [
      'Private chef included',
      'Butler service',
      'Multiple buildings',
      'Extensive grounds',
      'Entertainment pavilion',
      'Premium location',
    ],
    houseRules: [
      'No smoking indoors',
      'Events allowed (with approval)',
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
      'Maximum 12 guests',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop', alt: 'Royal Palms Estate exterior', order: 0 },
      { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop', alt: 'Grand living room', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', alt: 'Dining hall', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Pool and grounds', order: 3 },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Garden area', order: 4 },
    ],
    isAvailable: true,
    isFeatured: true,
  },
  {
    name: 'Coastal Paradise Villa',
    slug: 'coastal-paradise-villa',
    tagline: 'Modern beachside villa with stunning sunset views',
    description: `Coastal Paradise Villa offers a perfect blend of modern design and coastal living. Located just steps from one of Goa's most beautiful beaches, this property provides easy access to the sand and sea while maintaining privacy and comfort.

The villa features an open-plan design with seamless indoor-outdoor flow, a rooftop terrace perfect for sunset viewing, and a private pool surrounded by tropical landscaping. The contemporary interiors are bright and airy, decorated in a coastal style that reflects the property's beachside location.

Ideal for couples or small families, Coastal Paradise Villa provides a romantic and relaxing setting for your Goa vacation.`,
    location: 'Baga, North Goa',
    address: 'Beachside Road, Baga, Goa 403516',
    latitude: 15.5667,
    longitude: 73.7500,
    pricePerNight: 20000,
    weekendPrice: 25000,
    cleaningFee: 1500,
    securityDeposit: 4000,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: [
      'Swimming Pool',
      'Beach Access',
      'WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      'Private Parking',
      'Rooftop Terrace',
      'BBQ Area',
      'Housekeeping',
    ],
    highlights: [
      'Beachside location',
      'Rooftop terrace',
      'Sunset views',
      'Modern design',
      'Private pool',
      'Romantic setting',
    ],
    houseRules: [
      'No smoking indoors',
      'No pets allowed',
      'No parties',
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop', alt: 'Coastal Paradise Villa exterior', order: 0 },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', alt: 'Living area', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Pool area', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Rooftop terrace', order: 3 },
    ],
    isAvailable: true,
    isFeatured: false,
  },
  {
    name: 'Tropical Oasis Villa',
    slug: 'tropical-oasis-villa',
    tagline: 'Lush tropical setting with private pool and garden',
    description: `Surrounded by lush tropical gardens, Tropical Oasis Villa offers a true escape into nature. This beautifully designed property features traditional Goan architecture with modern amenities, creating a harmonious blend of old and new.

The villa's extensive gardens provide a peaceful setting, while the private pool offers a refreshing retreat from the Goan heat. Multiple outdoor spaces, including a covered veranda and garden dining area, allow you to fully enjoy the tropical setting.

With its serene atmosphere and comfortable accommodations, Tropical Oasis Villa is perfect for those seeking a peaceful retreat in Goa.`,
    location: 'Vagator, North Goa',
    address: 'Garden Lane, Vagator, Goa 403509',
    latitude: 15.6000,
    longitude: 73.7333,
    pricePerNight: 16000,
    weekendPrice: 20000,
    cleaningFee: 1000,
    securityDeposit: 3000,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      'Swimming Pool',
      'WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      'Private Parking',
      'Tropical Garden',
      'BBQ Area',
      'Outdoor Shower',
      'Housekeeping',
    ],
    highlights: [
      'Tropical gardens',
      'Private pool',
      'Traditional architecture',
      'Peaceful setting',
      'Outdoor spaces',
      'Nature retreat',
    ],
    houseRules: [
      'No smoking indoors',
      'Pets allowed (with prior notice)',
      'No loud music after 10 PM',
      'Check-in: 3:00 PM',
      'Check-out: 11:00 AM',
    ],
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    images: [
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Tropical Oasis Villa exterior', order: 0 },
      { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop', alt: 'Bedroom', order: 1 },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Garden and pool', order: 2 },
      { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=800&fit=crop', alt: 'Living area', order: 3 },
    ],
    isAvailable: true,
    isFeatured: false,
  },
]

async function main() {
  console.log('Starting seed...')

  for (const villaData of villas) {
    const { images, ...villaInfo } = villaData

    // Check if villa already exists
    const existing = await prisma.villa.findUnique({
      where: { slug: villaData.slug },
    })

    if (existing) {
      console.log(`Villa ${villaData.slug} already exists, skipping...`)
      continue
    }

    // Create villa
    const villa = await prisma.villa.create({
      data: {
        ...villaInfo,
        images: {
          create: images.map((img) => ({
            url: img.url,
            alt: img.alt,
            order: img.order,
          })),
        },
      },
    })

    console.log(`Created villa: ${villa.name}`)
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

