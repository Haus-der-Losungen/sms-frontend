"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, ArrowLeft, Loader2 } from "lucide-react"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const [userID, setUserdID] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await login(userID, password, role)

      if (result.success) {
        // Redirect based on role
        switch (role) {
          // case "admin":
          case "super_admin":
            router.push("/admin")
            break
          case "staff":
            router.push("/staff")
            break
          case "student":
            router.push("/student")
            break
          default:
            router.push("/")
        }
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GraduationCap className="h-10 w-10 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Fidif School Complex</h1>
          </div>
          <p className="text-gray-600">Access your school portal</p>
        </div>

        {/* Login Form */}
        <Card className="border-pink-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-pink-900">School Portal Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="border-pink-200 focus:border-pink-500">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    {/* <SelectItem value="admin">Admin</SelectItem> */}
                    <SelectItem value="super_admin"> Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userId">UserId</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your UserId"
                  value={userID}
                  onChange={(e) => setUserdID(e.target.value)}
                  className="border-pink-200 focus:border-pink-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-pink-200 focus:border-pink-500"
                  required
                />
              </div>

              {error && <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Need help accessing your account?</p>
              <p className="text-pink-600">Contact the school administration</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
