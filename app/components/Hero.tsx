import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Refinance Your Home Loan and Keep the Broker Fee</h1>
        <p className="text-xl mb-8">
          Self-refinance with AI-powered comparisons and tools. Earn 0.5-2% cashback typically paid to brokers.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/signup">Compare Home Loans</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/signup">Calculate Savings</Link>
          </Button>
        </div>
      </div>
      <div className="md:w-1/2">
        <Image
          src="/placeholder.svg"
          alt="Happy family receiving a cashback cheque"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  )
}

