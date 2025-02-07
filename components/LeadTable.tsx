"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Lead {
  id: string
  fullName: string
  email: string
  phone: string | null
  loanAmount: number
  loanPurpose: string
  employmentStatus: string | null
  annualIncome: number | null
  creditScore: string | null
  propertyType: string | null
  propertyValue: number | null
  currentLoanAmount: number | null
  createdAt: string
}

export function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads")
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads)
      } else {
        throw new Error("Failed to fetch leads")
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    }
  }

  const downloadCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Loan Amount",
      "Loan Purpose",
      "Employment Status",
      "Annual Income",
      "Credit Score",
      "Property Type",
      "Property Value",
      "Current Loan Amount",
      "Created At",
    ]

    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          lead.id,
          lead.fullName,
          lead.email,
          lead.phone || "",
          lead.loanAmount,
          lead.loanPurpose,
          lead.employmentStatus || "",
          lead.annualIncome || "",
          lead.creditScore || "",
          lead.propertyType || "",
          lead.propertyValue || "",
          lead.currentLoanAmount || "",
          new Date(lead.createdAt).toLocaleString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `leads_${new Date().toISOString()}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={downloadCSV}>Download CSV</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Loan Amount</TableHead>
            <TableHead>Loan Purpose</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.fullName}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>${lead.loanAmount.toLocaleString()}</TableCell>
              <TableCell>{lead.loanPurpose}</TableCell>
              <TableCell>{new Date(lead.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

