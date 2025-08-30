"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultHeaders = {
      "Content-Type": "application/json",
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    // Add credentials to include cookies
    config.credentials = "include"

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Authentication
  async login(pin: string, password: string, role: string) {
    return this.request("/user/login", {
      method: "POST",
      body: JSON.stringify({ pin, password, role }),
    })
  }

  async logout() {
    return this.request("/user/logout", {
      method: "POST",
    })
  }

  async getCurrentUser() {
    return this.request("/user/me")
  }

  // Admin endpoints
  async getStudents(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : ""
    return this.request(`/admin/students${params}`)
  }

  async getStaff(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : ""
    return this.request(`/admin/staff${params}`)
  }

  async createStudent(studentData: any) {
    return this.request("/admin/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    })
  }

  async createStaff(staffData: any) {
    return this.request("/user/create-user", {
      method: "POST",
      body: JSON.stringify(staffData),
    })
  }

  // Class management
  async getClasses() {
    return this.request("/class")
  }

  async createClass(classData: any) {
    return this.request("/class", {
      method: "POST",
      body: JSON.stringify(classData),
    })
  }

  async updateClass(classId: string, classData: any) {
    return this.request(`/class/${classId}`, {
      method: "PUT",
      body: JSON.stringify(classData),
    })
  }

  // Subject management
  async getSubjects() {
    return this.request("/subject")
  }

  async createSubject(subjectData: any) {
    return this.request("/subject", {
      method: "POST",
      body: JSON.stringify(subjectData),
    })
  }

  async updateSubject(subjectId: string, subjectData: any) {
    return this.request(`/subject/${subjectId}`, {
      method: "PUT",
      body: JSON.stringify(subjectData),
    })
  }

  // Attendance
  async markAttendance(attendanceData: any) {
    return this.request("/attendance/mark", {
      method: "POST",
      body: JSON.stringify(attendanceData),
    })
  }

  async markBulkAttendance(attendanceList: any[]) {
    return this.request("/attendance/mark-bulk", {
      method: "POST",
      body: JSON.stringify(attendanceList),
    })
  }

  async getClassAttendance(classId: string, date?: string) {
    const params = date ? `?attendance_date=${date}` : ""
    return this.request(`/attendance/class/${classId}${params}`)
  }

  async getStudentAttendance(studentId: string, classId?: string) {
    const params = classId ? `?class_id=${classId}` : ""
    return this.request(`/attendance/student/${studentId}${params}`)
  }

  async getAttendanceSummary(studentId: string, classId: string) {
    return this.request(`/attendance/summary/${studentId}/${classId}`)
  }

  // Results
  async recordResult(resultData: any) {
    return this.request("/result/record", {
      method: "POST",
      body: JSON.stringify(resultData),
    })
  }

  async getStudentResults(studentId: string, subjectId?: string, classId?: string) {
    const params = new URLSearchParams()
    if (subjectId) params.append("subject_id", subjectId)
    if (classId) params.append("class_id", classId)
    const queryString = params.toString()
    return this.request(`/result/student/${studentId}${queryString ? `?${queryString}` : ""}`)
  }

  async getSubjectResults(subjectId: string) {
    return this.request(`/result/subject/${subjectId}`)
  }

  async getClassResults(classId: string) {
    return this.request(`/result/class/${classId}`)
  }

  async getResultSummary(studentId: string, subjectId: string, classId: string) {
    return this.request(`/result/summary/${studentId}/${subjectId}/${classId}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
export default apiClient
