import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Loan Information | Refii",
  description: "Provide your loan information to get personalized refinancing options.",
}

export default function LoanInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to the Loan Information Form</h2>
      <p className="mb-4">
        Please complete all steps to provide us with the necessary information for your loan application.
      </p>
      <p>Click "Next" to begin with your employment information.</p>
    </div>
  )
}

