import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Clock, CheckCircle2, AlertCircle, Users } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Code Reviews",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: CheckCircle2,
    },
    {
      title: "Avg Review Time",
      value: "2.4h",
      change: "-24%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Security Issues",
      value: "3",
      change: "-35%",
      trend: "down",
      icon: AlertCircle,
    },
    {
      title: "Active Developers",
      value: "12",
      change: "+40%",
      trend: "up",
      icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown
        const trendColor = stat.trend === "up" ? "text-green-500" : "text-red-500"

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className={`flex items-center text-sm ${trendColor}`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                {stat.change} from last week
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
