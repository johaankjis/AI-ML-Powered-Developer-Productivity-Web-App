import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TelemetryDashboard } from "@/components/analytics/telemetry-dashboard"

export default async function AnalyticsPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Real-time Analytics</h1>
          <p className="text-muted-foreground">Monitor your team's performance and productivity metrics in real-time</p>
        </div>
        <TelemetryDashboard />
      </main>
    </div>
  )
}
