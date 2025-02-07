"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLoanInfo } from "../LoanInfoContext"
import type React from "react" // Added import for React

export default function LoanRequirements() {
  const { formData, updateFormData } = useLoanInfo()
  const { loanRequirements } = formData

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData("loanRequirements", { [name]: value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateFormData("loanRequirements", { [name]: value })
  }

  const handleRadioChange = (value: string) => {
    updateFormData("loanRequirements", { interestRatePreference: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="loanPurpose">Loan Purpose</Label>
        <Select onValueChange={handleSelectChange("loanPurpose")} value={loanRequirements.loanPurpose}>
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
        <Label htmlFor="loanAmount">Desired Loan Amount (AUD)</Label>
        <Input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={loanRequirements.loanAmount}
          onChange={handleInputChange}
          required
          min="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="loanTerm">Loan Term (Years)</Label>
        <Select onValueChange={handleSelectChange("loanTerm")} value={loanRequirements.loanTerm}>
          <SelectTrigger>
            <SelectValue placeholder="Select loan term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 years</SelectItem>
            <SelectItem value="20">20 years</SelectItem>
            <SelectItem value="25">25 years</SelectItem>
            <SelectItem value="30">30 years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Interest Rate Preference</Label>
        <RadioGroup onValueChange={handleRadioChange} value={loanRequirements.interestRatePreference}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed">Fixed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="variable" id="variable" />
            <Label htmlFor="variable">Variable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="split" id="split" />
            <Label htmlFor="split">Split (Fixed & Variable)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

