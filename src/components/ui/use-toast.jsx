"use client"

// Simplified toast implementation
import { useState } from "react"

// Simple toast state management
const useToast = () => {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default", duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant, duration }

    setToasts((prevToasts) => [...prevToasts, newToast])

    if (duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, duration)
    }

    return {
      id,
      dismiss: () => setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id)),
      update: (props) => {
        setToasts((prevToasts) => prevToasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast)))
      },
    }
  }

  return {
    toast,
    toasts,
    dismiss: (toastId) => setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId)),
    dismissAll: () => setToasts([]),
  }
}

// For direct usage without the hook
const toast = ({ title, description, variant = "default", duration = 5000 }) => {
  console.log(`Toast: ${title} - ${description}`)
  // In a real implementation, this would show a toast notification
  return {
    id: Math.random().toString(36).substring(2, 9),
    dismiss: () => {},
    update: () => {},
  }
}

export { toast, useToast }
