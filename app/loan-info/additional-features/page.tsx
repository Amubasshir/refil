"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useLoanInfo } from "../LoanInfoContext"
import type React from "react" // Added import for React

export default function AdditionalFeatures() {
  const router = useRouter()
  const { formData, updateFormData } = useLoanInfo()
  const { additionalFeatures } = formData

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    updateFormData("additionalFeatures", { [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/loan-info/summary")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-lg font-semibold">Desired Loan Features</Label>
        {Object.entries(additionalFeatures).map(([feature, checked]) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox id={feature} checked={checked} onCheckedChange={handleCheckboxChange(feature)} />
            <Label htmlFor={feature}>
              {feature.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </Label>
          </div>
        ))}
      </div>
      <Button type="submit">Next: Summary</Button>
    </form>
  )
}

