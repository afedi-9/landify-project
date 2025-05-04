"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Building, ExternalLink, Filter, Globe, Shield } from "lucide-react"
import { useState } from "react"

export default function Transactions() {
  const [filterType, setFilterType] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")

  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      type: "Tokenization",
      property: "Residential Plot #1",
      propertyType: "Land",
      date: "2023-05-01",
      status: "Completed",
      hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      from: "0xYou",
      to: "N/A",
      fee: "0.001 SONIC",
    },
    {
      id: 2,
      type: "Transfer",
      property: "Commercial Building",
      propertyType: "Building",
      date: "2023-04-15",
      status: "Completed",
      hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u",
      from: "0xYou",
      to: "0xBuyer123",
      fee: "0.002 SONIC",
    },
    {
      id: 3,
      type: "Co-ownership",
      property: "Farm Land",
      propertyType: "Land",
      date: "2023-03-22",
      status: "Pending",
      hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
      from: "0xYou",
      to: "0xPartner456",
      fee: "0.0015 SONIC",
    },
  ]

  // Filter transactions based on type
  const filteredTransactions =
    filterType === "all" ? transactions : transactions.filter((t) => t.type.toLowerCase() === filterType.toLowerCase())

  // Sort transactions based on date
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="Search transactions..." />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tokenization">Tokenization</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="co-ownership">Co-ownership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        {sortedTransactions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Shield className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500">No transactions found</p>
            </CardContent>
          </Card>
        ) : (
          sortedTransactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900">
                      <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{transaction.type}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        {transaction.propertyType === "Land" ? (
                          <Globe className="h-4 w-4" />
                        ) : (
                          <Building className="h-4 w-4" />
                        )}
                        <span>{transaction.property}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-slate-400">
                        <span>Date: {transaction.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Transaction Hash</p>
                    <div className="flex items-center">
                      <p className="text-sm font-mono truncate max-w-[250px]">{transaction.hash}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">From</p>
                      <p className="text-sm font-mono truncate">{transaction.from}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">To</p>
                      <p className="text-sm font-mono truncate">{transaction.to}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Transaction Fee</p>
                    <p className="text-sm">{transaction.fee}</p>
                  </div>

                  <div className="flex items-center text-emerald-600">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {transaction.type === "Transfer"
                        ? "Transferred"
                        : transaction.type === "Tokenization"
                          ? "Tokenized"
                          : "Shared"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
