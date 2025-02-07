import Link from "next/link"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import Features from "./components/Features"
import AIComparison from "./components/AIComparison"
import Benefits from "./components/Benefits"
import Process from "./components/Process"
import Testimonials from "./components/Testimonials"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import CashbackCalculator from "./components/CashbackCalculator"
import { LeadForm } from "@/components/LeadForm"

export default function Home() {
  return (
    <div className="min-h-screen bg-grey-50">
      <Header />
      <div className="mt-4 text-center">
        <Link href="/admin/login" className="text-sm text-gray-600 hover:text-gray-800">
          Admin Access
        </Link>
      </div>
      <main>
        <Hero />
        <LeadForm />
        <Stats />
        <Features />
        <CashbackCalculator />
        <AIComparison />
        <Benefits />
        <Process />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

