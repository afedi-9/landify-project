"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Globe, Landmark, LayoutDashboard, Plus, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for properties
  const properties = [
    {
      id: 1,
      name: "Residential Plot #1",
      type: "Land",
      location: "123 Main St, City",
      tokenId: "0x1a2b3c...",
      status: "Tokenized",
    },
    {
      id: 2,
      name: "Commercial Building",
      type: "Building",
      location: "456 Market Ave, City",
      tokenId: "0x4d5e6f...",
      status: "Tokenized",
    },
    {
      id: 3,
      name: "Farm Land",
      type: "Land",
      location: "789 Rural Rd, County",
      tokenId: "0x7g8h9i...",
      status: "Pending",
    },
  ]

  // Mock data for recent transactions
  const transactions = [
    { id: 1, type: "Tokenization", property: "Residential Plot #1", date: "2023-05-01", status: "Completed" },
    { id: 2, type: "Transfer", property: "Commercial Building", date: "2023-04-15", status: "Completed" },
    { id: 3, type: "Co-ownership", property: "Farm Land", date: "2023-03-22", status: "Pending" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/mapping">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokenized</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">No change from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Properties and Transactions */}
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
                <CardDescription>You have {properties.length} properties in your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {properties.slice(0, 2).map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center space-x-4">
                      {property.type === "Land" ? (
                        <Globe className="h-8 w-8 text-emerald-500" />
                      ) : (
                        <Building className="h-8 w-8 text-emerald-500" />
                      )}
                      <div>
                        <p className="font-medium">{property.name}</p>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          property.status === "Tokenized"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("properties")}>
                  View All Properties
                </Button>
              </CardFooter>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>You have {transactions.length} recent transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {transactions.slice(0, 2).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.property}</p>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("transactions")}>
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>Manage your tokenized and pending properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    {property.type === "Land" ? (
                      <Globe className="h-10 w-10 text-emerald-500" />
                    ) : (
                      <Building className="h-10 w-10 text-emerald-500" />
                    )}
                    <div>
                      <p className="font-medium text-lg">{property.name}</p>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                      {property.status === "Tokenized" && (
                        <p className="text-xs text-slate-500">Token ID: {property.tokenId}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        property.status === "Tokenized"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {property.status}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {property.status === "Pending" && (
                        <Link href={`/tokenize?id=${property.id}`}>
                          <Button size="sm">Tokenize</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/mapping" className="w-full">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Property
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View your property transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-start space-x-4">
                    <div className="mt-1">
                      <Shield className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{transaction.type}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.property}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">Date: {transaction.date}</p>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-slate-500">
                          Transaction Hash: 0x{Math.random().toString(16).substring(2, 10)}...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
