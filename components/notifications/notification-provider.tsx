"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  // Simulate WebSocket connection for real-time notifications
  useEffect(() => {
    // In production, this would be a real WebSocket connection
    const simulateNotifications = () => {
      const notificationTypes = [
        {
          type: "success" as const,
          title: "Deployment Successful",
          message: "Your changes have been deployed to production",
        },
        {
          type: "info" as const,
          title: "Code Review Request",
          message: "Alice Chen requested your review on PR #234",
        },
        {
          type: "warning" as const,
          title: "Test Coverage Low",
          message: "Test coverage dropped below 90% in feature/dashboard",
        },
        {
          type: "success" as const,
          title: "PR Merged",
          message: "Your pull request #235 has been merged to main",
        },
        {
          type: "info" as const,
          title: "New Comment",
          message: "Bob Smith commented on your pull request",
        },
      ]

      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]

      const newNotification: Notification = {
        id: Date.now().toString(),
        ...randomNotification,
        timestamp: new Date(),
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 19)])

      // Show toast for new notification
      toast({
        title: newNotification.title,
        description: newNotification.message,
        variant: newNotification.type === "error" ? "destructive" : "default",
      })
    }

    // Simulate receiving notifications every 15-30 seconds
    const interval = setInterval(
      () => {
        simulateNotifications()
      },
      Math.random() * 15000 + 15000,
    )

    return () => clearInterval(interval)
  }, [toast])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
