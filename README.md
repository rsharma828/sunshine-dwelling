# Goa Luxe - Luxury Villa Booking Platform

A modern, full-featured villa booking platform built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

### Public Features
- 🏖️ Beautiful homepage with hero section and featured villas
- 🏡 Villa listing page with advanced filters (price, location, bedrooms)
- 📸 Villa detail pages with image galleries and lightbox
- 📝 Inquiry form system with email notifications
- 📱 Fully responsive design
- 🎨 Modern UI components with smooth animations
- 🔍 Search and filter functionality
- 📍 Location-based villa discovery

### Admin Features
- 🔐 Admin authentication
- 📊 Dashboard with statistics and recent inquiries
- 🏠 Villa management (view, add, edit)
- 📧 Inquiry management with status tracking
- 📅 Booking management
- 📈 Analytics and reporting

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Custom components with Headless UI
- **Icons**: Heroicons
- **Images**: Unsplash (stock images)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd goa-villas
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/goa_villas"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key" # Optional
```

4. Set up the database:
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

5. Seed the database with sample villas:
```bash
npm run seed
```

6. Create an admin user:
```bash
node scripts/create-admin.js
```

7. Run the development server:
```bash
npm run dev
# or
bun dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
goa-villas/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Homepage
│   │   ├── villas/               # Villa pages
│   │   ├── about/                # About page
│   │   ├── contact/             # Contact page
│   │   └── experiences/         # Experiences page
│   ├── admin/                    # Admin pages
│   ├── api/                      # API routes
│   └── layout.tsx                # Root layout
├── components/
│   ├── layout/                   # Header, Footer
│   ├── ui/                       # Reusable UI components
│   ├── villa/                    # Villa-specific components
│   └── inquiry/                  # Inquiry components
├── lib/
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Utility functions
├── prisma/
│   └── schema.prisma             # Database schema
└── scripts/
    ├── create-admin.js           # Create admin user
    └── seed-villas.js            # Seed villas data
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

## Database Schema

The application uses the following main models:
- **Villa** - Villa listings with details, pricing, amenities
- **VillaImage** - Images associated with villas
- **Inquiry** - Guest inquiries for villas
- **Booking** - Confirmed bookings
- **Admin** - Admin users for the dashboard

## Features in Detail

### Villa Listing
- Grid view of all available villas
- Advanced filters (price range, location, bedrooms)
- Sort options
- Responsive design

### Villa Details
- Image gallery with lightbox
- Detailed information (amenities, highlights, house rules)
- Booking/inquiry form
- Similar villas recommendations
- Location map

### Inquiry System
- Multi-step inquiry form
- Email notifications (to be configured)
- Status tracking
- Admin management interface

### Admin Dashboard
- Statistics overview
- Villa management
- Inquiry management
- Booking management
- User authentication

## Customization

### Adding New Villas
1. Use the seed script as a template
2. Add villa data to `scripts/seed-villas.js`
3. Run `npm run seed`

### Styling
- Colors and theme are defined in `app/globals.css`
- Component styles use Tailwind CSS utility classes
- Custom components in `components/ui/`

### Images
- Currently using Unsplash stock images
- Update `next.config.ts` to add more image domains
- For production, consider using Cloudinary or similar service

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your application URL
- `NEXTAUTH_SECRET` - Secret for session encryption

Optional:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For map integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies.
