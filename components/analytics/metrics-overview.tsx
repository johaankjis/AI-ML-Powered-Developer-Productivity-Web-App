"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock, GitPullRequest, CheckCircle2, AlertCircle } from "lucide-react"

interface Metric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: any
}

export function MetricsOverview() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      title: "Active PRs",
      value: "12",
      change: "+3",
      trend: "up",
      icon: GitPullRequest,
    },
    {
      title: "Avg Review Time",
      value: "2.1h",
      change: "-0.3h",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Tests Passing",
      value: "98.5%",
      change: "+1.2%",
      trend: "up",
      icon: CheckCircle2,
    },
    {
      title: "Open Issues",
      value: "8",
      change: "-4",
      trend: "down",
      icon: AlertCircle,
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const randomChange = Math.random() > 0.5
          const currentValue = Number.parseFloat(metric.value)

          if (metric.title === "Active PRs" || metric.title === "Open Issues") {
            const newValue = Math.max(0, currentValue + (randomChange ? 1 : -1))
            return {
              ...metric,
              value: newValue.toString(),
              change: randomChange ? "+1" : "-1",
              trend: randomChange ? "up" : "down",
            }
          }

          if (metric.title === "Avg Review Time") {
            const newValue = Math.max(0.5, currentValue + (randomChange ? 0.1 : -0.1))
            return {
              ...metric,
              value: `${newValue.toFixed(1)}h`,
              change: randomChange ? "+0.1h" : "-0.1h",
              trend: randomChange ? "up" : "down",
            }
          }

          if (metric.title === "Tests Passing") {
            const newValue = Math.min(100, Math.max(90, currentValue + (randomChange ? 0.1 : -0.1)))
            return {
              ...metric,
              value: `${newValue.toFixed(1)}%`,
              change: randomChange ? "+0.1%" : "-0.1%",
              trend: randomChange ? "up" : "down",
            }
          }

          return metric
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
        const trendColor =
          metric.title === "Avg Review Time" || metric.title === "Open Issues"
            ? metric.trend === "down"
              ? "text-green-500"
              : "text-red-500"
            : metric.trend === "up"
              ? "text-green-500"
              : "text-red-500"

        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className={`flex items-center text-sm ${trendColor}`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                {metric.change} from last hour
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
