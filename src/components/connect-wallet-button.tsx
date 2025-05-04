"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { useAuth } from "./auth-provider"
import { Loader2, Wallet } from "lucide-react"

interface ConnectWalletButtonProps {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ConnectWalletButton({ variant = "default", size = "default", className }: ConnectWalletButtonProps) {
  const { user, connectWallet } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      await connectWallet()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleConnectWallet} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : user?.walletAddress ? (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          {user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}
