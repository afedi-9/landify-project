"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, ExternalLink, Globe, MoreHorizontal, Users } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Properties() {
  // Mock data for properties
  const properties = [
    {
      id: 1,
      name: "Residential Plot #1",
      type: "Land",
      location: "123 Main St, City",
      tokenId: "0x1a2b3c...",
      status: "Tokenized",
      area: "500 sq. m",
      value: "$100,000",
      dateAdded: "2023-05-01",
      lastUpdated: "2023-05-15",
    },
    {
      id: 2,
      name: "Commercial Building",
      type: "Building",
      location: "456 Market Ave, City",
      tokenId: "0x4d5e6f...",
      status: "Tokenized",
      area: "1,200 sq. m",
      value: "$750,000",
      dateAdded: "2023-04-10",
      lastUpdated: "2023-04-20",
    },
    {
      id: 3,
      name: "Farm Land",
      type: "Land",
      location: "789 Rural Rd, County",
      tokenId: "",
      status: "Pending",
      area: "10,000 sq. m",
      value: "$250,000",
      dateAdded: "2023-03-15",
      lastUpdated: "2023-03-15",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Properties</h2>
        <div className="flex items-center space-x-2">
          <Link href="/mapping">
            <Button>Add New Property</Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="tokenized">Tokenized</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tokenized" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {properties
              .filter((p) => p.status === "Tokenized")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {properties
              .filter((p) => p.status === "Pending")
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PropertyCard({ property }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {property.type === "Land" ? (
              <Globe className="h-5 w-5 text-emerald-500" />
            ) : (
              <Building className="h-5 w-5 text-emerald-500" />
            )}
            <CardTitle>{property.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              {property.status === "Pending" && (
                <DropdownMenuItem>
                  <Link href={`/tokenize?id=${property.id}`} className="w-full">
                    Tokenize
                  </Link>
                </DropdownMenuItem>
              )}
              {property.status === "Tokenized" && <DropdownMenuItem>Transfer Ownership</DropdownMenuItem>}
              <DropdownMenuItem>Edit Property</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-slate-500">Area</p>
              <p className="font-medium">{property.area}</p>
            </div>
            <div>
              <p className="text-slate-500">Value</p>
              <p className="font-medium">{property.value}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                property.status === "Tokenized" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {property.status}
            </span>

            {property.status === "Tokenized" && (
              <div className="flex items-center text-xs text-slate-500">
                <span className="truncate max-w-[100px]">Token: {property.tokenId}</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2 border-t text-xs text-slate-500">
            <div>Added: {property.dateAdded}</div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>Owner</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
