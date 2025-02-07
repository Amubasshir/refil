import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GetStarted() {
  const documents = [
    "Proof of identity (e.g., driver's license, passport)",
    "Proof of income (e.g., pay slips, tax returns)",
    "Bank statements (last 3 months)",
    "Current mortgage statement (for refinancing)",
    "Property information (e.g., council rates notice)",
    "Assets and liabilities statement",
  ]

  const steps = [
    "Complete the online application form",
    "Upload required documents",
    "Review and confirm your information",
    "Submit your application",
    "Wait for our team to process your application",
    "Receive and review your loan offer",
    "Accept the offer and finalize the loan",
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Get Started with Your Loan Application</h1>

      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {documents.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Application Process</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-lg">Ready to proceed with your loan application?</p>
        <Button asChild size="lg">
          <Link href="/document-collection">Start Your Application</Link>
        </Button>
      </div>
    </div>
  )
}

