import { redirect } from "next/navigation"
import { StaffDashboard } from "@/components/staff-dashboard"
import { getUser } from "@/lib/auth"

export default async function StaffPage() {
  const user = await getUser()

  if (!user || user.role !== "staff") {
    redirect("/login")
  }

  return <StaffDashboard user={user} />
}
