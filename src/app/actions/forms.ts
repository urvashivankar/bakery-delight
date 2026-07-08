"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return { success: false, error: "Missing required fields" }
    }

    await prisma.contactMessage.create({
      data: { name, email, message }
    })
    
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error saving contact message:", error)
    return { success: false, message: "Failed to save message" }
  }
}

export async function submitReservation(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const guests = formData.get("guests") as string
    const requests = formData.get("requests") as string

    if (!name || !email || !phone || !date || !time || !guests) {
      return { success: false, error: "Missing required fields" }
    }

    await prisma.reservation.create({
      data: {
        name, email, phone, date, time, guests, requests
      }
    })

    return { success: true, message: "Reservation confirmed!" }
  } catch (error) {
    console.error("Error saving reservation:", error)
    return { success: false, message: "Failed to confirm reservation" }
  }
}

export async function submitCustomCake(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const occasion = formData.get("occasion") as string
    const date = formData.get("date") as string
    const message = formData.get("message") as string

    if (!name || !phone || !date) {
      return { success: false, error: "Missing required fields" }
    }

    await prisma.reservation.create({
      data: {
        name,
        email: "Custom Cake Consultation",
        phone,
        date,
        time: "TBD",
        guests: "N/A",
        requests: `Occasion: ${occasion} | Message: ${message}`
      }
    })

    return { success: true, message: "Consultation requested!" }
  } catch (error) {
    console.error("Error saving custom cake request:", error)
    return { success: false, error: "Failed to submit request" }
  }
}
