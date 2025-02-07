"use client"

import { type ReactNode, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LoanInfoProvider, useLoanInfo } from "./LoanInfoContext"

const steps = [
  { name: "Employment", path: "/loan-info/employment" },
  { name: "Financial", path: "/loan-info/financial" },
  { name: "Loan Requirements", path: "/loan-info/loan-requirements" },
  { name: "Property", path: "/loan-info/property" },
  { name: "Additional Features", path: "/loan-info/additional-features" },
  { name: "Summary", path: "/loan-info/summary" },
]

function LoanInfoContent({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState(0)
  const { formData } = useLoanInfo()

  useEffect(() => {
    const stepIndex = steps.findIndex((step) => step.path === pathname)
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex)
    }
  }, [pathname])

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      router.push(steps[currentStep + 1].path)
    } else if (currentStep === steps.length - 1) {
      router.push("/comprehensive-comparison")
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      router.push(steps[currentStep - 1].path)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // Redirect to the comparison page
    router.push("/loan-comparison")
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Loan Information</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Step {currentStep + 1}: {steps[currentStep].name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4" />
          {children}
          <div className="flex justify-between mt-6">
            <Button onClick={goToPreviousStep} disabled={currentStep === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={goToNextStep}>
              {currentStep === steps.length - 1 ? "View Comprehensive Comparison" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoanInfoLayout({ children }: { children: ReactNode }) {
  return (
    <LoanInfoProvider>
      <LoanInfoContent>{children}</LoanInfoContent>
    </LoanInfoProvider>
  )
}

