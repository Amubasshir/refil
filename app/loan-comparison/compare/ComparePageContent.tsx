"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface LoanOption {
  id: string
  bank: string
  interestRate: number
  comparisonRate: number
  monthlyRepayment: number
  totalRepayment: number
  savings: number
  loanType: string
  loanTerm: number
  maxLTV: number
  features: {
    cashbackIncentive: boolean
    offsetAccount: boolean
    redrawFacility: boolean
    fixedInterestRatePeriod: boolean
    splitLoan: boolean
    extraRepayments: boolean
  }
}

const baseLoanOptions: LoanOption[] = [
  {
    id: "1",
    bank: "Refii Bank",
    interestRate: 3.29,
    comparisonRate: 3.32,
    monthlyRepayment: 1965,
    totalRepayment: 707400,
    savings: 15000,
    loanType: "Variable",
    loanTerm: 30,
    maxLTV: 80,
    features: {
      cashbackIncentive: true,
      offsetAccount: true,
      redrawFacility: true,
      fixedInterestRatePeriod: false,
      splitLoan: false,
      extraRepayments: true,
    },
  },
  {
    id: "2",
    bank: "Aussie Lender",
    interestRate: 3.45,
    comparisonRate: 3.47,
    monthlyRepayment: 2010,
    totalRepayment: 723600,
    savings: 12500,
    loanType: "Fixed",
    loanTerm: 30,
    maxLTV: 85,
    features: {
      cashbackIncentive: false,
      offsetAccount: true,
      redrawFacility: true,
      fixedInterestRatePeriod: true,
      splitLoan: false,
      extraRepayments: true,
    },
  },
  {
    id: "3",
    bank: "Down Under Mortgages",
    interestRate: 3.39,
    comparisonRate: 3.41,
    monthlyRepayment: 1990,
    totalRepayment: 716400,
    savings: 13750,
    loanType: "Split",
    loanTerm: 25,
    maxLTV: 90,
    features: {
      cashbackIncentive: true,
      offsetAccount: false,
      redrawFacility: true,
      fixedInterestRatePeriod: true,
      splitLoan: true,
      extraRepayments: false,
    },
  },
]

export function ComparePageContent() {
  const searchParams = useSearchParams()
  const selectedLoanIds = useMemo(() => searchParams.getAll("id"), [searchParams])

  const selectedLoans = useMemo(
    () => baseLoanOptions.filter((loan) => selectedLoanIds.includes(loan.id)),
    [selectedLoanIds],
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Compare Selected Loans</h1>
        <Link href="/loan-comparison">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Loans
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Loan Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Comparison Rate</TableHead>
                <TableHead>Monthly Repayment</TableHead>
                <TableHead>Total Repayment</TableHead>
                <TableHead>Savings</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Loan Term</TableHead>
                <TableHead>Max LTV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.bank}</TableCell>
                  <TableCell>{loan.interestRate}%</TableCell>
                  <TableCell>{loan.comparisonRate}%</TableCell>
                  <TableCell>${loan.monthlyRepayment.toFixed(2)}</TableCell>
                  <TableCell>${loan.totalRepayment.toFixed(2)}</TableCell>
                  <TableCell className="text-green-600 font-semibold">${loan.savings.toFixed(2)}</TableCell>
                  <TableCell>{loan.loanType}</TableCell>
                  <TableCell>{loan.loanTerm} years</TableCell>
                  <TableCell>{loan.maxLTV}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Features Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead>Cashback Incentive</TableHead>
                <TableHead>Offset Account</TableHead>
                <TableHead>Redraw Facility</TableHead>
                <TableHead>Fixed Interest Rate Period</TableHead>
                <TableHead>Split Loan</TableHead>
                <TableHead>Extra Repayments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedLoans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.bank}</TableCell>
                  {Object.entries(loan.features).map(([feature, value]) => (
                    <TableCell key={feature}>{value ? "Yes" : "No"}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

