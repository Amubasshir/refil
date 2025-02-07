"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Search, RefreshCw } from "lucide-react"

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

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Lead>("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    const filtered = leads.filter(
      (lead) =>
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredLeads(filtered)
  }, [searchTerm, leads])

  const fetchLeads = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/leads")
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads)
        setFilteredLeads(data.leads)
      } else {
        throw new Error("Failed to fetch leads")
      }
    } catch (error) {
      console.error("Error fetching leads:", error)
    } finally {
      setIsLoading(false)
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
      ...filteredLeads.map((lead) =>
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

  const handleSort = (column: keyof Lead) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }

    const sorted = [...filteredLeads].sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1
      if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    setFilteredLeads(sorted)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Search className="text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={downloadCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
              <Button onClick={fetchLeads} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("fullName")}>
                    Full Name
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                    Email
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("phone")}>
                    Phone
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("loanAmount")}>
                    Loan Amount
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("loanPurpose")}>
                    Loan Purpose
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("createdAt")}>
                    Created At
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

