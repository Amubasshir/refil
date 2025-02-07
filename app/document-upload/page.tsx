"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/FileUploader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Info, Upload, Zap, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const documentCategories = [
  {
    name: "Identification",
    documents: ["Driver's License", "Passport", "Medicare Card", "Proof of Age Card"],
  },
  {
    name: "Income Verification",
    documents: [
      "Recent Payslips (last 2-3)",
      "Employment Contract",
      "Tax Returns (last 2 years)",
      "Notice of Assessment (last 2 years)",
      "Bank Statements (last 3 months)",
      "Centrelink Income Statement",
    ],
  },
  {
    name: "Assets",
    documents: [
      "Bank Statements (savings/investment accounts)",
      "Superannuation Statements",
      "Share Certificates",
      "Trust Deeds",
    ],
  },
  {
    name: "Liabilities",
    documents: [
      "Credit Card Statements",
      "Personal Loan Statements",
      "Car Loan Statements",
      "HECS/HELP Debt Statement",
    ],
  },
  {
    name: "Property Documents",
    documents: [
      "Council Rates Notice",
      "Water Rates Notice",
      "Strata Levies Notice (if applicable)",
      "Current Home Insurance Policy",
      "Rental Income Statement (for investment properties)",
    ],
  },
  {
    name: "Refinance Documents",
    documents: ["Current Home Loan Statements (last 6 months)", "Mortgage Discharge Authority"],
  },
  {
    name: "Self-Employed Additional Documents",
    documents: [
      "Business Activity Statements (BAS)",
      "Business Bank Statements (last 6 months)",
      "Profit and Loss Statements",
      "Balance Sheets",
    ],
  },
]

export default function DocumentUpload() {
  const router = useRouter()
  const [uploadedDocuments, setUploadedDocuments] = useState<{ [key: string]: File }>({})
  const [demoMode, setDemoMode] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const handleFileUpload = (documentName: string, file: File) => {
    setUploadedDocuments((prev) => ({ ...prev, [documentName]: file }))
  }

  const handleSubmit = () => {
    console.log("Uploaded documents:", uploadedDocuments)
    router.push("/loan-progress-tracker")
  }

  const handleDemoSkip = () => {
    console.log("Demo mode: Skipping document upload")
    router.push("/loan-progress-tracker")
  }

  const handleCategorySkip = (categoryName: string) => {
    console.log(`Skipped category: ${categoryName}`)
    setExpandedCategories(expandedCategories.filter((cat) => cat !== categoryName))
  }

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((cat) => cat !== categoryName) : [...prev, categoryName],
    )
  }

  const totalDocuments = documentCategories.reduce((sum, category) => sum + category.documents.length, 0)
  const uploadedDocumentsCount = Object.keys(uploadedDocuments).length
  const uploadProgress = (uploadedDocumentsCount / totalDocuments) * 100

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Enter Your Details</h1>

      <div className="flex items-center justify-end space-x-2 mb-4">
        <Label htmlFor="demo-mode" className="text-sm font-medium text-white">
          Demo Mode
        </Label>
        <Switch id="demo-mode" checked={demoMode} onCheckedChange={setDemoMode} />
      </div>

      <Alert className="bg-blue-900 border-blue-700">
        <Info className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          {demoMode
            ? "Demo Mode is active. You can skip the document upload process or individual categories."
            : "Please upload as many documents as possible. You can proceed without uploading all documents, but providing more information will help expedite your application."}
        </AlertDescription>
      </Alert>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Upload className="mr-2 h-6 w-6 text-blue-400" />
            Required Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="multiple" value={expandedCategories} className="w-full">
            {documentCategories.map((category, index) => (
              <AccordionItem value={category.name} key={index}>
                <div className="flex items-center justify-between">
                  <AccordionTrigger onClick={() => toggleCategory(category.name)} className="text-white">
                    {category.name}
                  </AccordionTrigger>
                  {!expandedCategories.includes(category.name) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCategorySkip(category.name)
                      }}
                      className="text-white border-white hover:bg-gray-700"
                    >
                      Skip
                    </Button>
                  )}
                </div>
                <AccordionContent>
                  {category.documents.map((doc) => (
                    <div key={doc} className="flex items-center space-x-4 mb-2 bg-gray-700 p-4 rounded-lg">
                      <FileUploader
                        onFileSelect={(file) => handleFileUpload(doc, file)}
                        acceptedFileTypes=".pdf,.jpg,.png,.doc,.docx"
                        maxFileSize={10 * 1024 * 1024} // 10MB
                      />
                      <div className="flex-grow">
                        <p className="font-semibold text-white">{doc}</p>
                      </div>
                      {uploadedDocuments[doc] && <CheckCircle className="text-green-500 h-6 w-6 flex-shrink-0" />}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Upload Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={uploadProgress} className="w-full" />
          <p className="mt-2 text-center text-white">
            {uploadedDocumentsCount} out of {totalDocuments} documents uploaded
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
          Submit Documents and Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {demoMode && (
          <Button onClick={handleDemoSkip} className="bg-green-500 hover:bg-green-600 text-white">
            <Zap className="mr-2 h-4 w-4" />
            Skip All (Demo Mode)
          </Button>
        )}
      </div>
    </div>
  )
}

