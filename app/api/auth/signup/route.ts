import { type NextRequest, NextResponse } from "next/server"
import { createToken, setAuthCookie, type User } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // In production, check if user exists and hash password
    // For demo, create a new user
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      role: "developer",
    }

    // Create JWT token
    const token = await createToken(newUser)

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: newUser,
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}
