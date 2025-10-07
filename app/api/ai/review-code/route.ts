import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { z } from "zod"
import { getUser } from "@/lib/auth"

const reviewSchema = z.object({
  issues: z.array(
    z.object({
      severity: z.enum(["critical", "warning", "info"]),
      category: z.string(),
      message: z.string(),
      suggestion: z.string(),
    }),
  ),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    const { object } = await generateObject({
      model: "openai/gpt-4o",
      schema: reviewSchema,
      prompt: `You are an expert code reviewer. Analyze the following code and identify issues related to:
- Security vulnerabilities
- Performance problems
- Code quality and best practices
- Error handling
- Type safety
- Maintainability

Code to review:
\`\`\`
${code}
\`\`\`

For each issue found, provide:
- severity: "critical" for security/breaking issues, "warning" for performance/quality issues, "info" for suggestions
- category: brief category name (e.g., "Security", "Performance", "Best Practice")
- message: clear description of the issue
- suggestion: specific recommendation to fix it

If the code is good, return an empty issues array or provide positive feedback as "info" severity.`,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("[v0] Code review error:", error)
    return NextResponse.json({ error: "Failed to review code" }, { status: 500 })
  }
}
