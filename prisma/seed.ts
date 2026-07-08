import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Menu
  const menuPath = path.join(process.cwd(), 'src', 'data', 'menu.json')
  if (fs.existsSync(menuPath)) {
    const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf-8'))
    for (const item of menuData) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image,
        },
      })
    }
    console.log(`Seeded ${menuData.length} menu items.`)
  }

  // Seed Submissions
  const submissionsPath = path.join(process.cwd(), 'src', 'data', 'submissions.json')
  if (fs.existsSync(submissionsPath)) {
    const submissionsData = JSON.parse(fs.readFileSync(submissionsPath, 'utf-8'))
    
    if (submissionsData.reservations) {
      for (const res of submissionsData.reservations) {
        await prisma.reservation.create({
          data: {
            name: res.name,
            email: res.email,
            phone: res.phone,
            date: res.date,
            time: res.time,
            guests: res.guests,
            requests: res.requests || '',
            timestamp: new Date(res.timestamp),
          },
        })
      }
      console.log(`Seeded ${submissionsData.reservations.length} reservations.`)
    }
    
    if (submissionsData.messages) {
      for (const msg of submissionsData.messages) {
        await prisma.contactMessage.create({
          data: {
            name: msg.name,
            email: msg.email,
            message: msg.message,
            createdAt: new Date(msg.timestamp || new Date()),
          },
        })
      }
      console.log(`Seeded ${submissionsData.messages.length} messages.`)
    }
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
