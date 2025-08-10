"use server"

import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation"

const secret = new TextEncoder().encode("your-secret-key-for-demo")

// Mock user data (replace with database in production)
const mockUsers = [
  {
    id: 1,
    pin: "ADMIN001",
    password: "admin123",
    full_name: "System Administrator",
    email: "admin@fidif.edu",
    role: "super_admin",
  },
  {
    id: 2,
    pin: "STAFF001",
    password: "staff123",
    full_name: "John Teacher",
    email: "john@fidif.edu",
    role: "staff",
  },
  {
    id: 3,
    pin: "STU001",
    password: "student123",
    full_name: "Jane Student",
    email: "jane@fidif.edu",
    role: "student",
  },
  {
    id: 4,
    pin: "ADMIN002",
    password: "admin123",
    full_name: "School Principal",
    email: "principal@fidif.edu",
    role: "admin",
  },
]

export async function login(pin: string, password: string, role: string) {
  try {
    const user = mockUsers.find(
      (u) => u.pin === pin && u.password === password && u.role === role
    )

    if (!user) {
      return { success: false, error: "Invalid credentials" }
    }

    // Create JWT token
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    })

    return {
      success: true,
      user: {
        id: user.id,
        pin: user.pin,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  redirect("/login")
}

export async function getUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) return null

    const { payload } = await jwtVerify(token, secret)
    const user = mockUsers.find((u) => u.id === payload.userId)

    if (!user) return null

    return {
      id: user.id,
      pin: user.pin,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    }
  } catch {
    return null
  }
}

export async function requireAuth(allowedRoles?: string[]) {
  const user = await getUser()

  if (!user) throw new Error("Authentication required")
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw new Error("Insufficient permissions")
  }

  return user
}
