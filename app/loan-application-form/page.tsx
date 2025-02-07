"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Zap, AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoanApplicationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    maritalStatus: "",
    dependents: 0,

    // Employment Information
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    yearsInCurrentJob: 0,
    annualIncome: 50000,
    additionalIncome: 0,

    // Financial Information
    creditScore: "",
    monthlyExpenses: 0,
    existingDebts: 0,
    bankruptcyHistory: "",
    savingsBalance: 0,

    // Property Information
    propertyType: "",
    propertyValue: 500000,
    propertyAddress: "",
    propertyUsage: "",

    // Loan Requirements
    loanAmount: 400000,
    loanPurpose: "",
    loanTerm: 30,
    interestRatePreference: "",

    // Additional Features
    desiredFeatures: {
      offsetAccount: false,
      redrawFacility: false,
      extraRepayments: false,
      interestOnly: false,
      fixedRate: false,
      splitLoan: false,
    },
  })

  const [demoMode, setDemoMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string) => (value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      desiredFeatures: { ...prev.desiredFeatures, [name]: checked },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/comprehensive-comparison")
  }

  const handleSkip = () => {
    console.log("Skipping loan application form")
    router.push("/comprehensive-comparison")
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Enter Your Details</h1>
      <div className="flex items-center justify-end space-x-2 mb-4">
        <Label htmlFor="demo-mode" className="text-sm font-medium text-white">
          Demo Mode
        </Label>
        <Switch id="demo-mode" checked={demoMode} onCheckedChange={setDemoMode} />
      </div>

      {demoMode && (
        <Alert className="bg-green-900 border-green-700 mb-4">
          <Zap className="h-4 w-4" />
          <AlertTitle>Demo Mode Active</AlertTitle>
          <AlertDescription>
            You can now skip filling out the form and proceed directly to the comprehensive comparison.
          </AlertDescription>
        </Alert>
      )}

      <Card className="max-w-4xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Please provide your details for accurate AI loan suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-white">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus" className="text-white">
                    Marital Status
                  </Label>
                  <Select onValueChange={handleSelectChange("maritalStatus")} value={formData.maritalStatus}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependents" className="text-white">
                    Number of Dependents
                  </Label>
                  <Input
                    id="dependents"
                    name="dependents"
                    type="number"
                    value={formData.dependents}
                    onChange={handleInputChange}
                    min={0}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Employment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus" className="text-white">
                    Employment Status
                  </Label>
                  <Select onValueChange={handleSelectChange("employmentStatus")} value={formData.employmentStatus}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullTime">Full-time</SelectItem>
                      <SelectItem value="partTime">Part-time</SelectItem>
                      <SelectItem value="selfEmployed">Self-employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employerName" className="text-white">
                    Employer Name
                  </Label>
                  <Input
                    id="employerName"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-white">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearsInCurrentJob" className="text-white">
                    Years in Current Job
                  </Label>
                  <Input
                    id="yearsInCurrentJob"
                    name="yearsInCurrentJob"
                    type="number"
                    value={formData.yearsInCurrentJob}
                    onChange={handleInputChange}
                    min={0}
                    step={0.5}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome" className="text-white">
                    Annual Income (AUD)
                  </Label>
                  <Slider
                    id="annualIncome"
                    min={0}
                    max={1000000}
                    step={1000}
                    value={[formData.annualIncome]}
                    onValueChange={handleSliderChange("annualIncome")}
                  />
                  <div className="text-right text-sm">${formData.annualIncome.toLocaleString()}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalIncome" className="text-white">
                    Additional Annual Income (AUD)
                  </Label>
                  <Input
                    id="additionalIncome"
                    name="additionalIncome"
                    type="number"
                    value={formData.additionalIncome}
                    onChange={handleInputChange}
                    min={0}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditScore" className="text-white">
                    Credit Score
                  </Label>
                  <Select onValueChange={handleSelectChange("creditScore")} value={formData.creditScore}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
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
                  <Label htmlFor="monthlyExpenses" className="text-white">
                    Monthly Expenses (AUD)
                  </Label>
                  <Input
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={handleInputChange}
                    min={0}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="existingDebts" className="text-white">
                    Existing Debts (AUD)
                  </Label>
                  <Input
                    id="existingDebts"
                    name="existingDebts"
                    type="number"
                    value={formData.existingDebts}
                    onChange={handleInputChange}
                    min={0}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankruptcyHistory" className="text-white">
                    Bankruptcy History
                  </Label>
                  <Select onValueChange={handleSelectChange("bankruptcyHistory")} value={formData.bankruptcyHistory}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select bankruptcy history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never filed for bankruptcy</SelectItem>
                      <SelectItem value="past7Years">Filed within the past 7 years</SelectItem>
                      <SelectItem value="moreThan7Years">Filed more than 7 years ago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savingsBalance" className="text-white">
                    Savings Balance (AUD)
                  </Label>
                  <Input
                    id="savingsBalance"
                    name="savingsBalance"
                    type="number"
                    value={formData.savingsBalance}
                    onChange={handleInputChange}
                    min={0}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Property Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType" className="text-white">
                    Property Type
                  </Label>
                  <Select onValueChange={handleSelectChange("propertyType")} value={formData.propertyType}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
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
                  <Label htmlFor="propertyValue" className="text-white">
                    Estimated Property Value (AUD)
                  </Label>
                  <Slider
                    id="propertyValue"
                    min={100000}
                    max={2000000}
                    step={10000}
                    value={[formData.propertyValue]}
                    onValueChange={handleSliderChange("propertyValue")}
                  />
                  <div className="text-right text-sm">${formData.propertyValue.toLocaleString()}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyAddress" className="text-white">
                    Property Address
                  </Label>
                  <Input
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyUsage" className="text-white">
                    Property Usage
                  </Label>
                  <Select onValueChange={handleSelectChange("propertyUsage")} value={formData.propertyUsage}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select property usage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primaryResidence">Primary Residence</SelectItem>
                      <SelectItem value="investmentProperty">Investment Property</SelectItem>
                      <SelectItem value="vacationHome">Vacation Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Loan Requirements */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Loan Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount" className="text-white">
                    Desired Loan Amount (AUD)
                  </Label>
                  <Slider
                    id="loanAmount"
                    min={100000}
                    max={1500000}
                    step={10000}
                    value={[formData.loanAmount]}
                    onValueChange={handleSliderChange("loanAmount")}
                  />
                  <div className="text-right text-sm">${formData.loanAmount.toLocaleString()}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanPurpose" className="text-white">
                    Loan Purpose
                  </Label>
                  <Select onValueChange={handleSelectChange("loanPurpose")} value={formData.loanPurpose}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
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
                  <Label htmlFor="loanTerm" className="text-white">
                    Loan Term (Years)
                  </Label>
                  <Slider
                    id="loanTerm"
                    min={1}
                    max={30}
                    step={1}
                    value={[formData.loanTerm]}
                    onValueChange={handleSliderChange("loanTerm")}
                  />
                  <div className="text-right text-sm">{formData.loanTerm} years</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRatePreference" className="text-white">
                    Interest Rate Preference
                  </Label>
                  <Select
                    onValueChange={handleSelectChange("interestRatePreference")}
                    value={formData.interestRatePreference}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select interest rate preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Rate</SelectItem>
                      <SelectItem value="variable">Variable Rate</SelectItem>
                      <SelectItem value="split">Split Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Desired Loan Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.desiredFeatures).map(([feature, checked]) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox id={feature} checked={checked} onCheckedChange={handleCheckboxChange(feature)} />
                    <Label htmlFor={feature} className="text-white">
                      {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, " $1")}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Submit and View Comprehensive Comparison <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button type="button" onClick={handleSkip} className="bg-yellow-500 hover:bg-yellow-600">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Skip Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

