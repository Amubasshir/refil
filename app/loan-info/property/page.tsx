"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLoanInfo } from "../LoanInfoContext"
import type React from "react"

export default function PropertyInfo() {
  const { formData, updateFormData } = useLoanInfo()
  const { property } = formData

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData("property", { [name]: value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateFormData("property", { [name]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="propertyType">Property Type</Label>
        <Select onValueChange={handleSelectChange("propertyType")} value={property.propertyType}>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="land">Land</SelectItem>
            <SelectItem value="commercial">Commercial Property</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="propertyUse">Property Use</Label>
        <Select onValueChange={handleSelectChange("propertyUse")} value={property.propertyUse}>
          <SelectTrigger>
            <SelectValue placeholder="Select property use" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ownerOccupied">Owner Occupied</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
            <SelectItem value="vacationHome">Vacation Home</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="propertyValue">Estimated Property Value (AUD)</Label>
        <Input
          type="number"
          id="propertyValue"
          name="propertyValue"
          value={property.propertyValue}
          onChange={handleInputChange}
          required
          min="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="propertyAddress">Property Address</Label>
        <Input
          type="text"
          id="propertyAddress"
          name="propertyAddress"
          value={property.propertyAddress}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="propertyCity">City</Label>
        <Input
          type="text"
          id="propertyCity"
          name="propertyCity"
          value={property.propertyCity}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="propertyState">State</Label>
        <Select onValueChange={handleSelectChange("propertyState")} value={property.propertyState}>
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NSW">New South Wales</SelectItem>
            <SelectItem value="VIC">Victoria</SelectItem>
            <SelectItem value="QLD">Queensland</SelectItem>
            <SelectItem value="WA">Western Australia</SelectItem>
            <SelectItem value="SA">South Australia</SelectItem>
            <SelectItem value="TAS">Tasmania</SelectItem>
            <SelectItem value="ACT">Australian Capital Territory</SelectItem>
            <SelectItem value="NT">Northern Territory</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="propertyZip">Postcode</Label>
        <Input
          type="text"
          id="propertyZip"
          name="propertyZip"
          value={property.propertyZip}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

