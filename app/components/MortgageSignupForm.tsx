"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const steps = ["Your Details", "Loan Requirements", "Additional Information"]

export default function LoanComparisonForm({ redirect }: { redirect?: string }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employmentStatus: "",
    annualIncome: "",
    loanAmount: "",
    propertyValue: "",
    propertyType: "",
    propertyUse: "",
    creditScore: "",
    loanFeatures: {
      cashbackIncentive: false,
      offsetAccount: false,
      redrawFacility: false,
      fixedInterestRatePeriod: false,
      splitLoan: false,
      extraRepayments: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      loanFeatures: {
        ...prevData.loanFeatures,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    if (redirect) {
      router.push(redirect)
    }
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Your Details</h3>
              <p className="text-gray-600 mb-4">
                Please provide your basic information to help us find the best loan options for you to compare.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
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
                  type="number"
                  id="annualIncome"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Loan Requirements</h3>
              <p className="text-gray-600 mb-4">
                Tell us about the loan you're looking for and the property you're interested in.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Desired Loan Amount (AUD)</Label>
                <Input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Estimated Property Value (AUD)</Label>
                <Input
                  type="number"
                  id="propertyValue"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
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
                <Label htmlFor="propertyUse">Property Use</Label>
                <Select onValueChange={handleSelectChange("propertyUse")} value={formData.propertyUse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property use" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ownerOccupied">Owner Occupied</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
              <p className="text-gray-600 mb-4">
                Provide any additional details that can help us find the best loan options for you.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="creditScore">Credit Score (if known)</Label>
                <Input
                  type="number"
                  id="creditScore"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleInputChange}
                  min="0"
                  max="1000"
                />
                <p className="text-sm text-gray-500">Leave blank if you're unsure. We can help you check this later.</p>
              </div>
              <div className="space-y-2">
                <Label>Select the loan features that interest you:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cashbackIncentive"
                      checked={formData.loanFeatures.cashbackIncentive}
                      onCheckedChange={handleCheckboxChange("cashbackIncentive")}
                    />
                    <Label htmlFor="cashbackIncentive">Cashback Incentive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="offsetAccount"
                      checked={formData.loanFeatures.offsetAccount}
                      onCheckedChange={handleCheckboxChange("offsetAccount")}
                    />
                    <Label htmlFor="offsetAccount">Offset Account</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="redrawFacility"
                      checked={formData.loanFeatures.redrawFacility}
                      onCheckedChange={handleCheckboxChange("redrawFacility")}
                    />
                    <Label htmlFor="redrawFacility">Redraw Facility</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fixedInterestRatePeriod"
                      checked={formData.loanFeatures.fixedInterestRatePeriod}
                      onCheckedChange={handleCheckboxChange("fixedInterestRatePeriod")}
                    />
                    <Label htmlFor="fixedInterestRatePeriod">Fixed Interest Rate Period</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="splitLoan"
                      checked={formData.loanFeatures.splitLoan}
                      onCheckedChange={handleCheckboxChange("splitLoan")}
                    />
                    <Label htmlFor="splitLoan">Split Loan (Fixed and Variable)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="extraRepayments"
                      checked={formData.loanFeatures.extraRepayments}
                      onCheckedChange={handleCheckboxChange("extraRepayments")}
                    />
                    <Label htmlFor="extraRepayments">Extra Repayments Allowed</Label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Loan Comparison Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <span key={index} className={`text-sm ${index === currentStep ? "font-bold" : ""}`}>
                {step}
              </span>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button type="submit" onClick={handleSubmit}>
            Get Loan Comparisons
          </Button>
        ) : (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

