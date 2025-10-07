"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical, Shield } from "lucide-react"
import type { User } from "@/lib/auth"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "developer" | "viewer"
  status: "active" | "invited"
  joinedAt: string
}

export function TeamManagement({ currentUser }: { currentUser: User }) {
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@devboost.ai",
      role: "admin",
      status: "active",
      joinedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Alice Chen",
      email: "alice@devboost.ai",
      role: "developer",
      status: "active",
      joinedAt: "2024-02-01",
    },
    {
      id: "3",
      name: "Bob Smith",
      email: "bob@devboost.ai",
      role: "developer",
      status: "active",
      joinedAt: "2024-02-10",
    },
    {
      id: "4",
      name: "Carol Davis",
      email: "carol@devboost.ai",
      role: "viewer",
      status: "active",
      joinedAt: "2024-03-01",
    },
    {
      id: "5",
      name: "David Lee",
      email: "david@devboost.ai",
      role: "developer",
      status: "invited",
      joinedAt: "2024-03-15",
    },
  ])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "developer":
        return <Shield className="h-4 w-4" />
      case "viewer":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default"
      case "developer":
        return "secondary"
      case "viewer":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage roles and permissions for your team</CardDescription>
            </div>
            <Button>Invite Member</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      {member.status === "invited" && (
                        <Badge variant="outline" className="text-xs">
                          Invited
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Shield className="h-3 w-3" />
                      {member.email}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue={member.role} disabled={currentUser.role !== "admin"}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant={getRoleBadgeVariant(member.role) as any} className="flex items-center gap-1">
                    {getRoleIcon(member.role)}
                    {member.role}
                  </Badge>
                  {currentUser.role === "admin" && (
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin</CardTitle>
            <CardDescription>Full access to all features</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Manage team members</li>
              <li>• Configure integrations</li>
              <li>• Access all analytics</li>
              <li>• Modify settings</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Developer</CardTitle>
            <CardDescription>Access to development tools</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Use AI code analysis</li>
              <li>• View analytics</li>
              <li>• Receive notifications</li>
              <li>• Collaborate with team</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Viewer</CardTitle>
            <CardDescription>Read-only access</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• View dashboards</li>
              <li>• See team activity</li>
              <li>• Access reports</li>
              <li>• Limited notifications</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
