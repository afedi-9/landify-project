"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getSonicClient } from "@/lib/blockchain/sonic-client"
import { Loader2, Check, ExternalLink, FileSignature } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ContractSigningProps {
  propertyId: string
  propertyName: string
  contractAddress?: string
}

export function ContractSigning({ propertyId, propertyName, contractAddress }: ContractSigningProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [signature, setSignature] = useState("")
  const [contractMessage, setContractMessage] = useState(
    `I hereby confirm that I am the legal owner of property "${propertyName}" (ID: ${propertyId}) and authorize its tokenization on the Sonic blockchain.`,
  )
  const [txHash, setTxHash] = useState("")
  const { toast } = useToast()

  const sonicClient = getSonicClient(contractAddress)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const address = await sonicClient.connect()
      if (address) {
        setWalletAddress(address)
        toast({
          title: "Wallet connected",
          description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
        })
      }
    } catch (error) {
      console.error("Connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSign = async () => {
    setIsSigning(true)
    try {
      const signedMessage = await sonicClient.signMessage(contractMessage)
      if (signedMessage) {
        setSignature(signedMessage)

        // In a real app, you would now:
        // 1. Send this signature to your backend
        // 2. Verify the signature server-side
        // 3. If valid, proceed with contract deployment or minting

        // For demo purposes, we'll simulate a transaction
        const mockTxHash =
          "0x" +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")
        setTxHash(mockTxHash)

        toast({
          title: "Contract signed successfully",
          description: "Your property contract has been signed and recorded on the blockchain",
        })
      }
    } catch (error) {
      console.error("Signing error:", error)
      toast({
        title: "Signing failed",
        description: "Failed to sign the contract",
        variant: "destructive",
      })
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Property Contract</CardTitle>
        <CardDescription>Sign a contract to tokenize your property on the Sonic blockchain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!walletAddress ? (
          <div className="flex flex-col items-center justify-center py-6">
            <FileSignature className="h-16 w-16 text-slate-300 mb-4" />
            <p className="text-center text-slate-500 mb-4">Connect your wallet to sign the property contract</p>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Connected Wallet</Label>
              <div className="flex items-center">
                <Input id="wallet-address" value={walletAddress} readOnly className="font-mono" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress)
                    toast({
                      title: "Address copied",
                      description: "Wallet address copied to clipboard",
                    })
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16V4a2 2 0 0 1 2-2h10" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract-message">Contract Message</Label>
              <Textarea
                id="contract-message"
                value={contractMessage}
                onChange={(e) => setContractMessage(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-slate-500">
                This message will be signed with your private key to verify your ownership
              </p>
            </div>

            {signature && (
              <div className="space-y-2 pt-4 border-t">
                <Label>Signature</Label>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <p className="font-mono text-xs break-all">{signature}</p>
                </div>
              </div>
            )}

            {txHash && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-medium text-green-700 dark:text-green-400">Contract Successfully Signed</h3>
                </div>
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  Your property has been tokenized on the Sonic blockchain
                </p>
                <div className="mt-2">
                  <p className="text-xs text-slate-500">Transaction Hash:</p>
                  <div className="flex items-center">
                    <p className="font-mono text-xs truncate">{txHash}</p>
                    <a
                      href={sonicClient.getTransactionUrl(txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        {walletAddress && !signature && (
          <Button onClick={handleSign} disabled={isSigning || !contractMessage} className="w-full">
            {isSigning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing...
              </>
            ) : (
              "Sign Contract"
            )}
          </Button>
        )}
        {signature && !txHash && (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Transaction...
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
