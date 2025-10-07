"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricsOverview } from "./metrics-overview"
import { PerformanceChart } from "./performance-chart"
import { TeamActivity } from "./team-activity"
import { DeploymentMetrics } from "./deployment-metrics"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"

export function TelemetryDashboard() {
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Live Monitoring</span>
          <Badge variant={isLive ? "default" : "secondary"} className="ml-2">
            {isLive ? "Live" : "Paused"}
          </Badge>
        </div>
      </div>

      <MetricsOverview />

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="team">Team Activity</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-6">
          <PerformanceChart />
        </TabsContent>
        <TabsContent value="team" className="mt-6">
          <TeamActivity />
        </TabsContent>
        <TabsContent value="deployments" className="mt-6">
          <DeploymentMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
