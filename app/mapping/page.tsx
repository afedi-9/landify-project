"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Globe, Landmark, MapPin } from "lucide-react"
import { useState } from "react"

export default function PropertyMapping() {
  const [propertyType, setPropertyType] = useState("land")
  const [mapView, setMapView] = useState("map") // map or satellite

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Property Mapping</h2>
        <div className="flex items-center space-x-2">
          <Select value={mapView} onValueChange={setMapView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="map">Map View</SelectItem>
              <SelectItem value="satellite">Satellite View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* Map Section */}
        <Card className="col-span-4 md:col-span-5">
          <CardHeader>
            <CardTitle>Mark Your Property</CardTitle>
            <CardDescription>Draw the boundaries of your property on the map</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full h-[500px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {/* This would be replaced with an actual map integration */}
              <div className="text-center">
                <Globe className="h-16 w-16 mx-auto text-slate-400" />
                <p className="mt-4 text-slate-500">
                  Map integration would be implemented here with Google Maps or OpenStreetMap API
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Drop Pin
                  </Button>
                  <Button variant="outline" size="sm">
                    Draw Polygon
                  </Button>
                  <Button variant="outline" size="sm">
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details Form */}
        <Card className="col-span-4 md:col-span-2">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Enter information about your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="property-name">Property Name</Label>
              <Input id="property-name" placeholder="e.g. Residential Plot #1" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger id="property-type">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="building">Building</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property-address">Address</Label>
              <Textarea id="property-address" placeholder="Enter the physical address" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="property-area">Area (sq. m)</Label>
                <Input id="property-area" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property-value">Estimated Value</Label>
                <Input id="property-value" type="number" placeholder="0" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full">Save Property</Button>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Landmark className="mr-2 h-5 w-5" />
            How to Map Your Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">1. Use the map controls to navigate to your property location.</p>
            <p className="text-sm">
              2. Select either "Drop Pin" for a single point or "Draw Polygon" to mark the boundaries.
            </p>
            <p className="text-sm">3. Fill in the property details form with accurate information.</p>
            <p className="text-sm">4. Click "Save Property" to store your property information.</p>
            <p className="text-sm">5. After saving, you can proceed to tokenize your property.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
