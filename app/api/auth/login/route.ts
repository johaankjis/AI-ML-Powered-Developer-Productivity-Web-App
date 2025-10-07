import { type NextRequest, NextResponse } from "next/server"
import { createToken, setAuthCookie, type User } from "@/lib/auth"

// Mock user database - replace with real database in production
const mockUsers = [
  {
    id: "1",
    email: "admin@devboost.ai",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "dev@devboost.ai",
    password: "dev123",
    name: "Developer User",
    role: "developer" as const,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user - replace with real database query
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create user object without password
    const userWithoutPassword: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }

    // Create JWT token
    const token = await createToken(userWithoutPassword)

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
