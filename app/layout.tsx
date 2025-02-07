import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Refii - Home Loan Refinancing",
  description: "Compare and refinance your home loan with Refii",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4">{/* Navigation items removed */}</nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100 py-4">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; 2023 Refii. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

