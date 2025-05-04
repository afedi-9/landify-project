"use client"

import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { Building, Check, Globe, Landmark, Shield } from "lucide-react"

export default function TokenizePage() {
  const [step, setStep] = useState(1)
  const [propertyId, setPropertyId] = useState("")
  const [ownershipType, setOwnershipType] = useState("full")
  const location = useLocation()

  // Get property ID from URL query params if available
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get("id")
    if (id) {
      setPropertyId(id)
    }
  }, [location.search])

  // Mock property data - in a real app, this would be fetched based on the propertyId
  const property = {
    id: "1",
    name: "Residential Plot #1",
    type: "Land",
    location: "123 Main St, City",
    area: "500",
    value: "100000",
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    // In a real app, this would submit the tokenization request to the blockchain
    alert("Property tokenization initiated!")
    // Redirect to dashboard or confirmation page
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tokenize Property</h2>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
            }`}
          >
            {step > 1 ? <Check className="h-5 w-5" /> : "1"}
          </div>
          <span className="text-sm mt-2">Select Property</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`h-1 w-full ${step > 1 ? "bg-emerald-200" : "bg-slate-200"}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
            }`}
          >
            {step > 2 ? <Check className="h-5 w-5" /> : "2"}
          </div>
          <span className="text-sm mt-2">Ownership Details</span>
        </div>
        <div className="flex-1 flex items-center">
          <div className={`h-1 w-full ${step > 2 ? "bg-emerald-200" : "bg-slate-200"}`}></div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
            }`}
          >
            {step > 3 ? <Check className="h-5 w-5" /> : "3"}
          </div>
          <span className="text-sm mt-2">Review & Mint</span>
        </div>
      </div>

      {/* Step 1: Select Property */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Property</CardTitle>
            <CardDescription>Choose a property to tokenize from your saved properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="property-select">Property</Label>
              <Select value={propertyId} onValueChange={setPropertyId}>
                <SelectTrigger id="property-select">
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Residential Plot #1</SelectItem>
                  <SelectItem value="2">Commercial Building</SelectItem>
                  <SelectItem value="3">Farm Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {propertyId && (
              <div className="border rounded-md p-4 mt-4">
                <div className="flex items-start space-x-4">
                  {property.type === "Land" ? (
                    <Globe className="h-10 w-10 text-emerald-500 mt-1" />
                  ) : (
                    <Building className="h-10 w-10 text-emerald-500 mt-1" />
                  )}
                  <div className="space-y-1 flex-1">
                    <h3 className="font-medium">{property.name}</h3>
                    <p className="text-sm text-slate-500">{property.location}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-xs text-slate-400">Area</p>
                        <p className="text-sm">{property.area} sq. m</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Estimated Value</p>
                        <p className="text-sm">${property.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!propertyId}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Ownership Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Ownership Details</CardTitle>
            <CardDescription>Specify ownership type and additional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ownership-type">Ownership Type</Label>
              <Select value={ownershipType} onValueChange={setOwnershipType}>
                <SelectTrigger id="ownership-type">
                  <SelectValue placeholder="Select ownership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Ownership</SelectItem>
                  <SelectItem value="shared">Shared Ownership</SelectItem>
                  <SelectItem value="leased">Leased Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {ownershipType === "shared" && (
              <div className="space-y-4 border-t pt-4 mt-4">
                <h3 className="font-medium">Co-owners</h3>
                <div className="space-y-2">
                  <Label htmlFor="co-owner-address">Co-owner Wallet Address</Label>
                  <Input id="co-owner-address" placeholder="0x..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownership-percentage">Ownership Percentage</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="ownership-percentage" type="number" placeholder="50" />
                    <span>%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Add Another Co-owner
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additional-info">Additional Information</Label>
              <Textarea id="additional-info" placeholder="Any additional details about the property ownership" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Review & Mint */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Mint Token</CardTitle>
            <CardDescription>Review property details and mint your NFT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <Landmark className="h-12 w-12 text-emerald-600" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Property Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p>{property.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Type</p>
                    <p>{property.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <p>{property.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Area</p>
                    <p>{property.area} sq. m</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium mb-2">Ownership Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Ownership Type</p>
                    <p className="capitalize">{ownershipType}</p>
                  </div>
                  {ownershipType === "shared" && (
                    <div>
                      <p className="text-sm text-slate-500">Co-owners</p>
                      <p>1 co-owner</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Tokenization Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Blockchain</p>
                    <p>Sonic</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Token Standard</p>
                    <p>ERC-721 (NFT)</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Gas Fee (estimated)</p>
                    <p>0.001 SONIC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-slate-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  By proceeding, you confirm that you are the legal owner of this property and have the right to
                  tokenize it.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Mint NFT</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
