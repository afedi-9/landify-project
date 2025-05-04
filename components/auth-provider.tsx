"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  walletAddress?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  connectWallet: () => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the token with your backend
        const isAuth = localStorage.getItem("isAuthenticated") === "true"

        if (isAuth) {
          // Mock user data - in a real app, you would fetch this from your API
          setUser({
            id: "user_123",
            name: "John Doe",
            email: "john@example.com",
          })
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (!isLoading) {
      const isAuthRoute = pathname?.startsWith("/auth/")

      if (!user && !isAuthRoute && pathname !== "/") {
        router.push("/auth/signin")
      } else if (user && isAuthRoute) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to authenticate
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser = {
        id: "user_123",
        name: "John Doe",
        email,
      }

      setUser(mockUser)
      localStorage.setItem("isAuthenticated", "true")
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to register
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup
      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
      }

      setUser(mockUser)
      localStorage.setItem("isAuthenticated", "true")
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  const connectWallet = async () => {
    try {
      // In a real app, this would connect to MetaMask or another wallet
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock wallet connection
      const mockWalletAddress = "0x" + Math.random().toString(36).substr(2, 40)

      setUser((prev) => (prev ? { ...prev, walletAddress: mockWalletAddress } : null))
      return mockWalletAddress
    } catch (error) {
      console.error("Wallet connection failed:", error)
      throw error
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    connectWallet,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
