"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Clock, Rocket } from "lucide-react"

interface Deployment {
  id: string
  environment: string
  branch: string
  status: "success" | "failed" | "in-progress"
  duration: string
  time: string
  progress?: number
}

export function DeploymentMetrics() {
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: "1",
      environment: "Production",
      branch: "main",
      status: "success",
      duration: "2m 34s",
      time: "5 minutes ago",
    },
    {
      id: "2",
      environment: "Staging",
      branch: "develop",
      status: "in-progress",
      duration: "1m 12s",
      time: "Just now",
      progress: 65,
    },
    {
      id: "3",
      environment: "Production",
      branch: "hotfix/auth",
      status: "success",
      duration: "3m 01s",
      time: "1 hour ago",
    },
    {
      id: "4",
      environment: "Development",
      branch: "feature/dashboard",
      status: "failed",
      duration: "45s",
      time: "2 hours ago",
    },
  ])

  // Simulate deployment progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDeployments((prev) =>
        prev.map((deployment) => {
          if (deployment.status === "in-progress" && deployment.progress !== undefined) {
            const newProgress = deployment.progress + Math.random() * 10
            if (newProgress >= 100) {
              return {
                ...deployment,
                status: "success" as const,
                progress: 100,
              }
            }
            return {
              ...deployment,
              progress: newProgress,
            }
          }
          return deployment
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Success</Badge>
      case "failed":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Failed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">In Progress</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Latest deployment activity across all environments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{deployment.environment}</span>
                  </div>
                  {getStatusBadge(deployment.status)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Branch: {deployment.branch}</span>
                  <span className="text-muted-foreground">{deployment.duration}</span>
                </div>
                {deployment.status === "in-progress" && deployment.progress !== undefined && (
                  <div className="space-y-1">
                    <Progress value={deployment.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">{Math.round(deployment.progress)}%</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{deployment.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deployment Statistics</CardTitle>
          <CardDescription>Performance metrics for the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="text-2xl font-bold text-green-500">94.2%</span>
            </div>
            <Progress value={94.2} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Duration</span>
              <span className="text-2xl font-bold">2m 18s</span>
            </div>
            <p className="text-xs text-green-500">31% faster than last week</p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">24</div>
              <div className="text-xs text-muted-foreground">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">2</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">1</div>
              <div className="text-xs text-muted-foreground">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
