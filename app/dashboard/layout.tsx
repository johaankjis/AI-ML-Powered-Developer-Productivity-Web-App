import type React from "react"
import { NotificationProvider } from "@/components/notifications/notification-provider"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>
}
