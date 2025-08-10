import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode("your-secret-key-for-demo")

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value
  const { pathname } = req.nextUrl

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/student") ||
    pathname.startsWith("/staff")

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
      await jwtVerify(token, secret)
    } catch {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // Prevent caching of protected routes
  const res = NextResponse.next()
  if (isProtectedRoute) {
    res.headers.set("Cache-Control", "no-store, max-age=0")
  }
  return res
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/staff/:path*"],
}
