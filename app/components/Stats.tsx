import { Button } from "@/components/ui/button"

export default function Stats() {
  const stats = [
    { title: "Average Savings", value: "$5,000", description: "per annum on home loan repayments" },
    { title: "Cashback Potential", value: "0.5-2%", description: "of loan amount, typically paid to brokers" },
    { title: "Time Saved", value: "2 Weeks", description: "faster than traditional refinancing" },
    { title: "Total Savings", value: "$15,000+", description: "average combined savings and cashback" },
  ]

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Save Big with Self-Refinancing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl mb-2">{stat.title}</div>
              <div className="text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-lg">
          Join thousands of homeowners who have saved money, time, and earned cashback by self-refinancing with Refii.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button size="lg" variant="secondary">
            Compare Home Loans
          </Button>
          <Button size="lg" variant="outline">
            Calculate Cashback
          </Button>
        </div>
      </div>
    </section>
  )
}

