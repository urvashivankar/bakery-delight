import { PrismaClient } from '@prisma/client'
import "dotenv/config";
try {
  const prisma = new PrismaClient()
  console.log("Success!")
} catch (e) {
  console.error(e)
}
