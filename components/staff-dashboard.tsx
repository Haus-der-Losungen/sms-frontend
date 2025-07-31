"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, GraduationCap, ClipboardCheck, BookOpen, BarChart3, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"

interface StaffDashboardProps {
  user: {
    id: number
    pin: string
    full_name: string
    email?: string
    role: string
  }
}

export function StaffDashboard({ user }: StaffDashboardProps) {
  const [activeView, setActiveView] = useState("profile")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClass, setSelectedClass] = useState("")

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  const AppSidebar = () => (
    <Sidebar className="bg-pink-50 border-pink-200">
      <SidebarHeader className="bg-pink-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Staff Portal</h2>
            <p className="text-sm text-pink-100">{user.full_name}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("profile")} isActive={activeView === "profile"}>
                  <Users className="h-4 w-4" />
                  <span>My Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("attendance")} isActive={activeView === "attendance"}>
                  <ClipboardCheck className="h-4 w-4" />
                  <span>Attendance Recording</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("assessment")} isActive={activeView === "assessment"}>
                  <BookOpen className="h-4 w-4" />
                  <span>Student Assessment</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("overview")} isActive={activeView === "overview"}>
                  <BarChart3 className="h-4 w-4" />
                  <span>Class Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">My Profile</h1>
              <p className="text-gray-600">Your personal information and details</p>
            </div>

            <Card className="border-pink-200 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-pink-900">Staff Information</CardTitle>
                <CardDescription>Your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                    <p className="text-lg font-semibold text-pink-900">{user.full_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Staff PIN</Label>
                    <p className="text-lg font-semibold text-pink-900">{user.pin}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Email</Label>
                  <p className="text-lg font-semibold text-pink-900">{user.email || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Role</Label>
                  <p className="text-lg font-semibold text-pink-900 capitalize">{user.role}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "attendance":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Attendance Recording</h1>
              <p className="text-gray-600">Mark student attendance for your classes</p>
            </div>

            <div className="flex gap-4 mb-6">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48 border-pink-200 focus:border-pink-500">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-1a">Class 1A</SelectItem>
                  <SelectItem value="class-1b">Class 1B</SelectItem>
                  <SelectItem value="class-2a">Class 2A</SelectItem>
                  <SelectItem value="class-2b">Class 2B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Weekly Attendance Grid</CardTitle>
                <CardDescription>Mark attendance for the selected class</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedClass ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-8 gap-2 text-sm font-medium text-gray-700">
                      <div>Student</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                      <div>Sun</div>
                    </div>

                    {/* Sample students */}
                    {["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"].map((student, index) => (
                      <div key={index} className="grid grid-cols-8 gap-2 items-center py-2 border-b border-pink-100">
                        <div className="font-medium text-pink-900">{student}</div>
                        {[...Array(7)].map((_, dayIndex) => (
                          <div key={dayIndex} className="flex justify-center">
                            <Checkbox className="border-pink-300 data-[state=checked]:bg-pink-600" />
                          </div>
                        ))}
                      </div>
                    ))}

                    <Button className="bg-pink-600 hover:bg-pink-700 text-white mt-4">Save Attendance</Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">Please select a class to view attendance grid</div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case "assessment":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Student Assessment Input</h1>
              <p className="text-gray-600">Enter scores for your students</p>
            </div>

            <div className="flex gap-4 mb-6">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48 border-pink-200 focus:border-pink-500">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="social-studies">Social Studies</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48 border-pink-200 focus:border-pink-500">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-1a">Class 1A</SelectItem>
                  <SelectItem value="class-1b">Class 1B</SelectItem>
                  <SelectItem value="class-2a">Class 2A</SelectItem>
                  <SelectItem value="class-2b">Class 2B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Assessment Entry</CardTitle>
                <CardDescription>
                  Enter scores for {selectedSubject} - {selectedClass}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSubject && selectedClass ? (
                  <div className="space-y-4">
                    {["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"].map((student, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-pink-100 rounded-lg"
                      >
                        <div className="font-medium text-pink-900">{student}</div>
                        <div className="flex items-center space-x-4">
                          <Label htmlFor={`score-${index}`} className="text-sm">
                            Score:
                          </Label>
                          <Input
                            id={`score-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            className="w-20 border-pink-200 focus:border-pink-500"
                            placeholder="0-100"
                          />
                        </div>
                      </div>
                    ))}

                    <Button className="bg-pink-600 hover:bg-pink-700 text-white mt-4">Save Scores</Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Please select both subject and class to enter scores
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Class Assessment Overview</h1>
              <p className="text-gray-600">View student performance analytics</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900">Class 1A</CardTitle>
                  <CardDescription>Mathematics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Score:</span>
                      <span className="font-bold text-pink-700">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highest Score:</span>
                      <span className="font-bold text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Score:</span>
                      <span className="font-bold text-red-600">65%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900">Class 1B</CardTitle>
                  <CardDescription>English</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Score:</span>
                      <span className="font-bold text-pink-700">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highest Score:</span>
                      <span className="font-bold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Score:</span>
                      <span className="font-bold text-red-600">58%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900">Class 2A</CardTitle>
                  <CardDescription>Science</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Score:</span>
                      <span className="font-bold text-pink-700">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Highest Score:</span>
                      <span className="font-bold text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lowest Score:</span>
                      <span className="font-bold text-red-600">70%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-200 bg-white/80 backdrop-blur-sm px-6">
            <SidebarTrigger className="text-pink-600" />
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-6 w-6 text-pink-600" />
              <h1 className="text-xl font-semibold text-pink-900">Fidif School Complex</h1>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
