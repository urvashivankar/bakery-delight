"use server"

import { prisma } from "@/lib/prisma"

export async function getMenuItems(category?: string) {
  try {
    const items = await prisma.menuItem.findMany({
      where: category && category !== "All" ? { category } : undefined,
      orderBy: { createdAt: 'asc' }
    });
    return { success: true, data: items }
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return { success: false, error: "Failed to fetch menu items" }
  }
}

export async function getAllCategories() {
  try {
    const items = await prisma.menuItem.findMany({
      select: { category: true },
      distinct: ['category']
    });
    const categories = items.map(i => i.category);
    return { success: true, data: categories }
  } catch (error) {
    console.error("Error fetching categories:", error)
    return { success: false, error: "Failed to fetch categories" }
  }
}
