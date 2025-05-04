"use client"

import type React from "react"

import { Navigate } from "react-router-dom"
import { useAuth } from "./auth-provider"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
