"use server"

import { prisma } from "@/lib/prisma"

export async function trackOrder(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        status: true,
        createdAt: true,
        customerName: true,
        items: true,
        totalAmount: true
      }
    })

    if (!order) {
      return { success: false, error: "Order not found. Please check your Order ID." }
    }

    return { success: true, data: order }
  } catch (error) {
    console.error("Error tracking order:", error)
    return { success: false, error: "Failed to track order. Please try again." }
  }
}
