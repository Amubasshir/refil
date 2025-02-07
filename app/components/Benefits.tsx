import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function Benefits() {
  const benefits = [
    "Lower monthly repayments",
    "Reduce interest rates",
    "Shorten loan term",
    "Access home equity",
    "Earn 0.5-2% cashback",
    "Keep broker commissions",
    "Full control over process",
    "Transparent comparisons",
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Self-Refinancing with Refii</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" />
                <span>{benefit}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-grey-600">
                {benefit === "Earn 0.5-2% cashback"
                  ? "Receive the commission typically paid to brokers directly as cashback."
                  : benefit === "Keep broker commissions"
                    ? "By self-refinancing, you keep the fees usually paid to middlemen."
                    : "Enjoy the benefits of refinancing while maintaining full control over the process."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

