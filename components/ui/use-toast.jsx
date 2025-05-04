"use client"

import { createContext, useContext } from "react"

const ToastContext = createContext({})

export function useToast() {
  const context = useContext(ToastContext)

  return {
    toast: ({ title, description, variant }) => {
      console.log({ title, description, variant })
    },
  }
}

export const toast = ({ title, description, variant }) => {
  console.log({ title, description, variant })
}
