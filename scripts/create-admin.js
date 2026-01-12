const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const admin = await prisma.admin.create({
        data: {
            email: 'admin@example.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'SUPER_ADMIN'
        }
    })

    console.log('Admin created:', admin)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())