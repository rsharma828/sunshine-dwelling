import Image from 'next/image'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: 'About Us | Goa Luxe',
  description: 'Learn about Goa Luxe and our mission to provide luxury villa experiences in Goa.',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="container-custom mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            About Goa Luxe
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            We curate the finest collection of luxury villas in Goa, offering unforgettable experiences in paradise.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container-custom mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Founded with a passion for luxury hospitality, Goa Luxe was born from a simple belief: 
                every vacation should be extraordinary. We've carefully selected each villa in our collection 
                to ensure it meets our exacting standards for comfort, style, and service.
              </p>
              <p>
                Our team has deep roots in Goa and understands what makes a stay truly special. From 
                beachfront properties with stunning ocean views to secluded hilltop retreats, we offer 
                diverse options to match every traveler's dream.
              </p>
              <p>
                We're not just a booking platform—we're your partners in creating memories that last 
                a lifetime. Every inquiry is handled with care, and we're here to help you find the 
                perfect villa for your needs.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
              alt="Luxury villa in Goa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-neutral-50 py-20">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We maintain the highest standards in every aspect of our service, from villa selection to guest support.',
                icon: '⭐',
              },
              {
                title: 'Integrity',
                description: 'Transparent pricing, honest descriptions, and genuine care for our guests and property owners.',
                icon: '🤝',
              },
              {
                title: 'Experience',
                description: 'We go beyond bookings to ensure every stay is memorable, comfortable, and truly special.',
                icon: '✨',
              },
            ].map((value, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-custom py-20">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Curated Selection',
              description: 'Every villa is personally inspected and verified for quality.',
            },
            {
              title: '24/7 Support',
              description: 'Our team is available around the clock to assist you.',
            },
            {
              title: 'Best Prices',
              description: 'Competitive rates with no hidden fees or surprises.',
            },
            {
              title: 'Easy Booking',
              description: 'Simple, secure, and hassle-free booking process.',
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-neutral-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

