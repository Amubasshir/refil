import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") || "desc"

  const skip = (page - 1) * limit

  try {
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.lead.count(),
    ])

    return NextResponse.json(
      {
        success: true,
        leads,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName,
      email,
      phone,
      loanAmount,
      loanPurpose,
      employmentStatus,
      annualIncome,
      creditScore,
      propertyType,
      propertyValue,
      currentLoanAmount,
    } = body

    const lead = await prisma.lead.create({
      data: {
        fullName,
        email,
        phone,
        loanAmount: Number.parseFloat(loanAmount),
        loanPurpose,
        employmentStatus,
        annualIncome: annualIncome ? Number.parseFloat(annualIncome) : null,
        creditScore,
        propertyType,
        propertyValue: propertyValue ? Number.parseFloat(propertyValue) : null,
        currentLoanAmount: currentLoanAmount ? Number.parseFloat(currentLoanAmount) : null,
      },
    })

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 })
  }
}

