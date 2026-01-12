import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Goa Experiences | Activities & Attractions',
  description: 'Discover amazing experiences and activities in Goa. From beaches to culture, adventure to relaxation.',
}

const experiences = [
  {
    title: 'Beach Hopping',
    description: 'Explore the stunning beaches of North and South Goa, each with its unique charm and character.',
    image: 'https://images.unsplash.com/photo-1507525421304-677d195fb04a?w=800&h=600&fit=crop',
    category: 'Beach',
  },
  {
    title: 'Water Sports',
    description: 'Enjoy thrilling water activities including parasailing, jet skiing, and scuba diving.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    category: 'Adventure',
  },
  {
    title: 'Spice Plantation Tours',
    description: 'Visit authentic spice plantations and learn about Goa\'s rich agricultural heritage.',
    image: 'https://images.unsplash.com/photo-1615485925505-5c6dd0b1c8b8?w=800&h=600&fit=crop',
    category: 'Culture',
  },
  {
    title: 'Sunset Cruises',
    description: 'Experience magical sunsets on the Arabian Sea with romantic dinner cruises.',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    category: 'Relaxation',
  },
  {
    title: 'Heritage Walks',
    description: 'Discover Goa\'s Portuguese colonial architecture and rich cultural history.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    category: 'Culture',
  },
  {
    title: 'Yoga & Wellness',
    description: 'Rejuvenate with yoga sessions, spa treatments, and wellness retreats.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    category: 'Wellness',
  },
]

export default function ExperiencesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="container-custom mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Discover Goa
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            Beyond beautiful villas, Goa offers incredible experiences. From pristine beaches to cultural heritage, 
            adventure sports to peaceful retreats—there's something for everyone.
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="group overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-neutral-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {experience.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {experience.title}
                </h3>
                <p className="text-neutral-600 mb-4">{experience.description}</p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom mt-20">
        <Card className="p-12 bg-gradient-to-br from-primary-600 to-primary-700 text-white text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Goa?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Book your stay in one of our luxury villas and make the most of your Goa vacation.
          </p>
          <Link href="/villas">
            <Button variant="secondary" size="lg">
              Browse Villas
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  )
}

