"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/FileUploader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Info } from "lucide-react"
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

export default function DocumentCollection() {
  const router = useRouter()
  const [uploadedDocuments, setUploadedDocuments] = useState<{ [key: string]: File }>({})
  const [demoMode, setDemoMode] = useState(false)

  const handleFileUpload = (documentName: string, file: File) => {
    setUploadedDocuments((prev) => ({ ...prev, [documentName]: file }))
  }

  const handleSubmit = () => {
    // In a real application, you would upload the documents to your server here
    console.log("Uploaded documents:", uploadedDocuments)
    router.push("/loan-progress-tracker")
  }

  const handleDemoProgress = () => {
    router.push("/loan-progress-tracker")
  }

  const totalDocuments = documentCategories.reduce((sum, category) => sum + category.documents.length, 0)
  const uploadedDocumentsCount = Object.keys(uploadedDocuments).length

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Document Collection</h1>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Switch id="demo-mode-toggle" checked={demoMode} onCheckedChange={setDemoMode} />
        <Label htmlFor="demo-mode-toggle">Demo Mode</Label>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Document Upload</AlertTitle>
        <AlertDescription>
          Please upload as many documents as you can. The more documents you provide, the smoother your application
          process will be.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {documentCategories.map((category, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  {category.documents.map((doc) => (
                    <div key={doc} className="flex items-center space-x-4 mb-2">
                      <FileUploader
                        onFileSelect={(file) => handleFileUpload(doc, file)}
                        acceptedFileTypes=".pdf,.jpg,.png,.doc,.docx"
                        maxFileSize={10 * 1024 * 1024} // 10MB
                      />
                      <div>
                        <p className="font-semibold">{doc}</p>
                      </div>
                      {uploadedDocuments[doc] && <CheckCircle className="text-green-500 h-6 w-6" />}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle>Upload Progress</AlertTitle>
        <AlertDescription>
          You have uploaded {uploadedDocumentsCount} out of {totalDocuments} recommended documents.
        </AlertDescription>
      </Alert>

      <div className="text-center space-y-4">
        <Button onClick={handleSubmit}>Submit Documents and Continue</Button>
        {demoMode && (
          <Button onClick={handleDemoProgress} variant="secondary">
            Go to Loan Progress (Demo)
          </Button>
        )}
      </div>
    </div>
  )
}

