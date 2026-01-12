// components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Goa Luxe</h3>
            <p className="text-neutral-400 text-sm">
              Luxury villa rentals in the heart of Goa. Experience paradise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/villas" className="text-neutral-400 hover:text-white">Browse Villas</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-neutral-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-neutral-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/cancellation" className="text-neutral-400 hover:text-white">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>+91 98765 43210</li>
              <li>hello@goaluxe.com</li>
              <li>Goa, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; 2024 Goa Luxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
