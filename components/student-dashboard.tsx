"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, LogOut, Download } from "lucide-react"
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

  const handleDownloadTranscript = () => {
    // Create a proper transcript document with white background styling
    const transcriptHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Official Transcript - ${user.full_name}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            background-color: white;
            color: black;
            margin: 40px;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #000;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .school-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .document-title {
            font-size: 20px;
            font-weight: bold;
            text-decoration: underline;
        }
        .student-info {
            margin-bottom: 30px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .grades-table th, .grades-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        .grades-table th {
            background-color: #f0f0f0;
            font-weight: bold;
        }
        .summary {
            border-top: 2px solid #000;
            padding-top: 20px;
            text-align: center;
        }
        .footer {
            margin-top: 40px;
            text-align: right;
            font-size: 12px;
        }
        @media print {
            body { margin: 20px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="school-name">FIDIF SCHOOL COMPLEX</div>
        <div class="document-title">OFFICIAL ACADEMIC TRANSCRIPT</div>
    </div>
    
    <div class="student-info">
        <div class="info-row">
            <strong>Student Name:</strong>
            <span>${user.full_name}</span>
        </div>
        <div class="info-row">
            <strong>Student PIN:</strong>
            <span>${user.pin}</span>
        </div>
        <div class="info-row">
            <strong>Class:</strong>
            <span>Class 2A</span>
        </div>
        <div class="info-row">
            <strong>Academic Year:</strong>
            <span>2024-2025</span>
        </div>
    </div>
    
    <table class="grades-table">
        <thead>
            <tr>
                <th>Subject</th>
                <th>Class Assessment (20%)</th>
                <th>Midterm (20%)</th>
                <th>Exam (60%)</th>
                <th>Total Score</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Mathematics</td>
                <td>18/20</td>
                <td>17/20</td>
                <td>50/60</td>
                <td>85%</td>
                <td>B+</td>
            </tr>
            <tr>
                <td>English</td>
                <td>19/20</td>
                <td>18/20</td>
                <td>55/60</td>
                <td>92%</td>
                <td>A-</td>
            </tr>
            <tr>
                <td>Science</td>
                <td>16/20</td>
                <td>15/20</td>
                <td>47/60</td>
                <td>78%</td>
                <td>B</td>
            </tr>
            <tr>
                <td>Social Studies</td>
                <td>17/20</td>
                <td>18/20</td>
                <td>53/60</td>
                <td>88%</td>
                <td>B+</td>
            </tr>
            <tr>
                <td>Physical Education</td>
                <td>20/20</td>
                <td>19/20</td>
                <td>56/60</td>
                <td>95%</td>
                <td>A</td>
            </tr>
            <tr>
                <td>Art</td>
                <td>16/20</td>
                <td>16/20</td>
                <td>50/60</td>
                <td>82%</td>
                <td>B+</td>
            </tr>
            <tr>
                <td>Computer Science</td>
                <td>18/20</td>
                <td>18/20</td>
                <td>54/60</td>
                <td>90%</td>
                <td>A-</td>
            </tr>
            <tr>
                <td>History</td>
                <td>15/20</td>
                <td>15/20</td>
                <td>45/60</td>
                <td>75%</td>
                <td>B</td>
            </tr>
            <tr>
                <td>Geography</td>
                <td>16/20</td>
                <td>16/20</td>
                <td>48/60</td>
                <td>80%</td>
                <td>B</td>
            </tr>
            <tr>
                <td>Biology</td>
                <td>17/20</td>
                <td>17/20</td>
                <td>53/60</td>
                <td>87%</td>
                <td>B+</td>
            </tr>
            <tr>
                <td>Chemistry</td>
                <td>16/20</td>
                <td>17/20</td>
                <td>50/60</td>
                <td>83%</td>
                <td>B+</td>
            </tr>
            <tr>
                <td>Physics</td>
                <td>15/20</td>
                <td>16/20</td>
                <td>48/60</td>
                <td>79%</td>
                <td>B</td>
            </tr>
        </tbody>
    </table>
    
    <div class="summary">
        <div class="info-row">
            <strong>Overall Average:</strong>
            <span>85.8%</span>
        </div>
        <div class="info-row">
            <strong>Current Grade:</strong>
            <span>B+</span>
        </div>
        <div class="info-row">
            <strong>Class Rank:</strong>
            <span>12th out of 30</span>
        </div>
    </div>
    
    <div class="footer">
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <p>This is an official document from Fidif School Complex</p>
    </div>
</body>
</html>
    `

    const blob = new Blob([transcriptHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${user.full_name}_Official_Transcript.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const subjects = [
    { name: "Mathematics", score: 85, grade: "B+", classAssessment: 18, midterm: 17, exam: 50 },
    { name: "English", score: 92, grade: "A-", classAssessment: 19, midterm: 18, exam: 55 },
    { name: "Science", score: 78, grade: "B", classAssessment: 16, midterm: 15, exam: 47 },
    { name: "Social Studies", score: 88, grade: "B+", classAssessment: 17, midterm: 18, exam: 53 },
    { name: "Physical Education", score: 95, grade: "A", classAssessment: 20, midterm: 19, exam: 56 },
    { name: "Art", score: 82, grade: "B+", classAssessment: 16, midterm: 16, exam: 50 },
    { name: "Computer Science", score: 90, grade: "A-", classAssessment: 18, midterm: 18, exam: 54 },
    { name: "History", score: 75, grade: "B", classAssessment: 15, midterm: 15, exam: 45 },
    { name: "Geography", score: 80, grade: "B", classAssessment: 16, midterm: 16, exam: 48 },
    { name: "Biology", score: 87, grade: "B+", classAssessment: 17, midterm: 17, exam: 53 },
    { name: "Chemistry", score: 83, grade: "B+", classAssessment: 16, midterm: 17, exam: 50 },
    { name: "Physics", score: 79, grade: "B", classAssessment: 15, midterm: 16, exam: 48 },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-10 w-10 text-pink-600" />
            <div>
              <h1 className="text-3xl font-bold text-pink-900">Student Portal</h1>
              <p className="text-gray-600">Welcome, {user.full_name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleDownloadTranscript}
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Transcript
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col space-y-6">
          {/* Top Row - Profile and Overall Performance */}
          <div className="grid md:grid-cols-2 gap-6 flex-shrink-0">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                    <p className="text-lg font-semibold text-pink-900">{user.full_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Student PIN</Label>
                    <p className="text-lg font-semibold text-pink-900">{user.pin}</p>
                  </div>
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

            {/* Overall Performance */}
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="text-pink-900">Overall Performance</CardTitle>
                <CardDescription>Your academic summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-pink-600">85.8%</p>
                    <p className="text-sm text-gray-600">Overall Average</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-600">B+</p>
                    <p className="text-sm text-gray-600">Current Grade</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">12th</p>
                    <p className="text-sm text-gray-600">Class Rank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Results Card - Scrollable */}
          <Card className="border-pink-200 flex-1 min-h-0 flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="text-pink-900 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                My Assessment Results
              </CardTitle>
              <CardDescription>Your recent test scores and grades (scroll to see all subjects)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto max-h-96">
              <div className="space-y-4 pr-2">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 bg-pink-50 rounded-lg border border-pink-100 flex-shrink-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-pink-900">{subject.name}</p>
                        <p className="text-sm text-gray-600">Latest Assessment</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{subject.score}%</p>
                        <p className="text-sm text-gray-600">Grade: {subject.grade}</p>
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-white rounded">
                        <p className="font-medium">Class Assessment</p>
                        <p className="text-pink-600">{subject.classAssessment}/20 (20%)</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="font-medium">Midterm</p>
                        <p className="text-pink-600">{subject.midterm}/20 (20%)</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="font-medium">Exam</p>
                        <p className="text-pink-600">{subject.exam}/60 (60%)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
