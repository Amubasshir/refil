import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Refii</h3>
            <p className="mb-4">Making mortgage refinancing simple and transparent.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Pre-Qualify</Link>
              </li>
              <li>
                <Link href="#">Compare Loans</Link>
              </li>
              <li>
                <Link href="#">Apply</Link>
              </li>
              <li>
                <Link href="#">Documents</Link>
              </li>
              <li>
                <Link href="#">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Legal</Link>
              </li>
              <li>
                <Link href="#">Privacy</Link>
              </li>
              <li>
                <Link href="#">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Refii. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

