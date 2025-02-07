'use client';

import { LoanChatbot } from '@/components/LoanChatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, BrainCircuit, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoanComparisonPage() {
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };

  const handleLoanTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTerm(Number(e.target.value));
  };

  const handleCompare = () => {
    setShowSuggestions(true);
  };

  const handleProceed = () => {
    router.push('/loan-application-form');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quick Loan Comparison</h1>
        <Button
          onClick={() => setShowChat(!showChat)}
          className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          {showChat ? 'Hide Chat Assistant' : 'Chat with Assistant'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Enter Basic Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-white">
                  Loan Amount (AUD)
                </Label>
                <Input
                  type="number"
                  id="loanAmount"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  min={100000}
                  max={10000000}
                  step={10000}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanTerm" className="text-white">
                  Loan Term (Years)
                </Label>
                <Input
                  type="number"
                  id="loanTerm"
                  value={loanTerm}
                  onChange={handleLoanTermChange}
                  min={1}
                  max={30}
                  className="bg-gray-700 text-white border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanPurpose" className="text-white">
                  Loan Purpose
                </Label>
                <Select onValueChange={setLoanPurpose} value={loanPurpose}>
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">
                      Purchase a property
                    </SelectItem>
                    <SelectItem value="refinance">
                      Refinance existing mortgage
                    </SelectItem>
                    <SelectItem value="investment">
                      Investment property
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCompare}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Get AI Suggestions
              </Button>
            </CardContent>
          </Card>

          {showSuggestions && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BrainCircuit className="mr-2 h-6 w-6 text-cyan-400" />
                  AI Refinance Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">
                  Based on your loan amount of ${loanAmount.toLocaleString()}{' '}
                  and term of {loanTerm} years, our AI suggests:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                  <li>
                    Consider a split loan with 60% variable and 40% fixed rate
                    to balance flexibility and stability.
                  </li>
                  <li>
                    Look for lenders offering an offset account, which could
                    save you up to $20,000 in interest over the life of your
                    loan.
                  </li>
                  <li>
                    Aim for a comparison rate below 3.5% in the current market
                    conditions.
                  </li>
                  <li>
                    Choose a loan with unlimited extra repayments to potentially
                    pay off your mortgage faster.
                  </li>
                </ul>
                <p className="text-sm text-gray-400 italic">
                  Note: These are general suggestions. For personalized advice,
                  please proceed to the full application form.
                </p>
                <div className="text-center mt-4">
                  <Button
                    onClick={handleProceed}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Proceed to Full Application{' '}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {showChat && (
          <div className="lg:sticky lg:top-8">
            <LoanChatbot />
          </div>
        )}
      </div>
    </div>
  );
}
