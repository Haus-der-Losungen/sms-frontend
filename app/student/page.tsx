import { redirect } from "next/navigation"
import { StudentDashboard } from "@/components/student-dashboard"
import { getUser } from "@/lib/auth"

export default async function StudentPage() {
  const user = await getUser()

  if (!user || user.role !== "student") {
    redirect("/login")
  }

  return <StudentDashboard user={user} />
}
