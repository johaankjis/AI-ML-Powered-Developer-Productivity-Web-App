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
      prompt: `You are an expert software testing engineer. Generate comprehensive test cases for the following code. Include unit tests with edge cases, error handling, and boundary conditions. Use a popular testing framework syntax (Jest/Vitest).

Code to test:
\`\`\`
${code}
\`\`\`

Generate complete, runnable test code with:
1. Test suite setup
2. Multiple test cases covering different scenarios
3. Edge cases and error handling
4. Clear test descriptions
5. Assertions

Return only the test code, no explanations.`,
      maxOutputTokens: 2000,
      temperature: 0.3,
    })

    return NextResponse.json({ tests: text })
  } catch (error) {
    console.error("[v0] Test generation error:", error)
    return NextResponse.json({ error: "Failed to generate tests" }, { status: 500 })
  }
}
