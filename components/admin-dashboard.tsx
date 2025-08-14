"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, GraduationCap, BookOpen, Settings, BarChart3, LogOut, Plus, Search, Edit } from "lucide-react"
import { logout } from "@/lib/auth"

interface AdminDashboardProps {
  user: {
    id: number
    pin: string
    full_name: string
    email?: string
    role: string
  }
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data states
  const [staffList, setStaffList] = useState([
    { id: 1, name: "John Teacher", pin: "STF001", email: "john@fidif.edu", role: "Teacher", class: "Class 1A" },
    { id: 2, name: "Jane Instructor", pin: "STF002", email: "jane@fidif.edu", role: "Teacher", class: "Class 2B" },
  ])

  const [studentList, setStudentList] = useState([
    { id: 1, name: "Alice Student", pin: "STU001", email: "alice@student.fidif.edu", class: "Class 1A", grade: "A" },
    { id: 2, name: "Bob Learner", pin: "STU002", email: "bob@student.fidif.edu", class: "Class 2B", grade: "B+" },
  ])

  const [classList, setClassList] = useState([
    { id: 1, name: "Class 1A", teacher: "John Teacher", students: 25, description: "Primary class for grade 1" },
    { id: 2, name: "Class 2B", teacher: "Jane Instructor", students: 23, description: "Primary class for grade 2" },
  ])

  const [subjectList, setSubjectList] = useState([
    { id: 1, name: "Mathematics", description: "Basic arithmetic and problem solving", teacher: "John Teacher" },
    { id: 2, name: "English", description: "Reading, writing, and communication", teacher: "Jane Instructor" },
  ])

