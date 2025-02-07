import Link from "next/link"
import { Button } from "@/components/Button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Refii
        </Link>
        <nav className="flex space-x-2">
          <Button variant="outline" asChild className="w-24">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="w-24">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

