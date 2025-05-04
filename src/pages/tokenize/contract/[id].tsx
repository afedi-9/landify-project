"use client"

import { useParams } from "react-router-dom"
import { ContractSigning } from "../../../components/blockchain/contract-signing"
import { Button } from "../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function ContractSigningPage() {
  const params = useParams()
  const propertyId = params.id as string
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
      contractAddress:
        "0x" +
        Array(40)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
    }

    // Simulate API call
    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 500)
  }, [propertyId])

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
        <Link to="/tokenize">
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

        <ContractSigning
          propertyId={property.id}
          propertyName={property.name}
          contractAddress={property.contractAddress}
        />
      </div>
    </div>
  )
}
