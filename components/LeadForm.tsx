"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function LeadForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
    employmentStatus: "",
    annualIncome: "",
    creditScore: "",
    propertyType: "",
    propertyValue: "",
    currentLoanAmount: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your information has been submitted. We'll be in touch soon!",
        })
        router.push("/thank-you")
      } else {
        throw new Error("Failed to submit lead")
      }
    } catch (error) {
      console.error("Error submitting lead:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Get a Free Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Desired Loan Amount (AUD)</Label>
              <Input
                id="loanAmount"
                name="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanPurpose">Loan Purpose</Label>
              <Select onValueChange={handleSelectChange("loanPurpose")} value={formData.loanPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase a property</SelectItem>
                  <SelectItem value="refinance">Refinance existing mortgage</SelectItem>
                  <SelectItem value="investment">Investment property</SelectItem>
                  <SelectItem value="construction">Construction loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select onValueChange={handleSelectChange("employmentStatus")} value={formData.employmentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullTime">Full-time</SelectItem>
                  <SelectItem value="partTime">Part-time</SelectItem>
                  <SelectItem value="selfEmployed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income (AUD)</Label>
              <Input
                id="annualIncome"
                name="annualIncome"
                type="number"
                value={formData.annualIncome}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditScore">Credit Score</Label>
              <Select onValueChange={handleSelectChange("creditScore")} value={formData.creditScore}>
                <SelectTrigger>
                  <SelectValue placeholder="Select credit score range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (800+)</SelectItem>
                  <SelectItem value="veryGood">Very Good (740-799)</SelectItem>
                  <SelectItem value="good">Good (670-739)</SelectItem>
                  <SelectItem value="fair">Fair (580-669)</SelectItem>
                  <SelectItem value="poor">Poor (300-579)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select onValueChange={handleSelectChange("propertyType")} value={formData.propertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyValue">Estimated Property Value (AUD)</Label>
              <Input
                id="propertyValue"
                name="propertyValue"
                type="number"
                value={formData.propertyValue}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentLoanAmount">Current Loan Amount (AUD)</Label>
              <Input
                id="currentLoanAmount"
                name="currentLoanAmount"
                type="number"
                value={formData.currentLoanAmount}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Get My Free Quote
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

