"use client"

import { useState } from "react"
import { updateOrderStatus } from "@/app/actions/orders"

export function OrderStatusDropdown({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value
    setIsUpdating(true)
    setStatus(newStatus)
    
    const res = await updateOrderStatus(id, newStatus)
    if (!res.success) {
      // Revert if failed
      setStatus(currentStatus)
    }
    
    setIsUpdating(false)
  }

  // Determine colors based on status
  let colors = "bg-gray-100 text-gray-700 border-gray-200"
  if (status === "PENDING") colors = "bg-yellow-100 text-yellow-700 border-yellow-200"
  else if (status === "PREPARING") colors = "bg-blue-100 text-blue-700 border-blue-200"
  else if (status === "COMPLETED") colors = "bg-green-100 text-green-700 border-green-200"
  else if (status === "CANCELLED") colors = "bg-red-100 text-red-700 border-red-200"

  return (
    <select 
      value={status} 
      onChange={handleStatusChange}
      disabled={isUpdating}
      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border appearance-none cursor-pointer outline-none transition-colors ${colors} ${isUpdating ? "opacity-50" : ""}`}
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
    >
      <option value="PENDING">PENDING</option>
      <option value="PREPARING">PREPARING</option>
      <option value="COMPLETED">COMPLETED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  )
}
