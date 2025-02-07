import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const adminPath = "/admin"

  if (request.nextUrl.pathname.startsWith(adminPath)) {
    const session = request.cookies.get("admin_session")

    if (!session || session.value !== process.env.ADMIN_SESSION_TOKEN) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

