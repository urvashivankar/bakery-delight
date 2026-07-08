"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateOrderStatus(id: string, status: string) {
  try {
    // Fetch the order to get customer details for the notification
    const order = await prisma.order.findUnique({
      where: { id }
    })

    if (!order) {
      throw new Error("Order not found")
    }

    await prisma.order.update({
      where: { id },
      data: { status }
    })
    
    // Real SMS / Email Notification Logic
    const sendRealNotifications = async (message: string) => {
      // 1. Send Email via Nodemailer (if configured)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const nodemailer = require('nodemailer')
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          })
          
          await transporter.sendMail({
            from: `"L'Artisan Patisserie" <${process.env.EMAIL_USER}>`,
            to: order.customerEmail,
            subject: `Order Update: ${id}`,
            text: message,
          })
          console.log(`✅ Email sent successfully to ${order.customerEmail}`)
        } catch (err) {
          console.error("Failed to send email:", err)
        }
      } else {
        console.warn("⚠️ Email not sent: Missing EMAIL_USER or EMAIL_PASS in .env")
      }

      // 2. Send SMS via Twilio (if configured)
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
        try {
          const twilio = require('twilio')
          const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
          
          await client.messages.create({
            body: `L'Artisan Patisserie: ${message}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: order.customerPhone,
          })
          console.log(`✅ SMS sent successfully to ${order.customerPhone}`)
        } catch (err) {
          console.error("Failed to send SMS:", err)
        }
      } else {
        console.warn("⚠️ SMS not sent: Missing TWILIO credentials in .env")
      }
    }

    if (order.status === "PENDING" && status === "PREPARING") {
      await sendRealNotifications(`Great news, ${order.customerName}! Our pâtissiers have started preparing your order.`)
    } else if (status === "COMPLETED" && order.status !== "COMPLETED") {
      await sendRealNotifications(`Your order is now ready, ${order.customerName}! Enjoy your artisan pastries.`)
    }
    
    // Revalidate the admin pages to reflect the new status
    revalidatePath('/admin')
    revalidatePath('/admin/orders')
    
    return { success: true }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: "Failed to update order status" }
  }
}
