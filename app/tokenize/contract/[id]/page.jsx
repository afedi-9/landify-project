"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContractSigningPage() {
  const params = useParams()
  const propertyId = params.id
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [contractMessage, setContractMessage] = useState("")
  const [isSigning, setIsSigning] = useState(false)
  const [signature, setSignature] = useState("")
  const [txHash, setTxHash] = useState("")

  useEffect(() => {
    // In a real app, fetch property details from API
    // For demo, we'll use mock data
    const mockProperty = {
      id: propertyId,
      name: "Residential Plot #" + propertyId,
      type: "Land",
      location: "123 Main St, City",
      area: "500 sq. m",
      value: "$100,000",
    }

    // Set contract message
    setContractMessage(
      `I hereby confirm that I am the legal owner of property "${mockProperty.name}" (ID: ${propertyId}) and authorize its tokenization on the Sonic blockchain.`,
    )

    // Simulate API call
    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 500)
  }, [propertyId])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockAddress =
        "0x" +
        Array(40)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")
      setWalletAddress(mockAddress)
    } catch (error) {
      console.error("Connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSign = async () => {
    setIsSigning(true)
    try {
      // Simulate signing
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockSignature =
        "0x" +
        Array(130)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")
      setSignature(mockSignature)

      // Simulate transaction
      setTimeout(() => {
        const mockTxHash =
          "0x" +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")
        setTxHash(mockTxHash)
      }, 2000)
    } catch (error) {
      console.error("Signing error:", error)
    } finally {
      setIsSigning(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <Link href="/tokenize">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Contract Signing</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border mb-4">
            <h3 className="text-xl font-semibold mb-4">Property Details</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-slate-500">Property Name</p>
                  <p className="font-medium">{property.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Type</p>
                  <p>{property.type}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p>{property.location}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-slate-500">Area</p>
                  <p>{property.area}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Estimated Value</p>
                  <p>{property.value}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Contract Information</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              By signing this contract, you confirm that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>You are the legal owner of the property</li>
              <li>The property details provided are accurate</li>
              <li>You authorize the tokenization of this property on the Sonic blockchain</li>
              <li>You understand that this creates an immutable record of ownership</li>
              <li>You agree to the terms and conditions of the Landify platform</li>
            </ul>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Property Contract</CardTitle>
            <CardDescription>Sign a contract to tokenize your property on the Sonic blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!walletAddress ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="h-16 w-16 text-slate-300 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v12"></path>
                    <path d="m8 11 4 4 4-4"></path>
                    <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
                  </svg>
                </div>
                <p className="text-center text-slate-500 mb-4">Connect your wallet to sign the property contract</p>
                <Button onClick={handleConnect} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
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
                        alert("Wallet address copied to clipboard")
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
                      <p className="font-mono text-xs break-all">{signature.substring(0, 60)}...</p>
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
                          href={`https://explorer.sonic.network/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-emerald-600 hover:text-emerald-700"
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
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
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
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing...
                  </>
                ) : (
                  "Sign Contract"
                )}
              </Button>
            )}
            {signature && !txHash && (
              <Button disabled className="w-full">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Transaction...
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
