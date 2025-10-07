"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

interface ReviewIssue {
  severity: "critical" | "warning" | "info"
  category: string
  message: string
  suggestion: string
}

export function CodeReviewer() {
  const [code, setCode] = useState("")
  const [reviewResults, setReviewResults] = useState<ReviewIssue[]>([])
  const [isReviewing, setIsReviewing] = useState(false)
  const { toast } = useToast()

  const handleReview = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to review",
        variant: "destructive",
      })
      return
    }

    setIsReviewing(true)
    try {
      const response = await fetch("/api/ai/review-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to review code")
      }

      setReviewResults(data.issues)
      toast({
        title: "Success",
        description: "Code review completed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsReviewing(false)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "warning":
        return "default"
      case "info":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Code</CardTitle>
          <CardDescription>Paste the code you want to review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code-input">Code</Label>
            <Textarea
              id="code-input"
              placeholder="async function fetchData(url) {&#10;  const response = await fetch(url);&#10;  return response.json();&#10;}"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm min-h-[400px]"
            />
          </div>
          <Button onClick={handleReview} disabled={isReviewing} className="w-full">
            {isReviewing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reviewing Code...
              </>
            ) : (
              "Review Code"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Results</CardTitle>
          <CardDescription>AI-powered code review feedback</CardDescription>
        </CardHeader>
        <CardContent>
          {reviewResults.length > 0 ? (
            <div className="space-y-4 max-h-[400px] overflow-auto">
              {reviewResults.map((issue, index) => (
                <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(issue.severity)}
                    <Badge variant={getSeverityColor(issue.severity) as any}>{issue.category}</Badge>
                  </div>
                  <p className="text-sm font-medium">{issue.message}</p>
                  <p className="text-sm text-muted-foreground">{issue.suggestion}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
              Review results will appear here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
