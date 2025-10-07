"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestGenerator } from "./test-generator"
import { DocGenerator } from "./doc-generator"
import { CodeReviewer } from "./code-reviewer"
import { FileCode2, BookOpen, CheckCircle2 } from "lucide-react"

export function CodeAnalysisInterface() {
  return (
    <Tabs defaultValue="tests" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tests" className="flex items-center gap-2">
          <FileCode2 className="h-4 w-4" />
          Test Generation
        </TabsTrigger>
        <TabsTrigger value="docs" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Documentation
        </TabsTrigger>
        <TabsTrigger value="review" className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Code Review
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tests" className="mt-6">
        <TestGenerator />
      </TabsContent>
      <TabsContent value="docs" className="mt-6">
        <DocGenerator />
      </TabsContent>
      <TabsContent value="review" className="mt-6">
        <CodeReviewer />
      </TabsContent>
    </Tabs>
  )
}
