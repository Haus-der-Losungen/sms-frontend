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
  useSidebar,
} from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, GraduationCap, ClipboardCheck, BookOpen, BarChart3, LogOut, Search, Eye } from "lucide-react"
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

interface WeekData {
  [studentName: string]: boolean[] | boolean
  saved: boolean
}

interface ClassAttendance {
  [weekKey: string]: WeekData
}

interface WeeklyAttendance {
  [classKey: string]: ClassAttendance
}

interface AssessmentConfig {
  classAssessment: number
  midterm: number
  exam: number
}

export function StaffDashboard({ user }: StaffDashboardProps) {
  const [activeView, setActiveView] = useState("profile")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedWeek, setSelectedWeek] = useState("week-1")
  const [assessmentType, setAssessmentType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  // Assessment configuration state
  const [assessmentConfig, setAssessmentConfig] = useState<AssessmentConfig>({
    classAssessment: 20,
    midterm: 20,
    exam: 60,
  })

  // Mock attendance data - now organized by class, then by week
  const [weeklyAttendance, setWeeklyAttendance] = useState<WeeklyAttendance>({
    "class-1a": {
      "week-1": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-2": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-3": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-4": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-5": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-6": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-7": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-8": {
        "Alice Johnson": [false, false, false, false, false],
        "Bob Smith": [false, false, false, false, false],
        "Carol Davis": [false, false, false, false, false],
        "David Wilson": [false, false, false, false, false],
        saved: false,
      },
    },
    "class-1b": {
      "week-1": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-2": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-3": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-4": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-5": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-6": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-7": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
      "week-8": {
        "Emma Brown": [false, false, false, false, false],
        "Frank Miller": [false, false, false, false, false],
        "Grace Taylor": [false, false, false, false, false],
        "Henry Clark": [false, false, false, false, false],
        saved: false,
      },
    },
    "class-2a": {
      "week-1": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-2": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-3": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-4": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-5": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-6": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-7": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
      "week-8": {
        "John Doe": [false, false, false, false, false],
        "Jane Smith": [false, false, false, false, false],
        "Mike Johnson": [false, false, false, false, false],
        "Sarah Wilson": [false, false, false, false, false],
        saved: false,
      },
    },
    "class-2b": {
      "week-1": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-2": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-3": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-4": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-5": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-6": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-7": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
      "week-8": {
        "Lisa Anderson": [false, false, false, false, false],
        "Mark Thompson": [false, false, false, false, false],
        "Nina Rodriguez": [false, false, false, false, false],
        "Oscar Lee": [false, false, false, false, false],
        saved: false,
      },
    },
  })

  // Mock student scores
  const [studentScores, setStudentScores] = useState<{
    [key: string]: { classAssessment: number; midterm: number; exam: number }
  }>({
    "John Doe": { classAssessment: 18, midterm: 17, exam: 50 },
    "Jane Smith": { classAssessment: 19, midterm: 18, exam: 55 },
    "Mike Johnson": { classAssessment: 16, midterm: 15, exam: 47 },
    "Sarah Wilson": { classAssessment: 17, midterm: 18, exam: 53 },
  })

  const students = [
    {
      id: 1,
      name: "John Doe",
      // pin: "STU001",
      class: "Class 2A",
      average: 85,
      grade: "B+",
      attendance: "95%",
      email: "john.doe@student.fidif.edu",
      phone: "+1234567890",
      address: "123 Main St",
      parentContact: "+1234567891",
    },
    {
      id: 2,
      name: "Jane Smith",
      // pin: "STU002",
      class: "Class 2A",
      average: 92,
      grade: "A-",
      attendance: "98%",
      email: "jane.smith@student.fidif.edu",
      phone: "+1234567892",
      address: "456 Oak Ave",
      parentContact: "+1234567893",
    },
    {
      id: 3,
      name: "Mike Johnson",
      // pin: "STU003",
      class: "Class 2A",
      average: 78,
      grade: "B",
      attendance: "92%",
      email: "mike.johnson@student.fidif.edu",
      phone: "+1234567894",
      address: "789 Pine St",
      parentContact: "+1234567895",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      // pin: "STU004",
      class: "Class 2A",
      average: 88,
      grade: "B+",
      attendance: "96%",
      email: "sarah.wilson@student.fidif.edu",
      phone: "+1234567896",
      address: "321 Elm St",
      parentContact: "+1234567897",
    },
  ]

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  const handleAttendanceChange = (studentName: string, dayIndex: number, checked: boolean) => {
    // Validate inputs
    if (!selectedWeek || !selectedClass || !studentName || dayIndex < 0 || dayIndex > 4) {
      console.error("Invalid attendance change parameters")
      return
    }

    const classData = weeklyAttendance[selectedClass]
    if (!classData) {
      console.error("Class data not found")
      return
    }

    const weekData = classData[selectedWeek]
    if (!weekData) {
      console.error("Week data not found")
      return
    }

    if (weekData.saved) {
      alert("Cannot edit attendance for a saved week.")
      return
    }

    try {
      setWeeklyAttendance((prev) => ({
        ...prev,
        [selectedClass]: {
          ...prev[selectedClass],
          [selectedWeek]: {
            ...prev[selectedClass][selectedWeek],
            [studentName]:
              Array.isArray(prev[selectedClass][selectedWeek][studentName])
                ? (prev[selectedClass][selectedWeek][studentName] as boolean[]).map((attendance, index) =>
                    index === dayIndex ? checked : attendance,
                  )
                : [false, false, false, false, false], // fallback array
          } as WeekData,
        },
      }))
    } catch (error) {
      console.error("Error updating attendance:", error)
      alert("An error occurred while updating attendance. Please try again.")
    }
  }

  const handleSaveAttendance = () => {
    // Validate that we have a selected week and class
    if (!selectedWeek || !selectedClass) {
      alert("Please select both a class and week before saving attendance.")
      return
    }

    // Check if the class data exists
    if (!weeklyAttendance[selectedClass]) {
      alert("No attendance data found for the selected class.")
      return
    }

    // Check if the week data exists
    if (!weeklyAttendance[selectedClass][selectedWeek]) {
      alert("No attendance data found for the selected week.")
      return
    }

    // Check if already saved
    if (weeklyAttendance[selectedClass][selectedWeek].saved) {
      alert("This week's attendance has already been saved and locked.")
      return
    }

    try {
      setWeeklyAttendance((prev) => ({
        ...prev,
        [selectedClass]: {
          ...prev[selectedClass],
          [selectedWeek]: {
            ...prev[selectedClass][selectedWeek],
            saved: true,
          } as WeekData,
        },
      }))
      alert(`Attendance for ${selectedClass} - ${selectedWeek} saved successfully! This week is now locked.`)
    } catch (error) {
      console.error("Error saving attendance:", error)
      alert("An error occurred while saving attendance. Please try again.")
    }
  }

  const calculateTotalScore = (classAssessment: number, midterm: number, exam: number) => {
    // Calculate weighted total based on the actual scores and percentages
    const classAssessmentScore = (classAssessment / 100) * assessmentConfig.classAssessment
    const midtermScore = (midterm / 100) * assessmentConfig.midterm
    const examScore = (exam / 100) * assessmentConfig.exam

    const total = classAssessmentScore + midtermScore + examScore
    return Math.round(total)
  }

  const AppSidebar = () => {
    const { isMobile, setOpenMobile } = useSidebar()

    const onNav = (view: string) => {
      setActiveView(view)
      if (isMobile) setOpenMobile(false)
    }

    return (
      <Sidebar collapsible="offcanvas" className="border-pink-200">
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
            <SidebarGroupLabel>Directory</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("profile")} isActive={activeView === "profile"}>
                    <Users className="h-4 w-4" />
                    <span>My Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("attendance")} isActive={activeView === "attendance"}>
                    <ClipboardCheck className="h-4 w-4" />
                    <span>Attendance Recording</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("assessment")} isActive={activeView === "assessment"}>
                    <BookOpen className="h-4 w-4" />
                    <span>Student Assessment</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => onNav("student-directory")}
                    isActive={activeView === "student-directory"}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Student Directory</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("overview")} isActive={activeView === "overview"}>
                    <BarChart3 className="h-4 w-4" />
                    <span>Class Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={async () => {
                      await handleLogout()
                      if (isMobile) setOpenMobile(false)
                    }}
                  >
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
  }

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
                  {/* <div>
                    <Label className="text-sm font-medium text-gray-700">Staff PIN</Label>
                    <p className="text-lg font-semibold text-pink-900">{user.pin}</p>
                  </div> */}
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

              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-48 border-pink-200 focus:border-pink-500">
                  <SelectValue placeholder="Select Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week-1">Week 1</SelectItem>
                  <SelectItem value="week-2">Week 2</SelectItem>
                  <SelectItem value="week-3">Week 3</SelectItem>
                  <SelectItem value="week-4">Week 4</SelectItem>
                  <SelectItem value="week-5">Week 5</SelectItem>
                  <SelectItem value="week-6">Week 6</SelectItem>
                  <SelectItem value="week-7">Week 7</SelectItem>
                  <SelectItem value="week-8">Week 8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Weekly Attendance Grid</CardTitle>
                <CardDescription>
                  Mark attendance for {selectedClass} - {selectedWeek}
                  {selectedClass &&
                    selectedWeek &&
                    weeklyAttendance[selectedClass]?.[selectedWeek]?.saved &&
                    " (Locked - This week has been saved)"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedClass && selectedWeek && weeklyAttendance[selectedClass]?.[selectedWeek] ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                      <div className="font-semibold">Student</div>
                      <div className="text-center">
                        <div>Mon</div>
                      </div>
                      <div className="text-center">
                        <div>Tue</div>
                      </div>
                      <div className="text-center">
                        <div>Wed</div>
                      </div>
                      <div className="text-center">
                        <div>Thu</div>
                      </div>
                      <div className="text-center">
                        <div>Fri</div>
                      </div>
                    </div>

                    {/* Students for the selected class */}
                    {Object.keys(weeklyAttendance[selectedClass][selectedWeek] || {})
                      .filter((key) => key !== "saved")
                      .map((studentName, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4 items-center py-3 border-b border-pink-100">
                          <div className="font-medium text-pink-900">{studentName}</div>
                          {Array.isArray(weeklyAttendance[selectedClass][selectedWeek][studentName]) &&
                            (weeklyAttendance[selectedClass][selectedWeek][studentName] as boolean[]).map(
                              (isPresent, dayIndex) => (
                                <div key={dayIndex} className="flex justify-center">
                                  <Checkbox
                                    checked={isPresent}
                                    onCheckedChange={(checked) =>
                                      handleAttendanceChange(studentName, dayIndex, checked as boolean)
                                    }
                                    className="border-pink-300 data-[state=checked]:bg-pink-600 w-6 h-6"
                                    disabled={weeklyAttendance[selectedClass][selectedWeek]?.saved}
                                  />
                                </div>
                              ),
                            )}
                        </div>
                      ))}

                    <Button
                      onClick={handleSaveAttendance}
                      className="bg-pink-600 hover:bg-pink-700 text-white mt-4"
                      disabled={weeklyAttendance[selectedClass][selectedWeek]?.saved}
                    >
                      {weeklyAttendance[selectedClass][selectedWeek]?.saved ? "Attendance Saved" : "Save Attendance"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Please select both class and week to view attendance grid
                  </div>
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

            {/* Assessment Configuration */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Assessment Configuration</CardTitle>
                <CardDescription>Configure the percentage weights for different assessment types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Class Assessment (%)</Label>
                    <Input
                      type="number"
                      value={assessmentConfig.classAssessment}
                      onChange={(e) =>
                        setAssessmentConfig({
                          ...assessmentConfig,
                          classAssessment: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Midterm (%)</Label>
                    <Input
                      type="number"
                      value={assessmentConfig.midterm}
                      onChange={(e) =>
                        setAssessmentConfig({
                          ...assessmentConfig,
                          midterm: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Exam (%)</Label>
                    <Input
                      type="number"
                      value={assessmentConfig.exam}
                      onChange={(e) =>
                        setAssessmentConfig({
                          ...assessmentConfig,
                          exam: Number.parseInt(e.target.value) || 0,
                        })
                      }
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Total: {assessmentConfig.classAssessment + assessmentConfig.midterm + assessmentConfig.exam}%
                  {assessmentConfig.classAssessment + assessmentConfig.midterm + assessmentConfig.exam !== 100 && (
                    <span className="text-red-600 ml-2">⚠️ Should total 100%</span>
                  )}
                </p>
              </CardContent>
            </Card>

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
                    {/* Header row */}
                    <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-700 border-b border-pink-200 pb-2">
                      <div>Student Name</div>
                      <div className="text-center">
                        Class Assessment
                        <br />({assessmentConfig.classAssessment}%)
                      </div>
                      <div className="text-center">
                        Midterm
                        <br />({assessmentConfig.midterm}%)
                      </div>
                      <div className="text-center">
                        Exam
                        <br />({assessmentConfig.exam}%)
                      </div>
                      <div className="text-center">Total Score</div>
                    </div>

                    {Object.keys(studentScores).map((studentName, index) => {
                      const scores = studentScores[studentName]
                      const totalScore = calculateTotalScore(scores.classAssessment, scores.midterm, scores.exam)

                      return (
                        <div key={index} className="grid grid-cols-5 gap-4 items-center py-3 border-b border-pink-100">
                          <div className="font-medium text-pink-900">{studentName}</div>
                          <div className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={scores.classAssessment}
                              onChange={(e) =>
                                setStudentScores({
                                  ...studentScores,
                                  [studentName]: {
                                    ...scores,
                                    classAssessment: Number.parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-16 text-center border-pink-200 focus:border-pink-500"
                            />
                          </div>
                          <div className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={scores.midterm}
                              onChange={(e) =>
                                setStudentScores({
                                  ...studentScores,
                                  [studentName]: {
                                    ...scores,
                                    midterm: Number.parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-16 text-center border-pink-200 focus:border-pink-500"
                            />
                          </div>
                          <div className="text-center">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={scores.exam}
                              onChange={(e) =>
                                setStudentScores({
                                  ...studentScores,
                                  [studentName]: {
                                    ...scores,
                                    exam: Number.parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-16 text-center border-pink-200 focus:border-pink-500"
                            />
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-pink-700">{totalScore}%</div>
                          </div>
                        </div>
                      )
                    })}

                    <Button
                      className="bg-pink-600 hover:bg-pink-700 text-white mt-4"
                      onClick={() => {
                        // Save scores to subject and class
                        console.log(`Saving scores for ${selectedSubject} - ${selectedClass}:`, studentScores)
                        alert(`Scores saved successfully for ${selectedSubject} - ${selectedClass}!`)
                      }}
                    >
                      Save All Scores
                    </Button>
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

      case "student-directory":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Student Directory</h1>
              <p className="text-gray-600">Search and view student details and assessments</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students by name, PIN, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-sm border-pink-200 focus:border-pink-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students
                .filter(
                  (student) =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    // student.pin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.class.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((student) => (
                  <Card key={student.id} className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-900">{student.name}</CardTitle>
                      <CardDescription>
                        {/* {student.class} • PIN: {student.pin} */}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Overall Average:</strong> {student.average}%
                        </p>
                        <p>
                          <strong>Current Grade:</strong> {student.grade}
                        </p>
                        <p>
                          <strong>Attendance:</strong> {student.attendance}
                        </p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                            onClick={() => setSelectedStudent(student)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-pink-900">Student Details</DialogTitle>
                            <DialogDescription>Complete information for {student.name}</DialogDescription>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                                <p className="text-lg font-semibold text-pink-900">{student.name}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Student PIN</Label>
                                {/* <p className="text-lg font-semibold text-pink-900">{student.pin}</p> */}
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Class</Label>
                                <p className="text-lg font-semibold text-pink-900">{student.class}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Email</Label>
                                <p className="text-lg font-semibold text-pink-900">{student.email}</p>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                                <p className="text-lg font-semibold text-pink-900">{student.phone}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Address</Label>
                                <p className="text-lg font-semibold text-pink-900">{student.address}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Parent Contact</Label>
                                <p className="text-lg font-semibold text-pink-900">{student.parentContact}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-700">Overall Performance</Label>
                                <p className="text-lg font-semibold text-pink-900">
                                  {student.average}% ({student.grade})
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
            </div>
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
      <div className="flex min-h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100" data-dashboard="staff">
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

// Add this export at the end of the file
export default StaffDashboard
