"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"

interface StudentDashboardProps {
  user: {
    id: number
    pin: string
    full_name: string
    email?: string
    role: string
  }
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-10 w-10 text-pink-600" />
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Student Portal</h1>
              <p className="text-gray-600">Welcome, {user.full_name}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Card */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  My Profile
                </CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                  <p className="text-lg font-semibold text-pink-900">{user.full_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Student PIN</Label>
                  <p className="text-lg font-semibold text-pink-900">{user.pin}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Email</Label>
                  <p className="text-lg font-semibold text-pink-900">{user.email || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Class</Label>
                  <p className="text-lg font-semibold text-pink-900">Class 2A</p>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Results Card */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  My Assessment Results
                </CardTitle>
                <CardDescription>Your recent test scores and grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <div>
                      <p className="font-medium text-pink-900">Mathematics</p>
                      <p className="text-sm text-gray-600">Last Test</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">85%</p>
                      <p className="text-sm text-gray-600">Grade: B+</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <div>
                      <p className="font-medium text-pink-900">English</p>
                      <p className="text-sm text-gray-600">Last Test</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">92%</p>
                      <p className="text-sm text-gray-600">Grade: A-</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <div>
                      <p className="font-medium text-pink-900">Science</p>
                      <p className="text-sm text-gray-600">Last Test</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-600">78%</p>
                      <p className="text-sm text-gray-600">Grade: B</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                    <div>
                      <p className="font-medium text-pink-900">Social Studies</p>
                      <p className="text-sm text-gray-600">Last Test</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">88%</p>
                      <p className="text-sm text-gray-600">Grade: B+</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Performance */}
          <Card className="border-pink-200 mt-6">
            <CardHeader>
              <CardTitle className="text-pink-900">Overall Performance</CardTitle>
              <CardDescription>Your academic summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <p className="text-3xl font-bold text-pink-600">85.8%</p>
                  <p className="text-gray-600">Overall Average</p>
                </div>
                <div className="p-4">
                  <p className="text-3xl font-bold text-green-600">B+</p>
                  <p className="text-gray-600">Current Grade</p>
                </div>
                <div className="p-4">
                  <p className="text-3xl font-bold text-blue-600">12th</p>
                  <p className="text-gray-600">Class Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
