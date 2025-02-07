import { CheckCircle } from "lucide-react"

export default function Features() {
  const features = [
    "AI-powered loan comparisons",
    "No commissions or hidden fees",
    "100% transparent process",
    "Instant, unbiased recommendations",
    "Save time with automated matching",
    "Tailored to your financial situation",
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Refii?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

