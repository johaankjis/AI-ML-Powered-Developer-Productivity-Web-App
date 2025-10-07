"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitCommit, GitPullRequest, CheckCircle2 } from "lucide-react"

interface Activity {
  id: string
  user: string
  action: string
  type: "commit" | "pr" | "review"
  time: string
  status?: "success" | "pending" | "failed"
}

export function TeamActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      user: "Alice Chen",
      action: "Merged PR #234",
      type: "pr",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: "2",
      user: "Bob Smith",
      action: "Pushed 3 commits to main",
      type: "commit",
      time: "5 minutes ago",
    },
    {
      id: "3",
      user: "Carol Davis",
      action: "Reviewed PR #235",
      type: "review",
      time: "8 minutes ago",
      status: "success",
    },
    {
      id: "4",
      user: "David Lee",
      action: "Opened PR #236",
      type: "pr",
      time: "12 minutes ago",
      status: "pending",
    },
  ])

  // Simulate real-time activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ["Alice Chen", "Bob Smith", "Carol Davis", "David Lee", "Eve Wilson"]
      const actions = [
        { action: "Merged PR #", type: "pr" as const, status: "success" as const },
        { action: "Pushed commits to main", type: "commit" as const },
        { action: "Reviewed PR #", type: "review" as const, status: "success" as const },
        { action: "Opened PR #", type: "pr" as const, status: "pending" as const },
      ]

      const randomAction = actions[Math.floor(Math.random() * actions.length)]
      const randomName = names[Math.floor(Math.random() * names.length)]
      const prNumber = Math.floor(Math.random() * 100) + 200

      const newActivity: Activity = {
        id: Date.now().toString(),
        user: randomName,
        action: randomAction.action.includes("#") ? `${randomAction.action}${prNumber}` : randomAction.action,
        type: randomAction.type,
        time: "Just now",
        status: randomAction.status,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "commit":
        return <GitCommit className="h-4 w-4" />
      case "pr":
        return <GitPullRequest className="h-4 w-4" />
      case "review":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return null
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Activity Feed</CardTitle>
        <CardDescription>Real-time updates from your team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(activity.user)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{activity.user}</span>
                  {activity.status && (
                    <Badge variant={activity.status === "success" ? "default" : "secondary"} className="text-xs">
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getIcon(activity.type)}
                  <span>{activity.action}</span>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