  // Form states
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "teacher",
    class: "",
  })

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    class: "",
    parentContact: "",
  })

  const [newClass, setNewClass] = useState({
    name: "",
    teacher: "",
    description: "",
  })

  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    teacher: "",
  })

  const handleLogout = async () => {
    await logout()
    window.location.href = "/login"
  }

  const generatePin = (type: "staff" | "student") => {
    const prefix = type === "staff" ? "STF" : "STU"
    const number = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${prefix}${number}`
  }

  const handleAddStaff = () => {
    const pin = generatePin("staff")
    const staff = {
      id: staffList.length + 1,
      name: newStaff.name,
      pin,
      email: newStaff.email,
      role: newStaff.role,
      class: newStaff.class,
    }
    setStaffList([...staffList, staff])
    setNewStaff({ name: "", email: "", role: "teacher", class: "" })
    alert(`Staff added successfully! PIN: ${pin}`)
  }

  const handleAddStudent = () => {
    const pin = generatePin("student")
    const student = {
      id: studentList.length + 1,
      name: newStudent.name,
      pin,
      email: newStudent.email,
      class: newStudent.class,
      grade: "N/A",
    }
    setStudentList([...studentList, student])
    setNewStudent({ name: "", email: "", class: "", parentContact: "" })
    alert(`Student added successfully! PIN: ${pin}`)
  }

  const handleAddClass = () => {
    const newClassItem = {
      id: classList.length + 1,
      name: newClass.name,
      teacher: newClass.teacher,
      students: 0,
      description: newClass.description,
    }
    setClassList([...classList, newClassItem])
    setNewClass({ name: "", teacher: "", description: "" })
    alert("Class added successfully!")
  }

  const handleAddSubject = () => {
    const newSubjectItem = {
      id: subjectList.length + 1,
      name: newSubject.name,
      description: newSubject.description,
      teacher: newSubject.teacher,
    }
    setSubjectList([...subjectList, newSubjectItem])
    setNewSubject({ name: "", description: "", teacher: "" })
    alert("Subject added successfully!")
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
                  <SidebarMenuButton onClick={() => onNav("overview")} isActive={activeView === "overview"}>
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("users")} isActive={activeView === "users"}>
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("staff")} isActive={activeView === "staff"}>
                    <Users className="h-4 w-4" />
                    <span>Staff Directory</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("students")} isActive={activeView === "students"}>
                    <GraduationCap className="h-4 w-4" />
                    <span>Student Directory</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("classes")} isActive={activeView === "classes"}>
                    <BookOpen className="h-4 w-4" />
                    <span>Class Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("subjects")} isActive={activeView === "subjects"}>
                    <BookOpen className="h-4 w-4" />
                    <span>Subject Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => onNav("settings")} isActive={activeView === "settings"}>
                    <Settings className="h-4 w-4" />
                    <span>System Settings</span>
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
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome to Fidif School Complex Admin Portal</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-pink-900">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">{studentList.length}</div>
                  <p className="text-sm text-gray-600">Active students</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-pink-900">Total Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">{staffList.length}</div>
                  <p className="text-sm text-gray-600">Active staff members</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-pink-900">Total Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">{classList.length}</div>
                  <p className="text-sm text-gray-600">Active classes</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-pink-900">Total Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">{subjectList.length}</div>
                  <p className="text-sm text-gray-600">Available subjects</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "users":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">User Management</h1>
              <p className="text-gray-600">Create and manage user accounts</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Create New Staff */}
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900">Create New Staff</CardTitle>
                  <CardDescription>Add a new staff member to the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="staff-name">Full Name</Label>
                    <Input
                      id="staff-name"
                      value={newStaff.name}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staff-email">Email</Label>
                    <Input
                      id="staff-email"
                      type="email"
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staff-role">Role</Label>
                    <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                      <SelectTrigger className="border-pink-200 focus:border-pink-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="staff-class">Assigned Class (Optional)</Label>
                    <Select
                      value={newStaff.class}
                      onValueChange={(value) => setNewStaff({ ...newStaff, class: value })}
                    >
                      <SelectTrigger className="border-pink-200 focus:border-pink-500">
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No class assigned</SelectItem>
                        {classList.map((cls) => (
                          <SelectItem key={cls.id} value={cls.name}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddStaff} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    Create Staff Account
                  </Button>
                </CardContent>
              </Card>

              {/* Create New Student */}
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="text-pink-900">Create New Student</CardTitle>
                  <CardDescription>Add a new student to the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="student-name">Full Name</Label>
                    <Input
                      id="student-name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="student-email">Email</Label>
                    <Input
                      id="student-email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="student-class">Class</Label>
                    <Select
                      value={newStudent.class}
                      onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}
                    >
                      <SelectTrigger className="border-pink-200 focus:border-pink-500">
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No class assigned</SelectItem>
                        {classList.map((cls) => (
                          <SelectItem key={cls.id} value={cls.name}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="parent-contact">Parent Contact</Label>
                    <Input
                      id="parent-contact"
                      value={newStudent.parentContact}
                      onChange={(e) => setNewStudent({ ...newStudent, parentContact: e.target.value })}
                      className="border-pink-200 focus:border-pink-500"
                    />
                  </div>
                  <Button onClick={handleAddStudent} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                    Create Student Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "staff":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-pink-900">Staff Directory</h1>
                <p className="text-gray-600">Manage all staff members</p>
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search staff by name, PIN, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-sm border-pink-200 focus:border-pink-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffList
                .filter(
                  (staff) =>
                    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    staff.pin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((staff) => (
                  <Card key={staff.id} className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-900">{staff.name}</CardTitle>
                      <CardDescription>
                        {staff.role} • PIN: {staff.pin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Email:</strong> {staff.email}
                        </p>
                        <p>
                          <strong>Role:</strong> {staff.role}
                        </p>
                        <p>
                          <strong>Class:</strong> {staff.class || "Not assigned"}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )

      case "students":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-pink-900">Student Directory</h1>
                <p className="text-gray-600">Manage all students</p>
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
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
              {studentList
                .filter(
                  (student) =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.pin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.class.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((student) => (
                  <Card key={student.id} className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-900">{student.name}</CardTitle>
                      <CardDescription>
                        {student.class} • PIN: {student.pin}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Email:</strong> {student.email}
                        </p>
                        <p>
                          <strong>Class:</strong> {student.class}
                        </p>
                        <p>
                          <strong>Grade:</strong> {student.grade}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )

      case "classes":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-pink-900">Class Management</h1>
                <p className="text-gray-600">Manage school classes</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>Create a new class for the school</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="class-name">Class Name</Label>
                      <Input
                        id="class-name"
                        value={newClass.name}
                        onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                        className="border-pink-200 focus:border-pink-500"
                        placeholder="e.g., Class 3A"
                      />
                    </div>
                    <div>
                      <Label htmlFor="class-teacher">Assigned Teacher</Label>
                      <Select
                        value={newClass.teacher}
                        onValueChange={(value) => setNewClass({ ...newClass, teacher: value })}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-500">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {staffList
                            .filter((staff) => staff.role === "teacher")
                            .map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.name}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="class-description">Description</Label>
                      <Textarea
                        id="class-description"
                        value={newClass.description}
                        onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                        className="border-pink-200 focus:border-pink-500"
                        placeholder="Brief description of the class"
                      />
                    </div>
                    <Button onClick={handleAddClass} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                      Create Class
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classList.map((cls) => (
                <Card key={cls.id} className="border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-900">{cls.name}</CardTitle>
                    <CardDescription>Teacher: {cls.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Students:</strong> {cls.students}
                      </p>
                      <p>
                        <strong>Description:</strong> {cls.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                    >
                      Manage Class
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "subjects":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-pink-900">Subject Management</h1>
                <p className="text-gray-600">Manage school subjects</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Subject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Subject</DialogTitle>
                    <DialogDescription>Create a new subject for the school</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject-name">Subject Name</Label>
                      <Input
                        id="subject-name"
                        value={newSubject.name}
                        onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                        className="border-pink-200 focus:border-pink-500"
                        placeholder="e.g., Mathematics"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject-teacher">Assigned Teacher</Label>
                      <Select
                        value={newSubject.teacher}
                        onValueChange={(value) => setNewSubject({ ...newSubject, teacher: value })}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-500">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {staffList
                            .filter((staff) => staff.role === "teacher")
                            .map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.name}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject-description">Description</Label>
                      <Textarea
                        id="subject-description"
                        value={newSubject.description}
                        onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                        className="border-pink-200 focus:border-pink-500"
                        placeholder="Brief description of the subject"
                      />
                    </div>
                    <Button onClick={handleAddSubject} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                      Create Subject
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectList.map((subject) => (
                <Card key={subject.id} className="border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-900">{subject.name}</CardTitle>
                    <CardDescription>Teacher: {subject.teacher}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Description:</strong> {subject.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                    >
                      Manage Subject
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-pink-900">System Settings</h1>
              <p className="text-gray-600">Configure system preferences</p>
            </div>

            <Card className="border-pink-200 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-pink-900">School Information</CardTitle>
                <CardDescription>Basic school details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>School Name</Label>
                  <Input value="Fidif School Complex" className="border-pink-200 focus:border-pink-500" readOnly />
                </div>
                <div>
                  <Label>Academic Year</Label>
                  <Input value="2024-2025" className="border-pink-200 focus:border-pink-500" />
                </div>
                <div>
                  <Label>Current Term</Label>
                  <Select defaultValue="first">
                    <SelectTrigger className="border-pink-200 focus:border-pink-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First Term</SelectItem>
                      <SelectItem value="second">Second Term</SelectItem>
                      <SelectItem value="third">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">Save Settings</Button>
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
      <div className="flex min-h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100" data-dashboard="admin">
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
