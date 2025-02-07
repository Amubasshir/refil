"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLoanInfo } from "../LoanInfoContext"
import type React from "react"

export default function EmploymentInfo() {
  const { formData, updateFormData } = useLoanInfo()
  const { employment } = formData

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData("employment", { [name]: value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateFormData("employment", { [name]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employmentStatus">Employment Status</Label>
        <Select onValueChange={handleSelectChange("employmentStatus")} value={employment.employmentStatus}>
          <SelectTrigger>
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
        <Label htmlFor="employmentType">Employment Type</Label>
        <Select onValueChange={handleSelectChange("employmentType")} value={employment.employmentType}>
          <SelectTrigger>
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="permanent">Permanent</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="employerName">Employer Name</Label>
        <Input
          type="text"
          id="employerName"
          name="employerName"
          value={employment.employerName}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input type="text" id="jobTitle" name="jobTitle" value={employment.jobTitle} onChange={handleInputChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="yearsInCurrentJob">Years in Current Job</Label>
        <Input
          type="number"
          id="yearsInCurrentJob"
          name="yearsInCurrentJob"
          value={employment.yearsInCurrentJob}
          onChange={handleInputChange}
          min="0"
          step="0.5"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="annualIncome">Annual Income (AUD)</Label>
        <Input
          type="number"
          id="annualIncome"
          name="annualIncome"
          value={employment.annualIncome}
          onChange={handleInputChange}
          required
          min="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="additionalIncome">Additional Annual Income (AUD)</Label>
        <Input
          type="number"
          id="additionalIncome"
          name="additionalIncome"
          value={employment.additionalIncome}
          onChange={handleInputChange}
          min="0"
        />
      </div>
    </div>
  )
}

