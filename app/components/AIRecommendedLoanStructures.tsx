import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BrainCircuit } from "lucide-react"

export function AIRecommendedLoanStructures() {
  const recommendations = [
    {
      title: "Offset Account",
      description: "Consider an offset account to reduce interest payments while maintaining access to your funds.",
    },
    {
      title: "Split Loan",
      description: "A combination of fixed and variable rates can provide both stability and flexibility.",
    },
    {
      title: "Interest-Only Period",
      description:
        "An initial interest-only period could lower your repayments in the short term, but consider the long-term implications.",
    },
    {
      title: "Line of Credit",
      description: "If you're looking to access equity, a line of credit portion could be beneficial.",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6" />
          AI-Recommended Loan Structures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{rec.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Alert className="mt-6">
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            These are general recommendations. Please consult with a financial advisor for personalized advice.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

