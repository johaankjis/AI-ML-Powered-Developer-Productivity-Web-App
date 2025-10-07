import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CodeAnalysisInterface } from "@/components/code-analysis/code-analysis-interface"

export default async function CodeAnalysisPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Code Analysis</h1>
          <p className="text-muted-foreground">
            Generate tests, documentation, and get intelligent code review feedback
          </p>
        </div>
        <CodeAnalysisInterface />
      </main>
    </div>
  )
}
