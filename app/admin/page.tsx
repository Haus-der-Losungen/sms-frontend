import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"
import { getUser } from "@/lib/auth"

export default async function AdminPage() {
  const user = await getUser()

  if (!user || (user.role !== "admin" && user.role !== "super_admin")) {
    redirect("/login")
  }

  return <AdminDashboard user={user} />
}
