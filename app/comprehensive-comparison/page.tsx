"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AIBrokerChat } from "../components/AIBrokerChat"
import {
  Check,
  X,
  Info,
  DollarSign,
  Percent,
  PiggyBank,
  SplitSquareVertical,
  Banknote,
  CreditCard,
  Lock,
  MessageSquare,
  BrainCircuit,
  ArrowRight,
  Zap,
} from "lucide-react"
import type React from "react"

interface LoanFeature {
  name: string
  description: string
  tooltip: string
  icon: React.ElementType
}

interface LoanOption {
  id: string
  bank: string
  interestRate: number
  comparisonRate: number
  monthlyRepayment: number
  totalRepayment: number
  loanType: string
  features: {
    [key: string]: boolean
  }
  estimatedSavings: number
  loanTerm: number
  maxLTV: number
  fees: {
    establishmentFee: number
    ongoingFees: number
  }
  apr: number
}

const loanFeatures: LoanFeature[] = [
  {
    name: "offsetAccount",
    description: "Offset Account",
    tooltip: "An account linked to your loan that reduces the interest you pay",
    icon: PiggyBank,
  },
  {
    name: "redrawFacility",
    description: "Redraw Facility",
    tooltip: "Allows you to withdraw extra repayments you've made",
    icon: Banknote,
  },
  {
    name: "extraRepayments",
    description: "Extra Repayments",
    tooltip: "Ability to make additional payments without penalties",
    icon: DollarSign,
  },
  {
    name: "fixedRatePeriod",
    description: "Fixed Rate Period",
    tooltip: "Option to lock in your interest rate for a set period",
    icon: Lock,
  },
  {
    name: "interestOnlyOption",
    description: "Interest Only Option",
    tooltip: "Pay only the interest for a set period, usually 1-5 years",
    icon: Percent,
  },
  {
    name: "splitLoanOption",
    description: "Split Loan Option",
    tooltip: "Divide your loan into part fixed and part variable interest rates",
    icon: SplitSquareVertical,
  },
]

const dummyLoanOptions: LoanOption[] = [
  {
    id: "1",
    bank: "Refii Bank",
    interestRate: 3.25,
    comparisonRate: 3.28,
    monthlyRepayment: 1458.33,
    totalRepayment: 525000,
    loanType: "Variable",
    features: {
      offsetAccount: true,
      redrawFacility: true,
      extraRepayments: true,
      fixedRatePeriod: false,
      interestOnlyOption: true,
      splitLoanOption: false,
    },
    estimatedSavings: 15000,
    loanTerm: 30,
    maxLTV: 80,
    fees: {
      establishmentFee: 300,
      ongoingFees: 10,
    },
    apr: 3.35,
  },
  {
    id: "2",
    bank: "Future Lender",
    interestRate: 3.35,
    comparisonRate: 3.38,
    monthlyRepayment: 1472.92,
    totalRepayment: 530250,
    loanType: "Fixed",
    features: {
      offsetAccount: false,
      redrawFacility: true,
      extraRepayments: true,
      fixedRatePeriod: true,
      interestOnlyOption: false,
      splitLoanOption: false,
    },
    estimatedSavings: 12500,
    loanTerm: 25,
    maxLTV: 85,
    fees: {
      establishmentFee: 250,
      ongoingFees: 8,
    },
    apr: 3.45,
  },
  {
    id: "3",
    bank: "Smart Finance",
    interestRate: 3.4,
    comparisonRate: 3.43,
    monthlyRepayment: 1479.17,
    totalRepayment: 532500,
    loanType: "Split",
    features: {
      offsetAccount: true,
      redrawFacility: true,
      extraRepayments: true,
      fixedRatePeriod: true,
      interestOnlyOption: true,
      splitLoanOption: true,
    },
    estimatedSavings: 11000,
    loanTerm: 30,
    maxLTV: 90,
    fees: {
      establishmentFee: 200,
      ongoingFees: 12,
    },
    apr: 3.5,
  },
]

