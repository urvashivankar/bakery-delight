"use server"

import { prisma } from "@/lib/prisma"

export async function getDashboardStats() {
  const [reservations, orders, menuItems] = await Promise.all([
    prisma.reservation.count(),
    prisma.order.count(),
    prisma.menuItem.count(),
  ])

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  })

  // Get revenue (simple sum of all orders)
  const allOrders = await prisma.order.findMany({
    select: { totalAmount: true }
  })
  const revenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0)

  return {
    stats: { reservations, orders, menuItems, revenue },
    recentOrders
  }
}

export async function getReservations() {
  return await prisma.reservation.findMany({
    orderBy: { timestamp: 'desc' }
  })
}

export async function getOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: 'desc' }
  })
}
