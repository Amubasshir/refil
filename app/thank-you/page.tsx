import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-xl mb-8">
        We've received your information and will be in touch shortly with your personalized quote.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

