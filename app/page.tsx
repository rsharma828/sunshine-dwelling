import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import VillaCard from '@/components/villa/VillaCard'
import { Button } from '@/components/ui/Button'
import HeroSearch from '@/components/home/HeroSearch'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let featuredVillas: any[] = []

  try {
    featuredVillas = await prisma.villa.findMany({
    where: {
      isAvailable: true,
      isFeatured: true,
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
    console.error('Database error:', error)
    // Continue with empty array if database is not available
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[800px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop"
            alt="Luxury villa in Goa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
        </div>
        <div className="container-custom z-10 relative w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in font-serif">
              Luxury Villas in Paradise
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Experience the ultimate in luxury and comfort with our premium villa collection in Goa
            </p>
          </div>
          
          {/* Search Component */}
          <div className="max-w-5xl mx-auto mb-8">
            <HeroSearch />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-center text-white/90">
            <div>
              <div className="text-2xl md:text-3xl font-bold">50+</div>
              <div className="text-sm md:text-base">Luxury Villas</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">1000+</div>
              <div className="text-sm md:text-base">Happy Guests</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold">4.9★</div>
              <div className="text-sm md:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Featured Villas</h2>
            <p className="text-neutral-600 text-lg">Discover our most luxurious properties</p>
          </div>
          {featuredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {featuredVillas.map((villa) => (
                <VillaCard key={villa.id} villa={villa} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card">
                  <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600"></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">Luxury Villa {i}</h3>
                    <p className="text-neutral-600 mb-4">Beautiful villa with stunning views</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">₹15,000/night</span>
                      <Link href="/villas" className="text-primary-600 hover:text-primary-700 font-medium">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link href="/villas">
              <Button size="lg">View All Villas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-neutral-600 text-lg">What makes us different</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                title: 'Premium Properties', 
                desc: 'Curated selection of luxury villas',
                icon: '🏖️',
              },
              { 
                title: '24/7 Support', 
                desc: 'Round-the-clock assistance for your stay',
                icon: '📞',
              },
              { 
                title: 'Best Prices', 
                desc: 'Competitive rates with no hidden fees',
                icon: '💰',
              },
              { 
                title: 'Easy Booking', 
                desc: 'Simple and secure booking process',
                icon: '✨',
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-neutral-600 text-lg">Simple steps to your dream vacation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Browse Villas', desc: 'Explore our collection of luxury villas in Goa' },
              { step: '2', title: 'Send Inquiry', desc: 'Fill out a simple form with your dates and preferences' },
              { step: '3', title: 'Confirm & Enjoy', desc: 'We\'ll confirm your booking and you\'re all set!' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Ready to Experience Goa?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Book your stay in one of our luxury villas and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/villas">
              <Button size="lg" variant="secondary">
                Browse All Villas
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
