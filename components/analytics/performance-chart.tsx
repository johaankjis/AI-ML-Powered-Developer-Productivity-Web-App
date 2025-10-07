"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface DataPoint {
  time: string
  reviewTime: number
  deployments: number
  testCoverage: number
}

export function PerformanceChart() {
  const [data, setData] = useState<DataPoint[]>([
    { time: "00:00", reviewTime: 2.5, deployments: 3, testCoverage: 95 },
    { time: "04:00", reviewTime: 2.3, deployments: 5, testCoverage: 96 },
    { time: "08:00", reviewTime: 2.1, deployments: 8, testCoverage: 97 },
    { time: "12:00", reviewTime: 1.9, deployments: 12, testCoverage: 98 },
    { time: "16:00", reviewTime: 2.0, deployments: 10, testCoverage: 98.5 },
    { time: "20:00", reviewTime: 2.1, deployments: 7, testCoverage: 98.5 },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)]
        const lastPoint = prev[prev.length - 1]
        const now = new Date()
        const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

        newData.push({
          time: timeStr,
          reviewTime: Math.max(1.5, Math.min(3, lastPoint.reviewTime + (Math.random() - 0.5) * 0.2)),
          deployments: Math.max(0, lastPoint.deployments + Math.floor((Math.random() - 0.5) * 3)),
          testCoverage: Math.max(90, Math.min(100, lastPoint.testCoverage + (Math.random() - 0.5) * 0.5)),
        })

        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Time Trend</CardTitle>
          <CardDescription>Average code review time over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="reviewTime"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorReview)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deployment Frequency</CardTitle>
          <CardDescription>Number of deployments per time period</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="deployments" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
