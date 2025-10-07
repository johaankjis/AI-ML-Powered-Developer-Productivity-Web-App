import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { getUser } from "@/lib/auth"

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

    const { text } = await generateText({
      model: "openai/gpt-4o",
      prompt: `You are an expert technical writer. Generate comprehensive documentation for the following code. Include JSDoc/TSDoc style comments with:

Code to document:
\`\`\`
${code}
\`\`\`

Generate documentation with:
1. Function/class description
2. Parameter descriptions with types
3. Return value description
4. Usage examples
5. Any important notes or warnings
6. Edge cases to be aware of

Format as JSDoc/TSDoc comments that can be added directly to the code.`,
      maxOutputTokens: 2000,
      temperature: 0.3,
    })

    return NextResponse.json({ documentation: text })
  } catch (error) {
    console.error("[v0] Documentation generation error:", error)
    return NextResponse.json({ error: "Failed to generate documentation" }, { status: 500 })
  }
}
