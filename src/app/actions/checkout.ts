"use server"

import { prisma } from "@/lib/prisma"

export async function submitCheckout(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  totalAmount: number;
  items: any[];
}) {
  try {
    const { customerName, customerEmail, customerPhone, address, totalAmount, items } = data;

    if (!customerName || !customerEmail || !customerPhone || items.length === 0) {
      return { success: false, error: "Missing required fields or empty cart" }
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        address,
        totalAmount,
        items: JSON.stringify(items)
      }
    });

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Error saving order:", error)
    return { success: false, error: "Failed to process checkout" }
  }
}
