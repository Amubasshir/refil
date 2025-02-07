"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLoanInfo } from "../LoanInfoContext"
import type React from "react"

export default function FinancialInfo() {
  const { formData, updateFormData } = useLoanInfo()
  const { financial } = formData

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData("financial", { [name]: value })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    updateFormData("financial", { [name]: value })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="creditScore">Credit Score</Label>
        <Select onValueChange={handleSelectChange("creditScore")} value={financial.creditScore}>
          <SelectTrigger>
            <SelectValue placeholder="Select credit score range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent (800+)</SelectItem>
            <SelectItem value="veryGood">Very Good (740-799)</SelectItem>
            <SelectItem value="good">Good (670-739)</SelectItem>
            <SelectItem value="fair">Fair (580-669)</SelectItem>
            <SelectItem value="poor">Poor (300-579)</SelectItem>
            <SelectItem value="unknown">I don't know</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyDebts">Total Monthly Debts (AUD)</Label>
        <Input
          type="number"
          id="monthlyDebts"
          name="monthlyDebts"
          value={financial.monthlyDebts}
          onChange={handleInputChange}
          min="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bankruptcyHistory">Bankruptcy History</Label>
        <Select onValueChange={handleSelectChange("bankruptcyHistory")} value={financial.bankruptcyHistory}>
          <SelectTrigger>
            <SelectValue placeholder="Select bankruptcy history" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never filed for bankruptcy</SelectItem>
            <SelectItem value="moreThan7Years">Filed more than 7 years ago</SelectItem>
            <SelectItem value="lessThan7Years">Filed less than 7 years ago</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

