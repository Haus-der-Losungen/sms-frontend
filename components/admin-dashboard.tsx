"use client"

import React, { useState } from "react"

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
import { Users, GraduationCap, UserPlus, Search, BookOpen, LogOut } from "lucide-react"
import { logout } from "@/lib/auth"

interface User {
  id: number
  pin: string
  full_name: string
  email?: string
  role: string
}

interface AdminDashboardProps {
  user: User
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [newUserData, setNewUserData] = useState({
    pin: "",
    password: "",
    full_name: "",
    email: "",
    role: "",
  })

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement user creation
    console.log("Creating user:", newUserData)
    // Reset form
    setNewUserData({
      pin: "",
      password: "",
      full_name: "",
      email: "",
      role: "",
    })
  }

  const AppSidebar = () => (
    <Sidebar className="bg-pink-50 border-pink-200">
      <SidebarHeader className="bg-pink-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-8 w-8" />
          <div>
            <h2 className="font-bold">Admin Portal</h2>
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
                <SidebarMenuButton onClick={() => setActiveView("dashboard")} isActive={activeView === "dashboard"}>
                  <BookOpen className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("staff")} isActive={activeView === "staff"}>
                  <Users className="h-4 w-4" />
                  <span>Staff Info</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("students")} isActive={activeView === "students"}>
                  <GraduationCap className="h-4 w-4" />
                  <span>Student Info</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("create-user")} isActive={activeView === "create-user"}>
                  <UserPlus className="h-4 w-4" />
                  <span>User Creation</span>
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
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.full_name}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-pink-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pink-900">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4 text-pink-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-700">342</div>
                  <p className="text-xs text-gray-600">+12 from last month</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pink-900">Total Staff</CardTitle>
                  <Users className="h-4 w-4 text-pink-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-700">28</div>
                  <p className="text-xs text-gray-600">+2 from last month</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pink-900">Active Classes</CardTitle>
                  <BookOpen className="h-4 w-4 text-pink-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-700">15</div>
                  <p className="text-xs text-gray-600">All classes active</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-pink-900">Attendance Rate</CardTitle>
                  <Users className="h-4 w-4 text-pink-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-700">94%</div>
                  <p className="text-xs text-gray-600">+2% from last week</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "staff":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Staff Information</h1>
              <p className="text-gray-600">Search and manage staff members</p>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search staff by name, PIN, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm border-pink-200 focus:border-pink-500"
              />
            </div>

            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Staff Directory</CardTitle>
                <CardDescription>All registered staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">Staff data will be loaded here...</div>
              </CardContent>
            </Card>
          </div>
        )

      case "students":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Student Information</h1>
              <p className="text-gray-600">Search and manage student records</p>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name, PIN, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm border-pink-200 focus:border-pink-500"
              />
            </div>

            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Student Directory</CardTitle>
                <CardDescription>All registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">Student data will be loaded here...</div>
              </CardContent>
            </Card>
          </div>
        )

      case "create-user":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">User Creation Panel</h1>
              <p className="text-gray-600">Add new users to the system</p>
            </div>

            <Card className="border-pink-200 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-pink-900">Create New User</CardTitle>
                <CardDescription>Enter user information and assign role</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pin">PIN</Label>
                      <Input
                        id="pin"
                        value={newUserData.pin}
                        onChange={(e) => setNewUserData({ ...newUserData, pin: e.target.value })}
                        className="border-pink-200 focus:border-pink-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUserData.password}
                        onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                        className="border-pink-200 focus:border-pink-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={newUserData.full_name}
                      onChange={(e) => setNewUserData({ ...newUserData, full_name: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUserData.role}
                      onValueChange={(value) => setNewUserData({ ...newUserData, role: value })}
                      required
                    >
                      <SelectTrigger className="border-pink-200 focus:border-pink-500">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        {user.role === "super_admin" && <SelectItem value="super_admin">Super Admin</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white">
                    Create User
                  </Button>
                </form>
              </CardContent>
            </Card>
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
6b9b6bb5f4ab14430fcebb79a024b19a2274d1e7