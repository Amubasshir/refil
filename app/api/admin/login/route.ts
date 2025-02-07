import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set("admin_session", process.env.ADMIN_SESSION_TOKEN as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 })
  }
}