export default function ComprehensiveComparison() {
  const [loanAmount, setLoanAmount] = useState(300000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [showAIChat, setShowAIChat] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Comprehensive Loan Comparison</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="mr-2 h-6 w-6 text-blue-400" />
                Loan Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-white">
                  Loan Amount: ${loanAmount.toLocaleString()}
                </Label>
                <Slider
                  id="loanAmount"
                  min={100000}
                  max={1000000}
                  step={10000}
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  className="text-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanTerm" className="text-white">
                  Loan Term: {loanTerm} years
                </Label>
                <Slider
                  id="loanTerm"
                  min={1}
                  max={30}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  className="text-blue-400"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <CreditCard className="mr-2 h-6 w-6 text-green-400" />
                Loan Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dummyLoanOptions.map((loan) => (
                  <Card key={loan.id} className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">{loan.bank}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-white">
                        Interest Rate: <span className="font-bold text-blue-400">{loan.interestRate}%</span>
                      </p>
                      <p className="text-sm text-white">
                        Comparison Rate: <span className="font-bold text-blue-400">{loan.comparisonRate}%</span>
                      </p>
                      <p className="text-sm text-white">
                        Monthly Repayment:{" "}
                        <span className="font-bold text-green-400">${loan.monthlyRepayment.toFixed(2)}</span>
                      </p>
                      <p className="text-sm text-white">
                        Estimated Savings:{" "}
                        <span className="font-bold text-green-400">${loan.estimatedSavings.toFixed(2)}</span>
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">Features:</p>
                        {loanFeatures.map((feature) => (
                          <div key={feature.name} className="flex items-center text-xs text-white">
                            {loan.features[feature.name] ? (
                              <Check className="text-green-400 mr-1 h-3 w-3" />
                            ) : (
                              <X className="text-red-400 mr-1 h-3 w-3" />
                            )}
                            <span>{feature.description}</span>
                          </div>
                        ))}
                      </div>
                      <Button asChild size="sm" className="w-full mt-2 bg-blue-500 hover:bg-blue-600">
                        <Link href="/refinance-process">Apply</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BrainCircuit className="mr-2 h-6 w-6 text-cyan-400" />
                AI Refinance Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white mb-4">
                Based on your information, our AI refinance system suggests the following options:
              </p>
              <div className="space-y-4">
                {dummyLoanOptions.map((loan) => (
                  <div key={loan.id} className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">{loan.bank}</h3>
                    <p className="text-sm text-white mb-2">
                      Our AI recommends this {loan.loanType.toLowerCase()} rate loan for its
                      {loan.features.offsetAccount ? " offset account feature," : ""}
                      {loan.features.redrawFacility ? " flexible redraw facility," : ""}
                      {loan.features.extraRepayments ? " ability to make extra repayments," : ""}
                      {loan.features.fixedRatePeriod ? " option for a fixed rate period," : ""}
                      {loan.features.interestOnlyOption ? " interest-only payment option," : ""}
                      {loan.features.splitLoanOption ? " split loan capability," : ""} and potential savings of $
                      {loan.estimatedSavings.toFixed(2)}.
                    </p>
                    <p className="text-xs text-white text-gray-400">
                      This option aligns well with your financial goals and current market conditions.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Info className="mr-2 h-6 w-6 text-purple-400" />
                Understanding Your Loan Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <strong className="text-purple-400">APR (Annual Percentage Rate):</strong> This includes the interest
                  rate plus other costs, giving you the total yearly cost of the loan.
                </li>
                <li>
                  <strong className="text-purple-400">Fixed vs Variable Rate:</strong> Fixed rates stay the same, while
                  variable rates can change over time.
                </li>
                <li>
                  <strong className="text-purple-400">Loan Term:</strong> This is the duration of the loan. Longer terms
                  often mean lower monthly payments but higher total costs.
                </li>
                <li>
                  <strong className="text-purple-400">Estimated Saving:</strong> This is a projection of how much you
                  might save compared to your current loan. Actual savings may vary.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BrainCircuit className="mr-2 h-6 w-6 text-yellow-400" />
                AI-Recommended Loan Structures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-white">
                <li>
                  <strong className="text-yellow-400">Optimized Split Loan:</strong> Our AI suggests a 70/30 split
                  between variable and fixed rates to balance flexibility and stability in the current market.
                </li>
                <li>
                  <strong className="text-yellow-400">Offset Account Utilization:</strong> Based on your savings
                  patterns, an offset account could save you up to $10,000 in interest over the life of your loan.
                </li>
                <li>
                  <strong className="text-yellow-400">Strategic Extra Repayments:</strong> The AI recommends making
                  extra repayments during the first 5 years of your loan to significantly reduce the principal and save
                  on interest.
                </li>
                <li>
                  <strong className="text-yellow-400">Tailored Fixed-Rate Period:</strong> Given the current economic
                  forecasts, locking in a portion of your loan for a 3-year fixed term could provide rate security
                  without sacrificing long-term flexibility.
                </li>
              </ul>
              <p className="mt-4 text-xs text-white text-gray-400">
                Note: These recommendations are based on AI analysis of your financial situation and current market
                trends. Always consult with a financial advisor for personalized advice.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <ArrowRight className="mr-2 h-6 w-6 text-teal-400" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white">
              <p>
                Now that you've compared loan options and considered different loan structures, it's time to move
                forward with your refinancing process.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-teal-400">
                <li>Review your selected loan options</li>
                <li>Consider the AI-recommended loan structures</li>
                <li>Prepare the necessary documents for your application</li>
                <li>Proceed to the document upload page to continue your application</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
              <Link href="/document-upload">Proceed to Document Upload</Link>
            </Button>
            <p className="text-sm text-white text-gray-400">
              By proceeding, you'll be able to upload the required documents for your refinance application.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <MessageSquare className="mr-2 h-6 w-6 text-indigo-400" />
                AI Broker Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="ai-chat-toggle" className="text-white">
                  Enable AI Chat
                </Label>
                <Switch id="ai-chat-toggle" checked={showAIChat} onCheckedChange={setShowAIChat} className="ml-2" />
              </div>
              {showAIChat ? (
                <AIBrokerChat />
              ) : (
                <div className="text-center">
                  <p className="text-white mb-4">
                    Talk to our AI Broker Assistant for personalized advice and answers to your questions.
                  </p>
                  <Button onClick={() => setShowAIChat(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                    Start Chat
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

